import React from 'react'

const Notfounddata = ({content,filter,emoji}:{content:string,filter?:string,emoji?:any}) => {
  return (
    <div>
       
          <div className="col-span-full text-center py-20">
            <div className="text-4xl mb-4">{emoji?emoji:"😔"}</div>
            <p className="text-xl font-semibold text-gray-600 mb-2">
              {content}
            </p>
            <p className={`${filter?"text-gray-500":""}`}>{filter}</p>
          </div>
        
    </div>
  )
}

export default Notfounddata
