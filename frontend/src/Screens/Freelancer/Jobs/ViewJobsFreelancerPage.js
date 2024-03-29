import { useEffect, useState } from "react";
import {  Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NavBarFreelancer from "../../../Components/Nav/NavBarFreelancer";
import Jobtile from "../../../Components/Tiles/JobTile";
import Footer from "../../../Components/Nav/Footer";



function ViewJobsFreelancerPage() {

    const [selectedFilter, setSelectedFilter] = useState('all');
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, [])
    
    const fetchJobs = async () => {
        try{
            let freelancerInfo = await axios.get(process.env.REACT_APP_ProfilePath+'profileManagement/getFreelancerData',{
                headers:{
                    'token':localStorage.getItem('token')
                }
            })

            console.log(freelancerInfo);

            const skillsobject = {
                skills: freelancerInfo.data.skills
            }

            let response = await axios.post(process.env.REACT_APP_Recommendation+'recommend_jobs', skillsobject, {
                headers:{
                    'token':localStorage.getItem('token')
                }
            })

            console.log(JSON.parse(response.data));
            setData(JSON.parse(response.data));
        }catch(e){
            toast('There seems to be some issue fetching the data!');
        }
    }


    console.log(data);

    const mapJobs = () => {
        return data.map((val,index) => {
            if(val.jobStatus !== 'Removed')
                return <Jobtile isFreelancer={true} id={val._id} key={index} amount={val.amount} bookmarks={val.bookmarkCount} budgetType={val.budgetType} description={val.description} difficulty={val.difficulty} likes={val.dislikeCount} postTime={val.createdAt} proposalCount={val.numberOfProposals} tags={val.skills} title={val.title} />

        })
    } 

    return ( <div className="w-full flex justify-center bg-white dark:bg-aamdanBackground text-aamdanBackground dark:text-white">
    <div className="w-full lg:w-4/5">
        <NavBarFreelancer />
        <div className="text-center">
            <h1 className="font-heading text-5xl mb-12">View jobs</h1>
        </div>
        <div className="bg-aamdanSuperDeepWhite dark:bg-aamdanSuperDeepBlack rounded-xl w-full sm:px-12 py-9">
            <div className="px-12 sm:px-0">
                <h1 className="font-bold text-5xl mb-10">Recommended Jobs</h1>
                <div className="hidden sm:flex mb-12">
                    <div className="w-full lg:w-1/5 text-center">
                        <p className="text-lg font-bold mb-3 px-5" onClick={() => {setSelectedFilter('all')}}><Link>All ({data.length})</Link></p>
                        <div className={`w-full ${selectedFilter === 'all' ? 'bg-white dark:bg-aamdanBackground' : 'bg-aamdanBackground dark:bg-white'}`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-0 lg:w-4/5">
                        <p className="text-lg font-bold mb-3 px-5">&nbsp;</p>
                        <div className="w-full bg-aamdanBackground dark:bg-white" style={{height:'1px'}} ></div>
                    </div>
                </div>
                <div className=" sm:hidden">
                    <select className="mb-5 rounded-lg bg-white dark:bg-aamdanBackground py-3 px-5 border border-strokeColor border-opacity-50 w-full" onChange={(e) => {setSelectedFilter(e.target.value)}}>
                        <option value='all'>All Jobs</option>
                    </select>
                </div>
                <p className="text-xl mb-12">Browse your jobs according to the filters above to make searching easier.</p>
            </div>
            {
                mapJobs()                
            }
        </div>
        <ToastContainer />
        <Footer />
    </div>
</div> );
}

export default ViewJobsFreelancerPage;