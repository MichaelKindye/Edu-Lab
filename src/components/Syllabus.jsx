import React from 'react'

export default function Syllabus({ lessons = [], activeId, onSelect }) {
  return (
    <div className="space-y-2">
      {lessons.map((l) => (
        <button
          key={l.id}
          onClick={() => onSelect && onSelect(l)}
          className={`w-full text-left p-2 rounded ${l.id === activeId ? 'bg-emerald-600 text-white' : 'bg-white dark:bg-[#0f1724]'} `}
          aria-current={l.id === activeId}
        >
          <div className="flex justify-between">
            <div className="font-medium">{l.title}</div>
            <div className="text-sm text-gray-500">{l.duration}</div>
          </div>
        </button>
      ))}
    </div>
  )
}
