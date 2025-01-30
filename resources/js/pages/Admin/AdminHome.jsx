import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../../css/pages/AdminHome.css'
import { useNavigate } from 'react-router-dom';
import AddProjectPopup from './AddProjectPopup';


const AdminHome = () => {
  const [project,setProject] = useState([]);
  const [isOpen , setIsOpen] = useState(false);
  const token = localStorage.getItem('token');

  const headers = {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`
  }

  const navigate = useNavigate();

  const toGroups = (id) => {
    navigate("/admin/groups",{ state:{id} });
  }

  // プロジェクトを作成するダイアログを開く
  const handleAddProject = () => {
    setIsOpen(true);
  }
  const fetchProjects = async () => {
    try {
      const res = await axios.get( "http://127.0.0.1:8000/api/projects",{
        headers: headers
      })
      setProject(res.data);
    }catch (e) {
        console.error("プロジェクト取得に失敗しました。")
    }
  }

  useEffect(() => {
      fetchProjects();
    },[]
  )

  //プロジェクトの追加後もフェッチ
  const onprojectAdded = () => {
    fetchProjects();
    setIsOpen(false);
  }

  return (
    <>
      <div className='home'>ホーム</div>
      <div className='project_page'>
        <div className='project_container'>
          {project.map((project) => (
            <div className='project' key={project.id} onClick={() => toGroups(project.id)}>
              <h1> {project.project_name} </h1>
              <p className='created_date'>{new Date(project.created_at).toLocaleDateString()}</p>
              <p>8つのグループ</p>
            </div>
          ))}
          <div className='add_project' onClick={handleAddProject}>追加</div>
          {isOpen && (
            <AddProjectPopup setIsOpen={setIsOpen} onprojectAdded={onprojectAdded} />
            )
          }
        </div>
      </div>
    </>

  )
}

export default AdminHome