import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { API_BASE_URL, getAuthHeaders } from '../../config/api';

const EditGroupPopup = ({setIsOpenEdit, groupName ,projectId, fetchGroups ,groupId}) => {
    //全てのユーザー
    const [allUser , setAllUser] = useState([]);
    //グループに所属しているユーザー
    const [groupUserId, setGroupUserId] = useState([]);
    //ユーザーの追加作業後のユーザー初期値は同上。
    const [newGroupUserId, setNewGroupUserId] = useState([]);

    const [formDataGroup , setFormDataGroup] = useState({
        group_name: groupName,
        project_id: projectId
    })


    const groupApiUrl = `${API_BASE_URL}/groups`;
    const userApiUrl = `${API_BASE_URL}/users`;
    const userGroupApiUrl = `${API_BASE_URL}/user-groups`;

    
    const handleChange = (e) => {
        setFormDataGroup({...formDataGroup,group_name: e.target.value})
    }

    //チェック変更時
    const handleToggleUser = (userId) => {
        //もともと含まれているならチェックを外す
        if(newGroupUserId.includes(userId)){
            setNewGroupUserId(prev => prev.filter(id => id !== userId))
        }else{
            setNewGroupUserId(prev => [...prev,userId])
        }
    }


    //保存が押された時の処理
    const handleEditGroup = async(e) => {
        e.preventDefault();
        // 追加されるuserIdを絞り込む
        const added = newGroupUserId.filter(id => !groupUserId.includes(id));
        //　削除されるuserIdを絞り込む
        const removed = newGroupUserId.filter(id => !newGroupUserId.includes(id));
    
        if(!formDataGroup.group_name){
            alert("グループ名を入力してください。")
            return
        }
        try{
            const response = await axios.put(`${groupApiUrl}/${groupId}`,formDataGroup,{ headers:getAuthHeaders() });
            fetchGroups();
        }catch(error){
            console.error("グループ更新失敗：", error)
            alert("グループの更新に失敗しました。")
        }

        added.forEach(id => {
            axios.post(userGroupApiUrl, { group_id: groupId, user_id: id },{ headers:getAuthHeaders() });
        });
        removed.forEach(id => {
            axios.post(userGroupApiUrl, { group_id: groupId, user_id: id },{ headers:getAuthHeaders() });
        });

        setIsOpenEdit(false);


    }

    //キャンセルが押された時の処理
    const handleNotEditGroup = () => {
        setIsOpenEdit(false);
    }

    useEffect(()=>{
        //全ユーザーの取得
        const allUserData = async() => {
            const res = await axios.get(userApiUrl,{
                headers:getAuthHeaders()
            })
            setAllUser(res.data);
        };
        //選択されたグループのユーザーの取得
        const groupUserData = async() => {
            const res = await axios.get(`${userGroupApiUrl}/${groupId}`,{
                headers:getAuthHeaders()
            })
            const userIds = res.data.users?.map(user => user.id) || [];
            setGroupUserId(userIds);
            setNewGroupUserId(userIds);
        }

        allUserData();
        groupUserData();
    },[])

  return (
    <>
        <div className="popup_container">
            <h2>グループの編集</h2>
            <form onSubmit={handleEditGroup}>
                <label htmlFor="group_name">グループ名</label>
                <input 
                    type="text"
                    id='group_name'
                    name='group_name'
                    value={formDataGroup.group_name}
                    onChange={handleChange}
                />
                <div>
                    <p>追加するユーザーをチェックしてください。</p>
                    <p>メンバー：○人</p>
                    <br />
                    <div className='select_user'>
                        <hr />
                        {allUser?.map((user) => {
                            const isChecked = newGroupUserId?.includes(user.id);
                            return (
                            <div key={user.id}>
                                <label htmlFor={user.id}>
                                    <input 
                                    className='checkbox' 
                                    type="checkbox" id={user.id} 
                                    name='name' 
                                    checked={isChecked}
                                    onChange={() => handleToggleUser(user.id)}
                                    />
                                    {user.name}
                                </label>
                                <hr />
                            </div>
                            )
                        })}
                    </div>

                </div>
                <div className="popup_button_container">
                    <div className='btn secondary' onClick={handleNotEditGroup}>キャンセル</div>
                    <button className='btn submit' type='submit'>保存</button>
                </div>
            </form>
        </div>
    </>
  )
}

export default EditGroupPopup
