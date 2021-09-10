import { useHistory, useParams } from 'react-router-dom';

import { toast } from 'react-toastify';
import Swal from 'sweetalert2';

import logoImg from '../../assets/images/logo.svg';
import deleteImg from '../../assets/images/delete.svg';
import checkImg from '../../assets/images/check.svg';
import answerImg from '../../assets/images/answer.svg';

import { Button } from '../../components/Button';
import { Question } from '../../components/Question';
import { RoomCode } from '../../components/RoomCode';
// import { useAuth } from '../hooks/useAuth';
import { useRoom } from '../../hooks/useRoom';

import '../../styles/room.scss';

type RoomParams = {
  id: string;
};

export const AdminRoom: React.FC = () => {
  // const { user } = useAuth();
  const history = useHistory();
  const params = useParams<RoomParams>();
  const roomId = params.id;

  const {
    title,
    questions,
    endRoom,
    deleteQuestion,
    highlightQuestion,
    markQuestionAsAnswered,
  } = useRoom(roomId);

  function handleEndRoom() {
    Swal.fire({
      title: 'Encerrar esta sala?',
      showCancelButton: true,
      confirmButtonText: 'Encerrar',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#835AFD',
      confirmButtonColor: '#E559F9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await endRoom();
          history.push('/');
        } catch (error) {
          toast.error('Houve um erro ao encerrar a sala.');
        }
      }
    });
  }

  function handleDeleteQuestion(questionId: string) {
    Swal.fire({
      title: 'Excluir esta pergunta?',
      showCancelButton: true,
      confirmButtonText: 'Excluir',
      cancelButtonText: 'Cancelar',
      cancelButtonColor: '#835AFD',
      confirmButtonColor: '#E559F9',
    }).then(async (result) => {
      if (result.isConfirmed) {
        try {
          await deleteQuestion(questionId);
        } catch (error) {
          toast.error('Houve um erro ao deletar pergunta.');
        }
      }
    });
  }

  async function handleCheckQuestionAsAnswered(questionId: string) {
    try {
      await markQuestionAsAnswered(questionId);
    } catch (error) {
      toast.error('Houve um erro.');
    }
  }

  async function handleHighlightQuestion(questionId: string) {
    try {
      await highlightQuestion(questionId);
    } catch (error) {
      toast.error('Houve um erro.');
    }
  }

  return (
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Letmeask" />
          <div>
            <RoomCode code={roomId} />
            <Button isOutlined onClick={() => handleEndRoom()}>
              Encerrar sala
            </Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>Sala {title}</h1>
          {questions.length > 0 && <span>{questions.length} pergunta(s)</span>}
        </div>

        <div className="question-list">
          {questions.map((question) => (
            <Question
              key={question.id}
              content={question.content}
              author={question.author}
              isAnswered={question.isAnswered}
              isHighlighted={question.isHighlighted}
            >
              {!question.isAnswered && (
                <>
                  <button
                    type="button"
                    onClick={() => handleCheckQuestionAsAnswered(question.id)}
                  >
                    <img src={checkImg} alt="Marcar pergunta como respondida" />
                  </button>
                  <button
                    type="button"
                    onClick={() => handleHighlightQuestion(question.id)}
                  >
                    <img src={answerImg} alt="Dar destaque à pergunta" />
                  </button>
                </>
              )}
              <button
                type="button"
                onClick={() => handleDeleteQuestion(question.id)}
              >
                <img src={deleteImg} alt="Remover pergunta" />
              </button>
            </Question>
          ))}
        </div>
      </main>
    </div>
  );
};
