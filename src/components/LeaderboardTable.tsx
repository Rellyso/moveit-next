import styles from '../styles/components/LeaderboardTable.module.css'
import { Card } from './Card'

export function LeaderboardTable() {
    return (
        <div className={styles.leaderboardContainer} >
            <div className={styles.cards} >
                <div className={styles.head}>
                    <span>Posição</span>
                    <span>Usuário</span>
                    <span>Desafios</span>
                    <span>Experiência</span>
                </div>

                <Card
                    position={1}
                    user={{
                        avatar: "https://github.com/diego3g.png",
                        name: "Diego Fernandes",
                        level: 43,
                        completedChallenges: 127,
                        totalExperience: 154000,
                    }}
                />

                <Card
                    position={2}
                    user={{
                        avatar: "https://github.com/rellyso.png",
                        name: "Rellyson",
                        level: 20,
                        completedChallenges: 50,
                        totalExperience: 54000,
                    }}
                />

            </div>
        </div>
        // <table>
        //     <thead>
        //         <th>Posição</th>
        //         <th>Usuário</th>
        //         <th>Desafios</th>
        //         <th>Experiência</th>
        //     </thead>
        //     <tbody>
        //         <tr>
        //             <td>01</td>
        //             <td>Diego Fernandes</td>
        //             <td>01</td>
        //             <td>01</td>
        //         </tr>
        //     </tbody>
        // </table>
    )
}