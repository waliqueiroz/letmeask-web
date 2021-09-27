import { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from '../../components/Button';
import { useAuth } from '../../hooks/useAuth';

import logoImg from '../../assets/images/logo.svg';

export const Login: React.FC = () => {
  const history = useHistory();
  const { signIn } = useAuth();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleLogin(event: FormEvent) {
    event.preventDefault();
    try {
      await signIn(email, password);

      history.push('/rooms/new');
    } catch (error) {
      toast.warn(
        'Credenciais inválidas, verifique seus dados e tente novamente.',
      );
    }
  }

  return (
    <div className="main-content">
      <img className="logo-img" src={logoImg} alt="Letmeask" />
      <br />
      <form className="main-form" onSubmit={handleLogin}>
        <input
          type="text"
          placeholder="Digite seu email"
          value={email}
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <input
          type="password"
          placeholder="Digite sua senha"
          value={password}
          onChange={(event) => {
            setPassword(event.target.value);
          }}
        />
        <Button type="submit">Entrar</Button>
      </form>
      <p className="main-footer">
        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>. Se
        ainda não tiver uma conta, <Link to="/sign-up">faça seu cadastro.</Link>
      </p>
    </div>
  );
};
