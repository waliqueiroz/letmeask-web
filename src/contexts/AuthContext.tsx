import { createContext, ReactNode, useEffect, useState } from "react"
import { useHistory } from "react-router"

import api from '../services/api'

type AuthContextProviderProps = {
    children: ReactNode;
}

type User = {
    id: string
    name: string
    avatar: string
    email: string
    created_at: string
    updated_at: string
}

type AuthContextData = {
    user: User | undefined;
    token: string,
    signed: boolean,
    signIn: (email: string, password: string) => Promise<void>
    signOut: () => void
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({ children }: AuthContextProviderProps) {
    const history = useHistory()

    const TOKEN_KEY = '@letmeask-token'
    const USER_KEY = '@letmeask-user'

    const [user, setUser] = useState<User>();
    const [signed, setSigned] = useState(false);
    const [token, setToken] = useState('');

    function setAuthState(authUser: User | undefined, token: string) {
        setUser(authUser)
        setToken(token)
        setSigned(authUser !== undefined)

        api.defaults.headers.Authorization = `Bearer ${token}`;
    }

    useEffect(() => {
        const token = window.localStorage.getItem(TOKEN_KEY);
        const userSerialized = window.localStorage.getItem(USER_KEY);

        if (userSerialized != null && token != null) {
            const authUser = JSON.parse(userSerialized)
            setAuthState(authUser, token)
        }
    }, [])

    async function signIn(email: string, password: string) {
        const response = await api.post('login', {
            email,
            password
        })

        const { user: authUser, access_token: token } = response.data;

        setAuthState(authUser, token)

        window.localStorage.setItem(TOKEN_KEY, token);
        window.localStorage.setItem(USER_KEY, JSON.stringify(authUser));
    }

    function signOut() {
        window.localStorage.removeItem(TOKEN_KEY);
        window.localStorage.removeItem(USER_KEY);
        setAuthState(undefined, '')
        history.push('/')
    }

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signed,
            token,
            signOut
        }}>
            {children}
        </AuthContext.Provider>
    )

}