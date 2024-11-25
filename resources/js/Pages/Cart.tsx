import React from 'react';
import { Head } from '@inertiajs/react';
import Layout from '@/Layouts/Layout';
import { Button } from '@/Components/ui/button';
import { Table, TableHeader, TableBody, TableRow, TableHead, TableCell } from '@/Components/ui/table';
import { Input } from '@/Components/ui/input';
import { Separator } from '@/Components/ui/separator';
import { Trash2, Plus, Minus, ShoppingBag } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { toast } from 'react-hot-toast';
import { loadStripe } from '@stripe/stripe-js';
import axios from 'axios';

interface CartItem {
    id: number;
    name: string;
    color: string;
    price: number;
    quantity: number;
}

interface ShippingOption {
    id: 'normal' | 'express';
    name: string;
    price: number;
    description: string;
}

interface Props {
    stripeKey: string;
    cartItems: Record<string, {
        name: string;
        color: string;
        price: number;
        quantity: number;
    }>;
}

export default function Cart({ stripeKey, cartItems: initialCartItems }: Props) {
    const [cartItems, setCartItems] = React.useState(
        Object.entries(initialCartItems).map(([id, item]) => ({
            id,
            ...item
        }))
    );

    const [selectedShipping, setSelectedShipping] = React.useState<ShippingOption['id']>('normal');

    const shippingOptions: ShippingOption[] = [
        {
            id: 'normal',
            name: 'Standard Shipping',
            price: 15.00,
            description: '3-5 business days'
        },
        {
            id: 'express',
            name: 'Express Shipping',
            price: 21.00,
            description: '1-2 business days'
        }
    ];

    const updateQuantity = async (id: string, change: number) => {
        const currentItem = cartItems.find(item => item.id === id);
        if (!currentItem) return;
        
        const newQuantity = currentItem.quantity + change;
        if (newQuantity < 1) return;

        try {
            await axios.post('/cart/update', {
                id: id,
                name: currentItem.name,
                color: currentItem.color,
                price: currentItem.price,
                quantity: newQuantity
            });

            setCartItems(items =>
                items.map(item =>
                    item.id === id
                        ? { ...item, quantity: newQuantity }
                        : item
                )
            );
            toast.success("Cart updated successfully");
        } catch (error) {
            console.error('Error updating quantity:', error);
            toast.error("Failed to update cart");
        }
    };

    const removeItem = async (id: string) => {
        try {
            await axios.delete(`/cart/${id}`);
            setCartItems(items => items.filter(item => item.id !== id));
            toast.success("Item removed from cart");
        } catch (error) {
            toast.error("Failed to remove item");
        }
    };

    const subtotal = cartItems.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    const shipping = shippingOptions.find(option => option.id === selectedShipping)?.price || 0;
    const total = subtotal + shipping;

    const stripePromise = loadStripe(stripeKey);

    const handleCheckout = async () => {
        const stripe = await stripePromise;
        if (!stripe) {
            toast.error('Payment system not available');
            return;
        }

        try {
            const { data } = await axios.post('/create-cart-checkout-session', {
                items: cartItems,
                shippingOption: selectedShipping
            });

            const result = await stripe.redirectToCheckout({
                sessionId: data.id,
            });

            if (result.error) {
                toast.error(result.error.message || 'An error occurred during checkout');
            }
        } catch (error) {
            console.error('Checkout error:', error);
            toast.error('Failed to initiate checkout. Please try again.');
        }
    };

    return (
        <Layout>
            <Head title="Shopping Cart | Glide" />
            
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
            >
                <div className="flex items-center justify-between mb-8">
                    <h1 className="text-3xl font-bold">Shopping Cart</h1>
                    <p className="text-muted-foreground">
                        {cartItems.length} {cartItems.length === 1 ? 'item' : 'items'}
                    </p>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
                    <AnimatePresence mode="wait">
                        <motion.div 
                            className="lg:col-span-8"
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                        >
                            <div className="bg-white rounded-lg shadow-sm overflow-hidden">
                                <Table>
                                    <TableHeader>
                                        <TableRow>
                                            <TableHead className="w-[40%]">Product</TableHead>
                                            <TableHead>Quantity</TableHead>
                                            <TableHead>Price</TableHead>
                                            <TableHead></TableHead>
                                        </TableRow>
                                    </TableHeader>
                                    <TableBody>
                                        {cartItems.map((item) => (
                                            <TableRow key={item.id}>
                                                <TableCell>
                                                    <div className="flex items-center space-x-4">
                                                        <motion.div 
                                                            whileHover={{ scale: 1.05 }}
                                                            className="w-24 h-24 bg-gray-100 rounded-lg overflow-hidden"
                                                        >
                                                            <img
                                                                src={`/img/Prodotti/${item.color}1.jpg`}
                                                                alt={item.name}
                                                                className="w-full h-full object-cover"
                                                            />
                                                        </motion.div>
                                                        <div>
                                                            <h3 className="font-medium text-lg">{item.name}</h3>
                                                            <p className="text-sm text-muted-foreground">Color: {item.color}</p>
                                                        </div>
                                                    </div>
                                                </TableCell>
                                                <TableCell>
                                                    <div className="flex items-center space-x-3">
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => updateQuantity(item.id.toString(), -1)}
                                                            className="h-8 w-8 rounded-full border-2 hover:bg-gray-100"
                                                        >
                                                            <Minus className="h-3 w-3" />
                                                        </Button>
                                                        <div className="w-12 text-center font-medium">
                                                            {item.quantity}
                                                        </div>
                                                        <Button
                                                            variant="outline"
                                                            size="icon"
                                                            onClick={() => updateQuantity(item.id.toString(), 1)}
                                                            className="h-8 w-8 rounded-full border-2 hover:bg-gray-100"
                                                        >
                                                            <Plus className="h-3 w-3" />
                                                        </Button>
                                                    </div>
                                                </TableCell>
                                                <TableCell className="font-medium">
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </TableCell>
                                                <TableCell>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        onClick={() => removeItem(item.id.toString())}
                                                        className="text-red-500 hover:text-red-600 hover:bg-red-50"
                                                    >
                                                        <Trash2 className="h-4 w-4" />
                                                    </Button>
                                                </TableCell>
                                            </TableRow>
                                        ))}
                                    </TableBody>
                                </Table>
                            </div>
                        </motion.div>
                    </AnimatePresence>

                    <div className="lg:col-span-4">
                        <div className="bg-white rounded-lg shadow-sm p-6 space-y-6 sticky top-6">
                            <h2 className="text-xl font-semibold">Order Summary</h2>
                            <div className="space-y-4">
                                <div className="flex justify-between text-sm">
                                    <span className="text-muted-foreground">Subtotal</span>
                                    <span className="font-medium">${subtotal.toFixed(2)}</span>
                                </div>
                                
                                <div className="space-y-3">
                                    <span className="text-sm text-muted-foreground">Shipping</span>
                                    {shippingOptions.map((option) => (
                                        <div
                                            key={option.id}
                                            className={`flex items-center justify-between p-3 rounded-lg border-2 cursor-pointer transition-all ${
                                                selectedShipping === option.id
                                                    ? 'border-black bg-gray-50'
                                                    : 'border-gray-200 hover:border-gray-300'
                                            }`}
                                            onClick={() => setSelectedShipping(option.id)}
                                        >
                                            <div className="flex items-center space-x-2">
                                                <div className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                                                    selectedShipping === option.id ? 'border-black' : 'border-gray-300'
                                                }`}>
                                                    {selectedShipping === option.id && (
                                                        <div className="w-2 h-2 rounded-full bg-black" />
                                                    )}
                                                </div>
                                                <div>
                                                    <p className="font-medium text-sm">{option.name}</p>
                                                    <p className="text-xs text-muted-foreground">{option.description}</p>
                                                </div>
                                            </div>
                                            <span className="font-medium">${option.price.toFixed(2)}</span>
                                        </div>
                                    ))}
                                </div>

                                <Separator />
                                <div className="flex justify-between text-lg font-semibold">
                                    <span>Total</span>
                                    <span>${total.toFixed(2)}</span>
                                </div>
                                
                                <Button 
                                    className="w-full bg-black hover:bg-black/90 text-white py-6 text-lg rounded-xl"
                                    size="lg"
                                    onClick={handleCheckout}
                                >
                                    <ShoppingBag className="mr-2 h-5 w-5" />
                                    Checkout
                                </Button>
                                
                                <p className="text-xs text-center text-muted-foreground">
                                    Taxes calculated at checkout
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </motion.div>
        </Layout>
    );
}
