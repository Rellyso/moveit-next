import styles from '../styles/components/Card.module.css'

interface CardProps {
    position: number;
    user: {
        name: string;
        avatar: string;
        level: number;
        completedChallenges: number;
        totalExperience: number;
    }

}

export function Card({ user, position }: CardProps) {
    return (
        <div className={styles.card}>
            <span className={styles.position} >{position}</span>

            <div className={styles.userInfo} >
                <img src={user.avatar} alt={user.name} />

                <div>
                    <p>{user.name}</p>

                    <span>
                        <img src="/icons/level-up.svg" alt="" />
                        Level {user.level}
                    </span>
                </div>
            </div>

            <div className={styles.completedChallenges}>
                <span>{user.completedChallenges}</span> completados
                    </div>

            <div className={styles.totalExperience}>
                <span>{user.totalExperience}</span> xp
                    </div>
        </div>
    )
}