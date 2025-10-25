import React, { useState, useEffect, useRef } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import ModalSignIn from './ModalSignIn'
import ContactModal from './ContactModal'
import { useLocation } from 'react-router-dom'

export default function Header() {
  const [dark, setDark] = useState(() => localStorage.getItem('theme') === 'dark' || (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches))
  const [openSign, setOpenSign] = useState(false)
  const [openContact, setOpenContact] = useState(false)
  const navigate = useNavigate()
  const location = useLocation()
  const params = new URLSearchParams(location.search)
  const initialQ = params.get('q') || ''
  const [searchValue, setSearchValue] = useState(initialQ)
  const debounceRef = useRef(null)

  // ensure initial theme applied and persisted
  useEffect(() => {
    const applied = localStorage.getItem('theme')
    const prefers = (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches)
    const initial = applied ? (applied === 'dark') : prefers
    setDark(initial)
  }, [])
  useEffect(() => {
    function applyTheme(theme) {
      try {
        if (theme === 'dark') {
          document.documentElement.classList.add('dark')
          document.documentElement.setAttribute('data-theme', 'dark')
        } else {
          document.documentElement.classList.remove('dark')
          document.documentElement.setAttribute('data-theme', 'light')
        }
        localStorage.setItem('theme', theme)
      } catch (e) {
        // ignore
      }
    }

    applyTheme(dark ? 'dark' : 'light')
  }, [dark])

  function toggleTheme() {
    setDark((v) => !v)
  }

  // Live search: debounce updates to the URL so Home page will fetch with ?q=
  useEffect(() => {
    if (debounceRef.current) clearTimeout(debounceRef.current)
    debounceRef.current = setTimeout(() => {
      const q = searchValue.trim()
      if (q) navigate(`/?q=${encodeURIComponent(q)}`, { replace: true })
      else navigate(`/`, { replace: true })
    }, 300)
    return () => clearTimeout(debounceRef.current)
  }, [searchValue, navigate])

  return (
    <header className="sticky top-0 z-40 glass backdrop-blur-sm py-3">
      <div className="max-w-7xl mx-auto px-4 flex items-center gap-4">
        <div className="flex items-center gap-4">
          <Link to="/" className="font-bold text-lg flex items-center gap-2" aria-label="Go to Courses">
            <div className="w-8 h-8 rounded-md bg-linear-to-br from-emerald-400 to-emerald-600 flex items-center justify-center text-white">E</div>
            <span className="hidden sm:inline">EduLab</span>
          </Link>
        </div>

        <nav className="ml-4 flex-1 hidden lg:flex items-center justify-center">
          <div className="relative w-2/3">
            <svg className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden>
              <path d="M21 21l-4.35-4.35" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="11" cy="11" r="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
            <input
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              className="search-field w-full pl-10 pr-3 py-2 rounded-full border border-gray-200 dark:border-transparent focus:outline-none text-slate-700 dark:text-slate-200 placeholder:text-slate-500 dark:placeholder:text-slate-400"
              placeholder="Search courses"
              aria-label="Search courses"
              onKeyDown={(e) => {
                if (e.key === 'Enter') {
                  navigate(`/?q=${encodeURIComponent(searchValue)}`)
                }
              }}
              style={{ backgroundColor: 'var(--input-bg)' }}
            />
          </div>
        </nav>

        <div className="flex items-center gap-3 ml-auto">
          <Link to="/" className="text-sm hover:underline">Courses</Link>
          <Link to="/dashboard" className="text-sm hover:underline">Dashboard</Link>
          <button
            onClick={toggleTheme}
            aria-label="Toggle theme"
            aria-pressed={dark}
            className="p-2 rounded-full border"
          >
            {dark ? '🌙' : '☀️'}
          </button>
          <button onClick={() => setOpenSign(true)} className="btn-primary px-3 py-1 rounded-full">Sign In</button>
          <button onClick={() => setOpenContact(true)} className="btn-primary px-2 py-1 ml-1">Contact</button>
        </div>

        <ModalSignIn open={openSign} onClose={() => setOpenSign(false)} />
        <ContactModal open={openContact} onClose={() => setOpenContact(false)} />
      </div>
    </header>
  )
}
