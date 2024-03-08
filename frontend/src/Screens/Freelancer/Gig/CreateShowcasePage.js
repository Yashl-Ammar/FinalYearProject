import {  useState } from "react";
import {   useLocation, useNavigate, } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import RegularInputField from "../../../Components/InputFields/RegularInputField";
import RegularSquareButton from "../../../Components/Buttons/RegularSquareButton";
import RegularTextArea from "../../../Components/InputFields/RegularTextArea";
import RegularRoundedButton from "../../../Components/Buttons/RegularRoundedButton";
import { set, useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import NavBarFreelancer from "../../../Components/Nav/NavBarFreelancer";
import { CreateGigValidationSchema } from "../../../Validations/CreateGigValidation";
import DragDrop from "../../../Components/DragDrop/DragDrop";
import Footer from "../../../Components/Nav/Footer";


function CreateShowcasePage() {

    const location = useLocation();
    const PrevData = location.state && location.state.data;

    console.log(PrevData);

    const navigate = useNavigate();

    const [files, setFiles] = useState([]);

    const [err, setErr] = useState();

    let onSubmit = (e) => {
        e.preventDefault();
        if(files.length < 0 || files.length > 5){
            setErr('Must be less than 5 and more than 0 files uploaded');
        }
        else{

            const obj = {
                ...PrevData,
                files: files 
            }
            navigate('/freelancer/createGigOverviewPage', {state: {data : obj}})
        }
        

    }

    return ( <div className="w-full flex justify-center bg-white dark:bg-aamdanBackground text-aamdanBackground dark:text-white">
    <div className="w-full lg:w-4/5">
        <NavBarFreelancer />
        <div className="text-center">
            <h1 className="font-heading text-5xl mb-12">Create Gig</h1>
            <h1 className="font-bold text-5xl mb-12">Become a part of the Aamdan Family</h1>
        </div>
        <div className="bg-aamdanSuperDeepWhite dark:bg-aamdanSuperDeepBlack rounded-xl w-full px-12 py-9">
            <h1 className="font-bold text-5xl mb-7">Create Gig</h1>
            <p className="text-lightGrayWhite dark:text-lightGray mb-8">This fundamental action sets the stage for you to tap into the diverse pool of freelancers, facilitating the realization of your goals and successful project completion.</p>
            <hr className="mb-11" />
            <div className="rounded-xl sm:px-11 sm:py-14 sm:bg-aamdanDeepBlack">
                <form onSubmit={onSubmit}>
                    
                    <div className="w-full mb-14">
                        <p className="text-lightGrayWhite dark:text-lightGray mb-3">3/5</p>
                        <h2 className="text-3xl font-bold mb-10">Showcase</h2>
                        <p className="text-lightGrayWhite dark:text-lightGray mb-11">Showcase some of you work in the form of gallery. This will help clients judge your capabilities and the quality of your work as a service provide.</p>

                        <DragDrop files={files} setFiles={setFiles} />
                        <p className="text-red">{err}</p>
                    </div>

                    
                    
                    <RegularRoundedButton  text='Next' />
                </form>
            </div>
        </div>
        <ToastContainer />
        <Footer />
    </div>
</div> );
}

export default CreateShowcasePage;