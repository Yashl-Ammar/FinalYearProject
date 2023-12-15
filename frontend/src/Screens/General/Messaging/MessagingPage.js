import {  useState } from "react";
import {   Link, useLocation, useNavigate, } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import RegularInputField from "../../../Components/InputFields/RegularInputField";
import RegularSquareButton from "../../../Components/Buttons/RegularSquareButton";
import RegularTextArea from "../../../Components/InputFields/RegularTextArea";
import RegularRoundedButton from "../../../Components/Buttons/RegularRoundedButton";
import NavBarFreelancer from "../../../Components/Nav/NavBarFreelancer";
import PackageCard from "../../../Components/Cards/PackageCard";
import DragDrop from "../../../Components/DragDrop/DragDrop";
import MessageUserTile from "../../../Components/Tiles/MessageUserTile";
import Footer from "../../../Components/Nav/Footer";



function MessagingPage() {

    return ( <div className="w-full flex justify-center">
    <div className="w-full lg:w-4/5">
        <NavBarFreelancer />
        <div className="bg-aamdanSuperDeepBlack rounded-xl w-full flex">
            <div className="w-1/4 flex flex-col items-center py-10 px-5">
                <h2 className="text-3xl font-bold mb-7">Messages</h2>
                <div className="bg-aamdanDeepBlack rounded-xl py-5 w-full mb-5">
                    <MessageUserTile img={'/femaleUser.svg'} message={'Hello There!'} name={'Yashl Ammar'} />
                    <MessageUserTile img={'/femaleUser.svg'} message={'Hello There!'} name={'Yashl Ammar'} />
                    <MessageUserTile img={'/femaleUser.svg'} message={'Hello There!'} name={'Yashl Ammar'} />
                    <MessageUserTile img={'/femaleUser.svg'} message={'Hello There!'} name={'Yashl Ammar'} />
                    <MessageUserTile img={'/femaleUser.svg'} message={'Hello There!'} name={'Yashl Ammar'} />
                </div>
                <p className="text-lightGray text-xs">Make sure to be careful about sensitive information when conversing with others.</p>
            </div>
            <div className="flex flex-col border-l w-3/4">
                <section className="flex flex-col px-5 py-8 border-b w-full">
                    <div className="flex items-center mb-3">
                        <img className="mr-2" src="/femaleUser.svg" alt="" />
                        <h2 className="text-2xl font-bold"> Kabir Dua</h2>
                    </div>
                    <p className="text-lightGray mb-3">Create an animated advertisement for my energy drink</p>
                    <div className="flex">
                        <p><Link className="mr-5 underline">View Job Post</Link><Link className="underline">View Proposal</Link></p>
                    </div>
                </section>
                <section className="flex flex-col px-5 py-8 w-full">
                    <div className="bg-aamdanDarkGray px-5 py-5 rounded-t-xl rounded-r-xl max-w-max w-4/5 mb-7">
                        <p>I am writing to express my strong interest in the Software Developer position at ABC Corporation. My background in software development and my passion for problem-solving make me a strong fit for this role.I would welcome the opportunity to discuss how my background and skills align with the Software Developer position at ABC Corporation. I have attached my resume for your review and am available for an interview at your convenience. 
Thank you for considering my application. I look forward to the possibility of joining ABC Corporation and contributing to your continued success.
</p>
                    </div>
                    <div className="flex w-full justify-end">
                        <div className="bg-aamdanPurple px-5 py-5 rounded-t-xl rounded-l-xl max-w-max w-4/5 mb-7">
                            <p>I would welcome the opportunity to discuss how my background and skills align with the Software Developer position at ABC Corporation. I have attached my resume for your review and am available for an interview at your convenience.</p>
                        </div>
                    </div>
                    <div className="bg-aamdanDarkGray px-5 py-5 rounded-t-xl rounded-r-xl max-w-max w-4/5 mb-7">
                        <p>Thank you for considering my application.</p>
                    </div>
                </section>
                <section className="flex flex-col px-5 py-3 w-full border">
                    <form className="flex">
                        <input type="text" className="w-full rounded-full px-4 py-1 bg-aamdanDarkGray mr-2" placeholder="Write a Message..." />
                        <img src="/Sent.svg" alt="" />
                    </form>
                </section>
            </div>
        </div>
        <ToastContainer />
        <Footer />
    </div>
</div> );
}

export default MessagingPage;