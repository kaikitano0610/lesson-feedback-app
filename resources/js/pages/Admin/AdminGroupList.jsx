import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import "../../../css/pages/AdminHome.css"
import AddGroupPopup from './AddGroupPopup';
import EditGroupPopup from './EditGroupPopup';

const AdminGroupList = () => {

  const navigate = useNavigate();
  const [group,setGroup] = useState([]);
  const [isOpenAdd , setIsOpenAdd] = useState(false);
  const [isOpenEdit , setIsOpenEdit] = useState(false);
  const [groupName , setGroupName] = useState(null)
  const [selectedGroupId , setSelectedGroupId] = useState(null);
  const token = localStorage.getItem('token');
  const location = useLocation();
  const projectId = location.state?.id;

  useEffect(() => {
    // projectId が存在しない (＝ location.state?.id が undefined) 場合はリダイレクト
    if (!projectId) {
      navigate('/admin/home');
    }
  }, [projectId, navigate]);

  const headers = {
    'Content-Type': 'application/json',
    'Authorization':`Bearer ${token}`
  }

  //グループを作成するポップアップを開く
  const handleAddGroup = () => {
    setIsOpenAdd(true);
  }

  //グループ一覧のフェッチ
  const fetchGroups = async () => {
    try {
      const res = await axios.get(`http://127.0.0.1:8000/api/projects/${projectId}`,{
        headers: headers
      })
      setGroup(res.data.groups);
    }catch(e) {
      console.log("グループの取得に失敗しました。")
    }
  }

  //更新時
  useEffect(() => {
    fetchGroups();
  },[])

  // グループ削除
  const deleteGroup = async(id) =>{
    if(window.confirm("本当に削除しますか？")){
      await axios.delete(`http://127.0.0.1:8000/api/groups/${id}`,{
        headers:headers
      })
      fetchGroups();
    }
  }

  // グループ編集のポップアップを開く
  const handleEditGroup = (group_name,id) => {
    setIsOpenEdit(true);
    setSelectedGroupId(id);
    setGroupName(group_name);
  }

  return (
  <>
    {group && group.length > 0 ? (
      <>
        <div className='home'>グループ一覧</div>
        <div className='group_page'>
          <div className='group_container'>
            {group.map((group) => (
              <div className='group' key={group.id}>
                <div>
                  <h1> {group.group_name} </h1>
                  <p>○人のメンバー</p>
                </div>
                <div className="button_container">
                  <div className='edit_button' onClick={(e) => {
                    e.stopPropagation();
                    handleEditGroup(group.group_name , group.id)
                    }}>編集</div>
                  <div className='delete_button' onClick={(e) => {
                    e.stopPropagation();
                    deleteGroup(group.id)
                  }}>削除</div>
                </div>
              </div>
            ))}
            <div className='add_group'>
              <p onClick={handleAddGroup}>追加</p>
            </div>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className='home'>グループ一覧</div>
        <p>グループを追加してください。</p>
        <div className='add_group'>
          <p onClick={handleAddGroup}>追加</p>
        </div>
      </>
    )}
    {/* 追加ボタンが押されたら表示 */}
    {isOpenAdd && (
      <AddGroupPopup 
      setIsOpenAdd = {setIsOpenAdd} 
      projectId = {projectId}
      fetchGroups = {fetchGroups}
      />
    )}
    {/* 編集ボタンが押されたら表示 */}
    {isOpenEdit && (
      <EditGroupPopup 
      setIsOpenEdit={setIsOpenEdit} 
      projectId={projectId} 
      fetchGroups={fetchGroups} 
      groupName={groupName}
      groupId={selectedGroupId}/>
    )}
  </>

  )
}

export default AdminGroupList