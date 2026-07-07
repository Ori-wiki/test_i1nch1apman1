import styles from './Header.module.scss'
import { BurgerMenuButton } from './BurgerMenuButton/BurgerMenuButton'
import { ApartmentSelect } from './ApartmentSelect/ApartmentSelect'
import { Logo } from './Logo/Logo'
import { HeaderContacts } from './HeaderContacts/HeaderContacts'

export const Header = () => {
  const apartmentOptions = [
    { value: '1', label: 'Квартира №1' },
    { value: '2', label: 'Квартира №2' },
    { value: '3', label: 'Квартира №3' },
    { value: '4', label: 'Квартира №4' },
  ]

  return (
    <header className={styles.header}>
      <div className={styles.leftGroup}>
        <BurgerMenuButton />
        <div className={styles.tabletHeaderContacts}>
          <HeaderContacts phone='+74955272121' phoneDisplay='+7 495 527 21 21' />
        </div>
        <div className={styles.desktopSelect}>
          <ApartmentSelect options={apartmentOptions} />
        </div>
      </div>

      <Logo />

      <div className={styles.rightGroup}>
        <div className={styles.desktopHeaderContacts}>
          <HeaderContacts phone='+74955272121' phoneDisplay='+7 495 527 21 21' />
        </div>
        <div className={styles.tabletSelect}>
          <ApartmentSelect options={apartmentOptions} />
        </div>
      </div>
    </header>
  )
}
