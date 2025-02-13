import axios from 'axios';
import React, { useState } from 'react'

const AddProjectPopup = ({setIsOpenAdd,fetchProjects}) => {
    const token = localStorage.getItem('token');
    const [formData, setFormData] = useState({
        project_name:'',
    })

    const headers = {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
    }

    const apiUrl = 'http://127.0.0.1:8000/api/projects';

    const handleChange = (e) =>{
        setFormData({...formData,project_name: e.target.value});
    }
    const handleSaveProject = async(e) =>{
        e.preventDefault();

        if(!formData.project_name){
            alert("プロジェクト名を入力してください！")
            return
        }
        
        try{
            const response = await axios.post(apiUrl,formData, { headers });
            setIsOpenAdd(false);
            fetchProjects();
        }catch (error){
            console.error("プロジェクト作成失敗：", error)
            alert("プロジェクトの作成に失敗しました。")
        }
    }

    const handleNotAddProject = () => {
        setIsOpenAdd(false);
    }

    return (
        <>
            <div className='popup_container'>
                <h2>新しいプロジェクトの作成</h2>
                <form onSubmit={handleSaveProject}>
                    <label htmlFor="project">追加するプロジェクトの名前を入力してください。</label>
                    <input 
                        type="text"
                        id='project'
                        name='project_name'
                        value={formData.project_name}
                        onChange={handleChange}
                    />
                    <button onClick={handleNotAddProject}>キャンセル</button>
                    <button type='submit'>保存</button>
                </form>
            </div>
        </>
    )
}

export default AddProjectPopup