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
import RegularSkillTag from "../../../Components/Tag/RegularSkillTag";
import GigCard from "../../../Components/Cards/GigCard";
import Footer from "../../../Components/Nav/Footer";



function FreelancerHomepage() {

    const navigate = useNavigate()

    const [profile, setProfile] = useState({
        fname: '',
        lname: '',
        languages: [],
        skills: [],
        education: [],
    })

    const [data,setData] = useState([]);

    useEffect(() => {
        fetchData()
    },[])


    const fetchData = async () => {
        try{
            let response = await axios.get(process.env.REACT_APP_ProfilePath+'profileManagement/getFreelancerData',{
                headers:{
                    'token':localStorage.getItem('token')
                }
            })

            let gigs = await axios.get(process.env.REACT_APP_GigPath + 'gig/viewGigsByFreelancer',{
                headers:{
                    'token': localStorage.getItem('token')
                }
            })

            console.log(gigs);
            setData(gigs.data);

            const obj = {
                fname: response.data.fname,
                lname: response.data.lname,
                languages: response.data.languages,
                skills: response.data.skills,
                education: response.data.education,
                country: response.data.country,
                profilepic: response.data.profilepic,
            } 

            console.log(response.data)
            setProfile(obj);
        }  
        catch(e){
            console.log(e)
        }
    }

    const mapLanguages = () => {
        if(profile.languages.length === 0){
            return <h3 className="text-lg font-bold">No languages added</h3>
        }

        return profile.languages.map((val,i) => {
            return <p key={i}>{val}</p>
        })
    }
    
    const mapEducation = () => {
        if(profile.education.length === 0){
            return <h3 className="text-lg font-bold">No education added</h3>
        }

        return profile.education.map((val,i) => {
            return <p className="mb-5" key={i}>{val}</p>
        })
    }
    
    const mapSkills = () => {
        if(profile.skills.length === 0){
            return <h3 className="text-lg font-bold">No skills added</h3>
        }

        return profile.skills.map((val,i) => {
            return (
            <div className="mr-4 mb-4" key={i}>
                <RegularSkillTag text={val} />
            </div>)
     
    })
    }

    const mapGigs = () => {

        return data.map((val,i) => {
            if(i < 2)
                return <GigCard id={val?._id} img={val?.file[0]} completedOrders={val.freelancer.completedOrder} name={`${val.freelancer.fname} ${val.freelancer.lname}`} rating={val.freelancer.rating} startingPrice={val?.basic?.price} title={val?.title} freelancer={true} userImg={val?.freelancer.profilepic} />
        })
    }

    return ( <div className="w-full flex justify-center bg-white dark:bg-aamdanBackground text-aamdanBackground dark:text-white">
    <div className="w-full lg:w-4/5">
        <NavBarFreelancer />
            <div className="flex">
                <div className="w-full bg-aamdanSuperDeepWhite dark:bg-aamdanSuperDeepBlack rounded-lg">
                    <section className="flex flex-col items-center py-5 border-b">
                        {profile.profilepic && <img className="w-32 h-32 object-cover rounded-full" src={profile.profilepic} alt="" />}
                        {!profile.profilepic && <img className="w-32 h-32 object-cover rounded-full" src='/femaleUser.svg' alt="" />}
                        <h1 className="mb-5 font-bold text-5xl font-heading bg-gradient-to-r from-aamdanPurple to-aamdanPink text-transparent bg-clip-text">{profile.fname + ' ' + profile.lname}</h1>
                        <p className="text-lightGrayWhite dark:text-lightGray mb-5">Freelancer</p>
                        <div className="w-2/3">
                            <RegularSquareButton text={'Edit Profile'} onClick={() => {navigate('/freelancer/editProfilePage')}} />
                        </div>
                    </section>
                    <section className="py-5 px-5 border-b">
                        <h2 className="text-3xl font-heading font-bold mb-5">Earnings</h2>
                        <div className="flex justify-between mb-5">
                            <p>Available for withdraw</p>
                            <p>$0</p>
                        </div>
                        <div className="flex justify-between mb-5">
                            <p>Earning in this month</p>
                            <p>$0</p>
                        </div>
                        <div className="flex justify-between mb-5">
                            <p>Average selling Price</p>
                            <p>$0</p>
                        </div>
                        <div className="flex justify-between mb-5">
                            <p>Payments being cleared</p>
                            <p>$0</p>
                        </div>
                        <div className="flex justify-between mb-5">
                            <p>Active Orders</p>
                            <p>$0</p>
                        </div>
                        <div className="flex justify-between mb-5">
                            <p>Cancelled Orders</p>
                            <p>0(-$0)</p>
                        </div>
                    </section>
                    <section className="py-5 px-5 border-b flex justify-between">
                        <div className="flex items-center">
                            <img className="mr-2" src="/Location.svg" alt="" />
                            <p>From</p>
                        </div>
                        <p>{profile.country}</p>
                    </section>
                    <section className="py-5 px-5 border-b">
                        <h2 className="font-heading font-bold text-3xl mb-5">Languages</h2>
                        {mapLanguages()}
                    </section>
                    <section className="py-5 px-5 border-b">
                        <h2 className="font-heading font-bold text-3xl mb-5">Skills</h2>
                        <div className="flex flex-wrap">
                            {mapSkills()}
                        </div>
                    </section>
                    <section className="py-5 px-5">
                        <h2 className="font-heading font-bold text-3xl mb-5">Education</h2>
                        {mapEducation()}
                    </section>
                    
                </div>
                <div className="w-full pl-5 ">
                        <section className="mb-10">
                            <h1 className="text-5xl">Iathamtom's Gigs</h1>
                            <div className="grid grid-cols-2 mb-10">
                                {mapGigs()}
                            </div>
                            <RegularSquareButton text={'View all'} onClick={() => {navigate('/freelancer/viewyourgigs')}}/>
                        </section>
                        <section className="bg-aamdanSuperDeepWhite dark:bg-aamdanSuperDeepBlack w-full px-5 py-3 rounded-lg mb-10">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl">Active Orders - 0 ($0). </h2>
                                <div>
                                    <RegularSquareButton text={'View Orders'} onClick={() => {navigate('/freelancer/manageOrderPage')}} />
                                </div>
                            </div>
                        </section>
                    <section className="bg-aamdanSuperDeepWhite dark:bg-aamdanSuperDeepBlack w-full px-5 py-7 rounded-lg">
                        <h1 className="font-bold text-5xl">Jobs you may like</h1>
                    </section>
                </div>
                
            </div>
        <Footer />
        <ToastContainer />
        
    </div>
</div> );
}

export default FreelancerHomepage;