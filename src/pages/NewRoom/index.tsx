import { FormEvent, useState } from 'react';
import { Link, useHistory } from 'react-router-dom';
import { toast } from 'react-toastify';

import { useAuth } from '../../hooks/useAuth';
import { Button } from '../../components/Button';
import { createRoom } from '../../services/room';

import logoImg from '../../assets/images/logo.svg';

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
      const data = await createRoom(newRoom, {
        id: user?.id as string,
        name: user?.name as string,
        avatar: user?.avatar as string,
      });

      history.push(`/admin/rooms/${data.id}`);
    } catch (error) {
      toast.error('Houve um erro ao criar a sala.');
    }
  }

  return (
    <div className="main-content">
      <img className="logo-img" src={logoImg} alt="Letmeask" />
      <h1>{user?.name}</h1>
      <h2 className="main-heading">Criar uma nova sala</h2>
      <form className="main-form" onSubmit={handleCreateRoom}>
        <input
          type="text"
          placeholder="Nome da sala"
          value={newRoom}
          onChange={(event) => setNewRoom(event.target.value)}
        />
        <Button type="submit">Criar sala</Button>
      </form>
      <p className="main-footer">
        Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link>
      </p>
    </div>
  );
};
