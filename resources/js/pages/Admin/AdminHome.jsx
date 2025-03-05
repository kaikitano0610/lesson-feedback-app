import axios from 'axios';
import React, { useEffect, useState } from 'react';
import '../../../css/pages/AdminHome.css'
import { useNavigate } from 'react-router-dom';
import AddProjectPopup from './AddProjectPopup';
import EditProjectPopup from './EditProjectPopup';
import { API_BASE_URL, getAuthHeaders } from '../../config/api';


const AdminHome = () => {
  const [project,setProject] = useState([]);
  const [isOpenAdd , setIsOpenAdd] = useState(false);
  const [isOpenEdit , setIsOpenEdit] = useState(false);
  const [selectedProjectId, setSelectedProjectId] = useState(null);
  const [projectName , setProjectName] = useState();


  const navigate = useNavigate();

  const toGroups = (id) => {
    navigate("/admin/groups",{ state:{id} });
  }

  const projectApiUrl = `${API_BASE_URL}/projects`;

  // プロジェクトを作成するポップアップを開く
  const handleAddProject = () => {
    setIsOpenAdd(true);
  }

  //プロジェクトを編集するポップアップを開く
  const handleEditProject = (id,project_name) => {
    setSelectedProjectId(id);
    setIsOpenEdit(true);
    setProjectName(project_name);
  }

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

  //プロジェクトの削除
  const deletProject = async(id) => {
    if(window.confirm("本当に削除しますか？")){
      await axios.delete(`${projectApiUrl}/${id}`,{
        headers: getAuthHeaders()
      })
      fetchProjects();
    }
  }

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
              <div className='button_container'>
                <div className='edit_button' onClick={(e) =>{
                  e.stopPropagation();
                  handleEditProject(project.id,project.project_name);
                }}>編集</div>
                <div className='delete_button' onClick={(e) =>{
                  e.stopPropagation();
                  deletProject(project.id);
                }}>削除</div>
              </div>
            </div>
          ))}
          <div className='add_project' onClick={handleAddProject}>追加</div>
          {isOpenAdd && (
            <AddProjectPopup setIsOpenAdd={setIsOpenAdd} fetchProjects={fetchProjects}/>
            )
          }
          {isOpenEdit && (
            <EditProjectPopup 
              setIsOpenEdit={setIsOpenEdit} 
              fetchProjects={fetchProjects}
              projectId={selectedProjectId}
              project_name={projectName}
            />
          )}
        </div>
      </div>
    </>

  )
}

export default AdminHome
