import { useCallback, useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'
import { CSSTransition } from 'react-transition-group'
import styles from './BaseModal.module.scss'

interface BaseModalProps {
  isOpen: boolean
  onClose: () => void
  children: React.ReactNode
  ariaLabel?: string
  contentClassName?: string
  closeButtonClassName?: string
}

const focusableSelector = [
  'a[href]',
  'button:not([disabled])',
  'input:not([disabled])',
  'select:not([disabled])',
  'textarea:not([disabled])',
  '[tabindex]:not([tabindex="-1"])',
].join(',')

export const BaseModal = ({
  isOpen,
  onClose,
  children,
  contentClassName,
  closeButtonClassName,
  ariaLabel = 'Диалоговое окно',
}: BaseModalProps) => {
  const nodeRef = useRef<HTMLDivElement>(null)
  const contentRef = useRef<HTMLDivElement>(null)
  const closeButtonRef = useRef<HTMLButtonElement>(null)
  const previouslyFocusedRef = useRef<HTMLElement | null>(null)
  const modalHistoryKeyRef = useRef(`modal-${Date.now()}-${Math.random()}`)
  const hasHistoryEntryRef = useRef(false)
  const isClosingFromHistoryRef = useRef(false)

  const requestClose = useCallback(() => {
    if (hasHistoryEntryRef.current && !isClosingFromHistoryRef.current) {
      isClosingFromHistoryRef.current = true
      window.history.back()
      return
    }

    onClose()
  }, [onClose])

  useEffect(() => {
    if (!isOpen) return

    previouslyFocusedRef.current =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    window.scrollbarInstance?.setMomentum(0, 0)

    const stopBackgroundScroll = (event: Event) => {
      event.preventDefault()
      event.stopPropagation()
    }

    const historyState = window.history.state ?? {}
    window.history.pushState(
      {
        ...historyState,
        __modalKey: modalHistoryKeyRef.current,
      },
      '',
    )
    hasHistoryEntryRef.current = true
    isClosingFromHistoryRef.current = false

    const handlePopState = () => {
      if (!hasHistoryEntryRef.current) return

      hasHistoryEntryRef.current = false
      isClosingFromHistoryRef.current = false
      onClose()
    }

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        event.preventDefault()
        requestClose()
        return
      }

      if (event.key !== 'Tab' || !contentRef.current) return

      const focusableElements = Array.from(
        contentRef.current.querySelectorAll<HTMLElement>(focusableSelector),
      ).filter((element) => !element.hasAttribute('disabled'))

      if (focusableElements.length === 0) {
        event.preventDefault()
        contentRef.current.focus()
        return
      }

      const firstElement = focusableElements[0]
      const lastElement = focusableElements[focusableElements.length - 1]

      if (event.shiftKey && document.activeElement === firstElement) {
        event.preventDefault()
        lastElement.focus()
      } else if (!event.shiftKey && document.activeElement === lastElement) {
        event.preventDefault()
        firstElement.focus()
      }
    }

    window.addEventListener('popstate', handlePopState)
    window.addEventListener('keydown', handleKeyDown)
    document.addEventListener('wheel', stopBackgroundScroll, {
      capture: true,
      passive: false,
    })
    document.addEventListener('touchmove', stopBackgroundScroll, {
      capture: true,
      passive: false,
    })

    return () => {
      window.removeEventListener('popstate', handlePopState)
      window.removeEventListener('keydown', handleKeyDown)
      document.removeEventListener('wheel', stopBackgroundScroll, true)
      document.removeEventListener('touchmove', stopBackgroundScroll, true)
    }
  }, [isOpen, onClose, requestClose])

  useEffect(() => {
    if (isOpen) return

    hasHistoryEntryRef.current = false
    isClosingFromHistoryRef.current = false
  }, [isOpen])

  if (typeof document === 'undefined') return null

  return createPortal(
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={300}
      classNames={{
        enter: styles.overlayEnter,
        enterActive: styles.overlayEnterActive,
        enterDone: styles.overlayEnterDone,
        exit: styles.overlayExit,
        exitActive: styles.overlayExitActive,
      }}
      unmountOnExit
      onEntered={() => closeButtonRef.current?.focus()}
      onExited={() => {
        previouslyFocusedRef.current?.focus()
        previouslyFocusedRef.current = null
      }}
    >
      <div
        className={styles.overlay}
        onClick={requestClose}
        ref={nodeRef}
        role='dialog'
        aria-modal='true'
        aria-label={ariaLabel}
      >
        <div
          className={`${styles.content} ${contentClassName ?? ''}`}
          onClick={(event) => event.stopPropagation()}
          ref={contentRef}
          tabIndex={-1}
        >
          <button
            ref={closeButtonRef}
            type='button'
            className={`${styles.closeBtn} ${closeButtonClassName ?? ''}`}
            onClick={requestClose}
            aria-label='Закрыть модальное окно'
          />
          {children}
        </div>
      </div>
    </CSSTransition>,
    document.body,
  )
}
