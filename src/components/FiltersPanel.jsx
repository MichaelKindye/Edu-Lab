import React from 'react'

const LEVELS = ['All', 'Beginner', 'Intermediate', 'Advanced']

export default function FiltersPanel({ selectedLevel = 'All', onLevelChange, children }) {
  return (
    <div className="mb-6">
      <div className="flex gap-2 overflow-auto pb-2">
        {LEVELS.map((lvl) => (
          <button
            key={lvl}
            onClick={() => onLevelChange && onLevelChange(lvl)}
            className={`px-3 py-1 rounded-full ${selectedLevel === lvl ? 'bg-emerald-600 text-white' : 'bg-emerald-600/10 text-white border border-emerald-600/20'}`}
            aria-pressed={selectedLevel === lvl}
          >
            {lvl}
          </button>
        ))}
      </div>
      {children}
    </div>
  )
}
