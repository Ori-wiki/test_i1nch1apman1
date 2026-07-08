'use client'

import { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import { BaseModal } from '@/app/components/Modal/BaseModal'
import styles from './ProjectVideo.module.scss'

interface ProjectVideoProps {
  videoUrl: string
  posterUrl: string
}

export const ProjectVideo = ({ videoUrl, posterUrl }: ProjectVideoProps) => {
  const [isVideoOpen, setIsVideoOpen] = useState(false)
  const [duration, setDuration] = useState(0)
  const videoRef = useRef<HTMLVideoElement>(null)

  useEffect(() => {
    const video = videoRef.current
    if (!video) return

    const handleMetadata = () => setDuration(video.duration)

    if (video.readyState >= 1) {
      handleMetadata()
    } else {
      video.addEventListener('loadedmetadata', handleMetadata)
    }

    return () => video.removeEventListener('loadedmetadata', handleMetadata)
  }, [videoUrl])

  const formatDuration = (secondsTotal: number) => {
    if (!secondsTotal || secondsTotal <= 0) return '0:00'

    const minutes = Math.floor(secondsTotal / 60)
    const seconds = Math.floor(secondsTotal % 60)

    if (minutes === 0) return `${seconds} сек.`
    return `${minutes}:${seconds < 10 ? '0' : ''}${seconds} минут`
  }

  return (
    <div className={styles.wrapper} id='project-video'>
      <video
        ref={videoRef}
        src={videoUrl}
        preload='metadata'
        className={styles.metadataVideo}
      />

      <div className={styles.info}>
        <p className={styles.title}>видео о проекте</p>
        <p className={styles.duration}>{formatDuration(duration)}</p>
      </div>

      <div className={styles.videoLine} />

      <button
        type='button'
        className={styles.preview}
        onClick={() => setIsVideoOpen(true)}
        aria-label='Открыть видео о проекте'
      >
        <Image
          src={posterUrl}
          alt='Превью видео'
          fill
          sizes='(max-width: 767px) 131px, (max-width: 1280px) 133px, (max-width: 1769px) 186px, 241px'
          className={styles.poster}
        />
        <span className={styles.playButton}>
          <Image
            src='/icons/play.svg'
            alt=''
            width={12}
            height={12}
            className={styles.playIcon}
          />
          Play
        </span>
      </button>

      <BaseModal
        isOpen={isVideoOpen}
        onClose={() => setIsVideoOpen(false)}
        contentClassName={styles.videoModalContent}
        closeButtonClassName={styles.videoCloseBtn}
        ariaLabel='Видео о проекте'
      >
        <div className={styles.modalVideoWrapper}>
          <video
            src={videoUrl}
            controls
            autoPlay
            playsInline
            className={styles.modalVideo}
          />
        </div>
      </BaseModal>
    </div>
  )
}
