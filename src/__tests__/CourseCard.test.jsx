import React from 'react'
import { render, screen } from '@testing-library/react'
import CourseCard from '../components/CourseCard'
import { MemoryRouter } from 'react-router-dom'

test('CourseCard renders title and link', ()=>{
  const course = { id:'c1', slug:'s1', title:'Test Course', price:10, instructor:{name:'A'}, level:'Beginner', lengthHours:2, thumbnail:'', }
  render(<MemoryRouter><CourseCard course={course} /></MemoryRouter>)
  expect(screen.getByText(/Test Course/i)).toBeInTheDocument()
  expect(screen.getByText(/\$10/)).toBeInTheDocument()
})
