import Head from 'next/head'
import { LoginBox } from '../components/LoginBox'
import styles from '../styles/pages/Login.module.css'

interface HomeProps {

}


export default function Login(props: HomeProps) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Login | move.it</title>
            </Head>

            <div>
                <div />
                <LoginBox />
            </div>
        </div>
    )
}