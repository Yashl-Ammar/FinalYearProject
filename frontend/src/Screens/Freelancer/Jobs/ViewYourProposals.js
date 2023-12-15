import { useEffect, useState } from "react";
import {  Link, useParams } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NavBarFreelancer from "../../../Components/Nav/NavBarFreelancer";
import Jobtile from "../../../Components/Tiles/JobTile";
import Proposaltile from "../../../Components/Tiles/ProposalTile";
import Footer from "../../../Components/Nav/Footer";
import NavBarClient from "../../../Components/Nav/NavBarClient";



function ViewYourProposalsPage() {

    const [selectedFilter, setSelectedFilter] = useState('best');
    const [data, setData] = useState([]);

    console.log('data');

    const { id } = useParams();

    useEffect(() => {
        fetchJobs();
    }, [])
    
    const fetchJobs = async () => {
        try{
            let response = await axios.get(process.env.REACT_APP_JobPath+'proposal/allproposalByFreelancer',{
                headers:{
                    'token':localStorage.getItem('token')
                }
            })


            setData(response.data);
        }catch(e){
            toast('There seems to be some issue fetching the data!');
        }
    }

    console.log(data);

    const mapJobProposals = () => {
        return data.map((val,index) => {
            if(selectedFilter === 'best')
            {
                return <Proposaltile isFreelancer={true} key={index} jobId={id} url={val.freelancer.profilepic} amount={val.bid} country={val.freelancer.country} description={val.coverLetter} id={val._id} pinned={val.pinned} postTime={val.createdAt} rating={val.freelancer.rating} user={val.freelancer.fname + ' ' + val.freelancer.lname} />
            }
            else if(selectedFilter === 'pinned'){
                if(val.pinned)
                    return <Proposaltile isFreelancer={true} key={index} jobId={id} url={val.freelancer.profilepic} amount={val.bid} country={val.freelancer.country} description={val.coverLetter} id={val._id} pinned={val.pinned} postTime={val.createdAt} rating={val.freelancer.rating} user={val.freelancer.fname + ' ' + val.freelancer.lname} />
            }
        })
    } 

    return ( <div className="w-full flex justify-center">
    <div className="w-full lg:w-4/5">
        <NavBarClient />
        <div className="text-center">
            <h1 className="font-heading text-5xl mb-12">View Proposals on this job</h1>
        </div>
        <div className="bg-aamdanSuperDeepBlack rounded-xl w-full sm:px-12 py-9">
            <div className="px-12 sm:px-0">
                <h1 className="font-bold text-5xl mb-10">Proposals</h1>
                <div className="hidden sm:flex mb-12">
                    <div className="w-full lg:w-1/5 text-center">
                        <p className="text-lg font-bold mb-3 px-5" onClick={() => {setSelectedFilter('best')}}><Link>Best Matches</Link></p>
                        <div className={`w-full ${selectedFilter === 'best' ? 'bg-aamdanBackground' : 'bg-white'}`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-full lg:w-1/5 text-center">
                        <p className="text-lg font-bold mb-3 px-5" onClick={() => {setSelectedFilter('pinned')}}><Link>Pinned proposals</Link></p>
                        <div className={`w-full ${selectedFilter === 'pinned' ? 'bg-aamdanBackground' : 'bg-white'}`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-0 lg:w-3/5">
                        <p className="text-lg font-bold mb-3 px-5">&nbsp;</p>
                        <div className="w-full bg-white" style={{height:'1px'}} ></div>
                    </div>
                </div>
                <div className=" sm:hidden">
                    <select className="mb-5 rounded-lg bg-aamdanBackground py-3 px-5 border border-strokeColor border-opacity-50 w-full" onChange={(e) => {setSelectedFilter(e.target.value)}}>
                        <option value='best'>Best Matches</option>
                        <option value='pinned'>Pinned</option>
                    </select>
                </div>
                <p className="text-xl mb-12">Proposals that match your job. Ordered by most relevant.</p>
            </div>
            {
                mapJobProposals()       
            }
        </div>
        <ToastContainer />
        <Footer />
    </div>
</div> );
}

export default ViewYourProposalsPage;