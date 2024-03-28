import { useEffect, useState } from "react";
import RegularSquareButton from "../../Components/Buttons/RegularSquareButton";
import SidebarButton from "../../Components/Buttons/SidebarButton";
import AdminDashboardCard from "../../Components/Cards/AdminDashboardCards";
import AdminSideBar from "../../Components/Nav/AdminSideBar";
import axios from "axios";
import ReportDashboardTile from "../../Components/Tiles/ReportDashboardTile";
import { extractDateTime } from "../../Utilities/ExtractDate";

function AdminReportsPage() {

    const [data,setData] = useState([]);
    const [reportData,setReportData] = useState([]);

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () => {
        try{

            let response = await axios.get(process.env.REACT_APP_AdminPath + 'admin/reportsInformation',{
                headers:{
                    'token': localStorage.getItem('token')
                }
            })
            
            let reportsData = await axios.get(process.env.REACT_APP_AdminPath + 'admin/getReports',{
                headers:{
                    'token': localStorage.getItem('token')
                }
            })
            
            console.log(reportsData)
            console.log(response)
            
            setData(response.data);
            setReportData(reportsData.data.reports);

        }catch(e){
            console.log(e)
        }
    } 

    const mapReports = () => {
        return reportData?.map((val, index) => {
            return <ReportDashboardTile serial={index+1} status={val.reportStatus} title={val.title} type={val.type} date={extractDateTime(val.createdAt)}/>
        }) 
    }

    return ( <div className="flex bg-white dark:bg-aamdanBackground text-aamdanBackground dark:text-white">
        <AdminSideBar active={'reports'} />
        <div className="w-full flex flex-col">
            <div className="mb-7 px-8 pt-7">
                <h2 className="text-3xl font-bold mb-2">Welcome Back, <span className="font-normal">Tiffany Jay</span> </h2>
                <p className="text-lightGrayWhite dark:text-lightGray">This dashboard is your command center for managing and optimizing your operations.</p>
            </div>
            <div className="rounded-t-xl bg-aamdanSuperDeepWhite dark:bg-aamdanSuperDeepBlack w-full py-7 px-12 flex flex-col flex-grow">
                <h1 className="font-bold text-3xl mb-10">Reports</h1>
                <div className="grid grid-cols-3 gap-7 items-center justify-between mb-12">
                    <AdminDashboardCard icon={'/Increase.svg'} percentageText={'+14.2'} text1={'Total Reports'} text2={'161,473'} />
                    <AdminDashboardCard icon={'/Increase.svg'} percentageText={'+5.3'} text1={'Reports Resolved'} text2={'136,691'} />
                    <AdminDashboardCard icon={'/Decrease.svg'} percentageText={'-7.3'} text1={'Reports Active'} text2={'24,782'} />
                </div>
                <div className="rounded-xl bg-aamdanDeepWhite dark:bg-aamdanDeepBlack w-full flex-grow px-7 py-6">
                    <h1 className="font-bold text-3xl mb-6">List of Reports</h1>
                    <p className="text-lightGrayWhite dark:text-lightGray mb-10">Showing the most recent reports</p>
                    <table className="w-full">
                        <tr className="text-left">
                            <th>No.</th>
                            <th>Title</th>
                            <th>Type</th>
                            <th>Status</th>
                            <th>Date</th>
                            <th>Actions</th>
                        </tr>
                        {mapReports()}
                        
                    </table>
                </div>
            </div>
        </div>
    </div> );
}

export default AdminReportsPage;