import { useEffect, useState } from "react";
import RegularSquareButton from "../../Components/Buttons/RegularSquareButton";
import SidebarButton from "../../Components/Buttons/SidebarButton";
import AdminDashboardCard from "../../Components/Cards/AdminDashboardCards";
import AdminSideBar from "../../Components/Nav/AdminSideBar";
import axios from "axios";
import FreelancreDashboardTile from "../../Components/Tiles/FreelancerDashboardTile";
import { extractDateTime } from "../../Utilities/ExtractDate";

function AdminDashboardPage() {

    const [data,setData] = useState([]);
    const [freelancerData,setFreelanacerData] = useState([]);

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () => {
        try{

            let response = await axios.get(process.env.REACT_APP_AdminPath + 'admin/dashboard',{
                headers:{
                    'token': localStorage.getItem('token')
                }
            })
            
            let topFreelancers = await axios.get(process.env.REACT_APP_AdminPath + 'admin/topFreelancers',{
                headers:{
                    'token': localStorage.getItem('token')
                }
            })
            
            setData(response.data);
            setFreelanacerData(topFreelancers.data);
            

        }catch(e){
            console.log(e)
        }
    } 

    const mapFreelancers = () => {
        return freelancerData.map((val, index) => {
            return <FreelancreDashboardTile email={val.email} name={val.fname + ' ' + val.lname} orders={val.completedOrder} ratings={val.rating} serial={index+1} since={extractDateTime(val.createdAt)} />
        }) 
    }

    return ( <div className="flex bg-aamdanBackgroundWhite dark:bg-aamdanBackground text-aamdanBackground dark:text-white">
        <AdminSideBar active={'dashboard'} />
        <div className="w-full flex flex-col">
            <div className="mb-7 px-8 pt-7">
                <h2 className="text-3xl font-bold mb-2">Welcome Back, <span className="font-normal">Tiffany Jay</span> </h2>
                <p className="text-lightGrayWhite dark:text-lightGray">This dashboard is your command center for managing and optimizing your operations.</p>
            </div>
            <div className="rounded-t-xl bg-aamdanSuperDeepWhite dark:bg-aamdanSuperDeepBlack w-full py-7 px-12 flex flex-col flex-grow">
                <h1 className="font-bold text-3xl mb-10">Dashboard</h1>
                <div className="grid grid-cols-3 gap-7 items-center justify-between mb-12">
                    <AdminDashboardCard  text1={'Total Clients'} text2={data?.clientCount} />
                    <AdminDashboardCard  text1={'Total Freelancers'} text2={data?.freelancerCount} />
                    <AdminDashboardCard  text1={'Total Orders'} text2={data?.orderCount} />
                </div>
                <div className="rounded-xl bg-aamdanDeepWhite dark:bg-aamdanDeepBlack w-full px-7 py-6">
                    <h1 className="font-bold text-3xl mb-6">Top Freelancers</h1>
                    <p className="text-lightGrayWhite dark:text-lightGray mb-10">Showing top 50 freelancer</p>
                    <table className="w-full">
                        <tr className="text-left">
                            <th>No.</th>
                            <th>Email</th>
                            <th>Name</th>
                            <th>Total Orders</th>
                            <th>Rating</th>
                            <th>Since</th>
                            <th>Actions</th>
                        </tr>
                        
                        {mapFreelancers()}
                    </table>
                </div>
            </div>
        </div>
    </div> );
}

export default AdminDashboardPage;