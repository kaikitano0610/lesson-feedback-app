import React, { useCallback, useEffect, useState } from 'react'
import { API_BASE_URL, getAuthHeaders } from '../config/api'
import axios from 'axios'
import { Navigate, useLocation, useNavigate, useParams } from 'react-router-dom'
import "../../css/pages/VideoList.css";
import AddVideoPopup from './AddVideoPopup';

const VideoList = () => {

  const navigate = useNavigate();
  const videoApiUrl = `${API_BASE_URL}/groups`
  const {groupId} = useParams() 
  const [video, setVideo] = useState([]);
  const [error ,setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState();
  const [isOpenAdd , setIsOpenAdd] = useState(false);
  const [isOpenEdit , setIsOpenEdit] = useState(false);


  const fetchVideos = useCallback( async () => {
    setLoading(true);
    setLoadingMessage("読み込み中...")
    try {
      const res = await axios.get(`${videoApiUrl}/${groupId}/videos`,{
        headers: getAuthHeaders()
      })
      setVideo(res.data);
    }catch(e){
      console.log("投稿の取得に失敗しました。",e)
      setError("投稿の取得に失敗しました。")
    }
    setLoading(false);
  },[groupId])

  useEffect(() => {
    if (!groupId){
      navigate('/user/home');
    } else{
      fetchVideos();
    }
  },[groupId,navigate,fetchVideos])

  if (error){
    return(
      <div>
        <p>{error}</p>
      </div>
    )
  }

  if (loading){
    return (
      <div>
        <p>{loadingMessage}</p>
      </div>
    )
  }

  const handleAddVideo = () => {
    setIsOpenAdd(true);
  }


  return (
    <>
    {video && video.length > 0 ? (
      <>
        <div className='title'>○班の授業一覧</div>
        <div className='videos_container'>
          {video.map((video)=>{
            const date = new Date(video.created_at);
            const formattedDate = date.toLocaleDateString('ja-JP', {
              year: 'numeric',
              month: '2-digit',
              day: '2-digit',
            });

            return(
              <div className='video_card' key={video.id}>
                <div className='video_card_content'>
                  <h3 className='video_title'>{video.title}</h3>
                  <div className='video_card_details'>
                    <span className='video_card_detail subject'>教科：{video.subject}</span>
                    <span className='video_card_detail school_type'>校種：{video.school_type}</span>
                    <span className="video_card_detail grade">学年：{video.grade}</span>
                  </div>
                </div>
                <div className="video_date">{formattedDate}</div>
              </div>
            )
          })}
          <div className='add_video'>
            <p onClick={handleAddVideo}>追加</p>
          </div>
        </div>
      </>
  
    ):(
      <>
        <div className='title'>○班の授業一覧</div>
        <p>授業動画の投稿がまだありません</p>
        <div className='add_video'>
            <p onClick={handleAddVideo}>追加</p>
        </div>
      </>  
    )}
    {/* 追加ボタンが押されたら表示 */}
    {isOpenAdd && (
      <AddVideoPopup
        setIsOpenAdd = {setIsOpenAdd} 
        groupId = {groupId}
      />
      
    )}
    </>
  )

}

export default VideoList
