import React, { useEffect, useState } from 'react'
import { API_BASE_URL, getAuthHeaders } from '../config/api'
import axios from 'axios';
import "../../css/components/popup.css"

const AddVideoPopup = ({setIsOpenAdd,groupId}) => {
    const videoApiUrl = `${API_BASE_URL}/videos`;
    const [formData , setFormData] = useState({
        title: "",
        youtube_link: "",
        subject: "",
        school_type: "",
        grade: "",
        pdf_path: "",
    });

    const handleSaveVideo = async(e) => {
        e.preventDefault();
        if(!formData.title || !formData.youtube_link || !formData.subject || !formData.school_type || !formData.grade || !formData.pdf_path){
            alert("すべての項目を入力してください。")
            return
        }
        try{
            await axios.post(videoApiUrl, {...formData, group_id:groupId }, {headers: getAuthHeaders()});
            setIsOpenAdd(false);
        }catch(e){
            console.log("動画の保存に失敗しました。")
            console.error(e);
        }
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    }

    const formFields = [
        { name: 'title', label: '動画名' },
        { name: 'youtube_link', label: 'Youtubeリンク' },
        { name: 'subject', label: '教科' },
        { name: 'school_type', label: '校種' },
        { name: 'grade', label: '学年' },
        { name: 'pdf_path', label: 'PDF（仮）' }
    ];
    
    return (
        <div className="popup_container">
            <div className="popup_content">
                <h2>新しい動画の作成</h2>
                <form onSubmit={handleSaveVideo}>
                    {formFields.map((field) => (
                        <div className="form_group" key={field.name}>
                            <label htmlFor={field.name}>{field.label}</label>
                            <input
                                type="text"
                                id={field.name}
                                name={field.name}
                                value={formData[field.name]}
                                onChange={handleChange}
                            />
                        </div>
                    ))}
                    <div className="form_actions">
                        <button onClick={() => setIsOpenAdd(false)}>キャンセル</button>
                        <button type='submit'>保存</button>
                    </div>
                </form>
            </div>
        </div>
    )
}

export default AddVideoPopup