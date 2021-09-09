import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';

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
}

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

  async function handleEndRoom() {
    try {
      await endRoom();
      history.push('/');
    } catch (error) {
      toast.error('Houve um erro ao encerrar a sala.');
    }
  }

  async function handleDeleteQuestion(questionId: string) {
    if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
      try {
        await deleteQuestion(questionId);
      } catch (error) {
        toast.error('Houve um erro ao deletar pergunta.');
      }
    }
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
            <Button isOutlined onClick={handleEndRoom}>Encerrar sala</Button>
          </div>
        </div>
      </header>

      <main>
        <div className="room-title">
          <h1>
            Sala
            {title}
          </h1>
          {questions.length > 0 && (
            <span>
              {questions.length}
              {' '}
              pergunta(s)
            </span>
          )}
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
