import React from 'react'

export default function SkeletonCourseCard() {
  return (
    <div className="p-4 rounded-xl bg-gray-100 dark:bg-gray-800 animate-pulse">
      <div className="h-24 bg-gray-300 dark:bg-gray-700 rounded mb-3" />
      <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-3/4 mb-2" />
      <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-1/3" />
    </div>
  )
}
