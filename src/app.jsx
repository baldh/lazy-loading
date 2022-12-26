import ImageContainer from './components/image-container'
import "./app.css"
import images from './assets/images'

export default function App() {
  return <div className={"container"}>
    <div className={"content"}>
      {images.map(image =>
        <ImageContainer placeholder={image.placeholder} final={image.final} alt={image.alt} key={image.id}/>
      )}
    </div>
  </div>
}