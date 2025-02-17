import React, { useEffect, useState } from 'react'
import { GrNotes } from "react-icons/gr";
import { MdLabelImportant } from "react-icons/md";
import { FaCheckDouble } from "react-icons/fa";
import { TbNotebookOff } from "react-icons/tb";
import { Link } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import { authActions } from '../../store/auth';
import axios from 'axios';

const Sidebar = () => {
  const dispatch = useDispatch();
    const data = [
        {
            title:"All tasks",
            icons: <GrNotes />,
            link: "/",
        },
        {
            title:"Important tasks",
            icons: <MdLabelImportant />,
            link: "/Imptasks",
        },
        {
            title:"Completed tasks",
            icons: <FaCheckDouble />,
            link: "/CompletedTasks",
        },
        {
            title:"Incompleted tasks",
            icons: <TbNotebookOff />,
            link: "/Incompletetasks",
        },
    ];
    const [Data, setData] = useState();
  const logout = () => {
    localStorage.clear("id");
    localStorage.clear("token");
    dispatch(authActions.logout());
    history("/signup");
  };
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
  }, []);
  return (
    <>
      {Data && (
        <div>
          <h2 className='text-xl font-semibold'>{Data.username}</h2>
          <h4 className='mb-1 text-gray-400'>{Data.email}</h4>
          <hr/>
        </div>
      )}
      <div>
        {data.map((items, i) => (
            <Link 
              to={items.link} 
              key={i} 
              className='my-2 flex items-center hover:bg-gray-600 p-2 rounded transition-all duration-300'>
                {items.icons}&nbsp;
                {items.title}
            </Link>
        ))}
      </div>
      <div>
        <button className='bg-gray-600 w-full p-2 rounded' onClick={logout}>Log Out</button>
      </div>
    </>
  )
}

export default Sidebar
