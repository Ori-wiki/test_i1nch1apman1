'use client'

import { useState } from 'react'
import styles from './HeaderContacts.module.scss'
import { PhoneIcon } from '@/app/components/PhoneIcon/PhoneIcon'
import { BaseModal } from '@/app/components/Modal/BaseModal'
import { ContactForm } from '@/app/components/Form/ContactForm'

interface HeaderContactsProps {
  phone: string
  phoneDisplay: string
}

export const HeaderContacts = ({ phone, phoneDisplay }: HeaderContactsProps) => {
  const [isFormOpen, setIsFormOpen] = useState(false)

  return (
    <div className={styles.contacts}>
      <div className={styles.phoneMask}>
        <a
          className={styles.phone}
          href={`tel:${phone}`}
          style={{ '--phone-text': `"${phoneDisplay}"` } as React.CSSProperties}
        >
          <span className={styles.phoneNumber}>{phoneDisplay}</span>
          <PhoneIcon className={styles.phoneIcon} />
        </a>
      </div>

      <button
        type='button'
        className={styles.mobileCallbackBtn}
        onClick={() => setIsFormOpen(true)}
        aria-label='Заказать звонок'
      >
        <PhoneIcon />
      </button>

      <div className={styles.callbackMask}>
        <button
          type='button'
          className={styles.callbackBtn}
          onClick={() => setIsFormOpen(true)}
        >
          заказать звонок
        </button>
      </div>

      <BaseModal
        isOpen={isFormOpen}
        onClose={() => setIsFormOpen(false)}
        ariaLabel='Форма заказа звонка'
      >
        <ContactForm />
      </BaseModal>
    </div>
  )
}
