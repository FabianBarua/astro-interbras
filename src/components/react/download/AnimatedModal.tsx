'use client'
/* eslint-disable */

import { AnimatePresence, motion } from 'framer-motion'
import React, {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState
} from 'react'
import { cn } from '@/shared/tailwind'

interface ModalContextType {
  open: boolean
  setOpen: (open: boolean) => void
}

const ModalContext = createContext<ModalContextType | undefined>(undefined)

export const ModalProvider = ({ children }: { children: React.ReactNode }): JSX.Element => {
  const [open, setOpen] = useState(false)

  return (
    <ModalContext.Provider value={{ open, setOpen }}>
      {children}
    </ModalContext.Provider>
  )
}

export const useModal = () => {
  const context = useContext(ModalContext)
  if (context == null) {
    throw new Error('useModal must be used within a ModalProvider')
  }
  return context
}

export function Modal({ children }: { children: React.ReactNode }) {
  return <ModalProvider>{children}</ModalProvider>
}

export const ModalTrigger = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => {
  const { setOpen, open } = useModal()
  return (
    <button
      className={cn(className)}
      onClick={() => setOpen(!open)}
    >
      {children}
    </button>
  )
}

export const ModalBody = ({
  children,
  className,
  onClose
}: {
  children: React.ReactNode
  className?: string
  onClose?: () => void
}) => {
  const { open, setOpen } = useModal()

  const handleClose = () => {
    setOpen(false)
    if (onClose) {
      onClose()
    }
  }

  useEffect(() => {
    if (open) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'auto'
    }
  }, [open])

  const modalRef = useRef(null)
  useOutsideClick(modalRef, () => handleClose())

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
          exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
          className='fixed [perspective:800px] [transform-style:preserve-3d] inset-0 h-full w-full  flex items-center justify-center z-50'
        >
          <Overlay />

          <motion.div
            ref={modalRef}
            className={cn(
              'min-h-[50%] max-h-[90%] md:max-w-[40%] bg-white border border-transparent md:rounded-2xl relative z-50 flex flex-col flex-1 overflow-hidden',
              className
            )}
            initial={{ opacity: 0, scale: 0.5, y: 40 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.8, rotateX: 10 }}
            transition={{
              type: 'spring',
              stiffness: 260,
              damping: 15,
              mass: 0.5
            }}
          >
            <CloseIcon onClick={handleClose} />
            {children}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

export const ModalContent = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('flex flex-col justify-center items-center ', className)}>
      {children}
    </div>
  )
}

export const ModalFooter = ({
  children,
  className
}: {
  children: React.ReactNode
  className?: string
}) => {
  return (
    <div className={cn('flex justify-end p-4 bg-gray-100 ', className)}>
      {children}
    </div>
  )
}

const Overlay = ({ className }: { className?: string }) => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1, backdropFilter: 'blur(10px)' }}
      exit={{ opacity: 0, backdropFilter: 'blur(0px)' }}
      className={`fixed inset-0 h-full w-full bg-black bg-opacity-50 z-50 ${className}`}
    />
  )
}

const CloseIcon = ({ onClick }: { onClick?: () => void }) => {
  return (
    <button
      onClick={onClick}
      className='absolute top-4 right-4 group'
    >
      <svg
        xmlns='http://www.w3.org/2000/svg'
        width='24'
        height='24'
        viewBox='0 0 24 24'
        fill='none'
        stroke='currentColor'
        strokeWidth='2'
        strokeLinecap='round'
        strokeLinejoin='round'
        className='text-neutral-800 h-4 w-4 group-hover:scale-125 group-hover:rotate-3 transition duration-200'
      >
        <path stroke='none' d='M0 0h24v24H0z' fill='none' />
        <path d='M18 6l-12 12' />
        <path d='M6 6l12 12' />
      </svg>
    </button>
  )
}

// Hook to detect clicks outside of a component.
export const useOutsideClick = (
  ref: React.RefObject<HTMLDivElement>,
  callback: Function
) => {
  useEffect(() => {
    const listener = (event: any) => {
      if (ref.current == null || ref.current.contains(event.target)) {
        return
      }
      callback(event)
    }

    document.addEventListener('mousedown', listener)
    document.addEventListener('touchstart', listener)

    return () => {
      document.removeEventListener('mousedown', listener)
      document.removeEventListener('touchstart', listener)
    }
  }, [ref, callback])
}
