import React, { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios';

export default function Login() {

    const [showPassword, setShowPassword] = useState(false);
    const [formdata, setFormdata] = useState({});
    const [users, setUsers] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        fetchUsers();
    }, []);

   const fetchUsers = async () => {
        await axios.get("http://localhost:5000/users").then(res => {
            setUsers(res.data)
        })
    }

    const handleChange = (e) => {
        setFormdata({
            ...formdata,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const user = users.find(item => 
            (item.email === formdata.email || item.username === formdata.email) && 
            item.password === formdata.password
        );

        if (user) {
            navigate('/insta-page');
        } else {
            setFormdata({
                email: "",
                password: ""
            });
            alert("Invalid email/username or password");
        }
    };

    return (
        <div className='bg-[#F0F2F5] w-full min-h-screen flex justify-center items-center py-8'>
            <div className='max-w-6xl w-full flex justify-center items-center gap-8 px-4'>
                <div className='hidden lg:block flex-1 max-w-[500px]'>
                    <div className='text-[#1877F2] text-6xl font-bold mb-4'>facebook</div>
                    <p className='text-2xl leading-relaxed'>Facebook helps you connect and share with the people in your life.</p>
                </div>
                <div className='w-full max-w-[400px]'>
                    <div className='bg-white rounded-lg shadow-lg p-6'>
                        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
                            <input 
                                className="bg-white w-full h-12 px-4 border border-gray-300 rounded-md text-base focus:outline-none focus:border-[#1877F2]" 
                                type="text" 
                                name="email" 
                                placeholder="Email address or phone number" 
                                value={formdata.email}
                                onChange={handleChange}
                                required
                            />
                            <div className="relative">
                                <input 
                                    className="bg-white w-full h-12 px-4 border border-gray-300 rounded-md pr-16 text-base focus:outline-none focus:border-[#1877F2]" 
                                    type={showPassword ? 'text' : 'password'} 
                                    name="password" 
                                    placeholder="Password" 
                                    value={formdata.password}
                                    onChange={handleChange}
                                    required
                                />
                                <button 
                                    type="button" 
                                    onClick={() => setShowPassword(!showPassword)} 
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-[#1877F2] hover:underline text-sm font-semibold cursor-pointer"
                                >
                                    {showPassword ? 'Hide' : 'Show'}
                                </button>
                            </div>
                            <button 
                                type="submit" 
                                className="bg-[#1877F2] hover:bg-[#166FE5] cursor-pointer text-white text-base font-bold rounded-md h-12 w-full"
                            >
                                Log in
                            </button>
                            <div className='text-center'>
                                <a href="#" className='text-[#1877F2] hover:underline text-sm'>Forgotten password?</a>
                            </div>
                            <div className='border-t border-gray-300 my-4'></div>
                            <Link to="/">
                                <button 
                                    type="button"
                                    className='bg-[#42B72A] hover:bg-[#36A420] cursor-pointer text-white text-base font-bold rounded-md h-12 w-full'
                                >
                                    Create new account
                                </button>
                            </Link>
                        </form>
                    </div>
                    <div className='text-center mt-6'>
                        <p className='text-sm'>
                            <span className='font-semibold cursor-pointer hover:underline'>Create a Page</span> for a celebrity, brand or business.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    )
}
