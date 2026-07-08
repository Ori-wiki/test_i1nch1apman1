'use client'

import Link from 'next/link'
import { useEffect } from 'react'
import { usePathname, useRouter } from 'next/navigation'
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
  const router = useRouter()

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

  const handleNavClick = (href: string, target: string) => {
    if (pathname !== '/') {
      onClose()
      router.push(href)
      return
    }

    scrollToSection(target)
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
            <button
              key={item.target}
              type='button'
              className={styles.navLink}
              onClick={() => handleNavClick(item.href, item.target)}
            >
              {item.label}
            </button>
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
