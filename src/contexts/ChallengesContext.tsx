import { createContext, ReactNode, useContext, useEffect, useState } from "react";
import Cookies from 'js-cookie'
import challenges from '../../challenges.json'
import { LevelUpModal } from '../components/levelUpModal';
import { LoginContext } from "./LoginContext";

interface challenge {
  type: 'body' | 'eye';
  description: string;
  amount: number
}

interface ChallengesContextData {
  level: number;
  currentExperience: number;
  challengesCompleted: number
  levelUp: () => void;
  startNewChallenge: () => void;
  activeChallenge: challenge;
  resetChallenge: () => void;
  completeChallenge: () => void;
  experienceToNextLevel: number;
  closeLevelUpModal: () => void;
}

interface ChallengesProviderProps {
  children: ReactNode;
  level: number;
  currentExperience: number;
  challengesCompleted: number;
}

export const ChallengesContext = createContext({} as ChallengesContextData)

export function ChallengesProvider({
  children,
  ...rest
}: ChallengesProviderProps) {

  const { updateLogin } = useContext(LoginContext)

  const [level, setLevel] = useState(rest.level | 1)
  const [currentExperience, setCurrentExperience] = useState(rest.currentExperience | 0)
  const [challengesCompleted, setChallengesCompleted] = useState(rest.challengesCompleted | 0)
  const [totalExperience, setTotalExperience] = useState(Number(Cookies.get('totalExperience')) || 0)

  const [activeChallenge, setActiveChallenge] = useState(null)
  const [isLevelUpModalOpen, setIsLevelUpModalOpen] = useState(false)

  const experienceToNextLevel = Math.pow((level + 1) * 4, 2)

  useEffect(() => {
    Notification.requestPermission()
  }, [])

  useEffect(() => {
    Cookies.set('level', String(level))
    Cookies.set('currentExperience', String(currentExperience))
    Cookies.set('totalExperience', String(totalExperience))
    Cookies.set('challengesCompleted', String(challengesCompleted))

    updateLogin()
  }, [level, currentExperience, challengesCompleted])

  function levelUp() {
    setLevel(level + 1)
    setIsLevelUpModalOpen(true)
  }

  function closeLevelUpModal() {
    setIsLevelUpModalOpen(false)
  }

  function startNewChallenge() {
    const randomChallengeIndex = Math.floor(Math.random() * challenges.length)
    const challenge = challenges[randomChallengeIndex]

    setActiveChallenge(challenge)

    new Audio('/notification.mp3').play()

    if (Notification.permission === 'granted') {
      new Notification('Novo desafio 🎉', {
        body: `Valendo ${challenge.amount}xp!`,
      })
    }
  }

  function resetChallenge() {
    setActiveChallenge(null)
  }

  function completeChallenge() {
    if (!activeChallenge) {
      return
    }

    const { amount } = activeChallenge

    let finalExperience = currentExperience + amount

    setTotalExperience(totalExperience + amount)

    if (finalExperience >= experienceToNextLevel) {
      finalExperience = finalExperience - experienceToNextLevel
      levelUp()
    }

    setCurrentExperience(finalExperience)
    setActiveChallenge(null)
    setChallengesCompleted(challengesCompleted + 1)
  }

  return (
    <ChallengesContext.Provider
      value={{
        level,
        levelUp,
        currentExperience,
        challengesCompleted,
        startNewChallenge,
        activeChallenge,
        resetChallenge,
        experienceToNextLevel,
        completeChallenge,
        closeLevelUpModal,
      }}
    >
      {children}

      {isLevelUpModalOpen && <LevelUpModal />}
    </ChallengesContext.Provider>
  )
}