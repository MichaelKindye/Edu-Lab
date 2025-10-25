import React from 'react'
import { Link } from 'react-router-dom'

/**
 * CourseCard
 * props: course (object)
 */
export default function CourseCard({ course }) {
  return (
  <article style={{ backgroundColor: 'var(--card-bg)', color: 'var(--text)' }} className="flex gap-4 p-4 rounded-xl shadow-sm hover:shadow-lg transition-transform transform hover:-translate-y-1 items-start">
      <Link to={`/course/${course.slug}`} className="w-40 shrink-0">
        <img src={course.thumbnail} alt={`${course.title} thumbnail`} className="w-full h-24 object-cover rounded-md" loading="lazy" />
      </Link>
      <div className="flex-1">
        <Link to={`/course/${course.slug}`} className="font-semibold text-sm line-clamp-2">{course.title}</Link>
        <div className="text-xs text-gray-500 mt-1">{course.instructor.name} • {course.level} • {course.lengthHours}h</div>
        <div className="mt-3 flex items-center justify-between">
          <div className="text-sm font-medium text-emerald-600 flex items-center h-8">${course.price}</div>
          <Link to={`/course/${course.slug}`} className="text-sm inline-flex items-center h-8 px-3 py-1 bg-emerald-500 text-white rounded-full">View</Link>
        </div>
      </div>
    </article>
  )
}
