import React, { useEffect, useState } from 'react'
import Items from './Items';
import "./Todo.css"

const getLocalStorageItems = ()=>{
    const list = localStorage.getItem('HRK');
    if(list){
        return JSON.parse(list);
    }else{
        return [];
    }
}
const Todo = () => {
    const [inputItem,setInputItem] = useState("");
    const [items,setItems] = useState(getLocalStorageItems());
    const [toggle,setToggle] = useState(true);
    const [isEditId,setIsEditId] = useState(null);

    const addItems = ()=>{
        if(!inputItem){

        }else if(inputItem && !toggle){
            setItems(
                items.map(val=>{
                    if(val.id === isEditId){
                        return {...val,name:inputItem};
                    }
                    return val;
                })
            )
            setToggle(true);
            setInputItem("");
            setIsEditId(null)
        }
        else{
            const allInputData = {id:new Date().getTime().toString(), name:inputItem}
            setItems((oldItems)=>{
            return [...oldItems,allInputData];
            });
            setInputItem("")
        }
        
    }
    const deleteItems =(id)=>{
        
        setItems((oldItems)=>{
            return oldItems.filter((elem)=>{
                return elem.id !== id;
            })
        })
    }
    const editItems = (id)=>{
        const newEditItems = items.find(val=>
            id === val.id
        )
        console.log(newEditItems)
        setToggle(false);
        setInputItem(newEditItems.name);
        setIsEditId(id)
    }
    const clearAll = ()=>{
        setItems([]);
    }
    useEffect(()=>{
        localStorage.setItem('HRK',JSON.stringify(items))
    },[items])
  return (
    <div className='back'>
        <div className="container">
            <h2>Today's Plan</h2>
            <div className="input_content">
                <input type="text" placeholder='Add items' value={inputItem} onChange={(e)=>setInputItem(e.target.value)}/>
                
                {toggle? <button onClick={addItems}>+</button>: 
                  <button>
                    <i className="fa-regular fa-pen-to-square" onClick={addItems}></i>
                  </button>
                }
                
            </div>
            <ul>
                {items.map((val)=>
                  <Items key={val.id} val={val.name} id={val.id} onselect={deleteItems} onEdit={editItems}/>
                )}
                
            </ul>
            <h3 className='clearBtn' onClick={clearAll}>clear all</h3>
        </div>
    </div>
  )
}

export default Todo