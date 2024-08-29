import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Heart, User, ShoppingBag, ChevronDown, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";

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

  const categories: string[] = ['WOMEN\'S', 'MEN\'S', 'ACCESSORIES'];
  const menuItems: Record<string, MenuItem[]> = {
    'WOMEN\'S': [
      { title: 'TRENDING', items: ['New Product Drops', 'Best Sellers', 'Seasonal Essentials', 'Back To Uni', 'The Dropset', 'Whitney Simmons X Adapt'] },
      { title: 'LEGGINGS', items: ['All Leggings', 'High-Waisted Leggings', 'Seamless Leggings', 'Scrunch Bum Leggings', 'Leggings With Pockets', 'Black Leggings'] },
      { title: 'PRODUCTS', items: ['All Products', 'Leggings', 'T-Shirts & Tops', 'Sports Bras', 'Shorts', 'Hoodies', 'Gym Jackets', 'Crop Tops', 'Joggers', 'Sweaters', 'Tank Tops', 'Tracksuits', 'Underwear & Basics', 'Unitards', 'Sports Dresses', 'Workout Sets'] },
      { title: 'EXPLORE', items: ['Leggings Guide', 'Sports Bra Guide'] },
      { title: 'ACCESSORIES', items: ['All Accessories'] },
      { title: 'SALE', items: ['All Sale'] },
    ],
    'MEN\'S': [
      { title: 'TRENDING', items: ['New Product Drops', 'The Dropset', 'Best Sellers', 'Back To Uni', 'Seasonal Essentials', 'Graphics', 'Oversized'] },
      { title: 'PRODUCTS', items: ['All Products', 'Shorts', 'T-Shirts & Tops', 'Joggers', 'Hoodies', 'Tank Tops', 'Sweaters', 'Underwear & Basics', 'Gym Jackets', 'Base Layers', 'Stringers', 'Cargo Pants', 'Swim Shorts', 'Tracksuits', 'Leggings', 'Matching Gym Sets'] },
      { title: 'EXPLORE', items: ['Shorts Guide'] },
      { title: 'ACCESSORIES', items: ['All Accessories'] },
      { title: 'SALE', items: ['All Sale'] },
    ],
    'ACCESSORIES': [
      { title: 'TRENDING', items: ['All Accessories', 'New Releases', 'Back To School Bags', 'Mini Holdalls', 'Best Sellers', 'Graphics', 'Seasonal Gym Story'] },
      { title: 'BAGS', items: ['All Bags', 'Holdall And Duffel Bags', 'Backpacks', 'Tote Bags', 'Small Bags', 'Keychains'] },
      { title: 'FOOTWEAR', items: ['All Slides'] },
      { title: 'SOCKS', items: ['All Socks', 'Crew Socks', 'Quarter Socks', 'Trainer Socks'] },
      { title: 'HEADWEAR', items: ['All Headwear', 'Caps', 'Beanies', 'Hair Accessories'] },
      { title: 'UNDERWEAR', items: ['Women\'s Underwear', 'Men\'s Underwear'] },
      { title: 'EQUIPMENT', items: ['All Equipment', 'All Bottles', 'Lifting Equipment'] },
      { title: 'SALE', items: ['All Sale Accessories'] },
    ],
  };

  const MobileMenuItem: React.FC<{ item: MenuItem }> = ({ item }) => (
    <div className="py-4 border-b border-gray-200">
      <div className="flex justify-between items-center">
        <span className="text-lg font-semibold">{item.title}</span>
        <ChevronDown size={20} />
      </div>
    </div>
  );

return (
    <div className="min-h-screen flex flex-col">
      <header className="lg:hidden">
        <div className="flex justify-between items-center p-4 border-b">
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="ghost" size="icon"><Menu /></Button>
            </SheetTrigger>
            <SheetContent side="left" className="w-full">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-bold">SHOP</span>
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
              <AnimatePresence mode="wait">
                <motion.div
                  key={activeCategory}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.2 }}
                >
                  {menuItems[activeCategory].map((item, index) => (
                    <MobileMenuItem key={index} item={item} />
                  ))}
                </motion.div>
              </AnimatePresence>
              <div className="mt-6">
                <h3 className="text-lg font-semibold mb-2">MORE</h3>
                <div className="space-y-2">
                  <a href="#" className="block text-gray-600">Help</a>
                  <a href="#" className="block text-gray-600">Sign Up</a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <img src="/api/placeholder/120/40" alt="Glide Logo" className="h-8" />
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
            <a href="#" className="text-gray-600">Help</a>
            <a href="#" className="text-gray-600">Sign Up</a>
          </div>
          <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-600">Blog</a>
          </div>
        </div>
        <div className="flex justify-between items-center px-6 py-4">
          <img src="/api/placeholder/120/40" alt="Glide Logo" className="h-8" />
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
                      <span className="text-lg font-semibold">TRAINING APP</span>
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
      <footer className="bg-gray-100 py-6 px-4 lg:px-6">
        <div className="max-w-7xl mx-auto">
          {/* Footer content here */}
        </div>
      </footer>
    </div>
  );
};

export default Layout;
