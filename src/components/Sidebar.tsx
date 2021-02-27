import Link from 'next/link'

import styles from '../styles/components/Sidebar.module.css'

import { BiHomeAlt } from 'react-icons/bi'
import { FiAward } from 'react-icons/fi'

export default function Sidebar() {
  return (
    <div className={styles.sidebarContainer} >
      <img src="/icons/moveit-icon.svg" alt="Move.it" />

      <nav>
        <ul>
          <li>
            <Link href="/" as="home">
              <a>
                <BiHomeAlt />
              </a>
            </Link>
          </li>
          <li>
            <Link href="/" >
              <a>
                <FiAward />
              </a>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  )
}