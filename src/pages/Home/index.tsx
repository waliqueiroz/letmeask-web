import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from '../../components/Button';
import api from '../../services/api';

import illustrationImg from '../../assets/images/illustration.svg';
import logoImg from '../../assets/images/logo.svg';

import '../../styles/auth.scss';

export const Home: React.FC = () => {
  const history = useHistory();

  const [roomCode, setRoomCode] = useState('');

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    try {
      const response = await api.get(`/rooms/${roomCode}`);

      const { data } = response;

      if (data.ended_at) {
        toast.error('Esta sala já foi encerrada.');
        return;
      }

      history.push(`/rooms/${roomCode}`);
    } catch (error) {
      toast.error('Sala não existe.');
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
          <Link to="/login" className="create-room">
            Faça login e crie a sua sala
          </Link>
          <div className="separator">ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder="Digite o código da sala"
              value={roomCode}
              onChange={(event) => {
                setRoomCode(event.target.value);
              }}
            />
            <Button type="submit">Entrar na sala</Button>
          </form>
        </div>
      </main>
    </div>
  );
};
