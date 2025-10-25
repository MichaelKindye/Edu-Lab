import React from 'react'
import ProgressRing from './ProgressRing'
import { Link } from 'react-router-dom'

export default function DashboardCard({ course, progress = 0 }) {
  return (
    <div style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text)' }} className="p-4 rounded-xl flex items-center gap-4 shadow-sm">
      <div className="w-16">
        <img src={course.thumbnail} alt="thumb" className="w-16 h-10 object-cover rounded" />
      </div>
      <div className="flex-1">
        <div className="font-semibold">{course.title}</div>
        <div className="text-sm text-gray-500">{course.instructor.name}</div>
      </div>
      <div className="w-24 text-right">
        <ProgressRing percent={progress} size={56} />
        <div className="mt-2">
          <Link to={`/course/${course.slug}`} className="text-sm text-emerald-500">Resume</Link>
        </div>
      </div>
    </div>
  )
}
