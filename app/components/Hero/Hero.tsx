import { HeroImage } from './HeroImage/HeroImage'
import { HeroHeading } from './HeroHeading/HeroHeading'
import styles from './Hero.module.scss'

export const Hero = () => {
  return (
    <section className={styles.hero}>
      <div className={styles.container}>
        <HeroImage
          src='/images/hero-bg.jpg'
          alt='Дом бизнес-класса INCHAPIN'
        />
        <HeroHeading
          subtitle={
            <>
              дом бизнес-класса
              <br />
              для ценителей роскоши
            </>
          }
          title='INCHAPIN'
        />
      </div>
    </section>
  )
}
