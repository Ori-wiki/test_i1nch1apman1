import Image from 'next/image'

export const PhoneIcon = ({ className }: { className?: string }) => {
  return (
    <Image
      src='/icons/phone.svg'
      alt=''
      width={14}
      height={14}
      className={className}
    />
  )
}
