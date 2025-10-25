import React, { useContext, useState } from 'react'
import { EnrollmentContext } from '../context/EnrollmentContext'
import { useNavigate } from 'react-router-dom'

export default function EnrollButton({ course }) {
  const { enrolled, enrollCourse } = useContext(EnrollmentContext)
  const isEnrolled = enrolled.some((c) => c.id === course.id)
  const [loading, setLoading] = useState(false)
  const navigate = useNavigate()

  async function onClick() {
    if (isEnrolled) return navigate('/dashboard')
    setLoading(true)
    try {
      await enrollCourse(course)
      console.log('analytics: enroll', course.id)
      navigate('/dashboard')
    } catch (e) {
      alert('Enrollment failed. Try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <button onClick={onClick} className="px-4 py-2 rounded-full bg-emerald-500 text-white">
      {loading ? 'Processing…' : isEnrolled ? 'Resume course' : `Enroll — $${course.price}`}
    </button>
  )
}
