<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Log;

class CartController extends Controller
{
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

            // Here you would typically:
            // 1. Store the cart item in session or database
            // 2. Return a success response
            
            // For now, let's store in session
            $cart = session()->get('cart', []);
            
            // Generate a unique ID for the cart item
            $itemId = uniqid();
            $cart[$itemId] = $validated;
            
            session()->put('cart', $cart);

            return response()->json([
                'message' => 'Product added to cart successfully',
                'cart_item' => $cart[$itemId]
            ], 200);

        } catch (\Exception $e) {
            Log::error('Cart error: ' . $e->getMessage());
            return response()->json([
                'message' => 'Error adding product to cart',
                'error' => $e->getMessage()
            ], 500);
        }
    }
}