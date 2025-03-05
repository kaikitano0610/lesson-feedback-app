import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "../../../css/pages/AdminHome.css";
import { API_BASE_URL, getAuthHeaders } from '../../config/api';



const UserGroupList = () => {

  const navigate = useNavigate();
  const [group,setGroup] = useState([]);
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(true);
  const location = useLocation();
  const projectId = location.state?.id;

  const projectApiUrl = `${API_BASE_URL}/projects`;


  
  //グループ一覧のフェッチ
  const fetchGroups = useCallback( async () => {
    setLoading("読み込み中...")
    try {
      const res = await axios.get(`${projectApiUrl}/${projectId}`,{
        headers: getAuthHeaders()
      })
      setGroup(res.data.groups);
    }catch(e) {
      console.log("グループの取得に失敗しました。")
      setError("読み込みエラーです");
    }
    setLoading(false);
  },[projectId])
  
  useEffect(() => {
    // projectId が存在しない時はリダイレクト
    if (!projectId) {
      navigate('/user/home');
    } else{
      fetchGroups();
    }

  }, [projectId, navigate, fetchGroups]);

  //取得失敗したときの表示
  if (error) {
    return (
      <div>
        <p>{error}</p>
      </div>
    )
  }

  //読み込み中の表示
  if (loading){
    return (
      <div>
        <p>{loading}</p>
      </div>
    )
  }

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
