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
import { Box, Modal } from "@mui/material";
import RegularSquareButton from "../../../Components/Buttons/RegularSquareButton";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: '50%',
    bgcolor: '#222222',
    borderRadius: '20px',
    color: 'white',
    boxShadow: 24,
    p: 4,
  };

function ViewSpecificJobFreelancerPage() {

    const [data, setData] = useState();

    const [gptResponse, setGptResponse] = useState('');

    const navigate = useNavigate();
    const { id } = useParams();

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

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

    const askChatGPT = async function (prompt) {
        try {
            // Make the HTTP POST request using Axios
            const response = await axios.post(process.env.REACT_APP_JobPath+'job/askGpt',{
                prompt: prompt
            },{
                headers:{
                    'token':localStorage.getItem('token')
                }
            })
            
            
            setGptResponse(response.data);

        } catch (error) {
            console.error('An error occurred:', error);
            return 'An error occurred while fetching the response.';
        }
    }

    const mapSkills = () => {
        return data?.skills.map((val,index) => <div className="mb-4 sm:mb-0" key={index}><RegularSkillTag text={val} key={index}/></div>)
    } 

    const checkPaymentVerification = () => {
        if(data.paymentStatus === 'Unverified'){
            return <img className="w-9 mr-4" src="/Instagram Verification Badge (1).svg" alt="" />
        }
        return <img className="w-9 mr-4" src="/Instagram Verification Badge.svg" alt="" />
    }

    return ( <div className="w-full flex justify-center bg-white dark:bg-aamdanBackground text-aamdanBackground dark:text-white">
    <div className="w-full lg:w-4/5">
        <NavBarFreelancer />
        <div className="bg-aamdanSuperDeepWhite dark:bg-aamdanSuperDeepBlack rounded-xl w-full">
            {data !== undefined && <div>
                <section className="px-6 sm:px-12 py-9">
                    <div className="flex justify-between">
                        <h1 className="text-5xl font-bold mb-8">{data?.title}</h1>
                        <div className="w-96">
                            <RoundedTransparentIconButton img='/ChatGPT.svg' text={'Summarize using gpt'} onClick={handleOpen}/>
                        </div>
                    </div>
                    <p className="text-xl font-bold">{data?.category}</p>
                    <p className="text-xl text-lightGrayWhite dark:text-lightGray mb-12">Posted on {data && extractDateTime(data.createdAt)}</p>
                </section>
                <hr/>
                <div className="flex w-full flex-col lg:flex-row">
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
                        <hr />
                        <section className="px-6 sm:px-12 py-9">
                            <h2 className="text-3xl font-bold mb-7">Activity on this Job</h2>
                            <p className="text-xl">Proposals: {data?.numberOfProposals}</p>
                        </section>
                    </div>
                    <div className="lg:w-1/3">
                        <section className="px-6 sm:px-12 py-9 w-full">
                            <div className="mb-7">
                                <RegularRoundedButton text='Apply Now' onClick={() => {navigate('/freelancer/submitProposalPage/'+id)}}/>
                            </div>
                            <div className="mb-7">
                                <RoundedTransparentIconButton img='/Love.svg' text='Save' />
                            </div>
                        </section>
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
            </div>}
            
        </div>
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <h3 className="font-bold text-3xl mb-5">Summarize job description</h3>
                <p className=" mb-5">{gptResponse}</p>
                <RegularSquareButton text={'Summarize'} onClick={() => {askChatGPT('Summarize the following: ' + data?.description)}} />
            </Box>
        </Modal>
        <ToastContainer />
        <Footer />
    </div>
</div> );
}

export default ViewSpecificJobFreelancerPage;