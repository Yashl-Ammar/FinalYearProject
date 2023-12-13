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



function ViewGigsPage() {
    let navigate = useNavigate();

    const [data,setData] = useState([]);

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () => {
        try{

            let response = await axios.get(process.env.REACT_APP_GigPath + 'gig/all',{
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


    return ( <div className="w-full flex justify-center">
    <div className="w-full lg:w-4/5">
        <NavBarClient />
        <div className="text-center">
            <h1 className="font-heading text-5xl mb-12">View Gigs</h1>
            <h1 className="font-bold text-5xl mb-12">Get your work done by professionals</h1>
        </div>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-28">
            <GigCard id={data[9]?._id} img={data[9]?.file[0]} completedOrders={21} name='Tiffany Jay' rating='4.3' startingPrice={data[9]?.basic?.price} title={data[9]?.title} userImg='/femaleUser.svg' />
            <GigCard id={data[9]?._id} img={data[9]?.file[0]} completedOrders={21} name='Tiffany Jay' rating='4.3' startingPrice={data[9]?.basic?.price} title={data[9]?.title} userImg='/femaleUser.svg' />
            <GigCard id={data[9]?._id} img={data[9]?.file[0]} completedOrders={21} name='Tiffany Jay' rating='4.3' startingPrice={data[9]?.basic?.price} title={data[9]?.title} userImg='/femaleUser.svg' />
            <GigCard id={data[9]?._id} img={data[9]?.file[0]} completedOrders={21} name='Tiffany Jay' rating='4.3' startingPrice={data[9]?.basic?.price} title={data[9]?.title} userImg='/femaleUser.svg' />
            <GigCard id={data[9]?._id} img={data[9]?.file[0]} completedOrders={21} name='Tiffany Jay' rating='4.3' startingPrice={data[9]?.basic?.price} title={data[9]?.title} userImg='/femaleUser.svg' />
            <GigCard id={data[9]?._id} img={data[9]?.file[0]} completedOrders={21} name='Tiffany Jay' rating='4.3' startingPrice={data[9]?.basic?.price} title={data[9]?.title} userImg='/femaleUser.svg' />

            
        </div>
        <ToastContainer />
        <Footer />
    </div>
</div> );
}

export default ViewGigsPage;