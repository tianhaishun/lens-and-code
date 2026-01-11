import './globals.css'
import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Cinematic Blog - 个人博客',
  description: '电影质感的个人博客，分享技术与生活',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN">
      <body className="cinema-effect vignette">
        <div className="film-grain">
          {children}
        </div>
      </body>
    </html>
  )
}
