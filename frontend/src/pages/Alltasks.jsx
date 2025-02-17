import React from 'react';
import Cards from '../components/Home/Cards';
import { IoMdAddCircle } from "react-icons/io";
import Input from '../components/Home/Input';
import { useState, useEffect } from 'react';
import axios from 'axios';

const Alltasks = () => {
  const [Inputdiv , setInputdiv] = useState('hidden');
  const [Data, setData] = useState();
  const [UpdatedData, setUpdatedData] = useState({
    id: "",
    title:"",
    desc: "",
  });
  const headers = {id: localStorage.getItem("id"),  authorization: `Bearer ${localStorage.getItem("tokens")}`};
  useEffect(() => {
    const fetch = async () => {
      const response = await axios.get("http://localhost:5173/api/v2/get-all-tasks", {headers,}
      );
      setData(response.data.data);
    };
    if(localStorage.getItem("id") && localStorage.getItem("token")){
      fetch();
    }
  });
  return (
    <>
      <div>
        <div className='w-full flex justify-end px-4 py-2'>
          <button  onClick={() => setInputdiv("fixed")}><IoMdAddCircle className='text-4xl text-gray-400 hover:text-gray-100 transition-all duration-300'/></button>
        </div>
        {Data && (
          <Cards home={"true"} setInputdiv={setInputdiv} data= {Data.tasks} ssetUpdatedData={ssetUpdatedData}/>
        )}
      </div>
      <Input Inputdiv={Inputdiv} setInputdiv={setInputdiv} UpdatedData = {UpdatedData} setUpdatedData={setUpdatedData}/>
    </>
  )
}

export default Alltasks
