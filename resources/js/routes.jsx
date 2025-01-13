import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import AdminHome from './pages/Admin/AdminHome';
import GroupList from './pages/Admin/GroupList';
import VideoList from './pages/Admin/VideoList';
import VideoDetail from './pages/Admin/VideoDetail';
import UserHome from './pages/User/UserHome';

const AppRoutes = () => {
    return (
        <BrowserRouter>
            <Routes>
                {/* 管理者ルート */}
                <Route path="/admin/home" element={<AdminHome />} />
                <Route path="/admin/groups" element={<GroupList />} />
                <Route path="/admin/videos" element={<VideoList />} />
                <Route path="/admin/videos/:id" element={<VideoDetail />} />

                {/* ユーザールート */}
                <Route path="/user/home" element={<UserHome />} />
                <Route path="/user/videos/:id" element={<VideoDetail />} />
            </Routes>
        </BrowserRouter>
    );
};

export default AppRoutes;
