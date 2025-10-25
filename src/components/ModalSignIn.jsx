import React, { useEffect, useRef } from 'react'
import { createPortal } from 'react-dom'

export default function ModalSignIn({ open, onClose }) {
  const ref = useRef()

  useEffect(() => {
    function onKey(e) { if (e.key === 'Escape') onClose() }
    if (open) document.addEventListener('keydown', onKey)
    return () => document.removeEventListener('keydown', onKey)
  }, [open, onClose])

  if (!open) return null

  const node = (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div ref={ref} className="bg-white dark:bg-[#0f1724] rounded-xl p-6 shadow-lg w-full max-w-md z-10 mx-auto">
        <h3 className="text-lg font-semibold">Sign in</h3>
        <p className="text-sm text-gray-500">Mock sign-in for demo purposes</p>
        <form className="mt-4" onSubmit={(e) => { e.preventDefault(); console.log('signin'); onClose() }}>
          <label className="block text-sm">Email</label>
          <input className="w-full px-3 py-2 rounded mt-1 border" type="email" required />
          <div className="mt-4 flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1">Cancel</button>
            <button className="px-3 py-1 bg-emerald-500 text-white rounded">Sign in</button>
          </div>
        </form>
      </div>
    </div>
  )

  return createPortal(node, document.body)
}
