import {  useEffect, useState } from "react";
import {   Link, useNavigate, useParams, } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import RegularInputField from "../../../Components/InputFields/RegularInputField";
import RegularSquareButton from "../../../Components/Buttons/RegularSquareButton";
import RegularTextArea from "../../../Components/InputFields/RegularTextArea";
import RegularRoundedButton from "../../../Components/Buttons/RegularRoundedButton";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import NavBarFreelancer from "../../../Components/Nav/NavBarFreelancer";
import { CreateGigValidationSchema } from "../../../Validations/CreateGigValidation";
import RegularTag from "../../../Components/Tag/RegularTag";
import DragDrop from "../../../Components/DragDrop/DragDrop";
import RoundedTransparentButton from "../../../Components/Buttons/RoundedTransparentButton";
import Footer from "../../../Components/Nav/Footer";
import NavBarClient from "../../../Components/Nav/NavBarClient";

const x=''

function OrderDetailsDeliveryPage() {

    const [data, setData] = useState([]);

    const {id} = useParams();

    const navigate = useNavigate();

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

    const [files, setFiles] = useState([]);

    return ( <div className="w-full flex justify-center">
    <div className="w-full lg:w-4/5">
        <NavBarClient />
        <div className="text-center">
            <h1 className="font-heading text-5xl mb-12">Order Details</h1>
        </div>
            <div className="bg-aamdanSuperDeepBlack rounded-xl w-full px-12 py-9">
                <h2 className="font-bold font-heading text-3xl mb-7">Freelancer Details</h2>
                <div className="w-full flex border-b mb-8">
                    <div className="grid grid-cols-2 mb-8 w-full">

                            <p className="font-bold mb-5">Name: <span className="font-normal">Iamthamtom</span></p>
                            <p className="font-bold">Due Date: <span className="font-normal">10-12-2023</span></p>
                            <div className="flex">
                                <p className="font-bold mr-10 flex items-center">Type:</p>
                                <RegularTag text='Customer Order' color='bg-aamdanBlue' />
                            </div>
                            <p className="font-bold">Total Price: <span className="font-normal">$20</span></p>

                    </div>
                    <img className="h-full" src="/femaleUser.svg" alt="" />

                </div>
                <div className="hidden sm:flex mb-12">
                    <div className="w-full lg:w-1/4 text-center">
                        <p className="text-lg font-bold mb-3 px-5" ><Link>Activity</Link></p>
                        <div className={`w-full bg-white`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-full lg:w-1/4 text-center">
                        <p className="text-lg font-bold mb-3 px-5" ><Link>Order Delivery</Link></p>
                        <div className={`w-full bg-aamdanBackground`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-full lg:w-2/4">
                        <p className="text-lg font-bold mb-3 px-5">&nbsp;</p>
                        <div className="w-full bg-white" style={{height:'1px'}} ></div>
                    </div>
                </div>
                <section className="w-full">
                    <div className="flex w-full justify-between items-center">
                        <h2 className="text-3xl font-bold font-heading mb-5">Order Delivery</h2>
                        <p>Order Id: XXXXXXXXXX</p>
                    </div>
                    <div className="bg-aamdanDarkGray w-full py-5 px-7 flex justify-between my-5 rounded-lg">
                        <table className="text-center w-full">
                            <tr className="border-b">
                                <th className="py-5 w-2/4">Order Title</th>
                                <th>Qty</th>
                                <th>Duration</th>
                                <th>Price</th>
                            </tr>
                            <tr>
                                <td className="py-5">I will create a beautiful website for you in no time!</td>
                                <td>1</td>
                                <td>1 Day</td>
                                <td>$50</td>
                            </tr>
                        </table>
                    </div>
                    <div className="bg-aamdanDarkGray w-full py-5 px-7 flex justify-between my-5 rounded-lg">
                        <div className="bg-aamdanBackground border border-dashed rounded-xl px-5 py-7 w-full">
                            <h2 className="font-heading font-bold text-3xl mb-5">Delivery Details</h2>
                            <p className="font-bold mb-5">Attachments</p>
                            Mapped Attachments
                        </div>
                    </div>
                    <div className="w-full mb-5">
                        <RoundedTransparentButton text='Send for Revision' />
                    </div>
                    <RegularRoundedButton text={'Accept Delivery'} />

                </section>
            </div>
        <ToastContainer />
        <Footer />
    </div>
</div> );
}

export default OrderDetailsDeliveryPage;