import {useEffect} from 'react'
export default function useIntersectionObserver(onIntersect, options, target) {
  const defaultOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.25
  }

  useEffect(()=> {
      let observer
      if(typeof options !== "object") observer = new IntersectionObserver(onIntersect, defaultOptions)
      else observer = new IntersectionObserver(onIntersect, options)

      const current = target.current

      observer.observe(current)
  }, [])
}