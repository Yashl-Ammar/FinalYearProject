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



function FreelancerHomepage() {

   
    return ( <div className="w-full flex justify-center">
    <div className="w-full lg:w-4/5">
        <NavBarFreelancer />
            <div className="flex">
                <div className="w-full bg-aamdanSuperDeepBlack rounded-lg">
                    <section className="flex flex-col items-center py-5 border-b">
                        <img className="w-32" src="/femaleUser.svg" alt="" />
                        <h1 className="mb-5 font-bold text-5xl font-heading bg-gradient-to-r from-aamdanPurple to-aamdanPink text-transparent bg-clip-text">Tom Latham</h1>
                        <h2 className="text-lightGray text-3xl mb-5">@lathamtom</h2>
                        <p className="text-lightGray mb-5">Professional Developer</p>
                        <div className="w-2/3">
                            <RegularSquareButton text={'Edit Profile'} />
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
                        <p>Pakistan</p>
                    </section>
                    <section className="py-5 px-5 border-b">
                        <h2 className="font-heading font-bold text-3xl mb-5">Description</h2>
                        <p className="mb-5">As a professional developer, I offer high-quality programming solutions to help you excel in your assignments and tasks. With expertise in C++ and Java languages, I apply industry-standard programming practices to ensure your success. Whether you need help with Programming Fundamentals or Object-Oriented Programming, I can provide expert guidance and support. If you're looking for a reliable and efficient developer, don't hesitate to reach out to me. I specialize in assignments in C++ Programming Fundamentals and Java OOP and PF concepts.</p>
                    </section>
                    <section className="py-5 px-5 border-b">
                        <h2 className="font-heading font-bold text-3xl mb-5">Languages</h2>
                        <p className="mb-5">English</p>
                        <p className="mb-5">Urdu</p>
                        <p className="mb-5">Hindi</p>
                    </section>
                    <section className="py-5 px-5 border-b">
                        <h2 className="font-heading font-bold text-3xl mb-5">Skills</h2>
                        <div className="flex flex-wrap">
                            <div className="mr-4 mb-4">
                                <RegularSkillTag text={'Java'} />
                            </div>
                            <div className="mr-4 mb-4">
                                <RegularSkillTag text={'User Authentication'} />
                            </div>
                            <div className="mr-4 mb-4">
                                <RegularSkillTag text={'Android App Development'} />
                            </div>
                            <div className="mr-4 mb-4">
                                <RegularSkillTag text={'CPP'} />
                            </div>
                            <div className="mr-4 mb-4">
                                <RegularSkillTag text={'React'} />
                            </div>
                            <div className="mr-4 mb-4">
                                <RegularSkillTag text={'NodeJs'} />
                            </div>
                            <div className="mr-4 mb-4">
                                <RegularSkillTag text={'JQuery'} />
                            </div>
                        </div>
                    </section>
                    <section className="py-5 px-5">
                        <h2 className="font-heading font-bold text-3xl mb-5">Education</h2>
                        <p className="mb-5">MS- Computer Science</p>
                        <p className="mb-5">BS-Software Engineering</p>
                    </section>
                    
                </div>
                <div className="w-full pl-5 ">
                        <section className="mb-10">
                            <h1 className="text-5xl">Iathamtom's Gigs</h1>
                            <div className="grid grid-cols-2 mb-10">
                                <GigCard id={1} img='/cat1.jpg' completedOrders={21} name='Tiffany Jay' rating='4.3' startingPrice={11000} title={'I am a professional who creates professional looking websites.'} userImg='/femaleUser.svg' />
                                <GigCard id={2} img='/cat2.jpg' completedOrders={21} name='Tiffany Jay' rating='4.3' startingPrice={11000} title={'I am a professional who creates professional looking websites.'} userImg='/femaleUser.svg' />
                            </div>
                            <RegularSquareButton text={'View all'} />
                        </section>
                        <section className="bg-aamdanSuperDeepBlack w-full px-5 py-3 rounded-lg mb-10">
                            <div className="flex items-center justify-between">
                                <h2 className="text-3xl">Active Orders - 0 ($0). </h2>
                                <div>
                                    <RegularSquareButton text={'View Orders'} />
                                </div>
                            </div>
                        </section>
                    <section className="bg-aamdanSuperDeepBlack w-full px-5 py-7 rounded-lg">
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