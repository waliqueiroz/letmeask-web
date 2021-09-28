import { useState, FormEvent } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from '../../components/Button';

import logoImg from '../../assets/images/logo.svg';
import { signUp } from '../../services/user';

export type User = {
  name: string;
  avatar: string;
  email: string;
  password: string;
};

export const SignUp: React.FC = () => {
  const history = useHistory();

  const [name, setName] = useState('');
  const [avatar, setAvatar] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  async function handleSignUp(event: FormEvent) {
    event.preventDefault();

    try {
      await signUp({
        name,
        avatar,
        email,
        password,
      });

      toast.info('Cadastro realizado com sucesso, faça login para continuar.');

      history.push('/login');
    } catch (error) {
      toast.error('Houve um erro ao salvar o seu cadastro, tente novamente.');
    }
  }

  return (
    <div className="main-content">
      <img className="logo-img" src={logoImg} alt="Letmeask" />
      <h2 className="main-heading">Cadastre-se</h2>
      <form className="main-form" onSubmit={handleSignUp}>
        <input
          required
          type="text"
          placeholder="Nome completo"
          value={name}
          onChange={(event) => setName(event.target.value)}
        />
        <input
          required
          type="email"
          placeholder="Email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
        />
        <input
          required
          type="text"
          placeholder="Avatar"
          value={avatar}
          onChange={(event) => setAvatar(event.target.value)}
        />
        <input
          required
          type="password"
          placeholder="Senha"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
        />
        <Button type="submit">Cadastrar</Button>
      </form>
      <p className="main-footer">
        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
      </p>
    </div>
  );
};
