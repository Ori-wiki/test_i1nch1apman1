import Image from 'next/image'
import Link from 'next/link'
import styles from './Logo.module.scss'

export const Logo = () => (
  <Link href='/' className={styles.logo}>
    <Image
      src='/logos/logo.svg'
      alt='Inchapin'
      width={187}
      height={30}
    />
  </Link>
)
