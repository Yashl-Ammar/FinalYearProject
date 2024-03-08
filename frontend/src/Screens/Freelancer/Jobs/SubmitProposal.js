import { useEffect, useState } from "react";
import {  Link, useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NavBarFreelancer from "../../../Components/Nav/NavBarFreelancer";
import Jobtile from "../../../Components/Tiles/JobTile";
import { extractDateTime } from "../../../Utilities/ExtractDate";
import RegularSkillTag from "../../../Components/Tag/RegularSkillTag";
import RegularRoundedButton from "../../../Components/Buttons/RegularRoundedButton";
import RoundedTransparentButton from "../../../Components/Buttons/RoundedTransparentButton";
import RoundedTransparentIconButton from "../../../Components/Buttons/RoundedTransparentIconButton";
import Footer from "../../../Components/Nav/Footer";
import NavBarClient from "../../../Components/Nav/NavBarClient";
import RegularInputField from "../../../Components/InputFields/RegularInputField";
import RegularTextArea from "../../../Components/InputFields/RegularTextArea";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import { ProposalValidationSchema } from "../../../Validations/ProposalValidation";


function SubmitProposalPage() {

    const [data, setData] = useState();

    const {
        register,
        handleSubmit,
        watch,
        formState:{errors}
      } = useForm({
        resolver: zodResolver(ProposalValidationSchema)
      })
    let navigate = useNavigate();

    const { id } = useParams();

    useEffect(() => {
        fetchJob();
    }, [])
    
    let fetchJob = async () => {
        try{
            let response = await axios.get(process.env.REACT_APP_JobPath+'job/getSpecificJob/'+id,{
                headers:{
                    'token':localStorage.getItem('token')
                }
            })

            setData(response.data);
        }catch(e){
            toast('There seems to be some issue fetching the data!');
        }
    }

    const mapSkills = () => {
        return data?.skills.map((val,index) => <div className="mb-4" key={index}><RegularSkillTag text={val} key={index}/></div>)
    } 

    const checkPaymentVerification = () => {
        if(data.paymentStatus === 'Unverified'){
            return <img className="w-9 mr-4" src="/Instagram Verification Badge (1).svg" alt="" />
        }
        return <img className="w-9 mr-4" src="/Instagram Verification Badge.svg" alt="" />
    }

    const onSubmit = async (data) => {


        try{
            const obj = {
                job: id,
                bid: data.bid,
                requiredTime: data.duration,
                revisions: data.revision,
                coverLetter: data.letter,
            }

            await axios.post(process.env.REACT_APP_JobPath+'proposal/post',obj,{
                headers:{
                    'token':localStorage.getItem('token')
                }
            })

            navigate('/freelancer/viewYourProposals')
        }catch(e){
            toast('There seems to be some issue fetching the data!');
        }
    }

    return ( <div className="w-full flex justify-center bg-white dark:bg-aamdanBackground text-aamdanBackground dark:text-white">
    <div className="w-full lg:w-4/5">
        <NavBarFreelancer />
        <div className="bg-aamdanSuperDeepWhite dark:bg-aamdanSuperDeepBlack rounded-xl w-full">
            {data !== undefined && <div>
                <section className="px-6 sm:px-12 py-9">
                    <h1 className="text-5xl font-bold mb-8">Submit a Proposal for {data?.title}</h1>
                    <p className="text-xl font-bold">{data?.category}</p>
                    <p className="text-xl text-lightGrayWhite dark:text-lightGray mb-12">Posted on {data && extractDateTime(data.createdAt)}</p>
                </section>
                <hr/>
                <div className="flex w-full flex-col lg:flex-row border-b">
                    <div className="lg:w-2/3 lg:border-r">
                        <section className="px-6 sm:px-12 py-9">
                            <p>{data?.description}</p>
                        </section>
                        <hr />
                        <section className="flex flex-col sm:flex-row px-6 sm:px-12 py-9 justify-around">
                            <div className="flex mb-7 sm:mb-0">
                                <img className="mr-4" src="/Price Tag.svg"  alt="" />
                                <p className="text-3xl font-bold">${data?.amount}</p>
                            </div>
                            <div className="flex items-center">
                                <img className="mr-4" src="/Brain.svg"  alt="" />
                                <p className="text-xl font-bold">{data?.difficulty} Difficulty</p>
                            </div>
                        </section>
                        <hr />
                        <section className="px-6 sm:px-12 py-9">
                            <p className="text-xl font-bold">Project Status : <span className="font-normal">{data?.jobStatus}</span></p>
                        </section>
                        <hr />
                        <section className="px-6 sm:px-12 py-9">
                            <h2 className="text-3xl font-bold mb-7">Skills and Expertise</h2>
                            <div className="grid grid-cols-1 sm:grid-cols-3">
                                {mapSkills()}
                            </div>
                        </section>
                    </div>
                    <div className="lg:w-1/3">
                        <hr />
                        <section className="px-6 sm:px-12 py-9 w-full">
                            <h2 className="text-3xl font-bold mb-7">Client Information</h2>
                            <div className="flex mb-5">
                                {checkPaymentVerification()}
                                <p className="text-lg">Payment {data && data.client ? data.client.paymentStatus : 'Unknown'}</p>
                            </div>
                            <div className="flex mb-5">
                                <p className="w-9 text-center mr-4">{data && data.client ? data.client.rating : '1'}</p>
                                <img className="mr-4" src="/Star.svg" alt="" />
                            </div>
                            <div className="flex mb-5">
                                <img className="w-9 mr-4" src="/Location.svg" alt="" />
                                <p className="text-center mr-4">{data && data.client ? data.client.country : 'US'}</p>
                            </div>
                            <div className="flex mb-5">
                                <p className="text-center mr-4 font-bold text-xl">Number of Jobs Posted: <span className="font-normal">{data && data.client ? data.client.noOfJobPosted : '1'}</span></p>
                            </div>
                            <div className="flex mb-5">
                                <p className="text-center mr-4 font-bold text-xl">Total Spent: <span className="font-normal">{data && data.client ? data.client.totalSpending : '1'}</span></p>
                            </div>
                        </section>
                        <hr />
                        <section className="px-6 sm:px-12 py-9 w-full">
                            <h2 className="text-3xl font-bold mb-7">Job link</h2>
                            <input disabled className="rounded-lg bg-white dark:bg-aamdanBackground py-3 px-5 border border-strokeColor border-opacity-50 w-full mb-5" value={`www.amdan.com/job/${id}`}/>
                            <RoundedTransparentIconButton img='/Copy.svg' text='Copy Link' onClick={() => {navigator.clipboard.writeText(`www.amdan.com/job/${id}`);}} />
                        </section>
                    </div>
                </div>
                <div className="px-6 sm:px-12 py-9">
                    <form onSubmit={handleSubmit(onSubmit)}>
                        <h2 className="font-bold text-3xl mb-5">Terms</h2>
                        <h3 className="font-bold text-xl mb-5">What is the full amount you'd like to bid for this job?</h3>
                        <p className="font-bold mb-5">Bid</p>
                        <div className="w-1/2 mb-8">
                            <RegularInputField placeholder={'$5'} register={register('bid')} />
                            {errors.bid && <p className="py-2 text-red" >{errors.bid.message}</p>}
                        </div>
                        <h2 className="font-bold text-3xl mb-5">Additional Details</h2>
                        <p className="font-bold mb-5">How long will this project take?</p>
                        <div className="w-1/2 mb-8">
                            <RegularInputField placeholder={'5'} register={register('duration')} />
                            {errors.duration && <p className="py-2 text-red" >{errors.duration.message}</p>}
                        </div>
                        <p className="font-bold mb-5">Number of Revisions</p>
                        <div className="w-1/2 mb-8">
                            <RegularInputField placeholder={'3'} register={register('revision')} />
                            {errors.revision && <p className="py-2 text-red" >{errors.revision.message}</p>}
                        </div>
                        <p className="font-bold mb-5">Cover letter</p>
                        <div className="mb-8">
                            <RegularTextArea placeholder={'Cover Letter'} register={register('letter')} />
                            {errors.letter && <p className="py-2 text-red" >{errors.letter.message}</p>}
                        </div>
                        <RegularRoundedButton text={'Submit'} type='submit' />
                    </form>
                </div>    
            </div>}
            
        </div>
        <ToastContainer />
        <Footer />
    </div>
</div> );
}

export default SubmitProposalPage;