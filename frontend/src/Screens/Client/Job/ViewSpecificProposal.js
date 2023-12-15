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
import RegularRoundedIconButton from "../../../Components/Buttons/RegularRoundedIconButton";
import Footer from "../../../Components/Nav/Footer";
import NavBarClient from "../../../Components/Nav/NavBarClient";



function ViewSpecificProposalPage() {

    const [data, setData] = useState();

    const navigate = useNavigate();
    const { id, pid } = useParams();

    console.log(id)
    console.log(pid)

    useEffect(() => {
        fetchJob();
    }, [])
    
    let fetchJob = async () => {
        try{
            let response = await axios.get(process.env.REACT_APP_JobPath+'proposal/viewSpecificProposal/'+pid,{
                headers:{
                    'token':localStorage.getItem('token')
                }
            })

            console.log(response);

            setData(response.data);
        }catch(e){
            toast('There seems to be some issue fetching the data!');
        }
    }

    const mapSkills = () => {
        return data?.freelancer.skills.map((val,index) => <div className="mb-4" key={index}><RegularSkillTag text={val} key={index}/></div>)
    } 

    const mapLanguages = () => {
        return data?.freelancer.languages.map((val,index) => {
            return <p className="mb-2" key={index}>{val}</p>
        })
    }
    
    const mapAttachments = () => {
        return data?.files.map((val,index) => {
            return <a href={val} className="text-aamdanBlue mb-2 flex overflow-auto" key={index}>{val}</a>
        })
    }

    return ( <div className="w-full flex justify-center">
    <div className="w-full lg:w-4/5">
        <NavBarClient />
        <div className="bg-aamdanSuperDeepBlack rounded-xl w-full">
            {data !== undefined && <div>
                <section className="px-6 sm:px-12 py-9">
                    <div className="flex justify-between">
                        <h1 className="text-5xl font-bold mb-8">Proposal By {data?.freelancer.fname + ' ' + data?.freelancer.lname}</h1>
                        <img className="w-12 h-12 rounded-full" src={data.freelancer.profilepic} alt="" />
                    </div>
                    <p className="text-xl text-lightGray mb-12">Posted on {data && extractDateTime(data.createdAt)}</p>
                </section>
                <hr/>
                <div className="flex w-full flex-col lg:flex-row">
                    <div className="lg:w-2/3 lg:border-r">
                        <section className="px-6 sm:px-12 py-9">
                            <h1 className="text-3xl font-bold mb-8">Cover Letter</h1>
                            <p>{data?.coverLetter}</p>
                        </section>
                        <hr />
                        <section className="flex flex-col sm:flex-row px-6 sm:px-12 py-9 justify-around">
                            <div className="flex mb-7 sm:mb-0">
                                <img className="mr-4" src="/Price Tag.svg"  alt="" />
                                <p className="text-3xl font-bold">${data?.bid}</p>
                            </div>
                            <div className="flex items-center">
                                <img className="mr-4" src="/Delivery Time.svg"  alt="" />
                                <p className="text-xl font-bold">Delivery Time: {data?.requiredTime} </p>
                            </div>
                        </section>
                        <hr />
                        <section className="px-6 sm:px-12 py-9">
                            <h2 className="text-3xl font-bold mb-7">Attachments: </h2>
                            {   data?.file !== 0 &&
                                mapAttachments()
                            }
                            {/* <p className="text-xl">Proposals: {data?.numberOfProposals}</p> */}
                        </section>
                    </div>
                    <div className="lg:w-1/3">
                        <section className="px-6 sm:px-12 py-9 w-full">
                            <div className="mb-7">
                                <RegularRoundedIconButton img='/Chat Message.svg' text='Message' onClick={() => {navigate('/job/'+id+'/proposals')}}/>
                            </div>
                            <div className="mb-7">
                                <RegularRoundedIconButton img='/Purchase Order.svg' text='Place Order' onClick={async () => {
                                    try{
                                        const obj = {
                                            type: 'Job Order', 
                                            orderStatus: 'Active', 
                                            paymentMethod: 'Card', 
                                            paymentStatus: 'Verified', 
                                            price: data.bid,
                                            revisions: data.revisions
                                        }
                                        let response = await axios.post(process.env.REACT_APP_OrderPath+'order/placeOrder/'+data.freelancer._id,obj,{
                                            headers:{
                                                'token':localStorage.getItem('token')
                                            }
                                        })
                            
                                        console.log(response);
                            
                                        setData(response.data);
                                    }catch(e){
                                        toast('There seems to be some issue fetching the data!');
                                    }
                                    
                                    navigate('/client/manageOrderClientPage')
                                }}/>
                            </div>
                        </section>
                        <hr />
                        <section className="px-6 sm:px-12 py-9 w-full">
                            <h2 className="text-3xl font-bold mb-7">Freelancer Information</h2>
                            <div className="flex items-center mb-5">
                                <p className="w-9 text-center mr-4">{data && data.client ? data.freelancer.rating : '0'}</p>
                                <img className="mr-4" src="/Star.svg" alt="" />
                            </div>
                            <div className="flex items-center mb-5">
                                <img className="w-9 mr-4" src="/Location.svg" alt="" />
                                <p className="text-center mr-4">{data && data.freelancer ? data.freelancer.country : 'US'}</p>
                            </div>
                            <div>
                                <h3 className="text-xl font-bold mb-3">Languages:</h3>
                                <div className="">
                                    {mapLanguages()}
                                </div>
                            </div>
                        </section>
                        <hr />
                        <section className="px-6 sm:px-12 py-9 w-full">
                            <h2 className="text-3xl font-bold mb-7">Skills and Expertise</h2>
                            <div className="grid grid-cols-1">
                                {mapSkills()}
                            </div>
                        </section>
                    </div>
                </div>    
            </div>}
            
        </div>
        <ToastContainer />
        <Footer />
    </div>
</div> );
}

export default ViewSpecificProposalPage;