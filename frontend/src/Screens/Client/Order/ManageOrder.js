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



function ManageOrderClientPage() {

    const [selectedFilter, setSelectedFilter] = useState('priority');
    const [data, setData] = useState([]);

    const navigate = useNavigate();

    useEffect(() => {
        fetchData()
    },[])

    const fetchData = async () => {
        try{
            let response = await axios.get(process.env.REACT_APP_OrderPath+'order/viewOrdersByClient',{
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

    const mapData = () => {
        return data.map((val,index) => {
            return <tr className="hover:bg-aamdanDarkGray border-y-8 border-aamdanSuperDeepBlack" onClick={() => {
                navigate('/client/orderDetailsDeliveryPage/'+val._id)
            }}>
            <td className="py-3"><div className="flex items-center justify-center"><img className="mr-2" src="/femaleUser.svg" alt="" />Iathomtom</div></td>
            <td ><div className="flex items-center justify-center"><div className="bg-aamdanBlue rounded-md w-28 text-xs py-2 px-2">{val.price}</div></div></td>
            <td>{extractDateTime(val.createdAt)}</td>
            <td>${val.price}</td>
            <td>{val.revisions}</td>
            <td ><div className="flex items-center justify-center"><div className="bg-red rounded-md w-28 text-xs py-2 px-2">Cancelled</div></div></td>
        </tr>
        })
    }

    return ( <div className="w-full flex justify-center">
    <div className="w-full lg:w-4/5">
        <NavBarClient />
        <div className="text-center">
            <h1 className="font-heading text-5xl mb-12">Manage Order</h1>
        </div>
        <div className="bg-aamdanSuperDeepBlack rounded-xl w-full px-12 py-9">
        <div className="hidden sm:flex mb-12">
                    <div className="w-full lg:w-1/8 text-center">
                        <p className="text-lg font-bold mb-3 px-5" onClick={() => {setSelectedFilter('priority')}} ><Link>Priority</Link></p>
                        <div className={`w-full ${selectedFilter === 'priority' ? 'bg-aamdanBackground' : 'bg-white'}`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-full lg:w-1/8 text-center">
                        <p className="text-lg font-bold mb-3 px-5" onClick={() => {setSelectedFilter('active')}}><Link>Active</Link></p>
                        <div className={`w-full ${selectedFilter === 'active' ? 'bg-aamdanBackground' : 'bg-white'}`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-full lg:w-1/8 text-center">
                        <p className="text-lg font-bold mb-3 px-5" onClick={() => {setSelectedFilter('late')}}><Link>Late </Link></p>
                        <div className={`w-full ${selectedFilter === 'late' ? 'bg-aamdanBackground' : 'bg-white'}`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-full lg:w-1/8 text-center">
                        <p className="text-lg font-bold mb-3 px-5" onClick={() => {setSelectedFilter('delivered')}}><Link>Delivered</Link></p>
                        <div className={`w-full ${selectedFilter === 'delivered' ? 'bg-aamdanBackground' : 'bg-white'}`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-full lg:w-1/8 text-center">
                        <p className="text-lg font-bold mb-3 px-5" onClick={() => {setSelectedFilter('completed')}}><Link>Completed </Link></p>
                        <div className={`w-full ${selectedFilter === 'completed' ? 'bg-aamdanBackground' : 'bg-white'}`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-full lg:w-1/8 text-center">
                        <p className="text-lg font-bold mb-3 px-5" onClick={() => {setSelectedFilter('cancelled')}}><Link>Cancelled</Link></p>
                        <div className={`w-full ${selectedFilter === 'cancelled' ? 'bg-aamdanBackground' : 'bg-white'}`} style={{height:'1px'}} ></div>
                    </div>
                    <div className="w-full lg:w-2/8">
                        <p className="text-lg font-bold mb-3 px-5">&nbsp;</p>
                        <div className="w-full bg-white" style={{height:'1px'}} ></div>
                    </div>
                </div>
                <section className="w-full">
                    <h2 className="text-3xl font-bold font-heading mb-5">Priority Orders</h2>
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

export default ManageOrderClientPage;