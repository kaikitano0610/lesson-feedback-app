import React from 'react';
import { Routes, Route } from 'react-router-dom';
import AdminHome from './pages/Admin/AdminHome';
import GroupList from './pages/Admin/GroupList';
import VideoList from './pages/Admin/VideoList';
import VideoDetail from './pages/Admin/VideoDetail';
import UserHome from './pages/User/UserHome';
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
                <Route path="/admin/groups" element={<GroupList />} />
                <Route path="/admin/videos" element={<VideoList />} />
                <Route path="/admin/videos/:id" element={<VideoDetail />} />

                {/* ユーザールート */}
                <Route path="/user/home" element={<UserHome />} />
                <Route path="/user/videos/:id" element={<VideoDetail />} />

                {/* ログイン */}
                <Route path="/login" element={<Login />} />


                {/* 未定義ルート */}
                <Route path="*" element={<NotFound />} />
            </Routes>
        );
};

export default AppRoutes;
