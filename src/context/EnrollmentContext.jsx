import React, { createContext, useEffect, useState } from 'react'
import { enrollMock } from '../mock/api'

export const EnrollmentContext = createContext()

export function EnrollmentProvider({ children }){
  const [enrolled, setEnrolled] = useState(() => {
    try {
      return JSON.parse(localStorage.getItem('enrolled') || '[]')
    } catch { return [] }
  })

  useEffect(() => {
    localStorage.setItem('enrolled', JSON.stringify(enrolled))
  }, [enrolled])

  async function enrollCourse(course){
    const res = await enrollMock(course)
    if (res?.success){
      setEnrolled((e) => {
        if (e.find(c => c.id === course.id)) return e
        return [...e, { ...course, progress: 0, lastLesson: null }]
      })
    }
    return res
  }

  function unenroll(courseId){
    setEnrolled((e) => e.filter(c => c.id !== courseId))
  }

  function updateProgress(courseId, progress, lastLesson){
    setEnrolled((e) => e.map(c => c.id === courseId ? { ...c, progress, lastLesson } : c ))
  }

  return (
    <EnrollmentContext.Provider value={{ enrolled, enrollCourse, unenroll, updateProgress }}>
      {children}
    </EnrollmentContext.Provider>
  )
}
