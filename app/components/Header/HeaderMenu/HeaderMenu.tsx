'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { usePathname } from 'next/navigation'
import styles from './HeaderMenu.module.scss'

interface HeaderMenuProps {
  isOpen: boolean
  onClose: () => void
}

const navItems = [
  { label: 'Главная', href: '/', target: 'hero' },
  { label: 'О проекте', href: '/#project', target: 'project' },
  { label: 'Видео', href: '/#project-video', target: 'project-video' },
]

export const HeaderMenu = ({ isOpen, onClose }: HeaderMenuProps) => {
  const pathname = usePathname()

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onClose])

  const scrollToSection = (target: string) => {
    const element = document.getElementById(target)
    if (!element) {
      onClose()
      return
    }

    const top = element.offsetTop

    if (window.scrollbarInstance) {
      window.scrollbarInstance.scrollTo(0, top, 1000)
    } else {
      window.scrollTo({ top, behavior: 'smooth' })
    }

    onClose()
  }

  const handleLinkClick = (
    event: React.MouseEvent<HTMLAnchorElement>,
    href: string,
    target: string,
  ) => {
    if (pathname === '/') {
      event.preventDefault()
      if (href === '/') {
        if (window.scrollbarInstance) {
          window.scrollbarInstance.scrollTo(0, 0, 1000)
        } else {
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }
        onClose()
        return
      }

      scrollToSection(target)
      return
    }

    onClose()
  }

  return (
    <div
      className={`${styles.overlay} ${isOpen ? styles.open : styles.closing}`}
      aria-hidden={!isOpen}
      onClick={onClose}
    >
      <aside
        id='site-menu'
        className={styles.menu}
        aria-label='Навигация по сайту'
        onClick={(event) => event.stopPropagation()}
      >
        <button
          type='button'
          className={styles.closeBtn}
          onClick={onClose}
          aria-label='Закрыть меню'
        />

        <nav className={styles.nav}>
          {navItems.map((item) => (
            <Link
              key={item.target}
              href={item.href}
              className={styles.navLink}
              onClick={(event) => handleLinkClick(event, item.href, item.target)}
            >
              {item.label}
            </Link>
          ))}

          <Link
            href='/privacy-policy'
            className={styles.navLink}
            onClick={onClose}
          >
            Политика обработки данных
          </Link>
        </nav>
      </aside>
    </div>
  )
}
