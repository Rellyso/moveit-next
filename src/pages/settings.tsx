import Head from "next/head";
import { GetServerSideProps } from 'next'


import styles from '../styles/pages/Home.module.css'
import Sidebar from "../components/Sidebar";
import { SettingsComponent } from "../components/Settings";

interface HomeProps {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export default function Settings(props: HomeProps) {
    return (
        <div className={styles.container}>
            <Head>
                <title>Início | move.it</title>
            </Head>

            <Sidebar />
            <header>
                <h1>Configurações</h1>
            </header>

            <section>
                <SettingsComponent />
            </section>
        </div>
    )
}

export const getServerSideProps: GetServerSideProps = async (ctx) => {

    const { level, currentExperience, challengesCompleted } = ctx.req.cookies

    return {
        props: {
            level: Number(level),
            currentExperience: Number(currentExperience),
            challengesCompleted: Number(challengesCompleted)
        }
    }
}