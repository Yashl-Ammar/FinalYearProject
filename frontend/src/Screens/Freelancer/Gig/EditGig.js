import {  useEffect, useState } from "react";
import {   useLocation, useNavigate, } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import RegularInputField from "../../../Components/InputFields/RegularInputField";
import RegularSquareButton from "../../../Components/Buttons/RegularSquareButton";
import RegularTextArea from "../../../Components/InputFields/RegularTextArea";
import RegularRoundedButton from "../../../Components/Buttons/RegularRoundedButton";
import NavBarFreelancer from "../../../Components/Nav/NavBarFreelancer";
import PackageCard from "../../../Components/Cards/PackageCard";
import DragDrop from "../../../Components/DragDrop/DragDrop";
import Footer from "../../../Components/Nav/Footer";
import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from "react-hook-form";
import { EditGigValidationSchema } from "../../../Validations/EditGig";



function EditGigPage() {

    const location = useLocation();
    const id = location.state.gigid;

    const [data, setData] = useState();

    const [allSkills, setAllSkills] = useState([]);
    const [skill, setSkill] = useState('');
    const [basicAllBullet, setbasicAllBullet] = useState([]);
    const [standardAllBullet, setStandardAllBullet] = useState([]);
    const [premiumAllBullet, setPremiumAllBullet] = useState([]);

    const [files, setFiles] = useState([]);
    const [images, setimages] = useState([]);

    let navigate = useNavigate();

    useEffect(() => {
        fetchData()
    },[])

    const {
        register,
        handleSubmit,
        watch,
        formState:{errors}
      } = useForm({
        resolver: zodResolver(EditGigValidationSchema)
      })

    const fetchData = async () => {
        try{

            let response = await axios.get(process.env.REACT_APP_GigPath + 'gig/viewSpecificGigByFreelancer/' + id,{
                headers:{
                    'token': localStorage.getItem('token')
                }
            })

            console.log(response);
            setData(response.data);
            setAllSkills(response.data.skills);
            setbasicAllBullet(response.data.basic.offerDetails );
            setStandardAllBullet(response.data.standard.offerDetails);
            setPremiumAllBullet(response.data.premium.offerDetails);
            setimages(response.data.file)

        }catch(e){
            console.log(e)
        }
    } 

    const onSubmit = async (data) => {
      
        try {
          const obj = {
            'title': data.title,
            'skills': data.skills,
            'description': data.description,
            'basic': {
              'price': data.basicPrice,
              'time': data.basicTime,
              'detail': data.basicOffer,
              'offerDetails': data.basicBullets,
              'revisions': data.basicRevisions,
            },
            'standard': {
              'price': data.standardPrice,
              'time': data.standardTime,
              'detail': data.standardOffer,
              'offerDetails': data.standardBullets,
              'revisions': data.standardRevisions,
            },
            'premium': {
              'price': data.premiumPrice,
              'time': data.premiumTime,
              'detail': data.premiumOffer,
              'offerDetails': data.premiumBullets,
              'revisions': data.premiumRevisions,
            },
          };
      
          const formData = new FormData();
      
          // Append text data to the FormData
          formData.append('data', JSON.stringify(obj));
      
          // Append files to the FormData
          data.files.forEach((file, index) => {
            formData.append('files', file);
          });
      
          await axios.post(
            process.env.REACT_APP_GigPath + 'gig/create',
            formData,
            {
              headers: {
                'token': localStorage.getItem('token'),
                'Content-Type': 'multipart/form-data',
              },
            }
          );

        

        } catch (e) {
          toast('Unable to create gig! please try later.')
        }
      };

      const mapSkills = () => {
        return allSkills.map((value, index) => {
            return (
                <div key={index} className="rounded-full py-1 px-3 flex border w-fit my-3"> 
                    <p className="mr-2">{value}</p>
                    <img src="/Close.svg" alt="" onClick={() => {
                        let temp = [...allSkills];
                        temp.splice(index,1);
                        setAllSkills(temp);
                    }}/>
                </div>
            );
        })
    }

    const mapFiles = () => {
        return images.map((val, index) => {
            return <img className="w-80 h-80" key={index} src={val} alt="" />
        })
    }

    return ( <div className="w-full flex justify-center bg-white dark:bg-aamdanBackground text-aamdanBackground dark:text-white">
    <div className="w-full lg:w-4/5">
        <NavBarFreelancer />
        <div className="text-center">
            <h1 className="font-heading text-5xl mb-12">Edit Gig</h1>
        </div>
        <div className="bg-aamdanSuperDeepWhite dark:bg-aamdanSuperDeepBlack rounded-xl w-full px-12 py-9">
            <h1 className="font-bold text-5xl mb-7">Edit Gig</h1>
            <p className="text-lightGrayWhite dark:text-lightGray mb-8">Not happy with your gig? No problem, make changes to the gig here and make it more effective in attracting clients that are looking for your work.</p>
            <hr className="mb-11" />
            <div className="rounded-xl sm:px-11 sm:py-14 sm:bg-aamdanDeepBlack">
                <form onSubmit={onSubmit}>
                    
                    <div className="w-full mb-14">
                        <p className="text-lightGrayWhite dark:text-lightGray mb-3">4/4</p>

                        <h2 className="text-3xl font-bold mb-10">Overview of the gig</h2>
                        <p className="text-lightGrayWhite dark:text-lightGray mb-11">Here is a complete overview of the gig. You may view the gig for mistakes or go on towards the creation of the gig.</p>

                        <h2 className="text-3xl font-bold mb-10">Let’s start with an attention grabbing title</h2>
                        <p className="text-lightGrayWhite dark:text-lightGray mb-11">This helps your gig to stand out to the right people. It is the first thing that potential clients shall view. Making a strong first impression is essential.</p>

                        <div className="flex items-center justify-between w-full mb-4">
                            <label className="text-lg">Write a title for you gig</label>
                        </div>
                        <RegularInputField placeholder='e.g I will create a custom wordpress website for you.' disabled={false} val={data?.title}/>
                    </div>

                    <div className="w-full mb-14">
                        <h2 className="text-3xl font-bold mb-10">What are the main skills you are offering</h2>
                        <p className="text-lightGrayWhite dark:text-lightGray mb-11">Specify the skills that you are offering in this gig. This will help attract people that are in the need of skills that are in the realm of your expertise.</p>

                        <div className="flex items-center justify-between w-full mb-4">
                            <label className="text-lg">Add up to 5 skills</label>
                        </div>
                        <div className="w-full flex flex-col lg:flex-row mb-6">
                            <input className="rounded-lg bg-aamdanBackground py-3 px-5 border border-strokeColor border-opacity-50 w-full" placeholder='e.g Java' />
                            <div className="lg:ml-2 mt-4 lg:mt-0">
                            <RegularSquareButton text='Add' onClick={(e) => {
                                    e.preventDefault();
                                    if(skill.length <= 20 && skill.length >= 2 && allSkills.length < 5) {
                                        setAllSkills([...allSkills, skill]);
                                        setSkill('');
                                    }}}
                                />
                            </div>
                        </div>
                        <p className="text-lightGrayWhite dark:text-lightGray mb-6">Selected skills</p>
                        <div className="flex flex-col">
                            {mapSkills()}
                        </div>
                    </div>
                    <div className="w-full mb-14">
                        <h2 className="text-3xl font-bold mb-10">Let’s add a gig description </h2>
                        <p className="text-lightGrayWhite dark:text-lightGray mb-11">Description will be the main body of the gig. This is what will give the client an overview about the type of work you do. A good description is essential for order receival. </p>

                        <div className="flex items-center justify-between w-full mb-4">
                            <label className="text-lg">Add a description</label>
                        </div>
                        <RegularTextArea placeholder='Description' type='text' disabled={false} val={data?.description}  />
                    </div>
                    
                    <h2 className="text-3xl font-bold mb-10">What packages do you offer</h2>
                    <p className="text-lightGrayWhite dark:text-lightGray mb-11">Let’s create packages for the gig. There will be 3 types of packages you shall create based on the complexity and price of the order. Make sure to think of them carefully.</p>
                    <div className="mb-14">
                        <PackageCard offerValue={data?.basicOffer} priceValue={data?.basic.price} revisionValue={data?.basic.revisions} timeValue={data?.basic.time} disabled={false} allBullet={basicAllBullet} description='A basic package typically refers to the most fundamental or entry-level offering of a service. It is the simplest and often the most affordable option available.'   setAllBullets={setbasicAllBullet}  title='Basic' />
                    </div>
                    <div className="mb-14">
                        <PackageCard offerValue={data?.standardOffer} priceValue={data?.standard.price} revisionValue={data?.standard.revisions} timeValue={data?.standard.time} disabled={false} allBullet={standardAllBullet}  description='A standard package typically represents a middle-tier offering that provides a balanced combination of features, services delivery time and price.' setAllBullets={setStandardAllBullet}  title='Standard' />
                    </div>
                    <div className="mb-14">
                        <PackageCard offerValue={data?.premiumOffer} priceValue={data?.premium.price} revisionValue={data?.premium.revisions} timeValue={data?.premium.time} disabled={false} allBullet={premiumAllBullet}  description='Premium package typically represents the highest and most comprehensive level of offering provided by a service provider.'   setAllBullets={setPremiumAllBullet}  title='Premium' />
                    </div>

                    <h2 className="text-3xl font-bold mb-10">Showcase</h2>
                    <p className="text-lightGrayWhite dark:text-lightGray mb-11">Showcase some of you work in the form of gallery. This will help clients judge your capabilities and the quality of your work as a service provide.</p>
                        {mapFiles()}
                        <DragDrop disabled={false} files={files} setFiles={setFiles} />

                    <RegularRoundedButton  text='Edit' />
                </form>
            </div>
        </div>
        <ToastContainer />
        <Footer />
    </div>
</div> );
}

export default EditGigPage;