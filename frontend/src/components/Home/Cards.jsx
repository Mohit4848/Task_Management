import React, { useState } from 'react'
import { FaHeart } from "react-icons/fa";
import { FaEdit } from "react-icons/fa";
import { AiFillDelete } from "react-icons/ai";
import { IoMdAddCircle } from "react-icons/io";
import axios from 'axios';


const Cards = ( {home, setInputdiv, data, setUpdatedData} ) => {
    const headers = {id: localStorage.getItem("id"),  authorization: `Bearer ${localStorage.getItem("tokens")}`};
  const handleCompleteTask = async (id) =>{
    try {
        await axios.put(`http://localhost:5173/api/v2/update-complete-task/:${id}`,{},{headers});
    } catch (error) {
        console.log(error);
    }
  } 
  const handleImportant = async (id) =>{
    try {
        await axios.put(`http://localhost:5173/api/v2/update-imp-task/:${id}`,{},{headers});
    } catch (error) {
        console.log(error);
    }
  }
  const deleteTask = async (id) =>{
    try {
        await axios.delete(`http://localhost:5173/api/v2/delete-task/:${id}`,{},{headers});
    } catch (error) {
        console.log(error);
    }
  }  
  const handleUpdate = async (id, title, desc)=> {
    setInputdiv("fixed");
    setUpdatedData({id:id, title:title, desc:desc});
  };
  return (
    <div className='grid grid-cols-4 gap-4 p-4'>
      {data && 
        data.map((items,i)=> (
            <div className='flex flex-col justify-between bg-gray-700 rounded-sm p-4'>
                <div>  
                    <h3 className='text-xl font-semibold'>{items.title}</h3>
                    <p className='text-gray-300 my-2'>{items.desc}</p>
                    <div className='mt-4 w-full flex items-center'>
                        <button className={`${items.complete === false ? "bg-red-400 " : "bg-green-700"} p-2 rounded w-3/6`} onClick={()=>handleCompleteTask(items._id)}>{items.complete === true ? "Completed" : "In Completed"}</button>
                        <div className='text-white p-2 w-3/6 text-2xl flex justify-around'>
                            <button onClick={()=>handleImportant(items._id)}>{items.important === false ? (<FaHeart />) : (<FaHeart className='text-red-500'/>)}</button>
                            {home !== "false" && (<button onClick={() => handleUpdate(items._id, items.title, items.desc)}><FaEdit /></button>)}
                            <button onClick={()=> deleteTask(items._id)}><AiFillDelete /></button>
                        </div>
                    </div>
                </div>
            </div>
        ))}
      {home === "true" && (
        <button className='flex flex-col justify-center items-center bg-gray-700 rounded-sm p-4 text-gray-300 hover:scale-105 hover:cursor-pointer transition-all duration-300' onClick={() => setInputdiv("fixed")}>
          <IoMdAddCircle className='text-6xl'/> 
          <h2 className='text-2xl mt-4'>Add Tasks</h2>
        </button>)}
    </div>
  )
}

export default Cards;