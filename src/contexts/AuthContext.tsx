import { createContext, ReactNode, useState } from "react"

import api from '../services/api'

type AuthContextProviderProps = {
    children: ReactNode;
}

type User = {
    id: string
    name: string
    avatar: string
    email: string
    createdAt: string
    updatedAt: string
}

type AuthContextData = {
    user: User | undefined;
    token: string,
    signed: boolean,
    signIn: (email: string, password: string) => Promise<void>
}

export const AuthContext = createContext({} as AuthContextData)

export function AuthContextProvider({ children }: AuthContextProviderProps) {

    const [user, setUser] = useState<User>();
    const [signed, setSigned] = useState(false);
    const [token, setToken] = useState('');

    // useEffect(() => {
    //     const unsubscribe = auth.onAuthStateChanged(user => {
    //         if (user) {
    //             const { displayName, photoURL, uid } = user

    //             if (!displayName || !photoURL) {
    //                 throw new Error('Missing information from Google Account')
    //             }

    //             setUser({
    //                 id: uid,
    //                 name: displayName,
    //                 avatar: photoURL
    //             })
    //         }
    //     })

    //     return () => {
    //         unsubscribe()
    //     }
    // }, [])

    async function signIn(email: string, password: string) {
        const response = await api.post('login', {
            email,
            password
        })

        const { user, access_token: token, token_type } = response.data;

        api.defaults.headers.Authorization = `${token_type} ${token}`;

        setUser({
            id: user.id,
            name: user.name,
            avatar: user.avatar,
            email: user.email,
            createdAt: user.created_at,
            updatedAt: user.updated_at,
        })

        setToken(token)
        setSigned(true)

        // TODO salvar token no local storage
    }

    return (
        <AuthContext.Provider value={{
            user,
            signIn,
            signed,
            token,
        }}>
            {children}
        </AuthContext.Provider>
    )

}