import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Heart, User, ShoppingBag, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible";
import AnimatedLogo from '@/Components/AnimatedLogo';  // Adjust the import path as needed



// Icone dei metodi di pagamento
const PaymentIcons = () => (
    <div className="flex space-x-2">
        <svg className="h-8 w-12" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-visa"><title id="pi-visa">Visa</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" /><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" /><path d="M28.3 10.1H28c-.4 1-.7 1.5-1 3h1.9c-.3-1.5-.3-2.2-.6-3zm2.9 5.9h-1.7c-.1 0-.1 0-.2-.1l-.2-.9-.1-.2h-2.4c-.1 0-.2 0-.2.2l-.3.9c0 .1-.1.1-.1.1h-2.1l.2-.5L27 8.7c0-.5.3-.7.8-.7h1.5c.1 0 .2 0 .2.2l1.4 6.5c.1.4.2.7.2 1.1.1.1.1.1.1.2zm-13.4-.3l.4-1.8c.1 0 .2.1.2.1.7.3 1.4.5 2.1.4.2 0 .5-.1.7-.2.5-.2.5-.7.1-1.1-.2-.2-.5-.3-.8-.5-.4-.2-.8-.4-1.1-.7-1.2-1-.8-2.4-.1-3.1.6-.4.9-.8 1.7-.8 1.2 0 2.5 0 3.1.2h.1c-.1.6-.2 1.1-.4 1.7-.5-.2-1-.4-1.5-.4-.3 0-.6 0-.9.1-.2 0-.3.1-.4.2-.2.2-.2.5 0 .7l.5.4c.4.2.8.4 1.1.6.5.3 1 .8 1.1 1.4.2.9-.1 1.7-.9 2.3-.5.4-.7.6-1.4.6-1.4 0-2.5.1-3.4-.2-.1.2-.1.2-.2.1zm-3.5.3c.1-.7.1-.7.2-1 .5-2.2 1-4.5 1.4-6.7.1-.2.1-.3.3-.3H18c-.2 1.2-.4 2.1-.7 3.2-.3 1.5-.6 3-1 4.5 0 .2-.1.2-.3.2M5 8.2c0-.1.2-.2.3-.2h3.4c.5 0 .9.3 1 .8l.9 4.4c0 .1 0 .1.1.2 0-.1.1-.1.1-.1l2.1-5.1c-.1-.1 0-.2.1-.2h2.1c0 .1 0 .1-.1.2l-3.1 7.3c-.1.2-.1.3-.2.4-.1.1-.3 0-.5 0H9.7c-.1 0-.2 0-.2-.2L7.9 9.5c-.2-.2-.5-.5-.9-.6-.6-.3-1.7-.5-1.9-.5L5 8.2z" fill="#142688" /></svg>
        <svg className="h-8 w-12" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-master"><title id="pi-master">Mastercard</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" /><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" /><circle fill="#EB001B" cx="15" cy="12" r="7" /><circle fill="#F79E1B" cx="23" cy="12" r="7" /><path fill="#FF5F00" d="M22 12c0-2.4-1.2-4.5-3-5.7-1.8 1.3-3 3.4-3 5.7s1.2 4.5 3 5.7c1.8-1.2 3-3.3 3-5.7z" /></svg>
        <svg className="h-8 w-12" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-american_express"><title id="pi-american_express">American Express</title><g fill="none"><path fill="#000" d="M35,0 L3,0 C1.3,0 0,1.3 0,3 L0,21 C0,22.7 1.4,24 3,24 L35,24 C36.7,24 38,22.7 38,21 L38,3 C38,1.3 36.6,0 35,0 Z" opacity=".07" /><path fill="#006FCF" d="M35,1 C36.1,1 37,1.9 37,3 L37,21 C37,22.1 36.1,23 35,23 L3,23 C1.9,23 1,22.1 1,21 L1,3 C1,1.9 1.9,1 3,1 L35,1" /><path fill="#FFF" d="M8.971,10.268 L9.745,12.144 L8.203,12.144 L8.971,10.268 Z M25.046,10.346 L22.069,10.346 L22.069,11.173 L24.998,11.173 L24.998,12.412 L22.075,12.412 L22.075,13.334 L25.052,13.334 L25.052,14.073 L27.129,11.828 L25.052,9.488 L25.046,10.346 L25.046,10.346 Z M10.983,8.006 L14.978,8.006 L15.865,9.941 L16.687,8 L27.057,8 L28.135,9.19 L29.25,8 L34.013,8 L30.494,11.852 L33.977,15.68 L29.143,15.68 L28.065,14.49 L26.94,15.68 L10.03,15.68 L9.536,14.49 L8.406,14.49 L7.911,15.68 L4,15.68 L7.286,8 L10.716,8 L10.983,8.006 Z M19.646,9.084 L17.407,9.084 L15.907,12.62 L14.282,9.084 L12.06,9.084 L12.06,13.894 L10,9.084 L8.007,9.084 L5.625,14.596 L7.18,14.596 L7.674,13.406 L10.27,13.406 L10.764,14.596 L13.484,14.596 L13.484,10.661 L15.235,14.602 L16.425,14.602 L18.165,10.673 L18.165,14.603 L19.623,14.603 L19.647,9.083 L19.646,9.084 Z M28.986,11.852 L31.517,9.084 L29.695,9.084 L28.094,10.81 L26.546,9.084 L20.652,9.084 L20.652,14.602 L26.462,14.602 L28.076,12.864 L29.624,14.602 L31.499,14.602 L28.987,11.852 L28.986,11.852 Z" /></g></svg>
        <svg className="h-8 w-12" viewBox="0 0 38 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-labelledby="pi-paypal"><title id="pi-paypal">PayPal</title><path opacity=".07" d="M35 0H3C1.3 0 0 1.3 0 3v18c0 1.7 1.4 3 3 3h32c1.7 0 3-1.3 3-3V3c0-1.7-1.4-3-3-3z" /><path fill="#fff" d="M35 1c1.1 0 2 .9 2 2v18c0 1.1-.9 2-2 2H3c-1.1 0-2-.9-2-2V3c0-1.1.9-2 2-2h32" /><path fill="#003087" d="M23.9 8.3c.2-1 0-1.7-.6-2.3-.6-.7-1.7-1-3.1-1h-4.1c-.3 0-.5.2-.6.5L14 15.6c0 .2.1.4.3.4H17l.4-3.4 1.8-2.2 4.7-2.1z" /><path fill="#3086C8" d="M23.9 8.3l-.2.2c-.5 2.8-2.2 3.8-4.6 3.8H18c-.3 0-.5.2-.6.5l-.6 3.9-.2 1c0 .2.1.4.3.4H19c.3 0 .5-.2.5-.4v-.1l.4-2.4v-.1c0-.2.3-.4.5-.4h.3c2.1 0 3.7-.8 4.1-3.2.2-1 .1-1.8-.4-2.4-.1-.5-.3-.7-.5-.8z" /><path fill="#012169" d="M23.3 8.1c-.1-.1-.2-.1-.3-.1-.1 0-.2 0-.3-.1-.3-.1-.7-.1-1.1-.1h-3c-.1 0-.2 0-.2.1-.2.1-.3.2-.3.4l-.7 4.4v.1c0-.3.3-.5.6-.5h1.3c2.5 0 4.1-1 4.6-3.8v-.2c-.1-.1-.3-.2-.5-.2h-.1z" /></svg>
    </div>
);
interface LayoutProps {
    children: ReactNode;
}

interface MenuItem {
    title: string;
    items: string[];
}

const Layout: React.FC<LayoutProps> = ({ children }) => {
    const [activeCategory, setActiveCategory] = useState<string>('WOMEN\'S');
    const [hoveredCategory, setHoveredCategory] = useState<string | null>(null);
    const [isSheetOpen, setIsSheetOpen] = useState(false);

    const categories: string[] = ['COLLECTION\S','WOMEN\'S', 'MEN\'S', 'ACCESSORIES'];
    const menuItems: Record<string, MenuItem[]> = {
        'COLLECTION\S': [
            { title: 'CHIC TECH MATRIX', items: []},
        ],
        'WOMEN\'S': [
            { title: 'PRODUCTS', items: ['All Products', 'Leggings', 'T-Shirts & Tops', 'Sports Bras', 'Hoodies', 'Gym Jackets', 'Crop Tops'] },
            { title: 'ACCESSORIES', items: ['All Accessories'] },
        ],
        'MEN\'S': [
            { title: 'PRODUCTS', items: ['All Products', 'Shorts', 'T-Shirts & Tops', 'Joggers', 'Hoodies'] },
            { title: 'ACCESSORIES', items: ['All Accessories'] },
        ],
        'ACCESSORIES': [
            { title: 'BAGS', items: ['All Bags', 'Shoulder Bags'] },
        ],
    };

    const MobileMenuItem: React.FC<{ item: MenuItem }> = ({ item }) => {
        const [isOpen, setIsOpen] = useState(false);

        return (
            <Collapsible
                open={isOpen}
                onOpenChange={setIsOpen}
                className="py-4 border-b border-gray-200"
            >
                <CollapsibleTrigger className="flex justify-between items-center w-full">
                    <span className="text-lg font-semibold">{item.title}</span>
                    {isOpen ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                </CollapsibleTrigger>
                <CollapsibleContent>
                    <AnimatePresence>
                        {isOpen && (
                            <motion.ul
                                initial={{ opacity: 0, height: 0 }}
                                animate={{ opacity: 1, height: 'auto' }}
                                exit={{ opacity: 0, height: 0 }}
                                transition={{ duration: 0.3 }}
                                className="mt-2 space-y-2"
                            >
                                {item.items.map((subItem, index) => (
                                    <motion.li
                                        key={index}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        exit={{ opacity: 0, x: -20 }}
                                        transition={{ duration: 0.2, delay: index * 0.05 }}
                                    >
                                        <a href="#" className="block text-gray-600 hover:text-gray-900">
                                            {subItem}
                                        </a>
                                    </motion.li>
                                ))}
                            </motion.ul>
                        )}
                    </AnimatePresence>
                </CollapsibleContent>
            </Collapsible>
        );
    };

    return (
        <div className="min-h-screen flex flex-col">
            <header className="lg:hidden">
                <div className="flex justify-between items-center p-4 border-b">
                    <Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
                        <SheetTrigger asChild>
                            <Button variant="ghost" size="icon"><Menu /></Button>
                        </SheetTrigger>
                        <SheetContent side="left" className="w-full">
                            <div className="flex justify-between items-center mb-6">
                                <span className="text-xl font-bold">SHOP</span>
                                <Button variant="ghost" size="icon" onClick={() => setIsSheetOpen(false)}>
                                    <X />
                                </Button>
                            </div>
                            <div className="flex justify-between mb-6">
                                {categories.map((category) => (
                                    <button
                                        key={category}
                                        className={`py-2 px-4 ${activeCategory === category ? 'border-b-2 border-black' : ''}`}
                                        onClick={() => setActiveCategory(category)}
                                    >
                                        {category}
                                    </button>
                                ))}
                            </div>
                            <AnimatePresence initial={false} mode="wait">
                                <motion.div
                                    key={activeCategory}
                                    initial={{ opacity: 0, x: -300 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 300 }}
                                    transition={{ duration: 0.3 }}
                                >
                                    {menuItems[activeCategory].map((item, index) => (
                                        <MobileMenuItem key={index} item={item} />
                                    ))}
                                </motion.div>
                            </AnimatePresence>
                            <div className="mt-6">
                                <h3 className="text-lg font-semibold mb-2">MORE</h3>
                                <div className="space-y-2">
                                    <a href="#" className="block text-gray-600">Sign Up</a>
                                </div>
                            </div>
                        </SheetContent>
                    </Sheet>
                    <AnimatedLogo />
                    <div className="flex space-x-2">
                        <Button variant="ghost" size="icon"><User /></Button>
                        <Button variant="ghost" size="icon"><ShoppingBag /></Button>
                    </div>
                </div>
            </header>

            {/* Desktop Header */}
            <header className="hidden lg:block">
                <div className="flex justify-between items-center px-6 py-2 bg-gray-100 text-sm">
                    <div className="flex space-x-4">
                        <a href="#" className="text-gray-600">Account</a>
                        <a href="#" className="text-gray-600">Sign Up</a>
                    </div>
                    <div className="flex items-center space-x-4">
                        <a href="#" className="text-gray-600">Blog</a>
                    </div>
                </div>
                <div className="flex justify-between items-center px-6 py-4">
                    <AnimatedLogo />
                    <nav className="flex space-x-6">
                        {categories.map((category) => (
                            <div
                                key={category}
                                className="relative"
                                onMouseEnter={() => setHoveredCategory(category)}
                                onMouseLeave={() => setHoveredCategory(null)}
                            >
                                <a href="#" className="text-gray-800 hover:text-gray-600">{category}</a>
                            </div>
                        ))}
                    </nav>
                    <div className="flex items-center space-x-4">
                        <Button variant="ghost" size="icon"><Heart /></Button>
                        <Button variant="ghost" size="icon"><User /></Button>
                        <Button variant="ghost" size="icon"><ShoppingBag /></Button>
                    </div>
                </div>
            </header>

            {/* Mega Menu */}
            <AnimatePresence>
                {hoveredCategory && (
                    <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        transition={{ duration: 0.2 }}
                        className="absolute left-0 right-0 top-36 bg-white z-50 border-t border-gray-200"
                        onMouseEnter={() => setHoveredCategory(hoveredCategory)}
                        onMouseLeave={() => setHoveredCategory(null)}
                    >
                        <div className="max-w-7xl mx-auto px-4 py-6">
                            <div className="grid grid-cols-6 gap-8">
                                {menuItems[hoveredCategory].map((item, index) => (
                                    <div key={index} className={index === menuItems[hoveredCategory].length - 1 ? 'col-span-2' : ''}>
                                        <h3 className="font-bold mb-2 text-gray-900">{item.title}</h3>
                                        <ul className="space-y-1">
                                            {item.items.map((subItem, subIndex) => (
                                                <li key={subIndex}>
                                                    <a href="#" className="text-sm text-gray-600 hover:text-gray-900">{subItem}</a>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                ))}
                                {hoveredCategory === 'ACCESSORIES' && (
                                    <div className="col-span-2">
                                        <h3 className="font-bold mb-2 text-gray-900">FEATURED</h3>
                                        <div className="bg-gray-200 h-48 rounded-lg flex items-center justify-center">
                                            <span className="text-lg font-semibold">Best Selling Products</span>
                                        </div>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Announcement Bar */}
            <div className="bg-gray-200 text-center py-2 text-sm">
                FREE 30-DAY RETURNS POLICY
            </div>

            {/* Main Content */}
            <main className="flex-grow">
                {children}
            </main>

            {/* Footer */}
            <footer className="bg-white text-black py-8 px-4 w-full">
                <div className="max-w-screen-2xl mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        <div>
                            <h3 className="font-bold mb-4">HELP</h3>
                            <ul className="space-y-2">
                                <li><a href="/FAQ" className="hover:underline">FAQ</a></li>
                                <li><a href="#" className="hover:underline">Delivery Information</a></li>
                                <li><a href="#" className="hover:underline">Returns Policy</a></li>
                                <li><a href="#" className="hover:underline">Make A Return</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">MY ACCOUNT</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:underline">Login</a></li>
                                <li><a href="#" className="hover:underline">Register</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">PAGES</h3>
                            <ul className="space-y-2">
                                <li><a href="#" className="hover:underline">Refer a Friend</a></li>
                                <li><a href="#" className="hover:underline">About Us</a></li>
                            </ul>
                        </div>
                        <div>
                            <h3 className="font-bold mb-4">MORE ABOUT GLIDE</h3>
                            <div className="grid grid-cols-3 gap-4">
                                <div className="bg-gray-100 p-4 flex flex-col items-center justify-center">
                                    <span className="text-xs font-semibold">BLOG</span>
                                </div>
                                <div className="bg-gray-100 p-4 flex flex-col items-center justify-center">
                                    <span className="text-xs font-semibold">EMAIL SIGN UP</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div className="mt-8 flex flex-col md:flex-row justify-between items-center">
                        <PaymentIcons />
                    </div>

                    <div className="mt-8 text-sm text-gray-600 flex flex-col md:flex-row justify-between items-center">
                        <div>© 2024 | Glide Limited | All Rights Reserved. | We Do Gym.</div>
                        <div className="flex flex-wrap justify-center md:justify-end space-x-4 mt-4 md:mt-0">
                            <a href="#" className="hover:underline">Terms and Conditions</a>
                            <a href="#" className="hover:underline">Terms of Use</a>
                            <a href="#" className="hover:underline">Privacy Notice</a>
                            <a href="#" className="hover:underline">Cookie Policy</a>
                            <a href="#" className="hover:underline">Modern Slavery</a>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    );
};

export default Layout;
