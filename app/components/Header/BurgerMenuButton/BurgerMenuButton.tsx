import styles from './BurgerMenuButton.module.scss'

export const BurgerMenuButton = () => (
  <button type='button' className={styles.burger}>
    <span className={styles.burgerIcon} />
    <span className={styles.burgerText}>меню</span>
  </button>
)
