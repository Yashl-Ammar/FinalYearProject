import {  useEffect, useState } from "react";
import {   useNavigate, } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import RegularInputField from "../../../Components/InputFields/RegularInputField";
import RegularSquareButton from "../../../Components/Buttons/RegularSquareButton";
import RegularTextArea from "../../../Components/InputFields/RegularTextArea";
import RegularRoundedButton from "../../../Components/Buttons/RegularRoundedButton";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import NavBarFreelancer from "../../../Components/Nav/NavBarFreelancer";
import { CreateGigValidationSchema } from "../../../Validations/CreateGigValidation";
import Footer from "../../../Components/Nav/Footer";
import NavBarClient from "../../../Components/Nav/NavBarClient";



function ClientHomepage() {

    const navigate = useNavigate();

    const [search ,setSearch] = useState('');

    const [profile, setProfile] = useState({
        fname: '',
        lname: '',
    })

    useEffect(() => {
        fetchData()
    },[])


    const fetchData = async () => {
        try{
            let response = await axios.get(process.env.REACT_APP_ProfilePath+'profileManagement/getClientData',{
                headers:{
                    'token':localStorage.getItem('token')
                }
            })

            console.log(response)

            const obj = {
                fname: response.data.fname,
                lname: response.data.lname,
            } 

            setProfile(obj);
        }  
        catch(e){
            console.log(e)
        }
    }

    return ( <div className="w-full flex justify-center bg-aamdanBackgroundWhite text-aamdanBackground dark:bg-aamdanBackground dark:text-white">
    <div className="w-full lg:w-4/5">
        <NavBarClient />
        <div className="flex items-center mb-10">
            <div className="pr-5 w-1/2 py-10">
                <h1 className="font-bold text-5xl font-heading mb-10">Hi there, <span className="bg-gradient-to-r from-aamdanPurple to-aamdanPink text-transparent bg-clip-text" >{profile.fname + ' ' + profile.lname}</span></h1>
                <p className="text-lightGrayWhite dark:text-lightGray mb-10">Thank you for choosing Aamdan. We're here to connect you with top-tier talent to bring your projects to life.</p>
                <div className="relative flex">
                    <input type="text" className="w-full rounded-md py-2 px-5 bg-aamdanBackgroundWhite dark:bg-aamdanBackground border" placeholder="Search for any Service" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button className="absolute top-0 right-0 h-full bg-gradient-to-r from-aamdanBlue to-aamdanPurple rounded-r px-5" onClick={() => {
                        if(search !== '')
                            navigate('/client/viewGigs', {state:{search: search}})
                    }}>
                        <img src="/Search.svg" alt="" />
                    </button>
                </div>
                <p className="font-bold text-center my-5">Or</p>
                <RegularSquareButton text='Post a job' onClick={() => {navigate('/client/postjob')}} />


            </div>
            <div className="w-1/2">
                <img className="w-4/5" src="/manworking.gif" alt="" />
            </div>
        </div>
        <section>
            <h1 className="text-5xl font-bold mb-5">Popular Services</h1>
            <div className="grid grid-cols-4">
                <div className="px-10 h-5/6">
                    <div className="relative h-full">
                        <img className="w-full h-full object-cover rounded-xl mb-[-1px]" src="/cat1.jpg" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-b from-aamdanSuperDeepBlack  to-transparent to-50% p-6">
                            <p className="font-bold text-white">Build your brand</p>
                            <h2 className="font-bold text-3xl text-white">Logo Design</h2>
                        </div>
                    </div>
                </div>
                <div className="px-10 h-5/6">
                    <div className="relative h-full">
                        <img className="w-full h-full object-cover rounded-xl mb-[-1px]" src="/cat2.jpg" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-b from-aamdanSuperDeepBlack  to-transparent to-50% p-6">
                            <p className="font-bold text-white">Customize your webiste</p>
                            <h2 className="font-bold text-3xl text-white">WordPress</h2>
                        </div>
                    </div>
                </div>
                <div className="px-10 h-5/6">
                    <div className="relative h-full">
                        <img className="w-full h-full object-cover rounded-xl mb-[-1px]" src="/cat3.jpg" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-b from-aamdanSuperDeepBlack  to-transparent to-50% p-6">
                            <p className="font-bold text-white">Colour your dreams</p>
                            <h2 className="font-bold text-3xl text-white">Illustrations</h2>
                        </div>
                    </div>
                </div>
                <div className="px-10 h-5/6">
                    <div className="relative h-full">
                        <img className="w-full h-full object-cover rounded-xl mb-[-1px]" src="/cat4.jpg" alt="" />
                        <div className="absolute inset-0 bg-gradient-to-b from-aamdanSuperDeepBlack  to-transparent to-50% p-6">
                            <p className="font-bold text-white">Add talent to AI</p>
                            <h2 className="font-bold text-3xl text-white">AI Artists</h2>
                        </div>
                    </div>
                </div>

            </div>
        </section>
        <ToastContainer />
        <Footer />
    </div>
</div> );
}

export default ClientHomepage;