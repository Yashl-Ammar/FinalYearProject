import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {  useNavigate } from "react-router-dom";
import { allCountries } from "../../../Data/Countries";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import RegularInputField from "../../../Components/InputFields/RegularInputField";
import RegularRoundedButton from "../../../Components/Buttons/RegularRoundedButton";
import { zodResolver } from '@hookform/resolvers/zod';
import NavBarFreelancer from "../../../Components/Nav/NavBarFreelancer";
import { PostJobValidationSchema } from "../../../Validations/PostJobValidation";
import RegularSquareButton from "../../../Components/Buttons/RegularSquareButton";
import RegularTextArea from "../../../Components/InputFields/RegularTextArea";
import RegularDropDown from "../../../Components/InputFields/RegularDropDown";
import { allDifficulties } from "../../../Data/Difficulty";
import { allCategories } from "../../../Data/Categories";
import GigCard from "../../../Components/Cards/GigCard";
import Footer from "../../../Components/Nav/Footer";
import NavBarClient from "../../../Components/Nav/NavBarClient";
import { collection, query, onSnapshot } from "firebase/firestore";
import { db } from "../../../firebase";



function ViewYourGigsPage() {
    let navigate = useNavigate();

    const [data,setData] = useState([]);

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () => {
        try{

            let response = await axios.get(process.env.REACT_APP_GigPath + 'gig/viewGigsByFreelancer',{
                headers:{
                    'token': localStorage.getItem('token')
                }
            })

            console.log(response);
            setData(response.data);

        }catch(e){
            console.log(e)
        }
    } 

    const mapGigs = () => {

        return data.map((val) => {
            return <GigCard id={val?._id} img={val?.file[0]} completedOrders={val.freelancer.completedOrder} name={`${val.freelancer.fname} ${val.freelancer.lname}`} rating={val.freelancer.rating} startingPrice={val?.basic?.price} title={val?.title} freelancer={true} userImg={val?.freelancer.profilepic} />
        })
    }



    return ( <div className="w-full flex justify-center bg-white dark:bg-aamdanBackground text-aamdanBackground dark:text-white">
    <div className="w-full lg:w-4/5">
        <NavBarFreelancer />
        <div className="text-center">
            <h1 className="font-heading text-5xl mb-12">View your Gigs</h1>
            <div className="w-full flex justify-center mb-10">
                <div className="flex w-1/3">
                    <RegularSquareButton text={'Create a gig'} onClick={() => {navigate('/freelancer/postgig')}} />
                </div>
            </div>
            <h1 className="font-bold text-5xl mb-12">These are the services you provide</h1>
        </div>
        {data.length === 0 && <h1 className="font-bold text-3xl text-center">No gigs found</h1>}
        <div className="grid grid-cols-1 sm:grid-cols-2  gap-28">
            {mapGigs()}
            
        </div>
        <ToastContainer />
        <Footer />
    </div>
</div> );
}

export default ViewYourGigsPage;