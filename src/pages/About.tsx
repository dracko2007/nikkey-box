import React from 'react';
import Layout from '@/components/layout/Layout';

const About: React.FC = () => {
  return (
    <Layout>
      <div className="py-16 bg-white">
        <div className="container mx-auto px-4 max-w-3xl">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="font-display text-4xl font-black mb-3" style={{color:'#4A3F8C'}}>
              Quem Somos
            </h1>
            <div className="w-16 h-1 mx-auto rounded-full" style={{background:'linear-gradient(90deg, #4A3F8C, #C87090)'}} />
          </div>

          {/* Conteúdo */}
          <div className="space-y-6 text-gray-700 leading-relaxed text-lg">
            <p>
              A <strong style={{color:'#4A3F8C'}}>Nikkey Box</strong> nasceu com o objetivo de aproximar o Japão de clientes ao redor do mundo, oferecendo acesso a produtos autênticos e serviços especializados de compra e exportação.
            </p>

            <p>
              Somos especializados em <strong>cosméticos japoneses</strong>, itens colecionáveis, papelaria, produtos exclusivos do mercado japonês e serviços de <strong>Personal Shopper</strong> e redirecionamento de encomendas.
            </p>

            <p>
              Nossa equipe está localizada no Japão e trabalha para encontrar os melhores produtos, garantindo um processo seguro, transparente e eficiente, desde a compra até a entrega ao cliente.
            </p>

            <p>
              Na Nikkey Box, acreditamos que importar do Japão deve ser simples e confiável. Por isso, buscamos oferecer atendimento personalizado, preços competitivos e todo o suporte necessário para que nossos clientes tenham acesso ao melhor que o Japão tem a oferecer.
            </p>

            <div className="pt-4 text-center">
              <p className="text-xl font-bold" style={{color:'#4A3F8C'}}>
                Nikkey Box – Sua ponte entre o Japão e o mundo. 🇯🇵📦✨
              </p>
            </div>
          </div>

        </div>
      </div>
    </Layout>
  );
};

export default About;
