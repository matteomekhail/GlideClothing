<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Stripe\Stripe;
use Stripe\Checkout\Session;
use Illuminate\Support\Facades\Log;

class CartCheckoutController extends Controller
{
    public function createSession(Request $request)
    {
        try {
            Stripe::setApiKey(config('services.stripe.secret'));

            $items = $request->items;
            $shippingOption = $request->shippingOption;

            $lineItems = array_map(function ($item) {
                return [
                    'price_data' => [
                        'currency' => 'usd',
                        'product_data' => [
                            'name' => $item['name'],
                            'description' => "Color: {$item['color']}",
                        ],
                        'unit_amount' => $item['price'] * 100, // Stripe uses cents
                    ],
                    'quantity' => $item['quantity'],
                ];
            }, $items);

            $session = Session::create([
                'payment_method_types' => ['card'],
                'line_items' => $lineItems,
                'shipping_options' => [
                    [
                        'shipping_rate_data' => [
                            'type' => 'fixed_amount',
                            'fixed_amount' => [
                                'amount' => $shippingOption === 'express' ? 2100 : 1500,
                                'currency' => 'usd',
                            ],
                            'display_name' => $shippingOption === 'express' ? 'Express Shipping' : 'Standard Shipping',
                            'delivery_estimate' => [
                                'minimum' => [
                                    'unit' => 'business_day',
                                    'value' => $shippingOption === 'express' ? 1 : 3,
                                ],
                                'maximum' => [
                                    'unit' => 'business_day',
                                    'value' => $shippingOption === 'express' ? 2 : 5,
                                ],
                            ],
                        ],
                    ],
                ],
                'mode' => 'payment',
                'success_url' => route('checkout.success') . '?session_id={CHECKOUT_SESSION_ID}',
                'cancel_url' => route('cart.index'),
            ]);

            return response()->json(['id' => $session->id]);
        } catch (\Exception $e) {
            Log::error('Stripe session creation failed: ' . $e->getMessage());
            return response()->json(['error' => $e->getMessage()], 500);
        }
    }
}