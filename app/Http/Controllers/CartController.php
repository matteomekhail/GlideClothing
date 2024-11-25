<?php

namespace App\Http\Controllers;

use App\Models\Cart;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;
use Inertia\Inertia;

class CartController extends Controller
{
    /**
     * Display the cart page
     */
    public function index()
    {
        return Inertia::render('Cart', [
            'cartItems' => session()->get('cart', []),
            'stripeKey' => config('services.stripe.key')
        ]);
    }

    /**
     * Add item to cart
     */
    public function store(Request $request)
    {
        try {
            // Validate the incoming request
            $validated = $request->validate([
                'name' => 'required|string',
                'color' => 'required|string',
                'price' => 'required|numeric',
                'quantity' => 'required|integer|min:1',
            ]);

            // Get current cart from session
            $cart = session()->get('cart', []);
            
            // Generate a unique ID for the cart item
            $itemId = uniqid();
            $cart[$itemId] = $validated;
            
            // Store updated cart in session
            session()->put('cart', $cart);

            return response()->json([
                'message' => 'Product added to cart successfully',
                'cart_item' => $cart[$itemId]
            ], 200);

        } catch (\Exception $e) {
            Log::error('Cart store error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error adding product to cart',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Update cart item quantity
     */
    public function update(Request $request)
    {
        $cart = session()->get('cart', []);
        $id = $request->input('id');
        
        if (isset($cart[$id])) {
            $cart[$id]['quantity'] = $request->input('quantity');
            session()->put('cart', $cart);
            
            return response()->json([
                'message' => 'Cart updated successfully',
                'cart' => $cart
            ]);
        }
        
        return response()->json([
            'message' => 'Item not found in cart'
        ], 404);
    }

    /**
     * Remove item from cart
     */
    public function destroy(string $itemId)
    {
        try {
            $cart = session()->get('cart', []);

            if (!isset($cart[$itemId])) {
                return response()->json([
                    'message' => 'Cart item not found'
                ], 404);
            }

            unset($cart[$itemId]);
            session()->put('cart', $cart);

            return response()->json([
                'message' => 'Item removed from cart successfully'
            ], 200);

        } catch (\Exception $e) {
            Log::error('Cart delete error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error removing item from cart',
                'error' => $e->getMessage()
            ], 500);
        }
    }

    /**
     * Clear entire cart
     */
    public function clear()
    {
        try {
            session()->forget('cart');

            return response()->json([
                'message' => 'Cart cleared successfully'
            ], 200);

        } catch (\Exception $e) {
            Log::error('Cart clear error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error clearing cart',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}