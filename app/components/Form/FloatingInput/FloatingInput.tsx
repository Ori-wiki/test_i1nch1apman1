'use client'
import React, { useState } from 'react'
import {
  Control,
  Controller,
  FieldValues,
  Path,
  FieldError,
} from 'react-hook-form'
import { PatternFormat } from 'react-number-format'
import styles from './FloatingInput.module.scss'

interface FloatingInputProps<T extends FieldValues> {
  label: string
  name: Path<T>
  control: Control<T>
  error?: FieldError
  type?: string
  isPhone?: boolean
}

export const FloatingInput = <T extends FieldValues>({
  label,
  name,
  control,
  error,
  type = 'text',
  isPhone,
}: FloatingInputProps<T>) => {
  const [isFocused, setIsFocused] = useState(false)

  return (
    <div className={styles.wrapper}>
      <Controller
        name={name}
        control={control}
        render={({ field: { onChange, onBlur, value, ref } }) => {
          const hasValue = value && value.length > 0
          const activeClass = isFocused || hasValue ? styles.active : ''

          return (
            <>
              <label className={`${styles.label} ${activeClass}`}>
                {label}
              </label>

              {isPhone ? (
                <PatternFormat
                  format='+7 (###) ###-##-##'
                  mask='_'
                  allowEmptyFormatting={isFocused}
                  value={value}
                  onValueChange={(values) => onChange(values.formattedValue)}
                  onBlur={() => {
                    onBlur()
                    setIsFocused(false)
                  }}
                  onFocus={() => setIsFocused(true)}
                  getInputRef={ref}
                  className={`${styles.input} ${activeClass} ${error ? styles.error : ''}`}
                />
              ) : (
                <input
                  type={type}
                  value={value || ''}
                  onChange={onChange}
                  onBlur={() => {
                    onBlur()
                    setIsFocused(false)
                  }}
                  onFocus={() => setIsFocused(true)}
                  ref={ref}
                  className={`${styles.input} ${activeClass} ${error ? styles.error : ''}`}
                />
              )}
            </>
          )
        }}
      />
      {error && <span className={styles.errorMessage}>{error.message}</span>}
    </div>
  )
}
