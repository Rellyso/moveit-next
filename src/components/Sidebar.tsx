import Link from '../components/Link'

import styles from '../styles/components/Sidebar.module.css'

import { BiHomeAlt } from 'react-icons/bi'
import { FiAward } from 'react-icons/fi'
import { RiSettings3Fill } from 'react-icons/ri'

export default function Sidebar() {
  return (
    <div className={styles.sidebarContainer} >
      <img src="/icons/moveit-icon.svg" alt="Move.it" />

      <nav>
        <ul>
          <li>
            <Link href="/">
              <a>
                <BiHomeAlt />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/leaderboard" >
              <a>
                <FiAward />
              </a>
            </Link>
          </li>
        </ul>
      </nav>

      <nav className="config">
        <ul>
          <li>
            <Link href="/settings">
              <a>
                <RiSettings3Fill />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}