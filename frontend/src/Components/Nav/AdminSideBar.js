import { useNavigate } from "react-router-dom";
import SidebarButton from "../Buttons/SidebarButton";

function AdminSideBar({active}) {

    const navigate = useNavigate();

    return ( <div className="flex flex-col py-10 w-1/4 bg-white dark:bg-aamdanBackground sticky h-screen items-center top-0">
    <div>
        <div className="flex items-center mb-7">
            <img className="h-8" src="/AamdanLogo.svg" alt="" />
            <h2 className="text-3xl font-heading font-bold" >Aamdan</h2>
        </div>
        <p className="mb-7 font-bold text-base text-lightGrayWhite dark:text-lightGray">Making freelancing easy</p>
        <div className="h-[1px] bg-lightGrayWhite dark:bg-lightGray" ></div>
    </div>
    <div className="flex flex-col w-full pt-12 justify-between h-full">
        <div className="w-full">
            <SidebarButton text='Dashboard' icon="/DashboardIcon.svg" onClick={() => {navigate('/admin/dashboard')}} active={active === 'dashboard'}/>
            <SidebarButton text='Reports' icon="/Exclamation Mark.svg" onClick={() => {navigate('/admin/reports')}} active={active === 'reports'}/>
            <SidebarButton text='Tickets' icon="/Ticket.svg" onClick={() => {navigate('/admin/tickets')}} active={active === 'tickets'}/>
            <SidebarButton text='Customer Support' icon="/Customer Support.svg" onClick={() => {navigate('/admin/customersupport')}} active={active === 'customer support'}/>
            <SidebarButton text='Users' icon="/Users.svg" onClick={() => {navigate('/admin/users')}} active={active === 'users'}/>
            <SidebarButton text='Admins' icon="/Administrator Male.svg" onClick={() => {navigate('/admin/admins')}} active={active === 'admin'}/>
        </div>
        <div>
            <SidebarButton text='Logout' icon="/Logout.svg" onClick={() => {navigate('/admin/login')}}/>
        </div>
    </div>
</div> );
}

export default AdminSideBar;