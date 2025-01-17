import { Box, Button, Modal } from "@mui/material";
import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import RegularSquareButton from "../Buttons/RegularSquareButton";

function NavBarFreelancer() {

    const navigate = useNavigate();

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        bgcolor: '#222222',
        borderRadius: '20px',
        color: 'white',
        boxShadow: 24,
        p: 4,
        width: '50%'
      };

    const [report, setReport] = useState({
        title:'',
        details:'',
        type:'',
        links:''
    });

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
        setReport({
            title:'',
            details:'',
            type:'',
            links:''
        })
        setOpen(false);
    };

    const handleReport = async () => {
        try{

            let response = await axios.post(process.env.REACT_APP_ReportPath + 'report/addReportByfreelancer', report ,{
                headers:{
                    'token': localStorage.getItem('token')
                }
            })

            handleClose();

        }catch(e){
            console.log(e)
            toast('Could not send report')
        }
    }

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
                <div className="hidden lg:flex lg:items-center">
                    <div className="mr-5">
                        <Button variant="outlined" onClick={handleOpen}>Report an issue</Button>
                    </div>
                    <button onClick={() => {
                        localStorage.setItem('token', '')
                        navigate('/')
                    }}>Logout</button>
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

            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <h3 className="font-bold text-3xl mb-5">Report an issue</h3>
                    <h3 className="font-bold text-3xl mt-5 mb-3">Title</h3>
                    <input className="bg-aamdanSuperDeepBlack border border-lightGray rounded-md w-full py-2 px-2" type="text" placeholder="Add a title for the report" value={report.title} onChange={(e) => {setReport({...report, title:e.target.value})}} />
                    <h3 className="font-bold text-3xl mt-5 mb-3">Details</h3>
                    <textarea type="text" className="bg-aamdanSuperDeepBlack border border-lightGray rounded-md w-full py-2 px-2" placeholder="Add the details" value={report.details} onChange={(e) => {setReport({...report, details:e.target.value})}} />
                    <h3 className="font-bold text-3xl mt-5 mb-3">Type</h3>
                    <input className="bg-aamdanSuperDeepBlack border border-lightGray rounded-md w-full py-2 px-2" type="text" placeholder="Type of report" value={report.type} onChange={(e) => {setReport({...report, type:e.target.value})}} />
                    <h3 className="font-bold text-3xl mt-5 mb-3">Links</h3>
                    <textarea className="bg-aamdanSuperDeepBlack border border-lightGray rounded-md w-full py-2 px-2 mb-5" type="text" placeholder="Any links necessary" value={report.links} onChange={(e) => {setReport({...report, links:e.target.value})}} />
                    <RegularSquareButton text={'Submit'} type={'submit'} onClick={handleReport} />
                </Box>
            </Modal>
        </div>
        
     );
}

export default NavBarFreelancer;