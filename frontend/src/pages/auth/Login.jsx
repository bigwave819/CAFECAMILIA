import React, { useState } from 'react'
import useLogin from '../../hooks/useLogin';
import { useNavigate, Link } from "react-router-dom"

const Login = () => {
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { login, error, loading } = useLogin();

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        login(email, password);
        setEmail("");
        setPassword("")
        navigate("/");
    }
  return (
    <div className='w-full h-screen flex justify-center items-center '>
        <div className='p-10 border shadow-lg flex flex-col w-[600px]'>
            <form onSubmit={handleSubmit}>
                <label>Email</label><br/>
                <input 
                type="email" 
                placeholder='Email'
                className='input'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                /><br/>
                 <label>Password</label><br/>
                <input 
                type="password" 
                placeholder='Password'
                className='input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /><br/>
                <p className='space-x-10'>Don't have an account? <Link to="/signup" className='hover:underline duration-500 ease-in text-purple-900'>Signup</Link></p>
                <button className='submit-btn'> 
                    { loading ? "logging in...." : "Login" }
                </button>
                { error && <p className='text-red-600'>{ error }</p> }
            </form>
        </div>
    </div>
  )
}

export default Login