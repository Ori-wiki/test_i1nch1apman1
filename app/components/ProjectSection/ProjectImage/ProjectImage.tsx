'use client'

import Image from 'next/image'
import styles from './ProjectImage.module.scss'

interface ProjectImageProps {
  src: string
  alt: string
  title: string
}

export const ProjectImage = ({ src, alt, title }: ProjectImageProps) => {
  const scrollToTop = () => {
    if (window.scrollbarInstance) {
      window.scrollbarInstance.scrollTo(0, 0, 1000)
      return
    }

    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  return (
    <div className={styles.imageColumn}>
      <p className={styles.imageTitle}>{title}</p>
      <div className={styles.mainImageWrapper}>
        <button
          type='button'
          className={styles.blueLogo}
          onClick={scrollToTop}
          aria-label='Прокрутить страницу наверх'
        >
          <Image
            src='/logos/logo-symbol.svg'
            alt=''
            width={91}
            height={91}
            className={styles.logoIcon}
          />
        </button>
        <Image
          src={src}
          alt={alt}
          fill
          sizes='(max-width: 767px) calc(100vw - 64px), (max-width: 1769px) 45vw, 650px'
          className={styles.mainImage}
        />
      </div>
    </div>
  )
}
