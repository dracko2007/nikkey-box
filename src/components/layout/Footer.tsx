import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '@/context/LanguageContext';

const Footer: React.FC = () => {
  const { t } = useLanguage();

  return (
    <footer className="bg-accent text-accent-foreground">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div className="md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <img src="/logo.jpeg" alt="Nikkey Box" className="h-12 w-auto object-contain rounded-full" />
              <div className="flex items-baseline gap-0.5">
                <span className="font-display text-lg font-black text-white tracking-tight">NIKKEY</span>
                <span className="font-display text-lg font-bold" style={{color:'#E8B4C8'}}>box</span>
              </div>
            </div>
            <p className="text-accent-foreground/80 text-sm leading-relaxed max-w-md">
              {t('footer.description')}
            </p>
          </div>

          {/* Links Rápidos */}
          <div>
            <h4 className="font-display font-semibold mb-4">Links Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/produtos" className="text-sm text-accent-foreground/80 hover:text-accent-foreground transition-colors">
                  Produtos
                </Link>
              </li>
              <li>
                <Link to="/frete" className="text-sm text-accent-foreground/80 hover:text-accent-foreground transition-colors">
                  Frete
                </Link>
              </li>
              <li>
                <Link to="/como-funciona" className="text-sm text-accent-foreground/80 hover:text-accent-foreground transition-colors">
                  Como Funciona
                </Link>
              </li>
              <li>
                <Link to="/sobre" className="text-sm text-accent-foreground/80 hover:text-accent-foreground transition-colors">
                  Quem Somos
                </Link>
              </li>
            </ul>
          </div>

          {/* Contato */}
          <div>
            <h4 className="font-display font-semibold mb-4">Contato</h4>
            <div className="space-y-3 text-sm text-accent-foreground/80">
              {/* Preencher quando disponível */}
            </div>
          </div>
        </div>

        <div className="border-t border-accent-foreground/10 mt-10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-sm text-accent-foreground/60">
            © {new Date().getFullYear()} Nikkey Box. Todos os direitos reservados.
          </p>
          <div className="flex items-center gap-4 flex-wrap justify-center">
            <Link to="/privacidade" className="text-xs text-accent-foreground/50 hover:text-accent-foreground/80 transition-colors">
              Privacidade
            </Link>
            <Link to="/termos" className="text-xs text-accent-foreground/50 hover:text-accent-foreground/80 transition-colors">
              Termos
            </Link>
            <Link to="/devolucao" className="text-xs text-accent-foreground/50 hover:text-accent-foreground/80 transition-colors">
              Devolução
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
