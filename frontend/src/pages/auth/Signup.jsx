import React, { useState } from 'react'
import { useNavigate, Link } from "react-router-dom"
import useSignUp from '../../hooks/useSignup';

const Login = () => {
    const [ username, setUsername ] = useState('');
    const [ email, setEmail ] = useState('');
    const [ password, setPassword ] = useState('');
    const { signup, error, loading } = useSignUp();

    const navigate = useNavigate()

    const handleSubmit = (e) => {
        e.preventDefault();
        signup(username, email, password);
        setUsername("")
        setEmail("");
        setPassword("")
        navigate("/");
    }
  return (
    <div className='w-full h-screen flex justify-center items-center p-5'>
        <div className='p-10 border shadow-lg flex flex-col w-[600px]'>
            <form onSubmit={handleSubmit}>
                <label>Username</label><br/>
                <input 
                type="text" 
                placeholder='Username'
                className='input'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                /><br/>
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
                type="pasword" 
                placeholder='Password'
                className='input'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                /><br/>
                <p className='space-x-10'>Do you Have an Account <Link to="/login" className='hover:underline duration-500 ease-in text-purple-900'>Login</Link></p>
                <button className='submit-btn'> 
                    { loading ? "Signing Up...." : "SignUp" }
                </button>
                { error && <p className='text-red-600'>{ error }</p> }
            </form>
        </div>
    </div>
  )
}

export default Login