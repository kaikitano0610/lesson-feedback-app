import React, { useEffect, useState } from 'react'
import { API_BASE_URL, getAuthHeaders } from '../config/api'
import axios from 'axios';

const AddVideoPopup = ({setIsOpenAdd,groupId}) => {
    const videoApiUrl = `${API_BASE_URL}/videos`;
    const [formData , setFormData] = useState({
        title: "",
        youtube_link: "",
        subject: "",
        school_type: "",
        grade: "",
        pdf_path: "",
        group_id: null
    });

    useEffect(()=> {
        setFormData((prevData) => ({
            ...prevData,
            group_id: groupId
        }));
    },[groupId])

    const handleSaveVideo = async(e) => {
        e.preventDefault();
        if(!formData.title || !formData.youtube_link || !formData.subject || !formData.school_type || !formData.grade || !formData.pdf_path){
            alert("すべての項目を入力してください。")
            return
        }
        try{
            await axios.post(videoApiUrl, formData, {headers: getAuthHeaders()});
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
    return (
        <div className="popup_container">
            <div className="popup_content">
                <h2>新しい動画の作成</h2>
                <form onSubmit={handleSaveVideo}>
                    <div className="form_group">
                        <label htmlFor="title">動画名</label>
                        <input
                            type="text"
                            id='title'
                            name='title'
                            value={formData.title}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="youtube_link">Youtubeリンク</label>
                        <input
                            type="text"
                            id='youtube_link'
                            name='youtube_link'
                            value={formData.youtube_link}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="subject">教科</label>
                        <input
                            type="text"
                            id='subject'
                            name='subject'
                            value={formData.subject}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="school_type">校種</label>
                        <input
                            type="text"
                            id='school_type'
                            name='school_type'
                            value={formData.school_type}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="grade">学年</label>
                        <input
                            type="text"
                            id='grade'
                            name='grade'
                            value={formData.grade}
                            onChange={handleChange}
                        />
                    </div>
                    <div className="form_group">
                        <label htmlFor="pdf_path">PDF（仮）</label>
                        <input
                            type="text"
                            id='pdf_path'
                            name='pdf_path'
                            value={formData.pdf_path}
                            onChange={handleChange}
                        />
                    </div>
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