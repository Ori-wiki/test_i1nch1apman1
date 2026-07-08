import { ProjectImage } from './ProjectImage/ProjectImage'
import { ProjectDescription } from './ProjectDescription/ProjectDescription'
import { ProjectVideo } from './ProjectVideo/ProjectVideo'
import styles from './ProjectSection.module.scss'

const projectTitle = (
  <>
    Уютное и безопасное пространство для счастливой,{' '}
    <span className={styles.highlight}>спокойной и размеренной жизни</span>
  </>
)

const projectDescription = (
  <>
    <span className={styles.highlight}>
      Квартиры от 65 до 356 м<sup>2</sup> с чистовой отделкой,
    </span>{' '}
    балконами, лоджиями и террасами в собственной закрытой охраняемой
    территории.
  </>
)

export const ProjectSection = () => {
  return (
    <section className={styles.section} id='project'>
      <div className={styles.container}>
        <div className={styles.content}>
          <ProjectImage
            title='о проекте'
            src='/images/about-bg.jpg'
            alt='Зимнее шале'
          />

          <div className={styles.rightColumn}>
            <ProjectDescription
              title={projectTitle}
              description={projectDescription}
            />
            <ProjectVideo
              videoUrl='/videos/form.mp4'
              posterUrl='/images/video-poster.jpg'
            />
          </div>
        </div>
      </div>
    </section>
  )
}
