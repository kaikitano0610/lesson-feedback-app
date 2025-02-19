import axios from 'axios';
import React from 'react'
import { useState } from 'react';
import "../../css/pages/Login.css"
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [email,setEmail] = useState("");
  const [password,setPasword] = useState("");
  const [error,setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    try {
    const response = await axios.post("http://localhost/api/login",{
      email,
      password,
    })
    //ローカルストレージにトークンを追加
    localStorage.setItem("token",response.data.token);
    console.log("ログイン成功！")

    if (response.data.role === "admin") {
      navigate("/admin/home");
    } else if (response.data.role === "general") {
      navigate("/user/home");
    }
    } catch(error){
      setError("ログインに失敗しました。メールアドレスまたはパスワードを確認してください。")
    }
  }
  

  return (
    <div className='login-container'>
      <p className='login-error-message'>{error}</p>
      <h1>ログイン</h1>
      <form onSubmit={handleLogin}>
        <div>
          <label htmlFor='email'>メールアドレス</label>
          <input
            id='email' 
            type="email" 
            value={email} 
            onChange={(e) => setEmail(e.target.value)} 
            required
          />
        </div>
        <div>
          <label htmlFor="password">パスワード</label>
          <input 
            id='password' 
            type="password" 
            value={password}
            onChange={(e) => setPasword(e.target.value)}
            required
          />
        </div>
        <button type='submit'>ログイン</button>
      </form>
    </div>
  );
};

export default Login
