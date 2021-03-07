import axios from "axios";
import Cookies from 'js-cookie'
import { createContext, FormEvent, ReactNode, useEffect, useState } from "react";
import { useRouter } from 'next/router'

interface LoginContextData {
    name: string;
    avatar: string;
    setLogin: (data) => void;
    handleLoginGithub: (github_username) => void;
    updateLogin: () => void;
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

    // verifica se o usuário está logado
    useEffect(() => {
        console.log(cachedUser)
        if (!cachedUser || cachedUser == null || cachedUser == "null") {
            router.push('/login')
        }

        else {
            (async () => {
                const data = await getData(cachedUser)

                setName(data.name)
                setAvatar(data.avatar_url)
            })()
        }
    }, [cachedUser])

    async function getData(username) {
        let res = await axios.get(`https://api.github.com/users/${username}`)

        return res.data
    }

    async function handleLoginGithub(username) {
        let data = await axios.get(`https://api.github.com/users/${username}`)

        const login = setLogin(data.data)

        let res = await axios.post('/api/login', { ...login })

        console.log(res.data.login)
        const {
            user,
            name,
            avatar_url,
            level,
            completed_challenges,
            total_experience,
            current_experience
        } = res.data.login

        setCachedUser(user)
        setName(name)
        setAvatar(avatar_url)
        setIsLogged(true)
        Cookies.set('level', String(level))
        Cookies.set('currentExperience', String(current_experience))
        Cookies.set('challengesCompleted', String(completed_challenges))
        Cookies.set('cached_user', String(user))
        Cookies.set('totalExperience', String(current_experience))

        router.push('/');
    }

    function setLogin(data) {
        if (data) {
            return {
                user: data.login,
                name: data.name,
                avatar_url: data.avatar_url,
            }
        }
    }

    async function updateLogin() {
        const level = Cookies.get('level')
        const challengesCompleted = Cookies.get('challengesCompleted')
        const currentExperience = Cookies.get('currentExperience')
        const totalExperience = Cookies.get('totalExperience')

        await axios.post('/api/update', {
            user: cachedUser,
            level,
            challengesCompleted,
            currentExperience,
            totalExperience
        })
    }

    return (
        <LoginContext.Provider value={{
            name,
            avatar,
            setLogin,
            handleLoginGithub,
            updateLogin,
        }} >
            {children}
        </LoginContext.Provider>
    )
}