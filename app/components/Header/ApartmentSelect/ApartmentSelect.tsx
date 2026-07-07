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
    dropdownIndicator: (provided, state) => ({
      ...provided,
      color: '#ffffff',
      fontSize: '14px',
      transform: `translateY(var(--select-arrow-y, 0)) ${
        state.selectProps.menuIsOpen ? 'rotate(180deg)' : 'rotate(0deg)'
      }`,
      transition: 'transform 0.35s ease, color 0.3s ease',
      '&:hover': { color: '#ffffff' },
    }),
    menu: (provided) => ({
      ...provided,
      marginTop: '8px',
      padding: '6px',
      backgroundColor: '#ffffff',
      borderRadius: '12px',
      border: '1px solid rgba(0, 123, 255, 0.16)',
      boxShadow: '0 14px 32px rgba(0, 44, 94, 0.14)',
      overflow: 'hidden',
    }),
    menuList: (provided) => ({
      ...provided,
      padding: 0,
    }),
    option: (provided, state) => ({
      ...provided,
      padding: '10px 12px',
      color: state.isFocused ? 'var(--color-accent)' : 'var(--color-text-main)',
      backgroundColor: state.isFocused ? 'rgba(0, 123, 255, 0.08)' : '#ffffff',
      borderRadius: '8px',
      cursor: 'pointer',
      fontSize: 'var(--select-font-size)',
      fontWeight: 600,
      lineHeight: 1.2,
      transition: 'background-color 0.2s ease, color 0.2s ease',
      ':active': {
        backgroundColor: 'rgba(0, 123, 255, 0.14)',
      },
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
