import { useNavigate } from "react-router-dom";
import { LargeHeadingStyle } from "../../Constants/constants";
import NavBarOnlyLogo from "../../Components/Nav/NavBarOnlyLogo";
import RegularRoundedButton from "../../Components/Buttons/RegularRoundedButton";
import { Link } from "react-router-dom";
import RegularInputField from "../../Components/InputFields/RegularInputField";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { useState } from "react";
import PasswordInputField from "../../Components/InputFields/PasswordInputField";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { loginSchema } from "../../Validations/LoginValidation";
import RoundedTransparentButton from "../../Components/Buttons/RoundedTransparentButton";

function LoginPage() {

    const [selectedUser,setSelectedUser] = useState('client');

    const {
        register,
        handleSubmit,
      } = useForm({
        resolver: zodResolver(loginSchema)
      })
    let navigate = useNavigate();

    let onSubmit = async (data) => {
            if(data.email === '' || data.password === ''){
                toast("Email or Password empty!");
            }
            else{
                try{
                    let path = process.env.REACT_APP_AuthPath+'client/signin';
                    if(selectedUser === 'freelancer'){
                        path = process.env.REACT_APP_AuthPath+'freelancer/signin';
                    }

                    let response = await axios.post(path,{
                        email: data.email,
                        password: data.password,
                    })
                    
                    let token = response.data;
                    localStorage.setItem('token', token);
                    if(selectedUser === 'freelancer'){
                        navigate('/freelancer/postgig');
                    }
                    else{
                        navigate('/client/postjob');
                    }
                }
                catch(e){
                    toast(e.response.data);
                }
            }   
    }

    return ( <div className="w-full flex justify-center">
    <div className="w-full lg:w-4/5">
        <NavBarOnlyLogo />
        <div className="flex justify-center w-full">
            <form className="bg-aamdanSuperDeepBlack sm:rounded-xl w-full sm:w-4/5 py-2 px-4 sm:py-8 sm:px-20 flex flex-col justify-center items-center mb-8" onSubmit={handleSubmit(onSubmit)} >
                <h1 className={LargeHeadingStyle}>Log in to Aamdan</h1>
                <div className="h-16"></div>
                <div className="flex w-full">
                    <button type="button" className={`w-full flex flex-col items-center justify-center ${selectedUser === 'client'? 'text-aamdanBlue' : 'text-white'}`} onClick={() => {setSelectedUser('client')}}>
                        <p className="text-xl">Client</p>
                        <hr className="w-full" />
                    </button>
                    <button type="button" className={`w-full flex flex-col items-center justify-center ${selectedUser === 'freelancer'? 'text-aamdanBlue' : 'text-white'}`} onClick={() => {setSelectedUser('freelancer')}}>
                        <p className="text-xl">Freelancer</p>
                        <hr className="w-full" />
                    </button>
                    
                </div>
                <div className="w-full my-8">
                    
                    <div className="mb-8">
                        <RegularInputField placeholder={'Email'} register={register('email')} type='email' />
                    </div>
                    <div className="mb-8">
                        <PasswordInputField placeholder='Password' register={register('password')} />
                    </div>
                    <div className="flex">
                        <input className="w-6 mr-3" type="checkbox" {...register('remember')} />
                        <p className="text-sm">Remember me</p>
                    </div>
                </div>
                <RegularRoundedButton text='Login' type='submit'/>
                <div className="h-12"></div>
                <div className="flex w-full justify-center items-center mb-10">
                    <div className="w-1/4 bg-lightGray" style={{height:'1px'}}></div>
                    <p className="text-xl w-2/4 text-center">Don’t have an Aamdan Account?</p>
                    <div className="w-1/4 bg-lightGray" style={{height:'1px'}}></div>
                </div>
                <div className="w-full">
                    <Link to='/joinas'><RoundedTransparentButton text='Sign up' /></Link>
                </div>
                <ToastContainer />
            </form>
        </div>
    </div>
</div> );
}

export default LoginPage;