import { useNavigate } from "react-router-dom";
import { LargeHeadingStyle, termsErrorMessage } from "../../Constants/constants";
import NavBarOnlyLogo from "../../Components/Nav/NavBarOnlyLogo";
import RegularRoundedButton from "../../Components/Buttons/RegularRoundedButton";
import { Link } from "react-router-dom";
import RegularInputField from "../../Components/InputFields/RegularInputField";
import { useForm } from "react-hook-form"
import { zodResolver } from '@hookform/resolvers/zod'
import { allCountries } from "../../Data/Countries";
import { useState } from "react";
import PasswordInputField from "../../Components/InputFields/PasswordInputField";
import axios from "axios";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { freelancerAccountSchema } from "../../Validations/CreateFreelancerAccountValidation";
import RegularDropDown from "../../Components/InputFields/RegularDropDown";

function CreateFreelancerAccountPage() {

    const [termsError, setTermsError] = useState(false);

    const {
        register,
        handleSubmit,
        formState:{errors}
      } = useForm({
        resolver: zodResolver(freelancerAccountSchema)
      })
    let navigate = useNavigate();

    let onSubmit = async (data) => {
        setTermsError(false);
        if(!data.isCheckedTerms){
            setTermsError(true);
        }
        else{
            try{
                await axios.post(process.env.REACT_APP_AuthPath+'freelancer/signup',{
                    fname: data.firstname,
                    lname: data.lastname,
                    email: data.email,
                    password: data.password,
                    country: data.country,
                })
                
                navigate('/login');
            }
            catch(e){
                toast("There was some issue creating your account. Please try later!");
            }
        }
    }

    return ( <div className="w-full flex justify-center">
    <div className="w-full lg:w-4/5">
        <NavBarOnlyLogo />
        <div className="flex justify-center w-full">
            <form className="bg-aamdanSuperDeepBlack sm:rounded-xl w-full sm:w-4/5 py-2 px-4 sm:py-8 sm:px-20 flex flex-col justify-center items-center mb-8" onSubmit={handleSubmit(onSubmit)} >
                <h1 className={LargeHeadingStyle}>Sign up to find work</h1>
                <div className="h-16"></div>
                <div className="w-full my-8">
                    <div className="flex mb-8 flex-col lg:flex-row">
                        <div className="mb-8 lg:mb-0 lg:mr-5 w-full">
                            <RegularInputField placeholder={'First Name'} register={register('firstname')} type='text' />
                            {errors.firstname && <p className="text-red">{errors.firstname.message}</p>}
                        </div>
                        <div className="w-full">
                            <RegularInputField placeholder={'Last Name'} register={register('lastname')} type='text' />
                            {errors.lastname && <p className="text-red">{errors.lastname.message}</p>}
                        </div>
                    </div>
                    <div className="mb-8">
                        <RegularInputField placeholder={'Email'} register={register('email')} type='email' />
                        {errors.email && <p className="text-red">{errors.email.message}</p>}
                    </div>
                    <div className="mb-8">
                        <PasswordInputField placeholder='Password' register={register('password')} />
                        {errors.password && <p className="text-red">{errors.password.message}</p>}
                    </div>
                    <div className="mb-8">
                        <RegularDropDown data={allCountries} register={register('country')} />
                        {errors.country && <p className="text-red">{errors.country.message}</p>}
                    </div>
                    <div className="flex">
                        <input className="w-6 mr-3" type="checkbox" {...register('isCheckedTerms')} />
                        <p className="text-sm">Yes, I understand and agree to the <span className="text-aamdanBlue">Aamdan Terms of Service</span>, including the <span className="text-aamdanBlue">User Agreement</span> and <span className="text-aamdanBlue">Privacy Policy</span>.</p>
                    </div>
                    {termsError && <p className="text-red">{termsErrorMessage}</p>}
                </div>
                <RegularRoundedButton text='Create Account' type='submit'/>
                <p className="mt-7 text-xl ">Already have an account?  <Link to='/login' className="text-aamdanBlue">Login</Link></p>
                <ToastContainer />
            </form>
        </div>
    </div>
</div> );
}

export default CreateFreelancerAccountPage;