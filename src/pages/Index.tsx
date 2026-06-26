import React from 'react';
import Layout from '@/components/layout/Layout';
import HeroSection from '@/components/home/HeroSection';
import FeaturedProducts from '@/components/home/FeaturedProducts';
import HomeVideos from '@/components/home/HomeVideos';
import ShippingBanner from '@/components/home/ShippingBanner';

const Index: React.FC = () => {
  return (
    <Layout>
      <HeroSection />
      <FeaturedProducts />
      <HomeVideos />
      <ShippingBanner />
    </Layout>
  );
};

export default Index;
