import { useState } from "react";
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
import Footer from "../../../Components/Nav/Footer";
import NavBarClient from "../../../Components/Nav/NavBarClient";



function PostJobPage() {

    const [skillsError, setskillsError] = useState('');
    const [skill, setSkill] = useState('');
    const [allSkills, setAllSkills] = useState([]);
    let [checkedRadio, setCheckedRadio] = useState('hourly');

    

    const {
        register,
        handleSubmit,
        watch,
        formState:{errors}
      } = useForm({
        resolver: zodResolver(PostJobValidationSchema)
      })
    let navigate = useNavigate();

    const watchTitle = watch('title');
    const watchDescription = watch('description');

    const checkHourly = () => (
        <input
            type="radio"
            name="projectRadio"
            className="absolute top-0 right-4 mt-4 ml-4"
            checked={checkedRadio === 'hourly'}
            onChange={() => setCheckedRadio('hourly')}
        />
    );

    const checkProject = () => (
        <input
            type="radio"
            name="projectRadio"
            className="absolute top-0 right-4 mt-4 ml-4"
            checked={checkedRadio === 'project'}
            onChange={() => setCheckedRadio('project')}
        />
    );

    let onSubmit = async (data) => {
        setskillsError('');
        if(allSkills.length === 0){
            setskillsError('Must have one or more skills');
        }
        else{
            try{
                await axios.post(process.env.REACT_APP_JobPath+'job/create',{
                    title:data.title,
                    description:data.description,
                    skills:allSkills,
                    amount:data.amount,
                    budgetType:checkedRadio,
                    difficulty:data.difficulty,
                    location:data.location,
                    category:data.category
                },{
                    headers:{
                        'token':localStorage.getItem('token')
                    }
                })
                
                navigate('/client/viewyourjobs');
            }
            catch(e){
                console.log(e);
                toast("There was some issue creating your account. Please try later!");
            }
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
        <NavBarClient />
        <div className="text-center">
            <h1 className="font-heading text-5xl mb-12">Post a Job</h1>
            <h1 className="font-bold text-5xl mb-12">Get your work done by professionals</h1>
        </div>
        <div className="bg-aamdanSuperDeepBlack rounded-xl w-full px-12 py-9">
            <h1 className="font-bold text-5xl mb-7">Post a Job</h1>
            <p className="text-lightGray mb-8">Posting a job is indeed the first and crucial step in the process of identifying and securing the right talent to complete your projects and achieve your organizational goals.</p>
            <hr className="mb-11" />
            <div className="rounded-xl sm:px-11 sm:py-14 sm:bg-aamdanDeepBlack">
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="w-full mb-14">
                        <h2 className="text-3xl font-bold mb-10">Let’s start with a strong title</h2>
                        <p className="text-lightGray mb-11">This helps your job post to stand out to the right candidates. It is the first thing that potential candidates shall view. Making a strong first impression is essential.</p>

                        <div className="flex items-center justify-between w-full mb-4">
                            <label className="text-lg">Write a title for you job post</label>
                            <p className={`${watchTitle?.length > 60 ? 'text-red' : 'text-lightGray ' }`}>{watchTitle ? watchTitle.length : 0}/60</p>
                        </div>
                        <RegularInputField placeholder='e.g Publish an application on app store' register={register('title')}/>
                        {errors.title && <p className="py-2 text-red" >{errors.title.message}</p>}
                    </div>

                    <div className="w-full mb-14">
                        <h2 className="text-3xl font-bold mb-10">What are the main skills required for this job</h2>
                        <p className="text-lightGray mb-11">Specify the skills required to attempt this job. This will help attract candidates that are well versed in the skills that are required.</p>

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
                        <h2 className="text-3xl font-bold mb-10">Let’s add a job description</h2>
                        <p className="text-lightGray mb-11">Description will be the main body of the job. This is what will give the candidate a concise overview about the type of work you require.</p>

                        <div className="flex items-center justify-between w-full mb-4">
                            <label className="text-lg">Add a description</label>
                            <p className={`${watchDescription?.length > 500 ? 'text-red' : 'text-lightGray ' }`}>{watchDescription ? watchDescription.length : 0}/500</p>
                        </div>
                        <RegularTextArea placeholder='Description' register={register('description')} type='text' />
                        {errors.description && <p className="py-2 text-red" >{errors.description.message}</p>}
                    </div>
                    <div className="w-full mb-14">
                        <h2 className="text-3xl font-bold mb-10">Tell us about your budget</h2>
                        <p className="text-lightGray mb-11">This will help you match with the talent within your range. Your budget is often the most essential factors when it comes to attracting talent. </p>
                        <div className="flex w-full mt-10 mb-12 flex-col lg:flex-row">
                            <div className="relative mb-10 lg:mr-10 w-full lg:w-1/3" onClick={() => setCheckedRadio('hourly')}>
                                {checkHourly()}
                                <img className="object-cover h-60 w-full rounded-xl opacity-50" src="/womanworking.jpg" alt="woman working"/>
                                <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
                                    <p className="w-2/3 font-bold text-2xl text-white">Hourly rate</p>
                                </div>
                            </div>
                            <div className="relative mb-10 lg:mr-10 w-full lg:w-1/3" onClick={() => setCheckedRadio('project')}>
                                {checkProject()}
                                <img className="h-60 w-full object-cover rounded-xl opacity-50" src="/blackwomanworking.jpg" alt="Woman working"/>
                                <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
                                    <p className="w-2/3 font-bold text-2xl text-white">Project budget</p>
                                </div>
                            </div>
                        </div>
                        <div className="mb-4">
                            <label className="text-lg">Amount in dollars</label>
                        </div>
                        <div className="w-full lg:w-1/2">
                            <RegularInputField placeholder='e.g 20'type='number' register={register('amount')}/>
                        </div>
                        {errors.amount && <p className="py-2 text-red">{errors.amount.message}</p>}

                    </div>
                    <div className="w-full mb-14">
                        <h2 className="text-3xl font-bold mb-10">Some final details</h2>
                        <div className="mb-4">
                            <label className="text-lg ">Difficulty level of the project</label>
                        </div>
                        <div className="w-full lg:w-1/2 mb-8">
                            <RegularDropDown data={allDifficulties} register={register('difficulty')} />
                        </div>
                        <div className="mb-4">
                            <label className="text-lg ">Location of candidates</label>
                        </div>
                        <div className="w-full lg:w-1/2 mb-8">
                            <RegularDropDown data={['Global',...allCountries]} register={register('location')} />
                        </div>
                        <div className="mb-4">
                            <label className="text-lg ">Choose Category</label>
                        </div>
                        <div className="w-full lg:w-1/2 mb-8">
                            <RegularDropDown data={allCategories} register={register('category')} />
                        </div>
                        
                    </div>
                    <RegularRoundedButton type='submit' text='Post Job' />
                </form>
            </div>
        </div>
        <ToastContainer />
        <Footer />
    </div>
</div> );
}

export default PostJobPage;