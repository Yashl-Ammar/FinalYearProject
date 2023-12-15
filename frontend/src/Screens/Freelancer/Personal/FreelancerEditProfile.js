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
import RegularSkillTag from "../../../Components/Tag/RegularSkillTag";
import GigCard from "../../../Components/Cards/GigCard";
import Footer from "../../../Components/Nav/Footer";
import RegularDropDown from "../../../Components/InputFields/RegularDropDown";
import { allCountries } from "../../../Data/Countries";
import SkillTagWithClose from "../../../Components/Tag/SkillTagwithClose";



function FreelancerEditProfilePage() {

   
    return ( <div className="w-full flex justify-center">
    <div className="w-full lg:w-4/5">
        <NavBarFreelancer />
            <div className="bg-aamdanSuperDeepBlack py-7 rounded-xl flex justify-center">
                <div className="flex flex-col items-center w-1/2">
                    <h1 className="text-5xl font-heading mb-5">Profile Management</h1>
                    <img className="w-40" src="/femaleUser.svg" alt="" />
                    <p className="text-aamdanBlue mb-5">Change Profile Picture</p>
                    <div className="w-full mb-5">
                        <RegularInputField placeholder={'Username'} />
                    </div>
                    <div className="w-full mb-5">
                        <RegularInputField placeholder={'Tag Line'} />
                    </div>
                    <div className="w-full mb-5">
                        <RegularTextArea placeholder={'Description'} />
                    </div>
                    <div className="w-full mb-5">
                        <RegularDropDown data={allCountries} />
                    </div>
                    <div className="w-full">
                        <h2 className="text-3xl font-heading font-bold mb-5">Languages</h2>
                        <div className="relative flex mb-5">
                            <input type="text" className="w-full rounded-md py-2 px-5 bg-aamdanBackground border" placeholder="Add Language" />
                            <button className="absolute top-0 right-0 h-full bg-gradient-to-r from-aamdanBlue to-aamdanPurple rounded-r px-5">
                                <p className="font-bold">Add</p>
                            </button>
                        </div>
                        <div className="flex flex-wrap mb-5">
                            <div className="mr-2">
                                <SkillTagWithClose text={'Urdu'} />
                            </div>
                            <div className="mr-2">
                                <SkillTagWithClose text={'Urdu'} />
                            </div>
                            <div className="mr-2">
                                <SkillTagWithClose text={'Urdu'} />
                            </div>
                            <div className="mr-2">
                                <SkillTagWithClose text={'Urdu'} />
                            </div>
                            <div className="mr-2">
                                <SkillTagWithClose text={'Urdu'} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <h2 className="text-3xl font-heading font-bold mb-5">Skills</h2>
                        <div className="relative flex mb-5">
                            <input type="text" className="w-full rounded-md py-2 px-5 bg-aamdanBackground border" placeholder="Add Skill" />
                            <button className="absolute top-0 right-0 h-full bg-gradient-to-r from-aamdanBlue to-aamdanPurple rounded-r px-5">
                                <p className="font-bold">Add</p>
                            </button>
                        </div>
                        <div className="flex flex-wrap mb-5">
                            <div className="mr-2">
                                <SkillTagWithClose text={'Urdu'} />
                            </div>
                            <div className="mr-2">
                                <SkillTagWithClose text={'Urdu'} />
                            </div>
                            <div className="mr-2">
                                <SkillTagWithClose text={'Urdu'} />
                            </div>
                            <div className="mr-2">
                                <SkillTagWithClose text={'Urdu'} />
                            </div>
                            <div className="mr-2">
                                <SkillTagWithClose text={'Urdu'} />
                            </div>
                        </div>
                    </div>
                    <div className="w-full">
                        <h2 className="text-3xl font-heading font-bold mb-5">Education</h2>
                        <div className="relative flex mb-5">
                            <input type="text" className="w-full rounded-md py-2 px-5 bg-aamdanBackground border" placeholder="Add Education" />
                            <button className="absolute top-0 right-0 h-full bg-gradient-to-r from-aamdanBlue to-aamdanPurple rounded-r px-5">
                                <p className="font-bold">Add</p>
                            </button>
                        </div>
                        <div className="flex flex-wrap mb-5">
                            <div className="mr-2">
                                <SkillTagWithClose text={'Urdu'} />
                            </div>
                            <div className="mr-2">
                                <SkillTagWithClose text={'Urdu'} />
                            </div>
                            <div className="mr-2">
                                <SkillTagWithClose text={'Urdu'} />
                            </div>
                            <div className="mr-2">
                                <SkillTagWithClose text={'Urdu'} />
                            </div>
                            <div className="mr-2">
                                <SkillTagWithClose text={'Urdu'} />
                            </div>
                        </div>
                    </div>
                    <div className="w-1/2">
                        <RegularRoundedButton text={'Update Profile'} />
                    </div>
                </div>
            </div>
        <Footer />
        <ToastContainer />
        
    </div>
</div> );
}

export default FreelancerEditProfilePage;