import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "../../../css/pages/AdminHome.css"


const UserGroupList = () => {

  const navigate = useNavigate();
  const [group,setGroup] = useState([]);
  const token = localStorage.getItem('token');
  const location = useLocation();
  const projectId = location.state?.id;

  useEffect(() => {
    // projectId が存在しない (＝ location.state?.id が undefined) 場合はリダイレクト
    if (!projectId) {
      navigate('/user/home');
    }
  }, [projectId, navigate]);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`
  }

  //グループ一覧のフェッチ
  const fetchGroups = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/projects/${projectId}`,{
        headers: headers
      })
      setGroup(res.data.groups);
    }catch(e) {
      console.log("グループの取得に失敗しました。")
    }
  }

  //更新時
  useEffect(() => {
    fetchGroups();
  },[])

  return (
    <>
    {group && group.length > 0 ? (
      <>
        <div className='home'>グループ一覧</div>
        <div className='group_page'>
          <div className='group_container'>
            {group.map((group) => (
              <div className='group' key={group.id}>
                <div>
                  <h1> {group.group_name} </h1>
                  <p>○人のメンバー</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </>
    ) : (
      <>
        <div className='home'>グループ一覧</div>
        <p>グループがまだありません。</p>
      </>
    )}
  </>


  )
}

export default UserGroupList