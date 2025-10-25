import React, { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Footer from './components/Footer'
import Home from './pages/Home'
import CourseDetail from './pages/CourseDetail'
import Dashboard from './pages/Dashboard'
import { EnrollmentProvider } from './context/EnrollmentContext'

export default function App() {
  return (
    <EnrollmentProvider>
      <div style={{ minHeight: '100vh', backgroundColor: 'var(--bg)', color: 'var(--text)', transition: 'background-color 220ms, color 220ms' }}>
        <a className="sr-only focus:not-sr-only" href="#main">Skip to content</a>
        <Header />
        <main id="main" className="px-4 py-6 max-w-7xl mx-auto">
          <Suspense fallback={<div className="py-20 text-center">Loading...</div>}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/course/:slug" element={<CourseDetail />} />
              <Route path="/dashboard" element={<Dashboard />} />
            </Routes>
          </Suspense>
        </main>
        <Footer />
      </div>
    </EnrollmentProvider>
  )
}

