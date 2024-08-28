import React from 'react';
import { ThemeProvider, useTheme } from 'next-themes';
import { Button } from '@/Components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from '@/Components/ui/dropdown-menu';
import { Moon, Sun } from 'lucide-react';

const Navbar = () => {
    const { setTheme } = useTheme();

    return (
        <nav className="border-b">
            <div className="container flex h-20 items-center justify-between">
                <a href="/" className="flex items-center">
                    <img
                        src="/img/ShadowStackLogo.png"
                        alt="ShadowStack"
                        className="h-12 w-auto dark:invert dark:brightness-200 transition-all duration-300"
                    />
                </a>
                <div className="flex items-center space-x-4">
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="outline" size="icon">
                                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                                <span className="sr-only">Toggle theme</span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                            <DropdownMenuItem onClick={() => setTheme('light')}>
                                Light
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('dark')}>
                                Dark
                            </DropdownMenuItem>
                            <DropdownMenuItem onClick={() => setTheme('system')}>
                                System
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </nav>
    );
};

const Footer = () => (
    <footer className="border-t">
        <div className="container py-10 flex flex-col items-center justify-center">
            <img
                src="/img/ShadowStackLogo.png"
                alt="ShadowStack"
                className="h-16 w-auto mb-6 dark:invert dark:brightness-200 transition-all duration-300"
            />
            <p className="text-sm text-muted-foreground">&copy; 2024 ShadowStack. All rights reserved.</p>
        </div>
    </footer>
);

const Layout = ({ children }: { children: React.ReactNode }) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system">
            <div className="flex min-h-screen flex-col bg-background font-sans antialiased">
                <Navbar />
                <main className="flex-1">{children}</main>
                <Footer />
            </div>
        </ThemeProvider>
    );
};

export default Layout;
