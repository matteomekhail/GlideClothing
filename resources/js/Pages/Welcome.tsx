import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Layout from '@/Layouts/Layout';
import HeroSection from '@/Components/HeroSection';
import FAQ from '@/Components/Faq';
import faqData from '@/Data/FAQData';
import ComparisonTable from '@/Components/ComparisonTable';
import PricingPlans from '@/Components/PricingPlans';
import FeaturesShowcase from '@/Components/FeaturesShowcase';
import TechStack from '@/Components/TechStack';
import GettingStarted from '@/Components/GettingStarted';
import GoogleTag from '@/Components/GoogleTag';

interface WelcomeProps extends PageProps {
    auth: any;
    laravelVersion: string;
    phpVersion: string;
    stripeKey: string;
}

export default function Welcome({ stripeKey }: WelcomeProps) {
    return (
        <>
            <Head title="Glide" />
            <Layout>
                <HeroSection videoSrc="/videos/Gymshark.mp4" />
            </Layout>
        </>
    );
}
