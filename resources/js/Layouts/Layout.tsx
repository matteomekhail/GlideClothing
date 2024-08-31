import React, { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Menu, Heart, User, ShoppingBag, ChevronDown, ChevronUp, X } from 'lucide-react';
import { Sheet, SheetContent, SheetTrigger } from "@/Components/ui/sheet";
import { Button } from "@/Components/ui/button";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/Components/ui/collapsible";

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
                  <a href="#" className="block text-gray-600">Help</a>
                  <a href="#" className="block text-gray-600">Sign Up</a>
                </div>
              </div>
            </SheetContent>
          </Sheet>
          <img src="/img/GlideLogo.png" alt="Glide Logo" className="h-8" />
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
          <img src="/img/GlideLogo.png" alt="Glide Logo" className="h-8" />
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
