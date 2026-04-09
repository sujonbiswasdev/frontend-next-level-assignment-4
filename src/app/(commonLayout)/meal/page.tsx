import React from 'react'
export const revalidate=60
const Page = async() => {
    const response=await fetch("http://localhost:5000/api/v1/events",{next:{revalidate:60}})
    const res=await response.json()
    console.log(res,'dat')
  return (
    <div>
        {res.data.data.UPCOMING.map((item:any)=>(
            <p key={item.id}>{item.id}</p>
        ))}
    </div>
  )
}

export default Page