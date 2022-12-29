import {useRef, useState, lazy, Suspense} from 'react'
import useIntersectionObserver from '../hooks/use-intersection-observer'
const Lazy = lazy(() => import("./lazy.jsx"))
export default function LoadOnIntersection() {
  const ref = useRef()
  const [isIntersecting, setIsIntersecting] = useState(false)

  useIntersectionObserver((entries, observer)=>{
    entries.forEach(entry => {
      if(entry.isIntersecting) {
        setIsIntersecting(true)
        observer.unobserve(entry.target)
      }
    })
  }, undefined, ref)

  return <div ref={ref}>
    <Suspense fallback={<p>Loading.........</p>}>
      {isIntersecting && <Lazy/>}
    </Suspense>
  </div>

}