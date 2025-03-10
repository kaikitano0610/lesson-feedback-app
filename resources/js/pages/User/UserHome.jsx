import axios from 'axios';
import React, { useCallback, useEffect, useState } from 'react';
import '../../../css/pages/AdminHome.css'
import { useNavigate } from 'react-router-dom';
import { API_BASE_URL, getAuthHeaders } from '../../config/api';


const UserHome = () => {
  const [project,setProject] = useState([]);
  const [error,setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loadingMessage, setLoadingMessage] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [lastPage, setLastPage] = useState(1);

  const navigate = useNavigate();

  const toGroups = (id) => {
    navigate("/user/groups",{ state:{id} });
  }

  const projectApiUrl = `${API_BASE_URL}/user-projects`;


  //プロジェクト一覧のフェッチ
  const fetchProjects = useCallback( async () => {
    setLoadingMessage("読み込み中...");
    setLoading(true);
    try {
      const res = await axios.get( `${projectApiUrl}?page=${currentPage}`,{
        headers: getAuthHeaders()
      })
      setLastPage(res.data.last_page);
      setProject(res.data.data);
    }catch (e) {
        console.error("プロジェクト取得に失敗しました。")
        setError("プロジェクトの取得に失敗しました。")
    }
    setLoading(false)
  },[currentPage])

  // 更新時
  useEffect(() => {
      fetchProjects();
    },[fetchProjects]
  )

  //ローディング中
  if(loading){
    return(
      <div>
        <p>{loadingMessage}</p>
      </div>
    )
  }
  
  //取得失敗
  if(error){
    return(
      <div>
        <p>{error}</p>
      </div>
    )
  }

  //ページネーションについて
  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  }

  const pagination = () => {
    const pageNumbers = [];
    for (let i = 1 ; i <= lastPage; i++){
      pageNumbers.push(
        <button className='paginationBtn' key={i} onClick={()=> handlePageChange(i)} disabled={currentPage === i}>
          {i}
        </button>
      )
    }
    return <div>{pageNumbers}</div>;
  }


  return (
    <>
    {project && project.length > 0 ? (
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
          {pagination()}
        </div>
      </>
    ) : (
      <div>
        <p>表示できるプロジェクトがありません。</p>
      </div>
    )}
    </>
  )
}

export default UserHome
