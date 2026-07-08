import styles from './BurgerMenuButton.module.scss'

interface BurgerMenuButtonProps {
  isOpen?: boolean
  onClick?: () => void
}

export const BurgerMenuButton = ({
  isOpen = false,
  onClick,
}: BurgerMenuButtonProps) => (
  <button
    type='button'
    className={styles.burger}
    onClick={onClick}
    aria-expanded={isOpen}
    aria-controls='site-menu'
    aria-label='Открыть меню'
  >
    <span className={styles.burgerIcon} />
    <span className={styles.burgerText}>меню</span>
  </button>
)
