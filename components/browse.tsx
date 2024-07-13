import React from 'react'

const Browse = () => {
    const  getBrowseData = async () =>{
        const response = await fetch('http://127.0.0.1:8080/browse')
        const data = await response.json()
        return data
    }
    getBrowseData().then(data => console.log(data))
  return (
    <div>
        
    </div>
  )
}

export default Browse