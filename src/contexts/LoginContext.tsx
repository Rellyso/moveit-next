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
    const [cachedUser, setCachedUser] = useState(Cookies.get('cached_user') || null)
    const [data, setData] = useState(null)

    // verifica se o usuário está logado
    useEffect(() => {
        // user ? setIsLogged(true) : setIsLogged(false)

        if (!isLogged) {
            router.push('/login')
        }
    }, [])

    async function handleLoginGithub(username) {
        let res = await axios.get(`https://api.github.com/users/${username}`)

        if (!cachedUser) {
            setData(res.data)

            console.log(data)
        }

        const login = await setLogin(data)

        res = await axios.post('/api/login', { ...login })


        const {
            user,
            name,
            avatar_url,
            level,
            completed_challenges,
            total_experience,
        } = res.data.login

        setCachedUser(user)
        setName(name)
        setAvatar(avatar_url)
        setIsLogged(true)
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(total_experience))
        Cookies.set('challengesCompleted', String(completed_challenges))

        router.push('/')
    }

    function setLogin(data) {
        if (data) {
            setName(data.name)
            setAvatar(data.avatar_url)
            setCachedUser(data.login)
            setIsLogged(true)

            Cookies.set('cached_user', String(cachedUser))

            return {
                user: data.login,
                name: data.name,
                avatar_url: data.avatar_url,
                level: 1,
                completed_challenges: 0,
                total_experience: 0,
            }
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