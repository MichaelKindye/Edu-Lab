import React, { useEffect, useRef, useState } from 'react'
import { createPortal } from 'react-dom'

export default function ContactModal({ open, onClose }){
  const ref = useRef()
  const [submitted, setSubmitted] = useState(false)

  useEffect(()=>{
    function onKey(e){ if(e.key==='Escape') onClose() }
    if(open) document.addEventListener('keydown', onKey)
    return ()=> document.removeEventListener('keydown', onKey)
  },[open,onClose])

  if(!open) return null

  function onSubmit(e){
    e.preventDefault()
    const form = new FormData(e.target)
    const payload = Object.fromEntries(form)
    console.log('contact_submit', payload)
    setSubmitted(true)
    setTimeout(()=>{ setSubmitted(false); onClose() }, 1200)
  }

  const node = (
    <div className="fixed inset-0 z-50 flex items-center justify-center min-h-screen p-4" role="dialog" aria-modal="true">
      <div className="absolute inset-0 bg-black opacity-40" onClick={onClose} />
      <div ref={ref} className="bg-white dark:bg-[#0f1724] rounded-xl p-6 shadow-lg w-full max-w-md z-10 mx-auto">
        <h3 className="text-lg font-semibold">Contact us</h3>
        <p className="text-sm text-gray-500">Send us your details and we'll get back to you.</p>
        <form className="mt-4 space-y-3" onSubmit={onSubmit}>
          <label className="block">
            <span className="text-sm">Email</span>
            <input name="email" type="email" required className="w-full mt-1 p-2 rounded border" />
          </label>
          <label className="block">
            <span className="text-sm">Phone (optional)</span>
            <input name="phone" type="tel" className="w-full mt-1 p-2 rounded border" />
          </label>
          <label className="block">
            <span className="text-sm">Message</span>
            <textarea name="message" rows="4" className="w-full mt-1 p-2 rounded border" />
          </label>
          <div className="flex justify-end gap-2">
            <button type="button" onClick={onClose} className="px-3 py-1">Cancel</button>
            <button className="px-3 py-1 bg-emerald-500 text-white rounded">{submitted ? 'Sending…' : 'Send message'}</button>
          </div>
        </form>
      </div>
    </div>
  )

  return createPortal(node, document.body)
}
