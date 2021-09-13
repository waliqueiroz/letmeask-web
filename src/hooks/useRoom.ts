/* eslint-disable camelcase */
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

import { useAuth } from './useAuth';

import {
  getRoom,
  sendQuestion as apiSendQuestion,
  deleteQuestion as apiDeleteQuestion,
  highlightQuestion as apiHighlightQuestion,
  markQuestionAsAnswered as apiMarkQuestionAsAnswered,
  likeQuestion as apiLikeQuestion,
  deslikeQuestion as apiDeslikeQuestion,
  endRoom as apiEndRoom,
} from '../services/room';

export type Author = {
  id: string;
  name: string;
  avatar: string;
};

export type Like = {
  id: string;
  author: Author;
  created_at: string;
};

export type Question = {
  id?: string;
  content: string;
  is_highlighted: boolean;
  is_answered: boolean;
  author: Author;
  likes?: Like[];
  created_at?: string;
};

export type Room = {
  id: string;
  title: string;
  questions?: Question[];
  author: string;
  ended_at?: string;
  created_at: string;
  updated_at: string;
};

export type ParsedQuestion = {
  id: string;
  author: Author;
  content: string;
  isAnswered: boolean;
  isHighlighted: boolean;
  likeCount: number;
  likeId?: string;
};

type useRoomData = {
  questions: ParsedQuestion[];
  title: string;
  sendQuestion: (content: string) => Promise<void>;
  likeQuestion: (
    questionId: string,
    likeId: string | undefined,
  ) => Promise<void>;
  deleteQuestion: (questionId: string) => Promise<void>;
  endRoom: () => Promise<void>;
  highlightQuestion: (questionId: string) => Promise<void>;
  markQuestionAsAnswered: (questionId: string) => Promise<void>;
};

export function useRoom(roomId: string): useRoomData {
  const { user } = useAuth();
  const [room, setRoom] = useState<Room>({} as Room);
  const [questions, setQuestions] = useState<ParsedQuestion[]>([]);
  const [title, setTitle] = useState('');

  useEffect(() => {
    (async () => {
      try {
        const data = await getRoom(roomId);

        setRoom(data);
      } catch (error) {
        toast.error('Houve um erro ao recuperar as informações da sala');
      }
    })();
  }, [roomId]);

  useEffect(() => {
    const roomQuestions: Question[] = room.questions ?? [];

    const parsedQuestions: ParsedQuestion[] = roomQuestions.map(
      (question: Question) => ({
        id: question.id as string,
        content: question.content,
        author: question.author,
        isAnswered: question.is_answered,
        isHighlighted: question.is_highlighted,
        likeCount: question.likes ? question.likes.length : 0,
        likeId: question.likes
          ? question.likes.find((like: Like) => like.author.id === user?.id)?.id
          : undefined,
      }),
    );

    setTitle(room.title);
    setQuestions(parsedQuestions);
  }, [room, user?.id]);

  async function sendQuestion(content: string) {
    const question: Question = {
      content,
      author: {
        id: user?.id as string,
        name: user?.name as string,
        avatar: user?.avatar as string,
      },
      is_highlighted: false,
      is_answered: false,
    };

    const data = await apiSendQuestion(roomId, question);

    setRoom(data);
  }

  async function deleteQuestion(questionId: string) {
    const data = await apiDeleteQuestion(roomId, questionId);

    setRoom(data);
  }

  async function highlightQuestion(questionId: string) {
    const data = await apiHighlightQuestion(roomId, questionId);

    setRoom(data);
  }

  async function markQuestionAsAnswered(questionId: string) {
    const data = await apiMarkQuestionAsAnswered(roomId, questionId);

    setRoom(data);
  }

  async function likeQuestion(questionId: string, likeId: string | undefined) {
    let data;
    if (likeId) {
      data = await apiDeslikeQuestion(roomId, questionId, likeId);
    } else {
      const author: Author = {
        id: user?.id as string,
        name: user?.name as string,
        avatar: user?.avatar as string,
      };

      data = await apiLikeQuestion(roomId, questionId, author);
    }

    setRoom(data);
  }

  async function endRoom() {
    const data = await apiEndRoom(roomId);
    setRoom(data);
  }

  return {
    questions,
    title,
    sendQuestion,
    likeQuestion,
    deleteQuestion,
    endRoom,
    highlightQuestion,
    markQuestionAsAnswered,
  };
}
