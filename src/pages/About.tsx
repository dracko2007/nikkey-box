import React from 'react';
import Layout from '@/components/layout/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center">
        <div className="text-center py-20 px-4">
          <h1 className="font-display text-4xl font-black text-foreground mb-4">Quem Somos</h1>
          <p className="text-muted-foreground text-lg">Em breve.</p>
        </div>
      </div>
    </Layout>
  );
};

export default About;
