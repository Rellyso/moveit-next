import Link from 'next/link'
import { useRouter } from 'next/router'
import React from 'react'

import styles from '../styles/components/Sidebar.module.css'

interface LinkProps {
    children: JSX.Element;
    href: string;
    rest?: JSX.Element;
}

export default function LocalLink({ href, children, ...rest }: LinkProps) {
    const router = useRouter()

    let className = children.props.className || ''
    if (router.pathname === href) {
        className += ` ${styles.selected}`
    }

    return (
        <Link href={href} {...rest}>
            {React.cloneElement(children, { className })}
        </Link>
    )

}