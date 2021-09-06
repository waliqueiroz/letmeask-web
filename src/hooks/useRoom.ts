import { useCallback, useEffect, useState } from "react"
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
    const [questions, setQuestions] = useState<ParsedQuestion[]>([])
    const [title, setTitle] = useState('')

    const getRoom = useCallback(async () => {
        try {
            const response = await api.get(`/rooms/${roomId}`)

            const { data } = response;

            const questions: Question[] = data.questions ?? []

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
            })

            setTitle(data.title)
            setQuestions(parsedQuestions)
        } catch (error) {
            console.log(error)
            alert("Houve um erro ao recuperar as perguntas")
        }
    }, [roomId, user?.id])

    useEffect(() => {
        getRoom()
    }, [getRoom])

    return {
        questions, title, getRoom
    }
}