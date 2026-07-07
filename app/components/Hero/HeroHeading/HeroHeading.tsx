'use client'

import styles from './HeroHeading.module.scss'
import clsx from 'clsx'
import { useEffect, useState } from 'react'
import Scrollbar from 'smooth-scrollbar'

interface HeroHeadingProps {
  subtitle: React.ReactNode
  title: string
}

export const HeroHeading = ({ subtitle, title }: HeroHeadingProps) => {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    let scrollbar: Scrollbar | undefined

    const handleScrollEvent = (status: { offset: { y: number } }) => {
      setIsScrolled(status.offset.y > 30)
    }

    const checkScrollbar = () => {
      scrollbar = window.scrollbarInstance
      if (scrollbar) {
        scrollbar.addListener(handleScrollEvent)
        handleScrollEvent(scrollbar)
      } else if (window.nativeScrollEnabled) {
        setIsScrolled(false)
      } else {
        setTimeout(checkScrollbar, 50)
      }
    }

    checkScrollbar()

    return () => {
      if (scrollbar) {
        scrollbar.removeListener(handleScrollEvent)
      }
    }
  }, [])

  return (
    <div className={styles.content}>
      <h2 className={styles.subtitle}>{subtitle}</h2>
      <div
        className={clsx(styles.titleMask, isScrolled && styles.scrolled)}
        style={{ '--title-text': `"${title}"` } as React.CSSProperties}
      >
        <h1 className={styles.title}>{title}</h1>
      </div>
    </div>
  )
}
