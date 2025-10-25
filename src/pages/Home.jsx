import React, { useEffect, useState } from 'react'
import { fetchCourses } from '../mock/api'
import CourseGrid from '../components/CourseGrid'
import FiltersPanel from '../components/FiltersPanel'
import SkeletonCourseCard from '../components/SkeletonCourseCard'
import { useSearchParams } from 'react-router-dom'

export default function Home(){
  const [courses, setCourses] = useState([])
  const [loading, setLoading] = useState(true)
  const [level, setLevel] = useState('All')

  const [searchParams] = useSearchParams()
  const q = searchParams.get('q') || ''

  useEffect(()=>{
    let mounted = true
    setLoading(true)
    fetchCourses({ q }).then((c)=>{ if(mounted){ setCourses(c); setLoading(false) } })
    return ()=> mounted = false
  },[q])

  const filtered = courses.filter(c => level === 'All' ? true : c.level === level)

  return (
    <div>
      <section className="mb-6">
           <div className="rounded-xl p-6 bg-linear-to-r from-white to-emerald-50 dark:from-[#071012] dark:to-[#06281f]">
          <h1 className="text-2xl font-bold text-white">Browse Popular Courses</h1>
             <p className="text-sm text-gray-500">Learn skills with short hands-on projects.</p>
        </div>
      </section>

      <FiltersPanel selectedLevel={level} onLevelChange={(l) => setLevel(l)} />

      <section>
        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            {Array.from({length:8}).map((_,i)=>(<SkeletonCourseCard key={i}/>))}
          </div>
        ) : (
          <div>
            <div className="mb-3 text-sm text-gray-500">Showing {filtered.length} courses — filter: {level}</div>
            <CourseGrid courses={filtered} />
          </div>
        )}
      </section>
    </div>
  )
}
