import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { Button } from '../../components/Button';
import { getRoom } from '../../services/room';

import logoImg from '../../assets/images/logo.svg';

import './styles.scss';

export const Home: React.FC = () => {
  const history = useHistory();

  const [roomCode, setRoomCode] = useState('');

  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    try {
      const room = await getRoom(roomCode);

      if (room.endedAt) {
        toast.error('Esta sala já foi encerrada.');
        return;
      }

      history.push(`/rooms/${roomCode}`);
    } catch (error) {
      toast.error('Sala não existe.');
    }
  }

  return (
    <div className="main-content">
      <img className="logo-img" src={logoImg} alt="Letmeask" />
      <Link to="/login" className="create-room">
        Entre e crie a sua sala
      </Link>
      <div className="separator">ou entre em uma sala</div>
      <form className="main-form" onSubmit={handleJoinRoom}>
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
  );
};
