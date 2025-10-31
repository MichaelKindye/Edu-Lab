import React from 'react'

export default function Footer(){
  return (
    <footer className="mt-12 py-8 border-t border-gray-200 dark:border-gray-700">
      <div className="max-w-7xl mx-auto px-4 text-sm text-gray-500">
        <div className="flex items-center justify-between">
          <div>© {new Date().getFullYear()} EduLab — Premium mock learning UI</div>
          <div>Contact developer on <a className="underline" href="https://www.linkedin.com/in/haile-michael-kindye-15bb36370/" target="_blank" rel="noreferrer">LinkedIn</a></div>
        </div>
      </div>
    </footer>
  )
}
