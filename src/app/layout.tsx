import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import ThirdWebProvider from '@/providers/ThirdWebProvider'
import { DynamicTemplateProvider } from '@/providers/DynamicTemplate'
import { WhitelistProvider } from '@/providers/WhitelistProvider'

const inter = Inter({ subsets: ['latin'] })
export const metadata: Metadata = {
  title: 'LowCoding - Set of web3 tools for Marketers',
  description: 'Gamified customer engagement and loyalty programs'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <ThirdWebProvider>
          <DynamicTemplateProvider>
            <WhitelistProvider>
              {children}
            </WhitelistProvider>
          </DynamicTemplateProvider>
        </ThirdWebProvider>
      </body>
    </html>
  )
}
