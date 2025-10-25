// Simple in-memory mock API with delay and optional failure for enroll
import courses from './courses'

function delay(ms) {
  return new Promise((res) => setTimeout(res, ms))
}

export async function fetchCourses({ q } = {}) {
  await delay(400 + Math.random() * 500)
  if (q) return courses.filter(c => c.title.toLowerCase().includes(q.toLowerCase()))
  return courses
}

export async function fetchCourseBySlug(slug) {
  await delay(400 + Math.random() * 500)
  return courses.find(c => c.slug === slug)
}

export async function enrollMock(course) {
  // 5% failure rate
  await delay(600 + Math.random() * 400)
  if (Math.random() < 0.05) throw new Error('Payment failed')
  return { success: true }
}
