import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Button';
import api from '../../services/api';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';

import '../../styles/auth.scss';

export const NewRoom: React.FC = () => {
  const { user } = useAuth();
  const history = useHistory();

  const [newRoom, setNewRoom] = useState('');

  async function handleCreateRoom(event: FormEvent) {
    event.preventDefault();

    if (newRoom.trim() === '') {
      return;
    }

    try {
      const response = await api.post('/rooms', {
        title: newRoom,
        author: {
          id: user?.id,
          name: user?.name,
          avatar: user?.avatar,
        },
      });

      history.push(`/rooms/${response.data.id}`);
    } catch (error) {
      toast.error('Houve um erro ao criar a sala.');
    }
  }

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
      <main>
        <div className="main-content">
          <img src={logoImg} alt="Letmeask" />
          <h1>{user?.name}</h1>
          <h2>Criar uma nova sala</h2>
          <form onSubmit={handleCreateRoom}>
            <input
              type="text"
              placeholder="Nome da sala"
              value={newRoom}
              onChange={(event) => setNewRoom(event.target.value)}
            />
            <Button type="submit">Criar sala</Button>
          </form>
          <p>
            Quer entrar em uma sala existente?
            <Link to="/">clique aqui</Link>
          </p>
        </div>
      </main>
    </div>
  );
};
