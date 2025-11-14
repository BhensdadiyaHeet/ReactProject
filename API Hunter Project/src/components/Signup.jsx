import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';

export default function Signup() {

    const [formdata, setFormdata] = useState({})
    const [record, setRecord] = useState([])
    const navigate = useNavigate();

    useEffect(() => {
        fetchRecord();
    }, [])

    const handleChange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        })
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!formdata.email || !formdata.password || !formdata.fullName || !formdata.username) {
            alert("Please fill in all fields");
            return;
            navigate('/');
        }


        await axios.post("http://localhost:5000/users", formdata).then(res => {
            setFormdata({
                email: "",
                password: "",
                fullName: "",
                username: ""
            })
            navigate('/login');
        })
    }

    const fetchRecord = async () => {
        await axios.get("http://localhost:5000/users").then(res => {
            setRecord(res.data)
        })
    }

    return (
        <div className='bg-[#F0F2F5] w-full min-h-screen flex justify-center items-center py-9'>
            <div className='max-w-6xl w-full flex justify-center items-center gap-8 px-4'>
                <div className='hidden lg:block flex-1 max-w-[500px]'>
                    <div className='text-[#1877F2] text-6xl font-bold mb-4'>facebook</div>
                    <p className='text-2xl leading-relaxed'>Facebook helps you connect and share with the people in your life.</p>
                </div>
                <div className='w-full max-w-[400px]'>
                    <div className='bg-white rounded-lg shadow-lg p-6 mb-4'>
                        <form className='flex flex-col gap-3'>
                            <input 
                                className='bg-white w-full h-12 px-4 border border-gray-300 rounded-md text-base focus:outline-none focus:border-[#1877F2]' 
                                type="text" 
                                value={formdata.fullName} 
                                name="fullName" 
                                placeholder='Full Name' 
                                onChange={handleChange} 
                            />
                            <input 
                                className='bg-white w-full h-12 px-4 border border-gray-300 rounded-md text-base focus:outline-none focus:border-[#1877F2]' 
                                type="text" 
                                value={formdata.username} 
                                name="username" 
                                placeholder='Username' 
                                onChange={handleChange} 
                            />
                            <input 
                                className='bg-white w-full h-12 px-4 border border-gray-300 rounded-md text-base focus:outline-none focus:border-[#1877F2]' 
                                type="email" 
                                value={formdata.email} 
                                name="email" 
                                placeholder='Mobile number or email' 
                                onChange={handleChange} 
                            />
                            <input 
                                className='bg-white w-full h-12 px-4 border border-gray-300 rounded-md text-base focus:outline-none focus:border-[#1877F2]' 
                                type="password" 
                                value={formdata.password} 
                                name="password" 
                                placeholder='New password' 
                                onChange={handleChange} 
                            />
                            <p className='text-xs text-gray-600 mt-2'>People who use our service may have uploaded your contact information to Facebook. <span className='text-[#1877F2] cursor-pointer hover:underline'>Learn more</span></p>
                            <p className='text-xs text-gray-600'>By clicking Sign Up, you agree to our <span className='text-[#1877F2] cursor-pointer hover:underline'>Terms</span>, <span className='text-[#1877F2] cursor-pointer hover:underline'>Privacy Policy</span> and <span className='text-[#1877F2] cursor-pointer hover:underline'>Cookies Policy</span>. You may receive SMS notifications from us and can opt out at any time.</p>
                            <button 
                                onClick={handleSubmit} 
                                className='bg-[#42B72A] hover:bg-[#36A420] cursor-pointer text-white text-base font-bold rounded-md h-12 w-full mt-2'
                            >
                                Sign Up
                            </button>
                        </form>
                    </div>
                    <div className='bg-white rounded-lg shadow-lg p-6 text-center'>
                        <p className='text-sm'>Have an account?</p>
                        <Link to="/login">
                            <button className='bg-[#1877F2] hover:bg-[#166FE5] text-white text-base font-semibold rounded-md h-12 w-full mt-4 cursor-pointer'>
                                Log in
                            </button>
                        </Link>
                    </div>
                </div>x
            </div>
        </div>
    )
}