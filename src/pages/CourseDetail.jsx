import React, { useEffect, useState, useContext } from 'react'
import { useParams, useSearchParams } from 'react-router-dom'
import { fetchCourseBySlug } from '../mock/api'
import LessonPlayer from '../components/LessonPlayer'
import Syllabus from '../components/Syllabus'
import EnrollButton from '../components/EnrollButton'
import { EnrollmentContext } from '../context/EnrollmentContext'

export default function CourseDetail(){
  const { slug } = useParams()
  const [course, setCourse] = useState(null)
  const [activeLesson, setActiveLesson] = useState(null)
  const [qparams] = useSearchParams()
  const { enrolled } = useContext(EnrollmentContext)

  useEffect(()=>{
    fetchCourseBySlug(slug).then(c=>{ setCourse(c); if(c?.lessons?.[0]) setActiveLesson(c.lessons[0]) })
  },[slug])

  useEffect(()=>{
    const lessonQuery = qparams.get('lesson')
    if (lessonQuery && course) {
      const found = course.lessons.find(l => l.id === lessonQuery || l.id.endsWith(lessonQuery))
      if (found) setActiveLesson(found)
    }
  },[qparams, course])

  function onLessonSelect(lesson){
    setActiveLesson(lesson)
    console.log('analytics: lesson_start', lesson.id)
  }

  if (!course) return <div>Loading course…</div>

  const isEnrolled = enrolled.some(c => c.id === course.id)

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="md:col-span-2">
        <div className="mb-4">
          <LessonPlayer lesson={activeLesson} onEnded={() => console.log('lesson complete')} />
        </div>
        <div className="mt-6">
          <h3 className="text-lg font-semibold">Overview</h3>
          <p className="text-sm text-gray-500">{course.subtitle}</p>
        </div>
      </div>

      <aside className="md:col-span-1 space-y-4">
        <div className="p-4 rounded-xl bg-white dark:bg-[#0f1724]">
          <div className="text-sm text-gray-500">{course.level} • {course.lengthHours}h</div>
          <div className="mt-3"><EnrollButton course={course} /></div>
        </div>

        <div className="p-4 rounded-xl bg-white dark:bg-[#0f1724]">
          <h4 className="font-semibold mb-2">Syllabus</h4>
          <Syllabus lessons={course.lessons} activeId={activeLesson?.id} onSelect={onLessonSelect} />
        </div>
      </aside>
    </div>
  )
}
