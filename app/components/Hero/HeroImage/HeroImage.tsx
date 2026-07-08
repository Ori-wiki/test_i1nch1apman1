'use client'

import { useEffect } from 'react'
import Image from 'next/image'
import { motion, useMotionValue, useSpring, useTransform } from 'framer-motion'
import styles from './HeroImage.module.scss'

export const HeroImage = ({ src, alt }: { src: string; alt: string }) => {
  const scrollY = useMotionValue(0)

  useEffect(() => {
    const handleScroll = (status: { offset: { y: number } }) => {
      scrollY.set(status.offset.y)
    }

    const checkScrollbar = () => {
      const scrollbar = window.scrollbarInstance
      if (scrollbar) {
        scrollY.set(scrollbar.offset.y)
        scrollbar.addListener(handleScroll)
      } else if (window.nativeScrollEnabled) {
        scrollY.set(0)
      } else {
        setTimeout(checkScrollbar, 50)
      }
    }
    checkScrollbar()

    return () => {
      window.scrollbarInstance?.removeListener(handleScroll)
    }
  }, [scrollY])

  const y = useTransform(scrollY, [0, 1000], ['0%', '-20%'])
  const springY = useSpring(y, {
    stiffness: 50,
    damping: 30,
    mass: 1,
  })

  return (
    <div className={styles.imageWrapper}>
      <motion.div className={styles.parallaxLayer} style={{ y: springY }}>
        <Image
          src={src}
          alt={alt}
          fill
          priority
          loading='eager'
          className={styles.bgImage}
        />
      </motion.div>
    </div>
  )
}
