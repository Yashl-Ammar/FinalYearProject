import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {  useLocation, useNavigate } from "react-router-dom";
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



function ViewSpecificGigPage() {

    const location = useLocation();
    const id = location.state ? location.state.data : '';

    console.log(id);

    let navigate = useNavigate();

    const [data,setData] = useState([]);

    useEffect(() => {
        fetchData()
    })



    const fetchData = async () => {
        try{

            let response = await axios.get(process.env.REACT_APP_GigPath + 'gig/viewSpecificGigByClient/' + id,{
                headers:{
                    'token': localStorage.getItem('token')
                }
            })

            console.log(response);

        }catch(e){
            console.log(e)
        }
    } 


    return ( <div className="w-full flex justify-center">
    <div className="w-full lg:w-4/5">
        <NavBarFreelancer />
        <div className="text-center">
            <h1 className="font-heading text-5xl mb-12">View Gigs</h1>
            <h1 className="font-bold text-5xl mb-12">Get your work done by professionals</h1>
        </div>
        <div>
            
        </div>
        <ToastContainer />
    </div>
</div> );
}

export default ViewSpecificGigPage;