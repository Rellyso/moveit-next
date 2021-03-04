import { FormEvent, useContext, useState } from 'react'
import styles from '../styles/components/LoginBox.module.css'
import { LoginContext } from '../contexts/LoginContext'

export function LoginBox() {
    const { handleLoginGithub } = useContext(LoginContext)

    const [isValid, setIsValid] = useState(false)
    const [user, setUser] = useState(null)

    function handleSubmit(event: FormEvent) {
        event.preventDefault()

        handleLoginGithub(user)
    }


    function handleButtonValid(event) {
        event.target.value.length > 0
            ? setIsValid(true)
            : setIsValid(false)
    }
    function handleChange(event) {
        handleButtonValid(event)
        setUser(event.target.value)
    }

    return (
        <div className={styles.loginContainer}>
            <img src="/icons/Logo.svg" alt="Logo move.it" />

            <div>
                <h1>Bem vindo</h1>
                <span>
                    <img src="/icons/github.svg" alt="Ícone github" />
                    <p>Faça Login com seu Github para começar</p>
                </span>
                <form action="/login" method="post" onSubmit={handleSubmit} >
                    <input type="text" placeholder="Digite seu username" required onChange={handleChange} />
                    <button type="submit" style={{ backgroundColor: isValid ? '#4cd62b' : '#4953b8' }}>
                        <img src="/icons/seta.svg" alt="" />
                    </button>
                </form>

            </div>
        </div>
    )
}