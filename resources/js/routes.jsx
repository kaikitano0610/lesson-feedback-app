import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHome from './pages/Admin/AdminHome';
import AdminGroupList from './pages/Admin/AdminGroupList.jsx';
import VideoList from './pages/VideoList';
import VideoDetail from './pages/VideoDetail';
import UserHome from './pages/User/UserHome';
import UserGroupList from './pages/User/UserGroupList';
import Login from './pages/Login.jsx'

// 404ページコンポーネント
const NotFound = () => {
    return (
        <div>
            <h1>404 - ページが見つかりません</h1>
            <p>指定されたURLは存在しません。</p>
        </div>
    );
};

const AppRoutes = () => {
    return (
            <Routes>
                {/* 管理者ルート */}
                <Route path="/admin/home" element={<AdminHome />} />
                <Route path="/admin/groups" element={<AdminGroupList />} />

                {/* ユーザールート */}
                <Route path="/user/home" element={<UserHome />} />
                <Route path="/user/groups" element={<UserGroupList />} />

                {/* 共通のルート */}
                <Route path="/groups/:groupId/videos" element={<VideoList />} />
                <Route path="/videos/:id" element={<VideoDetail />} />

                {/* ログイン */}
                <Route path="/login" element={<Login />} />


                {/* 未定義ルート */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        );
};

export default AppRoutes;
