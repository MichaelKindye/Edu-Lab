import React, { useRef, useEffect, useState } from 'react'

export default function LessonPlayer({ lesson, onEnded }) {
  const videoRef = useRef()
  const [playing, setPlaying] = useState(false)

  useEffect(() => {
    function onKey(e) {
      if (e.code === 'Space') {
        e.preventDefault()
        if (videoRef.current && videoRef.current.tagName === 'VIDEO') {
          if (videoRef.current.paused) videoRef.current.play()
          else videoRef.current.pause()
        }
      }
      if (e.key === 'ArrowRight' && videoRef.current && videoRef.current.tagName === 'VIDEO') videoRef.current.currentTime += 10
      if (e.key === 'ArrowLeft' && videoRef.current && videoRef.current.tagName === 'VIDEO') videoRef.current.currentTime -= 10
    }
    document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [])

  if (!lesson) return <div className="p-6 bg-gray-100 dark:bg-gray-900 rounded">No lesson selected</div>

  const isYoutube = lesson.videoUrl && /youtube\.com|youtu\.be/.test(lesson.videoUrl)

  return (
    <div>
      <div className="bg-black rounded-lg overflow-hidden">
        {isYoutube ? (
          <div className="w-full h-64 md:h-96">
            <iframe title={lesson.title} src={lesson.videoUrl} className="w-full h-full" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen />
          </div>
        ) : (
          <video
            ref={videoRef}
            src={lesson.videoUrl}
            controls
            className="w-full h-64 md:h-96 bg-black"
            onPlay={() => setPlaying(true)}
            onPause={() => setPlaying(false)}
            onEnded={() => onEnded && onEnded(lesson)}
          >
            Sorry, your browser doesn't support embedded videos.
          </video>
        )}
      </div>
      <div className="mt-3">
        <h4 className="font-semibold">{lesson.title}</h4>
        <p className="text-sm text-gray-500">{lesson.description}</p>
      </div>
    </div>
  )
}
