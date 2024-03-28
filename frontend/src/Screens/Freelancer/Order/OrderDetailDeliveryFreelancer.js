import {  useEffect, useState } from "react";
import {   Link, useNavigate, useParams, } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import RegularRoundedButton from "../../../Components/Buttons/RegularRoundedButton";

import NavBarFreelancer from "../../../Components/Nav/NavBarFreelancer";

import RegularTag from "../../../Components/Tag/RegularTag";
import DragDrop from "../../../Components/DragDrop/DragDrop";

import Footer from "../../../Components/Nav/Footer";

import { extractDateTime } from "../../../Utilities/ExtractDate";
import RoundedTransparentButton from "../../../Components/Buttons/RoundedTransparentButton";
import { Box, InputLabel, MenuItem, Modal, Select } from "@mui/material";
import RegularSquareButton from "../../../Components/Buttons/RegularSquareButton";
import { number } from "zod";
import RegularTextArea from "../../../Components/InputFields/RegularTextArea";

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
  };


function OrderDetailsDeliveryFreelancerPage() {

    const [data, setData] = useState();

    const {id} = useParams();

    const [numberofStars, setNumberofStars] = useState(0);
    const [lockStars, setLockStars] = useState(false);

    const [review, setReview] = useState('');

    const [errorText, setErrorText] = useState('');

    const [files, setFiles] = useState([]);

    const navigate = useNavigate();

    const [open, setOpen] = useState(false);
    const handleOpen = async () => {
        try{
            let response = await axios.get(process.env.REACT_APP_ReviewPath + 'rnr/CheckFreelancerToClient/'+ data.client._id +'/' + data._id,{
                headers:{
                    'token':localStorage.getItem('token')
                }
            })
            console.log(response)
            setOpen(true);
        }  
        catch(e){
            
            console.log(e)
            if(files.length === 0){
                toast('Kindly add some files');
            }
            else{

                const formData = new FormData();
        
                files.forEach((file, index) => {
                    formData.append('files', file);
                });
        
                let response = await axios.post(process.env.REACT_APP_OrderPath+'order/deliverOrder/'+id, formData,{
                    headers:{
                        'token':localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data',
                    }
                })
        
                navigate('/freelancer/manageOrderPage');
            }
        }
    };
    const handleClose = () => {
      setOpen(false);
    };

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () => {
        try{
            let response = await axios.get(process.env.REACT_APP_OrderPath+'order/viewSpecifcOrder/'+id,{
                headers:{
                    'token':localStorage.getItem('token')
                }
            })
            console.log(response)
            setData(response.data);
        }  
        catch(e){
            console.log(e)
        }
    }
    

    const deliverOrder = async () => {
        try{

            if(numberofStars === 0 || review === '' || files.length === 0) {
                setErrorText('Kindly fill all fields or make sure you have uploaded a file')
            }
            else{

                let rateRequest = await axios.post(process.env.REACT_APP_ReviewPath+'rnr/toclient/'+data.client._id + '/' + data._id, {
                    rating: numberofStars, 
                    review: review
                },{
                    headers:{
                        'token':localStorage.getItem('token'),
                    }
                })

                const formData = new FormData();
    
                files.forEach((file, index) => {
                    formData.append('files', file);
                  });
    
                let response = await axios.post(process.env.REACT_APP_OrderPath+'order/deliverOrder/'+id, formData,{
                    headers:{
                        'token':localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data',
                    }
                })
    
                navigate('/freelancer/manageOrderPage');
            }

        }  
        catch(e){
            console.log(e)
            toast('Looks like there was an issue delivering your project please try later!')
        }
    }


    const mapDelivered = () => {
        return data?.deliveredfiles.map((val, index) => {
            return <div><a href={val} className="text-aamdanBlue" >{val}</a></div>
        })
    }

    const acceptOrder = async () => {
        try{
            let response = await axios.post(process.env.REACT_APP_OrderPath+'order/acceptOrRejectOrder/'+id,{
                request: 'Accept'
            },{
                headers:{
                    'token':localStorage.getItem('token'),
                }
            })

            navigate('/freelancer/manageOrderPage');
        }  
        catch(e){
            console.log(e)
        }
    }

    const rejectOrder = async () => {
        try{
            console.log('asds')

            let response = await axios.post(process.env.REACT_APP_OrderPath+'order/acceptOrRejectOrder/'+id,{
                request: 'reject'
            },{
                headers:{
                    'token':localStorage.getItem('token'),
                }
            })


            navigate('/freelancer/manageOrderPage');
        }  
        catch(e){
            console.log(e)
        }
    }


    const mapStars = () => {
        let arr = [];
        for(let i = 0 ; i < numberofStars ; i++){
            arr.push(<img className="h-7 w-7" src="/Star.svg" alt="" onMouseOver={() => {setNumberofStars(i+1) }} onClick={() => {setNumberofStars(i+1);setLockStars(true)}} />)
        }
        for(let i = numberofStars ; i < 5 ; i++){
            arr.push(<img className="h-7 w-7" src="/GrayStar.svg" alt="" onMouseOver={() => {setNumberofStars(i+1)}} onClick={() => {setNumberofStars(i+1);setLockStars(true)}} />)
        }

        return arr;
    }

    return ( <div className="w-full flex justify-center bg-white dark:bg-aamdanBackground text-aamdanBackground dark:text-white">
    <div className="w-full lg:w-4/5">
        <NavBarFreelancer />
        <div className="text-center">
            <h1 className="font-heading text-5xl mb-12">Order Details</h1>
        </div>
            <div className="bg-aamdanSuperDeepWhite dark:bg-aamdanSuperDeepBlack rounded-xl w-full px-12 py-9">
                <h2 className="font-bold font-heading text-3xl mb-7">Client Details</h2>
                <div className="w-full flex border-b mb-8">
                    <div className="grid grid-cols-2 mb-8 w-full">

                            <p className="font-bold mb-5">Name: <span className="font-normal">{data?.client.fname + ' ' + data?.client.lname}</span></p>
                            <p className="font-bold">Start Date: <span className="font-normal">{extractDateTime(data?.orderDate)}</span></p>
                            <div className="flex">
                                <p className="font-bold mr-10 flex items-center ">Type:</p>
                                <RegularTag text={data?.type} color={data?.type === 'Custom Order' ? 'bg-aamdanBlue' : 'bg-aamdanPurple'} />
                            </div>
                            <p className="font-bold">Total Price: <span className="font-normal">${data?.price}</span></p>

                    </div>
                    <img className="h-full" src="/femaleUser.svg" alt="" />

                </div>
                <div className="hidden sm:flex mb-12">
                    <div className="w-full lg:w-1/4 text-center">
                        <p className="text-lg font-bold mb-3 px-5" ><Link>Order Delivery</Link></p>
                        <div className={`w-full bg-white dark:bg-aamdanBackground`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-full lg:w-2/4">
                        <p className="text-lg font-bold mb-3 px-5">&nbsp;</p>
                        <div className="w-full bg-aamdanBackground dark:bg-white" style={{height:'1px'}} ></div>
                    </div>
                </div>
                <section className="w-full">
                    <div className="flex w-full justify-between items-center">
                        <h2 className="text-3xl font-bold font-heading mb-5">Order Delivery</h2>
                        <p>Order Id: {data?._id}</p>
                    </div>
                    <div className="bg-aamdanDarkWhite dark:bg-aamdanDarkGray w-full py-5 px-7 flex justify-between my-5 rounded-lg">
                        <table className="text-center w-full">
                            <tr className="border-b">
                                <th className="py-5 w-2/4">Order Title</th>
                                <th>Description</th>
                            </tr>
                            <tr>
                                <td >{data?.title}</td>
                                <td className="py-5 text-left">{data?.description}</td>
                            </tr>
                        </table>
                    </div>
                    <div className="bg-aamdanDarkWhite dark:bg-aamdanDarkGray w-full py-5 px-7 flex justify-between my-5 rounded-lg">
                        <div className={`${data?.orderStatus === 'Requested' ? 'block' :  'hidden'} w-full`}>
                            <div className="mb-5">
                                <RegularRoundedButton text={'Accept Order'} onClick={acceptOrder} />
                            </div>
                            <RoundedTransparentButton text={'Reject Order'} onClick={rejectOrder} />
                        </div>
                        {data?.orderStatus !== 'Requested' && 
                            <div className="bg-white dark:bg-aamdanBackground border border-dashed rounded-xl px-5 py-7 w-full">
                                <h2 className="font-heading font-bold text-3xl mb-5">Delivery Details</h2>
                                <p className="font-bold mb-5">Attachments</p>
                                <div>
                                    {mapDelivered()}
                                </div>
                                <div className={`${data?.orderStatus === 'Active' ? 'block' :  'hidden'}`}>
                                    <DragDrop files={files} setFiles={setFiles}/>
                                </div>
                                
                            </div>
                        }   
                    </div>
                    <div className={`${data?.orderStatus === 'Active' ? 'block' :  'hidden'}`}>
                        <RegularRoundedButton text={'Deliver Project'} onClick={handleOpen} />
                    </div>
                </section>
                
            </div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <h3 className="font-bold text-3xl mb-5">Give Review of Client</h3>
                <h3 className="font-bold text-lg mb-5">Rating</h3>
                <div className="flex lg mb-5">
                    {mapStars()}
                </div>
                <h3 className="font-bold text-lg mb-5">Review</h3>
                <div className="my-5">
                    <textarea type="text" className="bg-aamdanSuperDeepBlack border border-lightGray rounded-md w-full py-2 px-2" placeholder="Please share your thoughts and feedback here..." value={review} onChange={(e) => {setReview(e.target.value)}} />
                </div>
                <p className="text-red mb-5">{errorText}</p>
                <RegularSquareButton text={'Deliver'} onClick={deliverOrder} />
            </Box>
        </Modal>
        <ToastContainer />
        <Footer />
    </div>
</div> );
}

export default OrderDetailsDeliveryFreelancerPage;