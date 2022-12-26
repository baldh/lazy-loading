//Function to create an Intersection Observer
function createObserver(callback, options){
  const defaultOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 0.25
  }
  if(!options) return new IntersectionObserver(callback, defaultOptions)
  return new IntersectionObserver(callback, options)
}

//Function to handle intersection of "image-container" to the root
function handleImageIntersection(entries, observer){
  entries.forEach(entry => {
    if(entry.isIntersecting) {
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

document.addEventListener("DOMContentLoaded", function () {
  const imageContainers = Array.from(document.querySelectorAll(".image-container"))

  imageContainers.forEach(imageContainer => {
    if (imageContainer.firstElementChild.currentSrc !== "") imageContainer.classList.remove("placeholder")
  })

  if("IntersectionObserver" in window) {
    let imageObserver = createObserver(handleImageIntersection)
    imageContainers.forEach(async container => {
      imageObserver.observe(container)
      container.firstElementChild.addEventListener("load", () => container.classList.remove("loader"))
    })
  }
})