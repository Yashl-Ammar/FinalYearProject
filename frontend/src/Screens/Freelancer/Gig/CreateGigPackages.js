import {  useEffect, useState } from "react";
import {   useLocation, useNavigate, } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import RegularInputField from "../../../Components/InputFields/RegularInputField";
import RegularSquareButton from "../../../Components/Buttons/RegularSquareButton";
import RegularRoundedButton from "../../../Components/Buttons/RegularRoundedButton";
import { useForm } from "react-hook-form";
import { zodResolver } from '@hookform/resolvers/zod';
import NavBarFreelancer from "../../../Components/Nav/NavBarFreelancer";
import { CreateGigValidationSchema } from "../../../Validations/CreateGigValidation";
import PackageCard from "../../../Components/Cards/PackageCard";
import { CreatePackagesValidationSchema } from "../../../Validations/CreatePackagesValidation";
import Footer from "../../../Components/Nav/Footer";



function CreateGigPackagesPage() {

    const location = useLocation();
    const PrevData = location.state.data;

    console.log(PrevData);

    let navigate = useNavigate();

    useEffect(() => {
        if(location.state.data === null){
            navigate('/freelancer/postgig')
        }
    })

    const [basicBulletsError, setbasicBulletsError] = useState('');
    const [basicBullet, setbasicBullet] = useState('');
    const [basicAllBullet, setbasicAllBullet] = useState([]);
    
    const [standardBulletsError, setStandardBulletsError] = useState('');
    const [standardBullet, setStandardBullet] = useState('');
    const [standardAllBullet, setStandardAllBullet] = useState([]);
    
    const [premiumBulletsError, setPremiumBulletsError] = useState('');
    const [premiumBullet, setPremiumBullet] = useState('');
    const [premiumAllBullet, setPremiumAllBullet] = useState([]);

    const {
        register,
        handleSubmit,
        formState:{errors}
      } = useForm({
        resolver: zodResolver(CreatePackagesValidationSchema)
      })


    let onSubmit = async (data) => {
        console.log(data);
        console.log(basicAllBullet);

        setbasicBulletsError('');
        if(basicAllBullet.length === 0){
            setbasicBulletsError('Must have one or more bullets');
        }
        if(standardAllBullet.length === 0){
            setStandardBulletsError('Must have one or more bullets');
        }
        if(premiumAllBullet.length === 0){
            setPremiumBulletsError('Must have one or more bullets');
        }
        if(basicAllBullet.length > 0 && standardAllBullet.length > 0 && premiumAllBullet.length > 0){
            const obj = {
                ...PrevData,
                ...data,
                basicBullets : basicAllBullet,
                standardBullets : standardAllBullet,
                premiumBullets : premiumAllBullet,
            }

            console.log(obj)

            navigate('/freelancer/createShowcase' , {state: {data: obj}});
        }
    }



    return ( <div className="w-full flex justify-center bg-white dark:bg-aamdanBackground text-aamdanBackground dark:text-white">
    <div className="w-full lg:w-4/5">
        <NavBarFreelancer />
        <div className="text-center">
            <h1 className="font-heading text-5xl mb-12">Create Gig Package</h1>
            <h1 className="font-bold text-5xl mb-12">Become a part of the Aamdan Family</h1>
        </div>
        <div className="bg-aamdanSuperDeepWhite dark:bg-aamdanSuperDeepBlack rounded-xl w-full px-12 py-9">
            <h1 className="font-bold text-5xl mb-7">Create Gig</h1>
            <p className="text-lightGrayWhite dark:text-lightGray mb-8">This fundamental action sets the stage for you to tap into the diverse pool of freelancers, facilitating the realization of your goals and successful project completion.</p>
            <hr className="mb-11" />
            <div className="rounded-xl sm:px-11 sm:py-14 sm:bg-aamdanDeepWhite dark:sm:bg-aamdanDeepBlack">
                <p className="text-lightGrayWhite dark:text-lightGray mb-3">2/4</p>
                <h2 className="text-3xl font-bold mb-10">What packages do you offer</h2>
                <p className="text-lightGrayWhite dark:text-lightGray mb-11">Let’s create packages for the gig. There will be 3 types of packages you shall create based on the complexity and price of the order. Make sure to think of them carefully.</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="mb-14">
                        <PackageCard allBullet={basicAllBullet} bullet={basicBullet} description='A basic package typically refers to the most fundamental or entry-level offering of a service. It is the simplest and often the most affordable option available.'  registerOffer={register('basicOffer')} registerPrice={register('basicPrice')} registerRevision={register('basicRevisions')} registerTime={register('basicTime')} setAllBullets={setbasicAllBullet} setBullet={setbasicBullet} title='Basic' bulletsError={basicBulletsError}  errorOffer={errors.basicOffer ? errors.basicOffer.message : '' } errorPrice={errors.basicPrice ? errors.basicPrice.message : ''} errorRevision={errors.basicRevisions ? errors.basicRevisions.message : ''} errorTime={errors.basicTime ? errors.basicTime.message : ''}/>
                    </div>
                    <div className="mb-14">
                        <PackageCard allBullet={standardAllBullet} bullet={standardBullet} description='A standard package typically represents a middle-tier offering that provides a balanced combination of features, services delivery time and price.'  registerOffer={register('standardOffer')} registerPrice={register('standardPrice')} registerRevision={register('standardRevisions')} registerTime={register('standardTime')} setAllBullets={setStandardAllBullet} setBullet={setStandardBullet} title='Standard' bulletsError={standardBulletsError}  errorOffer={errors.standardOffer ? errors.standardOffer.message : '' } errorPrice={errors.standardPrice ? errors.standardPrice.message : ''} errorRevision={errors.standardRevisions ? errors.standardRevisions.message : ''} errorTime={errors.standardTime ? errors.standardTime.message : ''}/>
                    </div>
                    <div className="mb-14">
                        <PackageCard allBullet={premiumAllBullet} bullet={premiumBullet} description='Premium package typically represents the highest and most comprehensive level of offering provided by a service provider.'  registerOffer={register('premiumOffer')} registerPrice={register('premiumPrice')} registerRevision={register('premiumRevisions')} registerTime={register('premiumTime')} setAllBullets={setPremiumAllBullet} setBullet={setPremiumBullet} title='Premium' bulletsError={premiumBulletsError}  errorOffer={errors.premiumOffer ? errors.premiumOffer.message : '' } errorPrice={errors.premiumPrice ? errors.premiumPrice.message : ''} errorRevision={errors.premiumRevisions ? errors.premiumRevisions.message : ''} errorTime={errors.premiumTime ? errors.premiumTime.message : ''}/>
                    </div>
                    
                    <RegularRoundedButton type='submit' text='Next' />
                </form>
            </div>
        </div>
        <ToastContainer />
        <Footer />
    </div>
</div> );
}

export default CreateGigPackagesPage;