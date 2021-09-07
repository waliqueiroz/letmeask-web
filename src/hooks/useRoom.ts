import { useEffect, useState } from "react"
import { useAuth } from "./useAuth"

import api from "../services/api"

type Author = {
    id: string,
    name: string,
    avatar: string
}

type Like = {
    id: string,
    author: Author,
    created_at: string,
}

type Question = {
    id: string,
    content: string,
    is_highlighted: boolean,
    is_answered: boolean,
    author: Author,
    likes: Like[],
    created_at: string,
}

type Room = {
    id: string,
    title: string,
    questions: Question[] | undefined,
    author: string,
    ended_at: string | undefined,
    created_at: string,
    updated_at: string,
}

type ParsedQuestion = {
    id: string,
    author: Author,
    content: string,
    isAnswered: boolean,
    isHighlighted: boolean,
    likeCount: number,
    likeId: string | undefined,
}

export function useRoom(roomId: string) {
    const { user } = useAuth()
    const [room, setRoom] = useState<Room>({} as Room)
    const [questions, setQuestions] = useState<ParsedQuestion[]>([])
    const [title, setTitle] = useState('')

    useEffect(() => {
        (async () => {
            try {
                const response = await api.get(`/rooms/${roomId}`)

                const { data } = response;

                setRoom(data)
            } catch (error) {
                console.log(error)
                alert("Houve um erro ao recuperar as perguntas")
            }
        })()
    }, [roomId])

    useEffect(() => {
        const questions: Question[] = room.questions ?? []

        const parsedQuestions: ParsedQuestion[] = questions.map((question: Question) => {
            return {
                id: question.id,
                content: question.content,
                author: question.author,
                isAnswered: question.is_answered,
                isHighlighted: question.is_highlighted,
                likeCount: question.likes ? question.likes.length : 0,
                likeId: question.likes ? question.likes.find((like: Like) => like.author.id === user?.id)?.id : undefined
            }
        });

        setTitle(room.title)
        setQuestions(parsedQuestions)
    }, [room, user?.id])

    async function sendQuestion(content: string) {
        try {
            const response = await api.post(`rooms/${roomId}/questions`, {
                content: content,
                author: {
                    id: user?.id,
                    name: user?.name,
                    avatar: user?.avatar,
                },
                is_highlighted: false,
                is_answered: false,
            })

            setRoom(response.data)
        } catch (error) {
            console.log(error)
            alert('Houve um erro ao salvar a pergunta.')
        }
    }

    async function deleteQuestion(questionId: string) {
        try {
            const response = await api.delete(`rooms/${roomId}/questions/${questionId}`)

            setRoom(response.data)
        } catch (error) {
            console.log(error)
            alert('Houve um erro ao salvar a pergunta.')
        }
    }

    async function highlightQuestion(questionId: string) {
        try {
            const response = await api.patch(`rooms/${roomId}/questions/${questionId}`, {
                is_highlighted: true,
            })

            setRoom(response.data)
        } catch (error) {
            console.log(error)
            alert('Houve um erro ao salvar a pergunta.')
        }
    }

    async function markQuestionAsAnswered(questionId: string) {
        try {
            const response = await api.patch(`rooms/${roomId}/questions/${questionId}`, {
                is_answered: true,
            })

            setRoom(response.data)
        } catch (error) {
            console.log(error)
            alert('Houve um erro ao salvar a pergunta.')
        }
    }


    async function likeQuestion(questionId: string, likeId: string | undefined) {
        try {
            let response;
            if (likeId) {
                response = await api.delete(`rooms/${roomId}/questions/${questionId}/likes/${likeId}`)
            } else {
                response = await api.post(`rooms/${roomId}/questions/${questionId}/likes`, {
                    author: {
                        id: user?.id,
                        name: user?.name,
                        avatar: user?.avatar,
                    }
                })
            }

            setRoom(response.data)
        } catch (error) {
            console.log(error)
            alert('Houve um erro.')
        }
    }

    async function endRoom() {
        try {
            const response = await api.delete(`rooms/${roomId}`)

            setRoom(response.data)
        } catch (error) {
            console.log(error)
            alert('Houve um erro.')
        }
    }

    return {
        questions,
        title,
        sendQuestion,
        likeQuestion,
        deleteQuestion,
        endRoom,
        highlightQuestion,
        markQuestionAsAnswered
    }
}