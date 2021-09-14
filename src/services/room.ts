import { objectToCamel, objectToSnake } from 'ts-case-convert/lib/caseConvert';

import api from './api';

import { Author, Question, Room } from '../hooks/useRoom';

export async function getRoom(roomId: string): Promise<Room> {
  const { data } = await api.get(`/rooms/${roomId}`);

  return objectToCamel<Room>(data);
}

export async function sendQuestion(
  roomId: string,
  question: Question,
): Promise<Room> {
  const { data } = await api.post(
    `rooms/${roomId}/questions`,
    objectToSnake(question),
  );

  return objectToCamel<Room>(data);
}

export async function deleteQuestion(
  roomId: string,
  questionId: string,
): Promise<Room> {
  const { data } = await api.delete(`rooms/${roomId}/questions/${questionId}`);

  return objectToCamel<Room>(data);
}

export async function highlightQuestion(
  roomId: string,
  questionId: string,
): Promise<Room> {
  const { data } = await api.patch(`rooms/${roomId}/questions/${questionId}`, {
    is_highlighted: true,
  });

  return objectToCamel<Room>(data);
}

export async function markQuestionAsAnswered(
  roomId: string,
  questionId: string,
): Promise<Room> {
  const { data } = await api.patch(`rooms/${roomId}/questions/${questionId}`, {
    is_answered: true,
  });

  return objectToCamel<Room>(data);
}

export async function likeQuestion(
  roomId: string,
  questionId: string,
  author: Author,
): Promise<Room> {
  const { data } = await api.post(
    `rooms/${roomId}/questions/${questionId}/likes`,
    {
      author,
    },
  );

  return objectToCamel<Room>(data);
}

export async function deslikeQuestion(
  roomId: string,
  questionId: string,
  likeId: string | undefined,
): Promise<Room> {
  const { data } = await api.delete(
    `rooms/${roomId}/questions/${questionId}/likes/${likeId}`,
  );

  return objectToCamel<Room>(data);
}

export async function endRoom(roomId: string): Promise<Room> {
  const { data } = await api.delete(`rooms/${roomId}`);
  return objectToCamel<Room>(data);
}
