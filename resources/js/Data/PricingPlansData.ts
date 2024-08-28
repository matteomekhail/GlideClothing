// pricingPlansData.ts

export interface PricingPlan {
  name: string;
  price: string;
  description: string;
  features: string[];
  isPopular?: boolean;
  stripeProductId?: string; // ID del prodotto in Stripe
}

export const pricingPlans: PricingPlan[] = [
  {
    name: "Starter",
    price: "$99",
    description: "Perfect for small projects and individual developers",
    features: [
      "Full ShadowStack boilerplate",
      "Basic email support",
      "Community forum access",
      "6 months of updates"
    ],
    stripeProductId: "prod_QeBo5IHSYIOdry"
  },
  {
    name: "Pro",
    price: "$169",
    description: "Ideal for growing teams and businesses",
    features: [
      "Everything in Starter",
      "Priority email support",
      "Private Discord channel access",
      "Lifetime Updates",
    ],
    isPopular: true,
    stripeProductId: "prod_QeBpPQiicLvZxK"
  },
];
