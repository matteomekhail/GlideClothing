import React from 'react';
import { motion } from 'framer-motion';
import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/Components/ui/card";
import { Button } from "@/Components/ui/button";
import { Badge } from "@/Components/ui/badge";
import { CheckIcon } from 'lucide-react';
import { pricingPlans, PricingPlan } from '../Data/PricingPlansData';
import { loadStripe, Stripe } from '@stripe/stripe-js';

interface PricingPlansProps {
    stripeKey: string;
}

const PricingPlans: React.FC<PricingPlansProps> = ({ stripeKey }) => {
    const stripePromise = loadStripe(stripeKey);

    // Filtriamo i piani per rimuovere l'Enterprise
    const displayPlans = pricingPlans.filter(plan => plan.name !== "Enterprise");

    return (
        <section className="py-16 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
            >
                <h2 className="text-3xl font-bold text-center mb-12">Choose Your Plan</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 justify-center">
                    {displayPlans.map((plan, index) => (
                        <PricingCard key={plan.name} plan={plan} index={index} stripePromise={stripePromise} />
                    ))}
                </div>
            </motion.div>
        </section>
    );
};

interface PricingCardProps {
    plan: PricingPlan;
    index: number;
    stripePromise: Promise<Stripe | null>;
}

const PricingCard: React.FC<PricingCardProps> = ({ plan, index, stripePromise }) => {
    const handlePurchase = async () => {
        const stripe = await stripePromise;
        if (!stripe) {
            console.error('Stripe non è stato caricato correttamente');
            return;
        }

        try {
            const response = await fetch('/create-checkout-session', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Requested-With': 'XMLHttpRequest',
                },
                body: JSON.stringify({
                    productId: plan.stripeProductId, // Invia l'ID del prodotto
                }),
            });

            if (!response.ok) {
                throw new Error(`HTTP error! status: ${response.status}`);
            }

            const session = await response.json();
            const result = await stripe.redirectToCheckout({
                sessionId: session.id,
            });

            if (result.error) {
                console.error(result.error.message);
            }
        } catch (error) {
            console.error('Errore durante la creazione della sessione di checkout:', error);
        }
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="h-full"
        >
            <Card className={`relative flex flex-col h-full ${plan.isPopular ? 'border-primary' : ''}`}>
                {plan.isPopular && (
                    <Badge className="absolute top-0 right-0 m-2" variant="default">
                        Most Popular
                    </Badge>
                )}
                <CardHeader>
                    <CardTitle>{plan.name}</CardTitle>
                    <CardDescription>{plan.description}</CardDescription>
                </CardHeader>
                <CardContent className="flex-grow">
                    <div className="text-4xl font-bold mb-4">{plan.price}</div>
                    <ul className="space-y-2">
                        {plan.features.map((feature, idx) => (
                            <motion.li
                                key={idx}
                                initial={{ opacity: 0, x: -20 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.3, delay: idx * 0.1 }}
                                className="flex items-center space-x-2"
                            >
                                <CheckIcon className="w-5 h-5 text-green-500 flex-shrink-0" />
                                <span>{feature}</span>
                            </motion.li>
                        ))}
                    </ul>
                </CardContent>
                <CardFooter className="mt-auto">
                    <Button
                        className="w-full"
                        variant={plan.isPopular ? "default" : "outline"}
                        onClick={handlePurchase}
                    >
                        Get Started
                    </Button>
                </CardFooter>
            </Card>
        </motion.div>
    );
};

export default PricingPlans;
