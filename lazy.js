function createObserver(callback, options){
  const defaultOptions = {
    root: null,
    rootMargin: "0px",
    threshold: 1
  }
  if(!options) return new IntersectionObserver(callback, defaultOptions)
  return new IntersectionObserver(callback, options)
}

function handleImageIntersection(entries, observer){
  entries.forEach(entry => {
    if(entry.isIntersecting) {
      let container = entry.target
      let image = container.firstElementChild
      image.src = image.dataset.src
      image.classList.remove("lazy-image")
      observer.unobserve(entry.target)
    }
  })
}

document.addEventListener("DOMContentLoaded", function () {
  const imageContainers = document.querySelectorAll(".image-container")

  imageContainers.forEach(imageContainer => {
    if (imageContainer.firstElementChild.currentSrc !== "") imageContainer.classList.remove("placeholder")
  })

  if("IntersectionObserver" in window) {
    let imageObserver = createObserver(handleImageIntersection)
    imageContainers.forEach(async container => {
      imageObserver.observe(container)
      container.firstElementChild.addEventListener("load", () => container.classList.remove("placeholder"))
    })
  }
})


