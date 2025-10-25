import React, { useContext } from 'react'
import { EnrollmentContext } from '../context/EnrollmentContext'
import DashboardCard from '../components/DashboardCard'

export default function Dashboard(){
  const { enrolled } = useContext(EnrollmentContext)

  return (
    <div>
      <header className="mb-6">
        <h1 className="text-2xl font-bold">Student Dashboard</h1>
        <p className="text-sm text-gray-500">Quick overview of your enrolled courses</p>
      </header>

      <section className="space-y-4">
        {enrolled.length === 0 ? (
          <div className="p-6 rounded bg-white dark:bg-[#0f1724]">You haven't enrolled in any courses yet — Browse courses</div>
        ) : (
          enrolled.map(c => (
            <DashboardCard key={c.id} course={c} progress={c.progress || 0} />
          ))
        )}
      </section>
    </div>
  )
}
