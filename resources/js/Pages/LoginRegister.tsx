import { Head, Link, useForm } from '@inertiajs/react';
import { motion, AnimatePresence } from 'framer-motion';
import { Button } from '@/Components/ui/button';
import { Input } from '@/Components/ui/input';
import { Label } from '@/Components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/Components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/Components/ui/tabs';
import { Checkbox } from '@/Components/ui/checkbox';
import AnimatedLogo from '@/Components/AnimatedLogo';
import FaviconSwitcher from '@/Components/FaviconSwitcher';
import { useState } from 'react';

export default function LoginRegister() {
    const [activeTab, setActiveTab] = useState("login");
    const [showForgotPassword, setShowForgotPassword] = useState(false);

    const { data: loginData, setData: setLoginData, post: loginPost, processing: loginProcessing, errors: loginErrors } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const { data: registerData, setData: setRegisterData, post: registerPost, processing: registerProcessing, errors: registerErrors } = useForm({
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
    });

    const { data: forgotData, setData: setForgotData, post: forgotPost, processing: forgotProcessing, errors: forgotErrors } = useForm({
        email: '',
    });

    const handleLogin = (e: React.FormEvent) => {
        e.preventDefault();
        loginPost(route('login'), {
            onSuccess: () => {
                // Redirect gestito automaticamente dal backend
            },
            onError: () => {
                // Gli errori sono già gestiti da useForm
            },
        });
    };

    const handleRegister = (e: React.FormEvent) => {
        e.preventDefault();
        registerPost(route('register'), {
            onSuccess: () => {
                // Redirect gestito automaticamente dal backend
            },
            onError: () => {
                // Gli errori sono già gestiti da useForm
            },
        });
    };

    const handleForgotPassword = (e: React.FormEvent) => {
        e.preventDefault();
        forgotPost(route('password.email'), {
            onSuccess: () => {
                // Mostra messaggio di successo
                alert('Password reset link sent to your email!');
                setShowForgotPassword(false);
            },
        });
    };

    const slideVariants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 1000 : -1000,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 1000 : -1000,
            opacity: 0
        })
    };

    const swipeConfidenceThreshold = 10000;
    const swipePower = (offset: number, velocity: number) => {
        return Math.abs(offset) * velocity;
    };

    return (
        <>
            <Head title="Login & Register" />
            <FaviconSwitcher />
            <div className="min-h-screen flex flex-col bg-background">
                <div className="flex-grow flex flex-col items-center justify-center px-4 py-12">
                    <div className="w-full max-w-md space-y-8">
                        <div className="flex justify-center mb-8">
                            <AnimatedLogo />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                        >
                            <Card className="border-0 shadow-lg">
                                <CardHeader className="space-y-1 text-center pb-8">
                                    <AnimatePresence mode="wait">
                                        <motion.div
                                            key={showForgotPassword ? 'forgot' : activeTab}
                                            initial={{ opacity: 0, y: 20 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            exit={{ opacity: 0, y: -20 }}
                                            transition={{ duration: 0.3 }}
                                        >
                                            <CardTitle className="text-3xl font-bold">
                                                {showForgotPassword 
                                                    ? "Reset Password"
                                                    : activeTab === "login" 
                                                        ? "Welcome Back" 
                                                        : "Create Account"
                                                }
                                            </CardTitle>
                                            <CardDescription className="text-gray-500">
                                                {showForgotPassword
                                                    ? "Enter your email to reset your password"
                                                    : activeTab === "login"
                                                        ? "Sign in to your account"
                                                        : "Join us and start your journey"
                                                }
                                            </CardDescription>
                                        </motion.div>
                                    </AnimatePresence>
                                </CardHeader>
                                <CardContent>
                                    <AnimatePresence mode="wait">
                                        {showForgotPassword ? (
                                            <motion.div
                                                initial={{ opacity: 0, x: 100 }}
                                                animate={{ opacity: 1, x: 0 }}
                                                exit={{ opacity: 0, x: -100 }}
                                                transition={{
                                                    type: "spring",
                                                    stiffness: 260,
                                                    damping: 20
                                                }}
                                            >
                                                <form onSubmit={handleForgotPassword} className="space-y-6">
                                                    <div className="space-y-4">
                                                        <div className="space-y-2">
                                                            <Label htmlFor="forgot-email">Email</Label>
                                                            <Input
                                                                id="forgot-email"
                                                                type="email"
                                                                value={forgotData.email}
                                                                onChange={e => setForgotData('email', e.target.value)}
                                                                className="h-12"
                                                                placeholder="name@example.com"
                                                            />
                                                            {forgotErrors.email && (
                                                                <p className="text-sm text-destructive">{forgotErrors.email}</p>
                                                            )}
                                                        </div>
                                                    </div>

                                                    <div className="space-y-4">
                                                        <Button 
                                                            type="submit" 
                                                            className="w-full h-12 bg-black hover:bg-black/90 text-white rounded-full"
                                                            disabled={forgotProcessing}
                                                        >
                                                            Send Reset Link
                                                        </Button>
                                                        
                                                        <Button 
                                                            type="button"
                                                            variant="ghost"
                                                            className="w-full"
                                                            onClick={() => setShowForgotPassword(false)}
                                                        >
                                                            Back to Login
                                                        </Button>
                                                    </div>
                                                </form>
                                            </motion.div>
                                        ) : (
                                            <Tabs 
                                                defaultValue="login" 
                                                className="w-full"
                                                onValueChange={(value) => setActiveTab(value)}
                                            >
                                                <TabsList className="grid w-full grid-cols-2 mb-8">
                                                    <TabsTrigger value="login">Login</TabsTrigger>
                                                    <TabsTrigger value="register">Register</TabsTrigger>
                                                </TabsList>

                                                <div className="relative overflow-hidden">
                                                    <AnimatePresence mode="wait" initial={false}>
                                                        <TabsContent value="login" className="relative">
                                                            <motion.div
                                                                initial={{ opacity: 0, x: -100 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                exit={{ opacity: 0, x: 100 }}
                                                                transition={{
                                                                    type: "spring",
                                                                    stiffness: 260,
                                                                    damping: 20
                                                                }}
                                                            >
                                                                <form onSubmit={handleLogin} className="space-y-6">
                                                                    {/* ... form fields ... */}
                                                                    {/* Mantengo gli stessi campi ma aggiorno lo stile */}
                                                                    <div className="space-y-4">
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="login-email">Email</Label>
                                                                            <Input
                                                                                id="login-email"
                                                                                type="email"
                                                                                value={loginData.email}
                                                                                onChange={e => setLoginData('email', e.target.value)}
                                                                                className="h-12"
                                                                                placeholder="name@example.com"
                                                                            />
                                                                            {loginErrors.email && <p className="text-sm text-destructive">{loginErrors.email}</p>}
                                                                        </div>

                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="login-password">Password</Label>
                                                                            <Input
                                                                                id="login-password"
                                                                                type="password"
                                                                                value={loginData.password}
                                                                                onChange={e => setLoginData('password', e.target.value)}
                                                                                className="h-12"
                                                                            />
                                                                            {loginErrors.password && <p className="text-sm text-destructive">{loginErrors.password}</p>}
                                                                        </div>

                                                                        <div className="flex items-center space-x-2">
                                                                            <Checkbox
                                                                                id="remember"
                                                                                checked={loginData.remember}
                                                                                onCheckedChange={(checked: boolean) => setLoginData('remember', checked)}
                                                                            />
                                                                            <label htmlFor="remember" className="text-sm text-gray-600">
                                                                                Remember me
                                                                            </label>
                                                                        </div>
                                                                    </div>

                                                                    <Button 
                                                                        type="submit" 
                                                                        className="w-full h-12 bg-black hover:bg-black/90 text-white rounded-full"
                                                                        disabled={loginProcessing}
                                                                    >
                                                                        Sign In
                                                                    </Button>
                                                                </form>
                                                            </motion.div>
                                                        </TabsContent>

                                                        <TabsContent value="register" className="relative">
                                                            <motion.div
                                                                initial={{ opacity: 0, x: 100 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                exit={{ opacity: 0, x: -100 }}
                                                                transition={{
                                                                    type: "spring",
                                                                    stiffness: 260,
                                                                    damping: 20
                                                                }}
                                                            >
                                                                <form onSubmit={handleRegister} className="space-y-6">
                                                                    <div className="space-y-4">
                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="register-name">Full Name</Label>
                                                                            <Input
                                                                                id="register-name"
                                                                                type="text"
                                                                                value={registerData.name}
                                                                                onChange={e => setRegisterData('name', e.target.value)}
                                                                                className="h-12"
                                                                                placeholder="John Doe"
                                                                            />
                                                                            {registerErrors.name && <p className="text-sm text-destructive">{registerErrors.name}</p>}
                                                                        </div>

                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="register-email">Email</Label>
                                                                            <Input
                                                                                id="register-email"
                                                                                type="email"
                                                                                value={registerData.email}
                                                                                onChange={e => setRegisterData('email', e.target.value)}
                                                                                className="h-12"
                                                                                placeholder="name@example.com"
                                                                            />
                                                                            {registerErrors.email && <p className="text-sm text-destructive">{registerErrors.email}</p>}
                                                                        </div>

                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="register-password">Password</Label>
                                                                            <Input
                                                                                id="register-password"
                                                                                type="password"
                                                                                value={registerData.password}
                                                                                onChange={e => setRegisterData('password', e.target.value)}
                                                                                className="h-12"
                                                                                placeholder="••••••••"
                                                                            />
                                                                            {registerErrors.password && <p className="text-sm text-destructive">{registerErrors.password}</p>}
                                                                        </div>

                                                                        <div className="space-y-2">
                                                                            <Label htmlFor="password_confirmation">Confirm Password</Label>
                                                                            <Input
                                                                                id="password_confirmation"
                                                                                type="password"
                                                                                value={registerData.password_confirmation}
                                                                                onChange={e => setRegisterData('password_confirmation', e.target.value)}
                                                                                className="h-12"
                                                                                placeholder="••••••••"
                                                                            />
                                                                            {registerErrors.password_confirmation && (
                                                                                <p className="text-sm text-destructive">{registerErrors.password_confirmation}</p>
                                                                            )}
                                                                        </div>

                                                                        <div className="text-sm text-gray-500">
                                                                            By creating an account, you agree to our{' '}
                                                                            <Link href="#" className="text-black hover:underline">
                                                                                Terms of Service
                                                                            </Link>{' '}
                                                                            and{' '}
                                                                            <Link href="#" className="text-black hover:underline">
                                                                                Privacy Policy
                                                                            </Link>
                                                                        </div>
                                                                    </div>

                                                                    <Button 
                                                                        type="submit" 
                                                                        className="w-full h-12 bg-black hover:bg-black/90 text-white rounded-full"
                                                                        disabled={registerProcessing}
                                                                    >
                                                                        Create Account
                                                                    </Button>
                                                                </form>
                                                            </motion.div>
                                                        </TabsContent>
                                                    </AnimatePresence>
                                                </div>
                                            </Tabs>
                                        )}
                                    </AnimatePresence>
                                </CardContent>
                                {!showForgotPassword && (
                                    <CardFooter className="flex flex-col space-y-4 border-t pt-6">
                                        <Button 
                                            variant="ghost"
                                            className="text-sm text-center text-gray-600 hover:text-black transition-colors"
                                            onClick={() => setShowForgotPassword(true)}
                                        >
                                            Forgot your password?
                                        </Button>
                                    </CardFooter>
                                )}
                            </Card>
                        </motion.div>
                    </div>
                </div>
            </div>
        </>
    );
}
