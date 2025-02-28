import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "../../../css/pages/AdminHome.css";
import { API_BASE_URL, getAuthHeaders } from '../../config/api';



const UserGroupList = () => {

  const navigate = useNavigate();
  const [group,setGroup] = useState([]);
  const location = useLocation();
  const projectId = location.state?.id;

  const projectApiUrl = `${API_BASE_URL}/projects`;


  useEffect(() => {
    // projectId が存在しない時はリダイレクト
    if (!projectId) {
      navigate('/user/home');
    }
  }, [projectId, navigate]);


  //グループ一覧のフェッチ
  const fetchGroups = async () => {
    try {
      const res = await axios.get(`${projectApiUrl}/${projectId}`,{
        headers: getAuthHeaders()
      })
      setGroup(res.data.groups);
    }catch(e) {
      console.log("グループの取得に失敗しました。")
    }
  }

  //更新時
  useEffect(() => {
    if(projectId){
      fetchGroups();
    }
  },[projectId])

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
