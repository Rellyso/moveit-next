import { useState, useEffect, useContext } from 'react'
import { CountdownContext } from '../contexts/CountdownContext'
import styles from '../styles/components/Countdown.module.css'


export function Countdown() {
  const {
    minutes,
    seconds,
    challengeTime,
    hasFinished,
    time,
    isActive,
    startCountdown,
    resetCountdown } = useContext(CountdownContext)

  const [minuteLeft, minuteRight] = String(minutes).padStart(2, '0').split('')
  // padStart adiciona 0 se não houver dois caracteres na string minutes e adiciona ao início (por isso padStart)
  const [secondLeft, secondRight] = String(seconds).padStart(2, '0').split('')

  // const percentProgress = ((challengeTime - time) / challengeTime) * 100
  const percentProgress = (time / challengeTime) * 100

  return (
    <div>
      <div className={styles.countdownContainer}>
        <div>
          <span>{minuteLeft}</span>
          <span>{minuteRight}</span>
        </div>
        <span>:</span>
        <div>
          <span>{secondLeft}</span>
          <span>{secondRight}</span>
        </div>
      </div>

      { hasFinished ? (
        <button
          disabled
          type="button"
          className={styles.countdownButton}
        >
          Ciclo encerrado <img src="/icons/check_circle.svg" alt="ícone ciclo encerrado" />
        </button>
      ) : (
        <>
          { isActive ? (
            <button
              type="button"
              className={`${styles.countdownButton} ${styles.countdownButtonActive}`}
              onClick={resetCountdown}
            >
              Abandonar ciclo
              <img src="/icons/close.svg" alt="close" />
              <div>
                <div />

                <span
                  className={styles.progressBar}
                  style={{ width: `${percentProgress}%` }}
                >

                </span>
              </div>
            </button>
          ) : (
            <button
              type="button"
              className={styles.countdownButton}
              onClick={startCountdown}
            >
              Iniciar um ciclo <img src="/icons/seta.svg" alt="ícone seta" />
            </button>
          )}
        </>
      )}


    </div>
  )
}