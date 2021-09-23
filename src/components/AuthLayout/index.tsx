import { ReactNode } from 'react';
import illustrationImg from '../../assets/images/illustration.svg';

import './styles.scss';

type AuthLayoutProps = {
  children: ReactNode;
};

export const AuthLayout: React.FC<AuthLayoutProps> = ({ children }) => {
  return (
    <div id="page-auth">
      <aside>
        <img
          src={illustrationImg}
          alt="Ilustração simbolizando perguntas e respostas"
        />
        <strong>Crie salas de Q&amp;A ao-vivo</strong>
        <p>Tire as dúvidas da sua audiência em tempo-real</p>
      </aside>
      <main>{children}</main>
    </div>
  );
};
