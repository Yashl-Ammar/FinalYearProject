import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

function NavBarFreelancer() {
    const navigate = useNavigate();

    const [toggleNav, setToggleNav] = useState(false);
    return ( 
        <div className="flex justify-center w-full text-aamdanBackground dark:text-white">
            <div className="flex py-8 w-full items-center justify-between px-5 lg:px-0" >
                <div className="flex " onClick={() => {navigate('/freelancer/home')}}>
                    <div className="w-8">
                        <img src="/AamdanLogo.svg" alt="" />
                    </div>
                    <h2 className="text-aamdanBackground dark:text-white font-bold text-3xl" style={{fontFamily:'Playfair-Display'}}>Aamdan</h2>
                </div>
                <ul className="w-1/3 hidden lg:justify-around lg:flex">
                    <li><Link to={'/freelancer/viewJobs'}>Jobs</Link></li>
                    <li><Link to={'/freelancer/viewyourgigs'}>Gigs</Link></li>
                    <li><Link to={'/freelancer/viewYourProposals'}>Proposals</Link></li>
                    <li><Link to={'/freelancer/messaging'}>Messages</Link></li>
                    <li><Link to={'/freelancer/manageOrderPage'}>Orders</Link></li>
                </ul>
                <div className="hidden lg:block">
                    <img src="/Male User.png" alt=""/>
                </div>
                <div className="block lg:hidden" onClick={() => {setToggleNav(true)}}>
                    <img className="h-7" src="/Menu.svg" alt="" />
                </div>
                <div className={`lg:hidden ${toggleNav ? 'fixed' : 'hidden'} h-screen w-screen top-0 left-0 bg-aamdanBackground dark:bg-white`}>
                    <div className="text-aamdanBackground text-4xl font-bold flex w-full justify-end p-7" onClick={() => {setToggleNav(false)}}>X</div>
                    <ul className="flex flex-col text-aamdanBackground text-2xl items-center justify-center">
                        <li className="mb-5"><Link className="border-b-2" to={'/freelancer/viewJobs'}>Jobs</Link></li>
                        <li className="mb-5"><Link className="border-b-2" to={'/freelancer/messaging'}>Messages</Link></li>
                        <li className="mb-5"><Link className="border-b-2" to={'/freelancer/manageOrderPage'}>Orders</Link></li>
                        <li className="mb-5"><Link className="border-b-2" to={'/freelancer/viewJobs'}>Profile</Link></li>
                        <li className="mb-5"><Link className="border-b-2" to={'/freelancer/viewJobs'}>Logout</Link></li>
                    </ul>
                </div>
            </div>
        
        </div>
        
     );
}

export default NavBarFreelancer;