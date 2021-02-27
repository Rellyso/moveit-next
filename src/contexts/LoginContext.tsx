import { createContext, ReactNode, useEffect, useState } from "react";
import { useRouter } from 'next/router'

interface LoginContextData {
    name: string;
    avatar: string;
    setLogin: (data) => void;
}

interface LoginContextProps {
    children: ReactNode;
}

export const LoginContext = createContext({} as LoginContextData)

export function LoginProvider({ children }: LoginContextProps) {
    const router = useRouter()

    const [name, setName] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [isLogged, setIsLogged] = useState(null)

    // verifica se o usuário está logado
    useEffect(() => {
        if (!isLogged) {
            router.push('/login')
        }
    }, [])

    function setLogin(data) {
        if (data) {
            setName(data.name)
            setAvatar(data.avatar_url)

            setIsLogged(true)
        }
    }

    return (
        <LoginContext.Provider value={{
            name,
            avatar,
            setLogin
        }} >
            {children}
        </LoginContext.Provider>
    )
}