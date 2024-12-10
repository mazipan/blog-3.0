import Link from 'next/link'

import ThemeMoon from '__components/Icons/ThemeMoon'
import LoveIcon from '__components/Icons/MenuLove'
import ZapIcon from '__components/Icons/MenuZap'
import MicIcon from '__components/Icons/MenuMic'
import InfoIcon from '__components/Icons/MenuInfo'
import MenuBook from '__components/Icons/MenuBook'
import MenuBookmark from '__components/Icons/MenuBookmark'

import useLang from '__hooks/useLang'
import useTheme from '__hooks/useTheme'

export default function Header () {
  const { isId } = useLang()
  const { NextThemeIcon, onSwitchTheme } = useTheme()

  return (
    <header className="fixed w-full top-0 left-0 p-4 z-30 bg-gray-100 dark:bg-gray-900 flex md:flex-col lg:flex-row items-center justify-between shadow-medium border-bottom-gradient">
      <h1 className="h2 font-heading text-gradient">
        <Link href={`${isId ? '/' : '/en'}`}>
          <a>{'<Mazipan />'}</a>
        </Link>
      </h1>
      <nav className="flex items-center justify-between gap-4">
        <Link href="/til">
          <a className="text-link hidden items-center md:flex md:mr-4 font-bold">
            <MenuBook />
            <span className="pl-2">TIL</span>
          </a>
        </Link>
        <Link href="https://bookmarks.mazipan.space/" target='_blank' rel="noopener noreferrer">
          <a className="text-link hidden items-center md:flex md:mr-4 font-bold">
            <MenuBookmark />
            <span className="pl-2">Bookmarks</span>
          </a>
        </Link>
        <Link href="/about">
          <a className="text-link hidden items-center md:flex md:mr-4 font-bold">
            <InfoIcon />
            <span className="pl-2">About</span>
          </a>
        </Link>

        <button
          role="button"
          aria-label="Switch theme"
          className="bg-gray-300 dark:bg-gray-700 dark:text-amber-500 font-bold py-2 px-4 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
          onClick={onSwitchTheme}
        >
          {NextThemeIcon ? NextThemeIcon : <ThemeMoon />}
        </button>
      </nav>
    </header>
  )
}
