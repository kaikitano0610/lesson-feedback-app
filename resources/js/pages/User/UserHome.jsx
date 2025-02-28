import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../../css/pages/AdminHome.css'
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, getAuthHeaders } from '../../config/api';


const UserHome = () => {
  const [project,setProject] = useState([]);

  const navigate = useNavigate();

  const toGroups = (id) => {
    navigate("/user/groups",{ state:{id} });
  }

  const projectApiUrl = `${API_BASE_URL}/user-projects`;


  //プロジェクト一覧のフェッチ
  const fetchProjects = async () => {
    try {
      const res = await axios.get( projectApiUrl,{
        headers: getAuthHeaders()
      })
      setProject(res.data);
    }catch (e) {
        console.error("プロジェクト取得に失敗しました。")
    }
  }

  // 更新時
  useEffect(() => {
      fetchProjects();
    },[]
  )


  return (
    <>
      <div className='home'>ホーム</div>
      <div className='project_page'>
        <div className='project_container'>
          {project.map((project) => (
            <div className='project' key={project.id} onClick={() => toGroups(project.id)}>
              <div>
                <h1> {project.project_name} </h1>
                <p className='created_date'>{new Date(project.created_at).toLocaleDateString()}</p>
                <p>8つのグループ</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>

  )
}

export default UserHome
