import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import {  useLocation, useNavigate } from "react-router-dom";
import { allCountries } from "../../../Data/Countries";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import RegularInputField from "../../../Components/InputFields/RegularInputField";
import RegularRoundedButton from "../../../Components/Buttons/RegularRoundedButton";
import { zodResolver } from '@hookform/resolvers/zod';
import NavBarFreelancer from "../../../Components/Nav/NavBarFreelancer";
import { PostJobValidationSchema } from "../../../Validations/PostJobValidation";
import RegularSquareButton from "../../../Components/Buttons/RegularSquareButton";
import RegularTextArea from "../../../Components/InputFields/RegularTextArea";
import RegularDropDown from "../../../Components/InputFields/RegularDropDown";
import { allDifficulties } from "../../../Data/Difficulty";
import { allCategories } from "../../../Data/Categories";
import RegularSkillTag from "../../../Components/Tag/RegularSkillTag";
import Footer from "../../../Components/Nav/Footer";
import NavBarClient from "../../../Components/Nav/NavBarClient";
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import ReviewTile from "../../../Components/Tiles/ReviewTile";
import { extractDateTime } from "../../../Utilities/ExtractDate";

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: '50%',
  bgcolor: '#222222',
  borderRadius: '20px',
  color: 'white',
  boxShadow: 24,
  p: 4,
};



function ViewSpecificGigPage() {

    const location = useLocation();
    const id = location.state ? location.state.data : '';

    const [errorText, setErrorText] = useState('')

    const [open, setOpen] = React.useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };

    const [selectedPackage, setSelectedPackage] = useState('basic');

    let navigate = useNavigate();

    const [data,setData] = useState([]);
    const [reviews, setReviews] = useState([])


    const [title, setTitle] = useState('');
    const [desc, setDesc] = useState('');
    const [price, setPrice] = useState('');
    const [revisions, setRevisions] = useState('');

    useEffect(() => {
        fetchData()
    },[])


    console.log(reviews)


    const fetchData = async () => {
        try{

            let response = await axios.get(process.env.REACT_APP_GigPath + 'gig/viewSpecificGigByClient/' + id,{
                headers:{
                    'token': localStorage.getItem('token')
                }
            })

            console.log(response);

            let reviews = await axios.get(process.env.REACT_APP_ReviewPath + 'rnr/viewFreelancerRnrByClient/' + response.data.freelancer._id,{
                headers:{
                    'token': localStorage.getItem('token')
                }
            })


            setReviews(reviews.data);
            setData(response.data);

        }catch(e){
            console.log(e)
        }
    } 

    console.log(data)

    const mapLanguages = () => {
        
        if (data && data.freelancer && data?.freelancer?.langauges?.length > 0){            
            return data.freelancer.langauges.map((val,index) => {
                return <p key={index} className="text-lg mb-5">{val}</p>
            })
        }
        return <p className="text-lg mb-5">No Languages Given</p>
    }
    
    const mapEducation = () => {
        
        if (data && data.freelancer && data?.freelancer?.education?.length > 0){            
            return data.freelancer.education.map((val,index) => {
                return <p key={index} className="text-lg mb-5">{val}</p>
            })
        }
        return <p className="text-lg mb-5">No Education Given</p>
    }
    const mapSkills = () => {
        
        if (data && data?.skills?.length > 0){            
            return data.skills.map((val,index) => {
                // return <p key={index} className="text-lg mb-5">{val}</p>
                return <RegularSkillTag text={val} key={index} />
            })
        }
        return <p className="text-lg mb-5">No Skills Given</p>
    }
    const mapBasicBullets = () => {
        
        if (data && data?.basic?.offerDetails?.length > 0){            
            return data.basic?.offerDetails.map((val,index) => {
                return <div className="flex items-center mb-5">
                        <img className="mr-7" src="/Square.svg" alt="" />
                        <p key={index} className="text-lg font-bold text-lightGrayWhite dark:text-lightGray">{val}</p>
                    </div>
            })
        }
        return <p className="text-lg mb-5">No Details Given</p>
    }
    const mapStandardBullets = () => {
        
        if (data && data?.standard?.offerDetails?.length > 0){            
            return data.standard?.offerDetails.map((val,index) => {
                return <div className="flex items-center mb-5">
                        <img className="mr-7" src="/Square.svg" alt="" />
                        <p key={index} className="text-lg font-bold text-lightGrayWhite dark:text-lightGray">{val}</p>
                    </div>
            })
        }
        return <p className="text-lg mb-5">No Details Given</p>
    }
    const mapPremiumBullets = () => {
        
        if (data && data?.premium?.offerDetails?.length > 0){            
            return data.premium?.offerDetails.map((val,index) => {
                return <div className="flex items-center mb-5">
                        <img className="mr-7" src="/Square.svg" alt="" />
                        <p key={index} className="text-lg font-bold text-lightGrayWhite dark:text-lightGray">{val}</p>
                    </div>
            })
        }
        return <p className="text-lg mb-5">No Details Given</p>
    }

    const createOrderRequest = async () => {
        try{
            if(title === '' || desc === '' || price === '' || revisions === '' ){
                setErrorText('Kindly fill all of the fields')
            }
            else{
                const obj = {
                    title: title,
                    description: desc,
                    type: 'Custom Order',
                    orderStatus: 'Requested',
                    paymentMethod: 'Card',
                    paymentStatus: 'Verified',
                    price: price,
                    revisions: revisions,
                    activities: [] 
                }
                let response = await axios.post(process.env.REACT_APP_OrderPath +'order/placeOrder/' + data.freelancer._id,obj,{
                    headers:{
                        token: localStorage.getItem('token')
                    }
                })

                navigate('/client/manageOrderClientPage')
            }


        }catch(e){
            console.log(e)
        }
    }

    const mapReviews = () => {
        return reviews.map((val, index) => {
            console.log(index)
            return <ReviewTile key={index} name={val.client.fname + '' + val.client.lname} rating={val.rating} review={val.review} date={extractDateTime(val.createdAt)} />
        })
    }


    return ( <div className="w-full flex justify-center bg-white dark:bg-aamdanBackground text-aamdanBackground dark:text-white" >
    <div className="w-4/5">
        <NavBarClient />
        <div className="text-center">
            <h1 className="font-heading text-5xl mb-12">View Gigs</h1>
            <h1 className="font-bold text-5xl mb-12">Get your work done by professionals</h1>
        </div>
        <div className="flex w-full flex-col lg:flex-row">
            <div className="w-full lg:w-2/3 lg:pr-5 mb-10">
                <h1 className="font-heading font-bold text-5xl mb-7">{data?.title}</h1>
                <div className="flex">
                    <div>
                        {data?.freelancer && data?.freelancer.profilepic && <img className="w-10 h-10 rounded-full object-cover mr-3" src={data?.freelancer.profilepic} alt="" />}
                        {!data?.freelancer?.profilepic && <img className="mr-3" src='/femaleUser.svg' alt="" />}
                    </div>
                    <div>
                        <h2 className="text-3xl font-bold">{data?.freelancer?.fname} {data?.freelancer?.lname}</h2>
                        <div className="flex">
                            <p>{data?.freelancer?.rating}</p>
                            <img src="/Star.svg" alt="" />
                        </div>
                    </div>
                </div> 
                <p className="font-bold text-lg">Completed Orders ({data?.freelancer?.completedOrder})</p>
                <p className="text-lightGray font-bold text-lg mb-7">Starting at <span className="text-aamdanBackground dark:text-white">$ {data?.basic?.price}</span></p>
                <img className="w-full xl:w-[700px] xl:h-[400px] object-cover" src={data.file ? data?.file[0] : ''} alt="" />
            </div>
            <div className="flex flex-col w-full lg:w-1/3 mb-10">
                <div className="rounded-lg border border-aamdanBackground dark:border-white px-7 py-5 mb-7">
                    <h2 className="text-3xl font-bold text-center mb-7">About Freelancer</h2>
                    <hr className="mb-7" />
                    <h3 className="text-xl font-bold mb-5">Languages</h3>
                    {mapLanguages()}
                    <hr className="mb-7" />
                    <h3 className="text-xl font-bold mb-5">Education</h3>
                    {mapEducation()}
                    <hr className="mb-7" />
                    <div className="mb-5">    
                        <RegularSquareButton text='Contact' onClick={() => {
                            navigate('/client/messaging', {state:{id: data.freelancer?._id}})
                        }} />
                    </div>
                    <RegularSquareButton text='Place Order Request' onClick={handleOpen} />
                </div>
                <div className="rounded-lg border border-aamdanBackground dark:border-white px-7 py-5">
                    <h2 className="text-3xl font-bold text-center mb-7">Skills for this gig</h2>
                    <hr className="mb-7" />
                    {mapSkills()}
                </div>
            </div>

        </div>
        <div>
            <h2 className="text-3xl font-bold mb-7">Description</h2>
            <p className="text-lg mb-10 break-words">{data.description}</p>
        </div>
        <div className="bg-aamdanSuperDeepWhite dark:bg-aamdanSuperDeepBlack">
            <div className="flex">
                <button className={`w-full ${selectedPackage === 'basic' ? 'bg-white dark:bg-aamdanBackground': 'bg-aamdanDeepWhite dark:bg-aamdanDeepBlack'} py-4`} onClick={() => {setSelectedPackage('basic')}}>Basic</button>
                <button className={`w-full ${selectedPackage === 'standard' ? 'bg-white dark:bg-aamdanBackground': 'bg-aamdanDeepWhite dark:bg-aamdanDeepBlack'} border-x-white dark:border-x-aamdanBackground border-x py-4`} onClick={() => {setSelectedPackage('standard')}}>Standard</button>
                <button className={`w-full ${selectedPackage === 'premium' ? 'bg-white dark:bg-aamdanBackground': 'bg-aamdanDeepWhite dark:bg-aamdanDeepBlack'} py-4`} onClick={() => {setSelectedPackage('premium')}}>Premium</button>
            </div>
            <hr />
            {selectedPackage === 'basic' &&<div className="mb-10 px-5 lg:px-20 py-10">
                <div className="flex justify-between mb-8">
                    <p className="font-bold text-lg">Basic Package</p>
                    <p>$ {data?.basic?.price}</p>
                </div>
                <p className="font-bold text-lg text-lightGrayWhite dark:text-lightGray mb-7">{data?.basic?.detail}</p>
                <div className="flex mb-7">
                    <img className="mr-16" src="/Delivery Time.svg" alt="" />
                    <p className="font-bold text-lightGrayWhite dark:text-lightGray text-lg">{data.basic?.time} Days Delivery</p>
                </div>
                <div className="flex mb-10">
                    <img className="mr-16 w-10" src="/Repeat.svg" alt="" />
                    <p className="font-bold text-lightGrayWhite dark:text-lightGray text-lg">{data.basic?.revisions} Revisions</p>
                </div>
                <div className="mb-8">
                    <p className="font-bold text-lg mb-7">What you will receive</p>
                    {mapBasicBullets()}
                </div>
                <RegularSquareButton text='Contact' onClick={() => {
                    navigate('/client/messaging', {state:{id: data.freelancer?._id}})
                }} />
            </div>}
            {selectedPackage === 'standard' &&<div className="mb-10 px-5 lg:px-20 py-10">
                <div className="flex justify-between mb-8">
                    <p className="font-bold text-lg">Standard Package</p>
                    <p>$ {data?.standard?.price}</p>
                </div>
                <p className="font-bold text-lg text-lightGrayWhite dark:text-lightGray mb-7">{data?.standard?.detail}</p>
                <div className="flex mb-7">
                    <img className="mr-16" src="/Delivery Time.svg" alt="" />
                    <p className="font-bold text-lightGrayWhite dark:text-lightGray text-lg">{data.standard?.time} Days Delivery</p>
                </div>
                <div className="flex mb-10">
                    <img className="mr-16 w-10" src="/Repeat.svg" alt="" />
                    <p className="font-bold text-lightGrayWhite dark:text-lightGray text-lg">{data.standard?.revisions} Revisions</p>
                </div>
                <div className="mb-8">
                    <p className="font-bold text-lg mb-7">What you will receive</p>
                    {mapStandardBullets()}
                </div>
                <RegularSquareButton text='Contact' onClick={() => {
                    navigate('/client/messaging', {state:{id: data.freelancer?._id}})
                }} />
            </div>}
            {selectedPackage === 'premium' &&<div className="mb-10 px-5 lg:px-20 py-10">
                <div className="flex justify-between mb-8">
                    <p className="font-bold text-lg">Premium Package</p>
                    <p>$ {data?.premium?.price}</p>
                </div>
                <p className="font-bold text-lg text-lightGrayWhite dark:text-lightGray mb-7">{data?.premium?.detail}</p>
                <div className="flex mb-7">
                    <img className="mr-16" src="/Delivery Time.svg" alt="" />
                    <p className="font-bold text-lightGrayWhite dark:text-lightGray text-lg">{data.premium?.time} Days Delivery</p>
                </div>
                <div className="flex mb-10">
                    <img className="mr-16 w-10" src="/Repeat.svg" alt="" />
                    <p className="font-bold text-lightGrayWhite dark:text-lightGray text-lg">{data.premium?.revisions} Revisions</p>
                </div>
                <div className="mb-8">
                    <p className="font-bold text-lg mb-7">What you will receive</p>
                    {mapPremiumBullets()}
                </div>
                <RegularSquareButton text='Contact' onClick={() => {
                    navigate('/client/messaging', {state:{id: data.freelancer?._id}})
                }} />
            </div>}

            

        </div>   
        <div className="">
            <div className="mb-12">
                <h3 className="text-3xl font-bold mb-5">Reviews</h3>
                <div className="flex items-center mb-5">
                    <p className="text-xl font-bold mr-5">Rating</p>
                    <p className="font-bold text-lg">{data?.freelancer?.rating}</p>
                    <img src="/Star.svg" alt="" />
                </div>
                <p className="text-lightGrayWhite dark:text-lightGray font-bold">Completed Orders ({data?.freelancer?.completedOrder})</p>
            </div>
            {mapReviews()}
         </div>
        <ToastContainer />
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <h3 className="font-bold text-3xl mb-5">Create an order request</h3>
                <h3 className="font-bold text-lg mb-5">Order Title</h3>
                <div className="my-5">
                    <input type="text" className="bg-aamdanSuperDeepBlack border border-lightGray rounded-md w-full py-2 px-2" placeholder="Make a website" value={title} onChange={(e) => {setTitle(e.target.value)}} />
                </div>
                <h3 className="font-bold text-lg mb-3">Order Description</h3>
                <div className="my-3">
                    <textarea type="text" className="bg-aamdanSuperDeepBlack border border-lightGray rounded-md w-full py-2 px-2" placeholder="I would like you to make a website for me with 3 pages..." value={desc} onChange={(e) => {setDesc(e.target.value)}} />
                </div>
                <h3 className="font-bold text-lg mb-3">Order Price in dollars</h3>
                <div className="my-3">
                    <input type="number" className="bg-aamdanSuperDeepBlack border border-lightGray rounded-md w-full py-2 px-2" placeholder="3" value={price} onChange={(e) => {setPrice(e.target.value)}} />
                </div>
                <h3 className="font-bold text-lg mb-3">Order Revisions</h3>
                <div className="mt-3 mb-5">
                    <input type="number" className="bg-aamdanSuperDeepBlack border border-lightGray rounded-md w-full py-2 px-2" placeholder="3" value={revisions} onChange={(e) => {setRevisions(e.target.value)}} />
                    <p className="text-red my-2">{errorText}</p>
                </div>
                <RegularSquareButton text={'Create'} onClick={createOrderRequest} />
            </Box>
        </Modal>
        <Footer />
    </div>
</div> );
}

export default ViewSpecificGigPage;
