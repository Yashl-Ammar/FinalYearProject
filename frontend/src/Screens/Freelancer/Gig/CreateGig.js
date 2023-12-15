import {  useState } from "react";
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



function CreateGigPage() {

    const [skillsError, setskillsError] = useState('');
    const [skill, setSkill] = useState('');
    const [allSkills, setAllSkills] = useState([]);

    

    const {
        register,
        handleSubmit,
        watch,
        formState:{errors}
      } = useForm({
        resolver: zodResolver(CreateGigValidationSchema)
      })
    let navigate = useNavigate();

    const watchTitle = watch('title');
    const watchDescription = watch('description');

    let onSubmit = async (data) => {
        setskillsError('');
        if(allSkills.length === 0){
            setskillsError('Must have one or more skills');
        }
        else{
            let obj = {
                ...data,
                skills: allSkills
            }
            navigate('/freelancer/createGigPackages', {state: { data: obj}});
        }
    }

    const mapSkills = () => {
        return allSkills.map((value, index) => {
            return (
                <div key={index} className="rounded-full py-1 px-3 flex border w-fit my-3"> 
                    <p className="mr-2">{value}</p>
                    <img src="/Close.svg" alt="" onClick={() => {
                        let temp = [...allSkills];
                        temp.splice(index,1);
                        setAllSkills(temp);
                    }}/>
                </div>
            );
        })
    }

    return ( <div className="w-full flex justify-center">
    <div className="w-full lg:w-4/5">
        <NavBarFreelancer />
        <div className="text-center">
            <h1 className="font-heading text-5xl mb-12">Create Gig</h1>
            <h1 className="font-bold text-5xl mb-12">Become a part of the Aamdan Family</h1>
        </div>
        <div className="bg-aamdanSuperDeepBlack rounded-xl w-full px-12 py-9">
            <h1 className="font-bold text-5xl mb-7">Create Gig</h1>
            <p className="text-lightGray mb-8">This fundamental action sets the stage for you to tap into the diverse pool of freelancers, facilitating the realization of your goals and successful project completion.</p>
            <hr className="mb-11" />
            <div className="rounded-xl sm:px-11 sm:py-14 sm:bg-aamdanDeepBlack">
                <form onSubmit={handleSubmit(onSubmit)}>
                    
                    <div className="w-full mb-14">
                        <p className="text-lightGray mb-3">1/4</p>
                        <h2 className="text-3xl font-bold mb-10">Let’s start with an attention grabbing title</h2>
                        <p className="text-lightGray mb-11">This helps your gig to stand out to the right people. It is the first thing that potential clients shall view. Making a strong first impression is essential.</p>

                        <div className="flex items-center justify-between w-full mb-4">
                            <label className="text-lg">Write a title for you gig</label>
                            <p className={`${watchTitle?.length > 80 ? 'text-red' : 'text-lightGray ' }`}>{watchTitle ? watchTitle.length : 0}/80</p>
                        </div>
                        <RegularInputField placeholder='e.g I will create a custom wordpress website for you.' register={register('title')}/>
                        {errors.title && <p className="py-2 text-red" >{errors.title.message}</p>}
                    </div>

                    <div className="w-full mb-14">
                        <h2 className="text-3xl font-bold mb-10">What are the main skills you are offering</h2>
                        <p className="text-lightGray mb-11">Specify the skills that you are offering in this gig. This will help attract people that are in the need of skills that are in the realm of your expertise.</p>

                        <div className="flex items-center justify-between w-full mb-4">
                            <label className="text-lg">Add up to 5 skills</label>
                            <p className={`${skill?.length > 20 ? 'text-red' : 'text-lightGray ' }`}>{skill ? skill.length : 0}/20</p>
                        </div>
                        <div className="w-full flex flex-col lg:flex-row mb-6">
                            <input className="rounded-lg bg-aamdanBackground py-3 px-5 border border-strokeColor border-opacity-50 w-full" placeholder='e.g Java' value={skill} onChange={(e) => {setSkill(e.target.value)}} />
                            <div className="lg:ml-2 mt-4 lg:mt-0">
                                <RegularSquareButton text='Add' onClick={(e) => {
                                    e.preventDefault();
                                    if(skill.length <= 20 && skill.length >= 2 && allSkills.length < 5) {
                                        setAllSkills([...allSkills, skill]);
                                        setSkill('');
                                    }}}
                                />
                            </div>
                        </div>
                        <p className="text-lightGray mb-6">Selected skills</p>
                        <div className="flex flex-col">
                            {mapSkills()}
                        </div>
                         <p className="py-2 text-red" >{skillsError}</p>
                    </div>
                    <div className="w-full mb-14">
                        <h2 className="text-3xl font-bold mb-10">Let’s add a gig description </h2>
                        <p className="text-lightGray mb-11">Description will be the main body of the gig. This is what will give the client an overview about the type of work you do. A good description is essential for order receival. </p>

                        <div className="flex items-center justify-between w-full mb-4">
                            <label className="text-lg">Add a description</label>
                            <p className={`${watchDescription?.length > 800 ? 'text-red' : 'text-lightGray ' }`}>{watchDescription ? watchDescription.length : 0}/800</p>
                        </div>
                        <RegularTextArea placeholder='Description' register={register('description')} type='text' />
                        {errors.description && <p className="py-2 text-red" >{errors.description.message}</p>}
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

export default CreateGigPage;