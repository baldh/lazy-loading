import {useRef, useState, useReducer} from 'react'
import useIntersectionObserver from '../hooks/use-intersection-observer'
import "./image-container.css"

//Function to handle intersection of "image-container" to the root
function handleIntersection(entries, observer) {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      let container = entry.target
      let placeholder = container.children[0]
      placeholder.src = placeholder.dataset.src
      let final = container.children[1]
      final.src = final.dataset.src
      final.onload = () => {
        placeholder.classList.add("hidden")
        final.classList.remove("hidden")
      }
      observer.unobserve(entry.target)
    }
  })
}

export default function ImageContainer({placeholder, final, alt = "image"}) {
  const ref = useRef()
  const [placeholderLoaded, setPlaceholderLoaded] = useState(false)
  const [finalLoaded, setFinalLoaded] = useState(false)


  // useIntersectionObserver(handleIntersection, undefined, ref)

  return <div className={`image-container ${!placeholderLoaded && "loader"}`} >
    <img alt={alt} src={`${placeholder}`} className={`placeholder ${finalLoaded && "hidden"}`} loading={'lazy'}
         onLoad={() => setPlaceholderLoaded(true)}/>
    <img alt={alt} src={`${final}`} className={`${!finalLoaded && "hidden"}`} loading={'lazy'}
         onLoad={() => setFinalLoaded(true)}
    />
  </div>
}