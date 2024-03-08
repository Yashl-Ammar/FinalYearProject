import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBarClient() {

    const navigate = useNavigate()
    const [toggleNav, setToggleNav] = useState(false);
    return ( 
        <div className="flex justify-center w-full text-aamdanBackground dark:text-white">
            <div className="flex py-8 w-full items-center justify-between px-5 lg:px-0">
                <div className="flex hover:cursor-pointer" onClick={() => {navigate('/client/home')}}>
                    <div className="w-8">
                        <img src="/AamdanLogo.svg" alt="" />
                    </div>
                    <h2 className="text-aamdanBackground dark:text-white font-bold text-3xl" style={{fontFamily:'Playfair-Display'}}>Aamdan</h2>
                </div>
                <ul className="w-1/3 hidden lg:justify-around lg:flex">
                    <li><Link to={'/client/viewyourjobs'}>Jobs</Link></li>
                    <li><Link to={'/client/viewGigs'}>Gigs</Link></li>
                    <li><Link to={'/client/messaging'}>Messages</Link></li>
                    <li><Link to={'/client/manageOrderClientPage'}>Orders</Link></li>
                </ul>
                <div className="hidden lg:block">
                    <img src="/Male User.png" alt=""/>
                </div>
                <div className="block lg:hidden" onClick={() => {setToggleNav(true)}}>
                    <img className="h-7" src="/Menu.svg" alt="" />
                </div>
                <div className={`lg:hidden ${toggleNav ? 'fixed' : 'hidden'} h-screen w-screen top-0 left-0 text-aamdanBackground dark:bg-white z-20`}>
                    <div className="text-white dark:text-aamdanBackground text-4xl font-bold flex w-full justify-end p-7" onClick={() => {setToggleNav(false)}}>X</div>
                    <ul className="flex flex-col text-white dark:text-aamdanBackground text-2xl items-center justify-center">
                        <li className="mb-5"><Link className="border-b-2" to={'/client/viewJobs'}>Jobs</Link></li>
                        <li className="mb-5"><Link className="border-b-2" to={'/client/viewJobs'}>Gigs</Link></li>
                        <li className="mb-5"><Link className="border-b-2" to={'/client/messaging'}>Messages</Link></li>
                        <li className="mb-5"><Link className="border-b-2" to={'/client/viewJobs'}>Orders</Link></li>
                        <li className="mb-5"><Link className="border-b-2" to={'/client/viewJobs'}>Profile</Link></li>
                        <li className="mb-5"><Link className="border-b-2" to={'/client/viewJobs'}>Logout</Link></li>
                    </ul>
                </div>
            </div>
        
        </div>
        
     );
}

export default NavBarClient;