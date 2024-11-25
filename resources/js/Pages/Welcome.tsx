import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Layout from '@/Layouts/Layout';
import HeroSection from '@/Components/HeroSection';
import About from '@/Components/About';
import Display from '@/Components/Display';
import CTASection from '@/Components/CTA';

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
                <HeroSection isVisible={true} /> 
                <Display />
                <About />
            </Layout>
        </>
    );
}
