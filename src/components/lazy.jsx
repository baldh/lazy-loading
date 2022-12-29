import {useEffect, useState} from 'react'
import "./lazy.css"

export default function Lazy() {
  console.log("rendering lazy component")

  const [data, setData] = useState([])
  useEffect(() =>{
    async function fetchData () {
      let response = await fetch("https://jsonplaceholder.typicode.com/posts")
      response = await response.json()
      setData(response)
    }

    fetchData()
  }, [])

  if(data.length !== 0) return <>
    {data.map(item =>
      <div className={"post-card"} key={item.id}>
        <h3>{item.title}</h3>
        <p>{item.body}</p>
      </div>
    )}
  </>
}