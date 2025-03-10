import axios from 'axios';
import React, { useState } from 'react'
import { API_BASE_URL, getAuthHeaders } from '../../config/api';

const EditProjectPopup = ({setIsOpenEdit,fetchProjects,projectId,project_name}) => {

    const [formData,setFormData] = useState({
        project_name:project_name,
    });

    const projectApiUrl = `${API_BASE_URL}/projects`;

    const handleChange = (e) =>{
        setFormData({...formData,project_name: e.target.value});
    }
    const handleEditProject = async(e) =>{
        e.preventDefault();

        if(!formData.project_name){
            alert("プロジェクト名を入力してください！")
            return
        }
        try{
            const response = await axios.put(`${projectApiUrl}/${projectId}`,formData, {
                headers:getAuthHeaders()
            });
            console.log("更新したプロジェクト名：", response.data);
            setIsOpenEdit(false);
            fetchProjects();
        }catch (error){
            console.error("プロジェクト更新失敗：", error)
            alert("プロジェクトの更新に失敗しました。")
        }
    }

    const handleNotEditProject = () => {
        setIsOpenEdit(false);
    }

  return (
    <>
        <div className='popup_container'>
            <h2>プロジェクト名の編集</h2>
            <form className='form' onSubmit={handleEditProject}>
                <label htmlFor="project">プロジェクトの名前を入力してください。</label>
                <input 
                    type="text"
                    id='project'
                    name='project_name'
                    value={formData.project_name}
                    onChange={handleChange}
                />
                <div className="popup_button_container">
                    <div className='btn secondary' onClick={handleNotEditProject}>キャンセル</div>
                    <button className='btn submit' type='submit'>保存</button>
                </div>
            </form>
        </div>
    </>

  )
}

export default EditProjectPopup
