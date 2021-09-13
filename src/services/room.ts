import api from './api';

import { Author, Question, Room } from '../hooks/useRoom';

export async function getRoom(roomId: string): Promise<Room> {
  const { data } = await api.get(`/rooms/${roomId}`);

  return data;
}

export async function sendQuestion(
  roomId: string,
  question: Question,
): Promise<Room> {
  const { data } = await api.post(`rooms/${roomId}/questions`, question);

  return data;
}

export async function deleteQuestion(
  roomId: string,
  questionId: string,
): Promise<Room> {
  const { data } = await api.delete(`rooms/${roomId}/questions/${questionId}`);

  return data;
}

export async function highlightQuestion(
  roomId: string,
  questionId: string,
): Promise<Room> {
  const { data } = await api.patch(`rooms/${roomId}/questions/${questionId}`, {
    is_highlighted: true,
  });

  return data;
}

export async function markQuestionAsAnswered(
  roomId: string,
  questionId: string,
): Promise<Room> {
  const { data } = await api.patch(`rooms/${roomId}/questions/${questionId}`, {
    is_answered: true,
  });

  return data;
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

  return data;
}

export async function deslikeQuestion(
  roomId: string,
  questionId: string,
  likeId: string | undefined,
): Promise<Room> {
  const { data } = await api.delete(
    `rooms/${roomId}/questions/${questionId}/likes/${likeId}`,
  );

  return data;
}

export async function endRoom(roomId: string): Promise<Room> {
  const { data } = await api.delete(`rooms/${roomId}`);
  return data;
}
