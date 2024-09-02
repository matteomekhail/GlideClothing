import { Link, Head } from '@inertiajs/react';
import { PageProps } from '@/types';
import Layout from '@/Layouts/Layout';
import FAQ from '@/Components/Faq';

export default function Welcome() {
    return (
        <>
            <Head title="Glide" />
            <Layout>
                <FAQ/>
            </Layout>
        </>
    );
}
