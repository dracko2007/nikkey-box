import React from 'react';

interface Props {
  size?: number;
  className?: string;
}

// Logo "Nikkey Box" — usa a imagem enviada (public/logo.jfif), recortada
// em círculo para encaixar no header/rodapé.
const JapanExpressLogo: React.FC<Props> = ({ size = 48, className = '' }) => (
  <img
    src="/logo.jpg"
    alt="Nikkey Box"
    width={size}
    height={size}
    className={`rounded-full object-cover shadow-lg border-2 border-primary/10 ${className}`}
  />
);

export default JapanExpressLogo;
