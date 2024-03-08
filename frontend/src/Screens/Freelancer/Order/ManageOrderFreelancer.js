import {  useEffect, useState } from "react";
import {   Link, useNavigate, } from "react-router-dom";
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
import Footer from "../../../Components/Nav/Footer";
import NavBarClient from "../../../Components/Nav/NavBarClient";
import { extractDateTime } from "../../../Utilities/ExtractDate";



function ManageOrderFreelancerPage() {

    const [selectedFilter, setSelectedFilter] = useState('All');
    const [data, setData] = useState([]);

    console.log(data);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () => {
        try{
            let response = await axios.get(process.env.REACT_APP_OrderPath+'order/viewOrdersByFreelancer',{
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

    const colorOnStatus = (status) => {
        console.log('asd')
        if(status === 'Active'){
            return 'bg-green'
        }
        else if(status === 'Completed'){
            return 'bg-blue'
        }
        else if(status === 'Delivered'){
            return 'bg-aamdanPink'
        }
        else if(status === 'Cancelled'){
            return 'bg-red'
        }
        return 'bg-lightGrayWhite'
    }

    const mapData = () => {
        return data.map((val,index) => {
            const temp = <tr className="hover:bg-aamdanDarkWhite dark:hover:bg-aamdanDarkGray border-y-8 border-aamdanSuperDeepWhite dark:border-aamdanSuperDeepBlack " onClick={() => {
                navigate('/freelancer/orderDetailsDeliveryPage/'+val._id)
            }}>
            <td className="py-3"><div className="flex items-center justify-center"><img className="mr-2" src="/femaleUser.svg" alt="" />{val.client.fname + ' ' + val.client.lname}</div></td>
            <td ><div className="flex items-center justify-center"><div className={`${val.type === 'Custom Order'  ? 'bg-aamdanBlue' : 'bg-aamdanPurple' } rounded-md w-28 text-xs py-2 px-2 font-bold`}>{val.type}</div></div></td>
            <td>{extractDateTime(val.createdAt)}</td>
            <td>${val.price}</td>
            <td>{val.revisions}</td>
            <td ><div className="flex items-center justify-center"><div className={`${colorOnStatus(val.orderStatus)} rounded-md w-28 text-xs py-2 px-2 font-bold`}>{val.orderStatus}</div></div></td>
            </tr>
            
            if(selectedFilter === 'Active' && val.orderStatus === 'Active'){
                return temp
            }
            else if(selectedFilter === 'Completed' && val.orderStatus === 'Completed'){
                return temp;
            }
            else if(selectedFilter === 'Cancelled' && val.orderStatus === 'Cancelled'){
                return temp;
            }
            else if(selectedFilter === 'Requested' && val.orderStatus === 'Requested'){
                return temp;
            }
            else if(selectedFilter === 'Delivered' && val.orderStatus === 'Delivered'){
                return temp;
            }
            else if(selectedFilter === 'All'){
                return temp;
            }

        })
    }


    return ( <div className="w-full flex justify-center bg-white dark:bg-aamdanBackground text-aamdanBackground dark:text-white">
    <div className="w-full lg:w-4/5">
        <NavBarFreelancer />
        <div className="text-center">
            <h1 className="font-heading text-5xl mb-12">Manage Order</h1>
        </div>
        <div className="bg-aamdanSuperDeepWhite dark:bg-aamdanSuperDeepBlack rounded-xl w-full px-12 py-9 ">
        <div className="hidden sm:flex mb-12">
                    <div className="w-full lg:w-1/8 text-center">
                        <p className="text-lg font-bold mb-3 px-5" onClick={() => {setSelectedFilter('All')}} ><Link>All</Link></p>
                        <div className={`w-full ${selectedFilter === 'All' ? 'bg-white dark:bg-aamdanBackground' : 'bg-aamdanBackground dark:bg-white'}`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-full lg:w-1/8 text-center">
                        <p className="text-lg font-bold mb-3 px-5" onClick={() => {setSelectedFilter('Active')}}><Link>Active</Link></p>
                        <div className={`w-full ${selectedFilter === 'Active' ? 'bg-white dark:bg-aamdanBackground' : 'bg-aamdanBackground dark:bg-white'}`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-full lg:w-1/8 text-center">
                        <p className="text-lg font-bold mb-3 px-5" onClick={() => {setSelectedFilter('Delivered')}}><Link>Delivered</Link></p>
                        <div className={`w-full ${selectedFilter === 'Delivered' ? 'bg-white dark:bg-aamdanBackground' : 'bg-aamdanBackground dark:bg-white'}`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-full lg:w-1/8 text-center">
                        <p className="text-lg font-bold mb-3 px-5" onClick={() => {setSelectedFilter('Completed')}}><Link>Completed </Link></p>
                        <div className={`w-full ${selectedFilter === 'Completed' ? 'bg-white dark:bg-aamdanBackground' : 'bg-aamdanBackground dark:bg-white'}`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-full lg:w-1/8 text-center">
                        <p className="text-lg font-bold mb-3 px-5" onClick={() => {setSelectedFilter('Cancelled')}}><Link>Cancelled</Link></p>
                        <div className={`w-full ${selectedFilter === 'Cancelled' ? 'bg-white dark:bg-aamdanBackground' : 'bg-aamdanBackground dark:bg-white'}`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-full lg:w-1/8 text-center">
                        <p className="text-lg font-bold mb-3 px-5" onClick={() => {setSelectedFilter('Requested')}}><Link>Requested</Link></p>
                        <div className={`w-full ${selectedFilter === 'Requested' ? 'bg-white dark:bg-aamdanBackground' : 'bg-aamdanBackground dark:bg-white'}`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-full lg:w-2/8">
                        <p className="text-lg font-bold mb-3 px-5">&nbsp;</p>
                        <div className="w-full bg-aamdanBackground dark:bg-white" style={{height:'1px'}} ></div>
                    </div>
                </div>
                <section className="w-full">
                    <h2 className="text-3xl font-bold font-heading mb-5">{selectedFilter} Orders</h2>
                    <table className="w-full text-center">
                        <tr className="border-y">
                            <th className="py-4">Buyer</th>
                            <th>Type</th>
                            <th>Due on</th>
                            <th>Price</th>
                            <th>Revisions</th>
                            <th>Status</th>
                        </tr>
                        {mapData()}
                    </table>
                </section>
        </div>
        <ToastContainer />
        <Footer />
    </div>
</div> );
}

export default ManageOrderFreelancerPage;