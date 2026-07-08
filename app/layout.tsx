import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'
import { Header } from '@/app/components/Header/Header'
import SmoothScrollProvider from '@/app/components/SmoothScrollProvider/SmoothScrollProvider'
import './globals.scss'

const proximaNova = localFont({
  src: [
    {
      path: '../public/fonts/ProximaNova-Light.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: '../public/fonts/ProximaNova-Regular.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../public/fonts/ProximaNova-Semibold.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../public/fonts/ProximaNova-Bold.woff2',
      weight: '700',
      style: 'normal',
    },
  ],
  preload: false,
  variable: '--font-proxima',
})

export const metadata: Metadata = {
  title: 'INCHAPIN | Дом бизнес-класса',
  description: 'Демо-страница жилого комплекса',
  icons: {
    icon: '/favicons/favicon.ico',
    shortcut: '/favicons/favicon-96x96.png',
    apple: '/favicons/apple-touch-icon.png',
  },
  manifest: '/favicons/site.webmanifest',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang='ru' className={proximaNova.variable}>
      <body suppressHydrationWarning>
        <Header />
        <SmoothScrollProvider>{children}</SmoothScrollProvider>
      </body>
    </html>
  )
}
