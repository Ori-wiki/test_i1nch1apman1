import { ReactNode } from 'react'
import styles from './ProjectDescription.module.scss'

interface ProjectDescriptionProps {
  title: ReactNode
  description: ReactNode
}

export const ProjectDescription = ({ title, description }: ProjectDescriptionProps) => {
  return (
    <>
      <div className={styles.blueLine} />
      <h2 className={styles.title}>{title}</h2>
      <p className={styles.description}>{description}</p>
    </>
  )
}
