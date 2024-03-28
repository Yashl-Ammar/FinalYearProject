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
import GigCard from "../../../Components/Cards/GigCard";
import Footer from "../../../Components/Nav/Footer";
import NavBarClient from "../../../Components/Nav/NavBarClient";




function ViewGigsPage() {
    let navigate = useNavigate();


   

    const location = useLocation();

    const [search, setSearch] = useState(location.state ? location.state.search : '')

    const [data,setData] = useState([]);

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () => {
        try{
            if(search === ''){
                let response = await axios.get(process.env.REACT_APP_GigPath + 'gig/all',{
                    headers:{
                        'token': localStorage.getItem('token')
                    }
                })
    
                console.log(response);
                setData(response.data);
            }
            else{
                let response = await axios.post(process.env.REACT_APP_GigPath + 'gig/search',{
                  search: search  
                },{
                    headers:{
                        'token': localStorage.getItem('token')
                    }
                })
    
                console.log(response);
                setData(response.data);
            }

        }catch(e){
            console.log(e)
        }
    } 
    const mapGigs = () => {
        return data.map((val) => {
            return <GigCard id={val?._id} img={val?.file[0]} completedOrders={val.freelancer.completedOrder} name={`${val.freelancer.fname} ${val.freelancer.lname}`} rating={val.freelancer.rating} startingPrice={val?.basic?.price} title={val?.title} freelancer={false} userImg={val?.freelancer.profilepic} />
        })
    }

    return ( <div className="w-full flex justify-center bg-white dark:bg-aamdanBackground text-aamdanBackground dark:text-white">
    <div className="w-full lg:w-4/5">
        <NavBarClient />
        <div className="text-center">
            <h1 className="font-heading text-5xl mb-12">View Gigs</h1>
            <h1 className="font-bold text-5xl mb-12">Get your work done by professionals</h1>
        </div>
        <div className="relative flex mb-8">
                    <input type="text" className="w-full rounded-md py-2 px-5 bg-aamdanBackgroundWhite dark:bg-aamdanBackground border" placeholder="Search for any Service" value={search} onChange={(e) => setSearch(e.target.value)} />
                    <button className="absolute top-0 right-0 h-full bg-gradient-to-r from-aamdanBlue to-aamdanPurple rounded-r px-5" onClick={() => {
                        fetchData()
                    }}>
                        <img src="/Search.svg" alt="" />
                    </button>
                </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-28">
            {mapGigs()}
        </div>
        <ToastContainer />
        <Footer />
    </div>
</div> );
}

export default ViewGigsPage;