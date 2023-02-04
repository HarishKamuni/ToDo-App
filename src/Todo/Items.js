import React from 'react'

const Items = ({val,id,onselect,onEdit}) => {
  return (
    <div className="listStyle">
        <li>{val}</li>
        <div>
         
          <i className="fa-regular fa-pen-to-square edit" onClick={()=>onEdit(id)}></i>
          <i className="fa-solid fa-trash delete" onClick={()=>onselect(id)}></i>
          
        </div>
    </div>
  )
}

export default Items