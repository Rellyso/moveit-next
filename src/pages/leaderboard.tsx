import Head from "next/head";
import { LeaderboardTable } from "../components/LeaderboardTable";
import Sidebar from "../components/Sidebar"
import { ChallengesProvider } from "../contexts/ChallengesContext";
import { CountdownProvider } from "../contexts/CountdownContext";

import styles from '../styles/pages/Leaderboard.module.css'

interface LeaderboardProps {
    level: number;
    currentExperience: number;
    challengesCompleted: number;
}

export default function Leaderboard(props: LeaderboardProps) {
    return (

        <ChallengesProvider
            level={props.level}
            currentExperience={props.currentExperience}
            challengesCompleted={props.challengesCompleted}

        >

            <div className={styles.container}>
                <Head>
                    <title>Início | move.it</title>
                </Head>

                <Sidebar />
                <header>
                    <h1>Leaderboard</h1>
                </header>

                <section>
                    <div>
                        <LeaderboardTable />
                    </div>
                </section>
            </div>
        </ChallengesProvider>
    )
}