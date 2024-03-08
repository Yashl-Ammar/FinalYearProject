import RegularSquareButton from "../../Components/Buttons/RegularSquareButton";
import SidebarButton from "../../Components/Buttons/SidebarButton";
import AdminDashboardCard from "../../Components/Cards/AdminDashboardCards";
import AdminSideBar from "../../Components/Nav/AdminSideBar";

function AdminUsersPage() {
    return ( <div className="flex  bg-white dark:bg-aamdanBackground text-aamdanBackground dark:text-white">
        <AdminSideBar active={'users'} />
        <div className="w-full flex flex-col">
            <div className="mb-7 px-8 pt-7">
                <h2 className="text-3xl font-bold mb-2">Welcome Back, <span className="font-normal">Tiffany Jay</span> </h2>
                <p className="text-lightGrayWhite dark:text-lightGray">This dashboard is your command center for managing and optimizing your operations.</p>
            </div>
            <div className="rounded-t-xl bg-aamdanSuperDeepWhite dark:bg-aamdanSuperDeepBlack w-full py-7 px-12 flex flex-col flex-grow">
                <h1 className="font-bold text-3xl mb-10">Users</h1>
                <div className="grid grid-cols-3 gap-7 items-center justify-between mb-12">
                    <AdminDashboardCard icon={'/Increase.svg'} percentageText={'+14.2'} text1={'Total Users'} text2={'161,473'} />
                    <AdminDashboardCard icon={'/Increase.svg'} percentageText={'+5.3'} text1={'Total Freelancers'} text2={'78,231'} />
                    <AdminDashboardCard icon={'/Decrease.svg'} percentageText={'-7.3'} text1={'Total Clients'} text2={'24,782'} />
                </div>
                <div className="rounded-xl bg-aamdanDeepWhite dark:bg-aamdanDeepBlack w-full flex-grow px-7 py-6">
                    <h1 className="font-bold text-3xl mb-6">List of User</h1>
                    <p className="text-lightGrayWhite dark:text-lightGray mb-10">Showing users</p>
                    <table className="w-full">
                        <tr className="text-left">
                            <th>No.</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>DOB</th>
                            <th>Role</th>
                            <th>Contact</th>
                        </tr>
                        <tr className="h-20 border-b border-lightGrayWhite dark:border-lightGray">
                            <td>1.</td>
                            <td>Tiffany Jay</td>
                            <td>TiffanyJay@gmail.com</td>
                            <td className="font-bold">2023-12-05</td>
                            <td className="font-bold">Client</td>
                            <td className="font-bold">92215688554</td>
                        </tr>
                        <tr className="h-20 border-b border-lightGrayWhite dark:border-lightGray">
                            <td>1.</td>
                            <td>Tiffany Jay</td>
                            <td>TiffanyJay@gmail.com</td>
                            <td className="font-bold">2023-12-05</td>
                            <td className="font-bold">Client</td>
                            <td className="font-bold">92215688554</td>
                        </tr>
                        <tr className="h-20 border-b border-lightGrayWhite dark:border-lightGray">
                            <td>1.</td>
                            <td>Tiffany Jay</td>
                            <td>TiffanyJay@gmail.com</td>
                            <td className="font-bold">2023-12-05</td>
                            <td className="font-bold">Client</td>
                            <td className="font-bold">92215688554</td>
                        </tr>
                        <tr className="h-20 border-b border-lightGrayWhite dark:border-lightGray">
                            <td>1.</td>
                            <td>Tiffany Jay</td>
                            <td>TiffanyJay@gmail.com</td>
                            <td className="font-bold">2023-12-05</td>
                            <td className="font-bold">Client</td>
                            <td className="font-bold">92215688554</td>
                        </tr>
                        <tr className="h-20 border-b border-lightGrayWhite dark:border-lightGray">
                            <td>1.</td>
                            <td>Tiffany Jay</td>
                            <td>TiffanyJay@gmail.com</td>
                            <td className="font-bold">2023-12-05</td>
                            <td className="font-bold">Client</td>
                            <td className="font-bold">92215688554</td>
                        </tr>
                    </table>
                </div>
            </div>
        </div>
    </div> );
}

export default AdminUsersPage;