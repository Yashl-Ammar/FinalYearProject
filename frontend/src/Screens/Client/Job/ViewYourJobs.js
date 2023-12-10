import { useEffect, useState } from "react";
import {  Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import NavBarFreelancer from "../../../Components/Nav/NavBarFreelancer";
import Jobtile from "../../../Components/Tiles/JobTile";



function ViewYourJobPage() {

    const [selectedFilter, setSelectedFilter] = useState('active');
    const [data, setData] = useState([]);

    useEffect(() => {
        fetchJobs();
    }, [])
    
    const fetchJobs = async () => {
        try{
            let response = await axios.get(process.env.REACT_APP_JobPath+'job/getPostedJobsByClient',{
                headers:{
                    'token':localStorage.getItem('token')
                }
            })

            setData(response.data);
        }catch(e){
            toast('There seems to be some issue fetching the data!');
        }
    }

    const countActive = () => {
        let count = 0;
        data.forEach((val) => {
            if(val.jobStatus === 'Active'){
                count++;
            }
        })
        return count;
    }

    console.log(data);

    const mapJobs = () => {
        return data.map((val,index) => {
            if(selectedFilter === 'active')
            {
                if(val.jobStatus === 'Active')
                    return <Jobtile id={val._id} key={index} amount={val.amount} bookmarks={val.bookmarkCount} budgetType={val.budgetType} description={val.description} difficulty={val.difficulty} likes={val.dislikeCount} postTime={val.createdAt} proposalCount={val.numberOfProposals} tags={val.skills} title={val.title} />
            }
            else if(selectedFilter === 'removed'){
                if(val.jobStatus === 'Removed')
                    return <Jobtile id={val._id} key={index} amount={val.amount} bookmarks={val.bookmarkCount} budgetType={val.budgetType} description={val.description} difficulty={val.difficulty} likes={val.dislikeCount} postTime={val.createdAt} proposalCount={val.numberOfProposals} tags={val.skills} title={val.title} />
            }
            else{
                return <Jobtile id={val._id} key={index} amount={val.amount} bookmarks={val.bookmarkCount} budgetType={val.budgetType} description={val.description} difficulty={val.difficulty} likes={val.dislikeCount} postTime={val.createdAt} proposalCount={val.numberOfProposals} tags={val.skills} title={val.title} />
            }
        })
    } 

    return ( <div className="w-full flex justify-center">
    <div className="w-full lg:w-4/5">
        <NavBarFreelancer />
        <div className="text-center">
            <h1 className="font-heading text-5xl mb-12">View your jobs</h1>
        </div>
        <div className="bg-aamdanSuperDeepBlack rounded-xl w-full sm:px-12 py-9">
            <div className="px-12 sm:px-0">
                <h1 className="font-bold text-5xl mb-10">Jobs you posted</h1>
                <div className="hidden sm:flex mb-12">
                    <div className="w-full lg:w-1/5 text-center">
                        <p className="text-lg font-bold mb-3 px-5" onClick={() => {setSelectedFilter('active')}}><Link>Active ({countActive()})</Link></p>
                        <div className={`w-full ${selectedFilter === 'active' ? 'bg-aamdanBackground' : 'bg-white'}`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-full lg:w-1/5 text-center">
                        <p className="text-lg font-bold mb-3 px-5" onClick={() => {setSelectedFilter('removed')}}><Link>Removed ({data.length - countActive()})</Link></p>
                        <div className={`w-full ${selectedFilter === 'removed' ? 'bg-aamdanBackground' : 'bg-white'}`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-full lg:w-1/5 text-center">
                        <p className="text-lg font-bold mb-3 px-5" onClick={() => {setSelectedFilter('all')}}><Link>All ({data.length})</Link></p>
                        <div className={`w-full ${selectedFilter === 'all' ? 'bg-aamdanBackground' : 'bg-white'}`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-0 lg:w-2/5">
                        <p className="text-lg font-bold mb-3 px-5">&nbsp;</p>
                        <div className="w-full bg-white" style={{height:'1px'}} ></div>
                    </div>
                </div>
                <div className=" sm:hidden">
                    <select className="mb-5 rounded-lg bg-aamdanBackground py-3 px-5 border border-strokeColor border-opacity-50 w-full" onChange={(e) => {setSelectedFilter(e.target.value)}}>
                        <option value='active'>Active Jobs</option>
                        <option value='removed'>Removed Jobs</option>
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
    </div>
</div> );
}

export default ViewYourJobPage;