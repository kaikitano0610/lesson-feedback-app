import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation } from 'react-router-dom';
import "../../../css/pages/AdminHome.css"

const GroupList = () => {

  const [group,setGroup] = useState([]);
  const token = localStorage.getItem('token');
  const location = useLocation();
  const projectId = location.state?.id;

  const headers = {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`
  }

  
  useEffect(
    () => {
      
      axios
        .get( `http://127.0.0.1:8000/api/projects/${projectId}`,{
          headers: headers
        })
        .then( (res) =>{
          setGroup(res.data.groups);
        })
        .catch( (e) => {
          console.log(e)
          setGroup([]);
        })
    },[projectId]
  );


  return (
  <>
    {group && group.length > 0 ? (
      <>
        <div className='home'>グループ一覧</div>
        <div className='group_page'>
          <div className='group_container'>
            {group.map((group) => (
              <div className='group' key={group.id}>
                <h1> {group.group_name} </h1>
                <p>○人のメンバー</p>
                <button>編集</button>
                <button>削除</button>
              </div>
            ))}
            <div className='add_group'>
              <p>追加</p>
            </div>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className='home'>グループ一覧</div>
        <p>グループを追加してください。</p>
        <div className='add_group'>
          <p>追加</p>
        </div>
      </>
    )}
  </>

  )
}

export default GroupList