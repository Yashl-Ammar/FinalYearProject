import { Link } from "react-router-dom";

function NavBarFreelancer() {
    return ( 
        <div className="flex justify-center w-full text-white">
            <div className="flex py-8 w-full items-center justify-between">
                <div className="flex ">
                    <div className="w-8">
                        <img src="/AamdanLogo.svg" alt="" />
                    </div>
                    <h2 className="text-white font-bold text-3xl" style={{fontFamily:'Playfair-Display'}}>Aamdan</h2>
                </div>
                <ul className="w-1/3 flex justify-around ">
                    <li><Link to={'/freelancer/viewJobs'}>Jobs</Link></li>
                    <li><Link>Talent</Link></li>
                    <li><Link>Messages</Link></li>
                    <li><Link>Orders</Link></li>
                </ul>
                <div className="w-1/4 flex justify-between items-center">
                    <img src="/Notification.png" alt=""/>
                    <img src="/Signing A Document.png" alt=""/>
                    <img src="/Male User.png" alt=""/>
                </div>
            </div>
        
        </div>
        
     );
}

export default NavBarFreelancer;