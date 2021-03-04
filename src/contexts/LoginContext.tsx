import axios from "axios";
import Cookies from 'js-cookie'
import { createContext, FormEvent, ReactNode, useEffect, useState } from "react";
import { useRouter } from 'next/router'

interface LoginContextData {
    name: string;
    avatar: string;
    setLogin: (data) => void;
    handleLoginGithub: (github_username) => void;
}

interface LoginContextProps {
    children: ReactNode;
}

export const LoginContext = createContext({} as LoginContextData)

export function LoginProvider({ children }: LoginContextProps) {
    const router = useRouter()

    const [name, setName] = useState(null)
    const [avatar, setAvatar] = useState(null)
    const [isLogged, setIsLogged] = useState(false)
    const [user, setUser] = useState(Cookies.get('git_user') || null)
    // const [data, setData] = useState(null)

    // verifica se o usuário está logado
    useEffect(() => {
        // user ? setIsLogged(true) : setIsLogged(false)

        if (!isLogged) {
            router.push('/login')
        }
    }, [])

    async function handleLoginGithub(username) {

        const res = await axios.get(`https://api.github.com/users/${username}`)
        // setData(res.data)

        await setLogin(res.data)

        axios.post('/api/login', { user: username })

        router.push('/')
    }

    function setLogin(data) {
        if (data) {
            setName(data.name)
            setAvatar(data.avatar_url)
            setUser(data.login)

            Cookies.set('git_user', String(user))

            setIsLogged(true)
        }
    }

    return (
        <LoginContext.Provider value={{
            name,
            avatar,
            setLogin,
            handleLoginGithub,
        }} >
            {children}
        </LoginContext.Provider>
    )
}