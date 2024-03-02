import RegularSquareButton from "../../Components/Buttons/RegularSquareButton";
import SidebarButton from "../../Components/Buttons/SidebarButton";
import AdminDashboardCard from "../../Components/Cards/AdminDashboardCards";
import AdminSideBar from "../../Components/Nav/AdminSideBar";

function AdminReportsPage() {
    return ( <div className="flex">
        <AdminSideBar active={'reports'} />
        <div className="w-full flex flex-col">
            <div className="mb-7 px-8 pt-7">
                <h2 className="text-3xl font-bold mb-2">Welcome Back, <span className="font-normal">Tiffany Jay</span> </h2>
                <p className="text-lightGray">This dashboard is your command center for managing and optimizing your operations.</p>
            </div>
            <div className="rounded-t-xl bg-aamdanSuperDeepBlack w-full py-7 px-12 flex flex-col flex-grow">
                <h1 className="font-bold text-3xl mb-10">Reports</h1>
                <div className="grid grid-cols-3 gap-7 items-center justify-between mb-12">
                    <AdminDashboardCard icon={'/Increase.svg'} percentageText={'+14.2'} text1={'Total Reports'} text2={'161,473'} />
                    <AdminDashboardCard icon={'/Increase.svg'} percentageText={'+5.3'} text1={'Reports Resolved'} text2={'136,691'} />
                    <AdminDashboardCard icon={'/Decrease.svg'} percentageText={'-7.3'} text1={'Reports Active'} text2={'24,782'} />
                </div>
                <div className="rounded-xl bg-aamdanDeepBlack w-full flex-grow px-7 py-6">
                    <h1 className="font-bold text-3xl mb-6">List of Reports</h1>
                    <p className="text-lightGray mb-10">Showing the most recent reports</p>
                    <table className="w-full">
                        <tr className="text-left">
                            <th>No.</th>
                            <th>Subject</th>
                            <th>Submitted by</th>
                            <th>Category</th>
                            <th>Against</th>
                            <th>Actions</th>
                        </tr>
                        <tr className="h-20 border-b border-lightGray">
                            <td>1.</td>
                            <td>Use of inappropriate language while messaging</td>
                            <td>Tiffany Jay</td>
                            <td className="font-bold">Inappropriate language</td>
                            <td>Tiffany Jay</td>
                            <td>Actions</td>
                        </tr>
                        <tr className="h-20 border-b border-lightGray">
                            <td>1.</td>
                            <td>Use of inappropriate language while messaging</td>
                            <td>Tiffany Jay</td>
                            <td className="font-bold">Inappropriate language</td>
                            <td>Tiffany Jay</td>
                            <td>Actions</td>
                        </tr>
                        <tr className="h-20 border-b border-lightGray">
                            <td>1.</td>
                            <td>Use of inappropriate language while messaging</td>
                            <td>Tiffany Jay</td>
                            <td className="font-bold">Inappropriate language</td>
                            <td>Tiffany Jay</td>
                            <td>Actions</td>
                        </tr>
                        <tr className="h-20 border-b border-lightGray">
                            <td>1.</td>
                            <td>Use of inappropriate language while messaging</td>
                            <td>Tiffany Jay</td>
                            <td className="font-bold">Inappropriate language</td>
                            <td>Tiffany Jay</td>
                            <td>Actions</td>
                        </tr>
                        <tr className="h-20 border-b border-lightGray">
                            <td>1.</td>
                            <td>Use of inappropriate language while messaging</td>
                            <td>Tiffany Jay</td>
                            <td className="font-bold">Inappropriate language</td>
                            <td>Tiffany Jay</td>
                            <td>Actions</td>
                        </tr>
                        
                    </table>
                </div>
            </div>
        </div>
    </div> );
}

export default AdminReportsPage;