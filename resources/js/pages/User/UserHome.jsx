import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../../css/pages/AdminHome.css'
import { useNavigate } from 'react-router-dom';


const UserHome = () => {

  const [project,setProject] = useState([]);
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`
  }

  const navigate = useNavigate();

  const toGroups = (id) => {
    navigate("/user/groups",{ state:{id} });
  }

  //所属しているプロジェクトのフェッチ
  const fetchProjects = async () => {
    try {
      const res = await axios.get( "http://127.0.0.1:8000/api/user/projects",{
        headers: headers
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
        {project == 0 && (
          <p>所属しているグループがまだありません。</p>
        )}
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