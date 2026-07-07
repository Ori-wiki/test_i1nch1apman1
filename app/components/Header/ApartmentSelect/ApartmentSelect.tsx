'use client'

import { useId, useState } from 'react'
import Select, {
  components,
  PlaceholderProps,
  StylesConfig,
} from 'react-select'
import styles from './ApartmentSelect.module.scss'

interface Option {
  value: string
  label: string
}

interface ApartmentSelectProps {
  options: Option[]
}

const CustomPlaceholder = (props: PlaceholderProps<Option>) => {
  return (
    <components.Placeholder {...props}>
      <span className={styles.textAnimate}>{props.children}</span>
    </components.Placeholder>
  )
}

export const ApartmentSelect = ({ options }: ApartmentSelectProps) => {
  const instanceId = useId()
  const [isMenuOpen, setIsMenuOpen] = useState(false)

  const customStyles: StylesConfig<Option, false> = {
    control: (provided) => ({
      ...provided,
      backgroundColor: 'var(--color-accent)',
      borderRadius: '100px',
      padding: '0 10px',
      border: 'none',
      boxShadow: 'none',
      cursor: 'pointer',
      minHeight: 'var(--select-height)',
    }),
    singleValue: (provided) => ({
      ...provided,
      color: '#ffffff',
      textTransform: 'uppercase',
      fontSize: 'var(--select-font-size)',
      fontWeight: 600,
      lineHeight: 1,
      letterSpacing: '0.07em',
    }),
    placeholder: (provided) => ({
      ...provided,
      color: '#ffffff',
      fontSize: 'var(--select-font-size)',
      fontWeight: 600,
    }),
    indicatorSeparator: () => ({ display: 'none' }),
    dropdownIndicator: (provided) => ({
      ...provided,
      color: '#ffffff',
      fontSize: '14px',
      '&:hover': { color: '#ffffff' },
    }),
  }

  return (
    <div className={`${styles.wrapper} ${isMenuOpen ? styles.active : ''}`}>
      <Select
        instanceId={instanceId}
        options={options}
        placeholder='выбрать квартиру'
        classNamePrefix='apart-select'
        components={{ Placeholder: CustomPlaceholder }}
        isSearchable={false}
        onMenuOpen={() => setIsMenuOpen(true)}
        onMenuClose={() => setIsMenuOpen(false)}
        styles={customStyles}
      />
    </div>
  )
}
