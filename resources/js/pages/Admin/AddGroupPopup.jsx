import axios from 'axios'
import React, { useState } from 'react'
import { API_BASE_URL } from '../../config/api';

const AddGroupPopup = ({setIsOpenAdd ,projectId, fetchGroups}) => {
    const [formData , setFormData] = useState({
        group_name: "",
        project_id: projectId
    })
    const token = localStorage.getItem('token');
    const groupApiUrl = `${API_BASE_URL}/groups`;

    const handleChange = (e) => {
        setFormData({...formData,group_name: e.target.value})
    }

    const headers = {
        'Content-Type': 'application/json',
        'Authorization':`Bearer ${token}`
    }

    const handleSaveGroup = async(e) => {
        e.preventDefault();
        console.log(formData)

        if(!formData.group_name){
            alert("グループ名を入力してください。")
            return
        }
        try{
            const response = await axios.post(groupApiUrl,formData,{ headers });
            setIsOpenAdd(false);
            fetchGroups();
        }catch{

        }
    }

    const handleNotAddGroup = () => {
        setIsOpenAdd(false);
    }

  return (
    <>
        <div className="popup_container">
            <h2>新しいグループの作成</h2>
            <form onSubmit={handleSaveGroup}>
                <label htmlFor="group_name">グループ名</label>
                <input 
                    type="text"
                    id='group_name'
                    name='group_name'
                    value={formData.group_name}
                    onChange={handleChange}
                />
                <button onClick={handleNotAddGroup}>キャンセル</button>
                <button type='submit'>保存</button>
            </form>
        </div>
    </>
  )
}

export default AddGroupPopup
