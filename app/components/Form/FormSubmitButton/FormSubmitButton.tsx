import React from 'react'
import styles from './FormSubmitButton.module.scss'

interface FormSubmitButtonProps {
  isSubmitting: boolean
  label: string
}

export const FormSubmitButton = ({
  isSubmitting,
  label,
}: FormSubmitButtonProps) => {
  return (
    <button
      type='submit'
      disabled={isSubmitting}
      className={styles.button}
      style={{ '--btn-text': `"${label}"` } as React.CSSProperties}
    >
      <div className={styles.buttonMask}>
        <span>{isSubmitting ? 'Отправка...' : label}</span>
      </div>
    </button>
  )
}
