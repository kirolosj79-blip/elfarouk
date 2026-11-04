import { useEffect } from 'react'
import { MARKUP } from './markup.js'

export default function App() {
  useEffect(() => {
    // load the app engine as a classic script (keeps inline handlers global)
    if (document.getElementById('farouk-engine')) return
    const s = document.createElement('script')
    s.id = 'farouk-engine'
    s.src = '/engine.js'
    document.body.appendChild(s)
  }, [])
  return <div dangerouslySetInnerHTML={{ __html: MARKUP }} />
}
