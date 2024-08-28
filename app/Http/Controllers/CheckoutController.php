<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Stripe\Product;
use Illuminate\Support\Facades\Log;
use App\Mail\PurchaseSuccessful;
use Illuminate\Support\Facades\Mail;
use Resend\Laravel\Facades\Resend;
class CheckoutController extends Controller
{
    public function createCheckoutSession(Request $request)
    {
        try {
            Stripe::setApiKey(config('services.stripe.secret'));

            // Find The Product
            $product = Product::retrieve($request->productId);

            // Get the price
            $price = $product->default_price;

            if (!$price) {
                throw new \Exception('No Price Found');
            }

            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => [[
                    'price' => $price,
                    'quantity' => 1,
                ]],
                'mode' => 'payment',
                'success_url' => route('checkout.success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('checkout.cancel'),
            ]);

            return response()->json(['id' => $session->id]);
        } catch (\Exception $e) {
            Log::error('Stripe session creation failed: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
    public function success(Request $request)
    {
        $sessionId = $request->get('session_id');

        try {
            Stripe::setApiKey(config('services.stripe.secret'));
            $session = Session::retrieve($sessionId);

            if ($session->payment_status === 'paid') {
                // Genera un URL unico per l'accesso alla repository
                $repoUrl = $this->generateUniqueRepoUrl($session->customer);

                // Invia l'email
                Resend::emails()->send([
                    'from' => 'no-reply@shadow-stack.com',
                    'to' => $session->customer_details->email,
                    'subject' => 'Thank you!',
                    'html' => (new PurchaseSuccessful($repoUrl))->render(),
                ]);

                return redirect()->route('purchase.confirmation')->with('success', 'Thank you for your purchase! Check your email for access instructions.');
            }

            return redirect()->route('purchase.error')->with('error', 'A problem occurred with the payment.');
        } catch (\Exception $e) {
            Log::error('Error processing successful payment: ' . $e->getMessage());
            return redirect()->route('purchase.error')->with('error', "An error occurred during payment processing.");
        }
    }

    private function generateUniqueRepoUrl($customerId)
    {
        // Genera un token unico basato sul customer ID
        $token = hash('sha256', $customerId . config('app.key'));

        // Sostituisci con l'URL effettivo della tua repository
        return "https://github.com/matteomekhail/ShadowStack/invite?token=" . $token;
    }
}
