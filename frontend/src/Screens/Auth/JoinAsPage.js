import { useState } from "react";
import { LargeHeadingStyle } from "../../CommonStyles/Style";
import NavBarOnlyLogo from "../../Components/Nav/NavBarOnlyLogo";
import { Link, useNavigate } from "react-router-dom";
import RegularRoundedButton from "../../Components/Buttons/RegularRoundedButton";
import { useHistory } from "react-router-dom";

function JoinAsPage() {

    let [checkedRadio, setCheckedRadio] = useState('client');
    let navigate = useNavigate();

    const checkClient = () => (
        <input
            type="radio"
            name="projectRadio"
            className="absolute top-0 right-4 mt-4 ml-4"
            checked={checkedRadio === 'client'}
            onChange={() => setCheckedRadio('client')}
        />
    );

    const checkFreelancer = () => (
        <input
            type="radio"
            name="projectRadio"
            className="absolute top-0 right-4 mt-4 ml-4"
            checked={checkedRadio === 'freelancer'}
            onChange={() => setCheckedRadio('freelancer')}
        />
    );

    return ( <div className="w-full flex justify-center">
        <div className="w-full lg:w-4/5">
            <NavBarOnlyLogo />
            <div className="flex justify-center w-full">
                <div className="bg-aamdanSuperDeepBlack sm:rounded-xl w-full sm:w-4/5 py-2 px-4 sm:py-8 sm:px-20 flex flex-col justify-center items-center" >
                    <h1 className={LargeHeadingStyle}>Join as client or freelancer</h1>
                    <div className="h-16"></div>
                    <div className="flex w-full mt-10 mb-12 flex-col lg:flex-row">
                        <div className="relative mb-10 lg:mr-10 w-full lg:w-1/2" onClick={() => setCheckedRadio('client')}>
                            {checkClient()}
                            <img className="object-cover h-72 w-full rounded-xl opacity-50" src="womanworking.jpg" alt="Background Image"/>
                            <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
                                <p className="w-2/3 font-bold text-2xl text-white">I’m a client, hiring for a project</p>
                            </div>
                        </div>
                        <div className="relative mb-10 lg:mr-10 w-full lg:w-1/2" onClick={() => setCheckedRadio('freelancer')}>
                            {checkFreelancer()}
                            <img className="h-72 w-full object-cover rounded-xl opacity-50" src="blackwomanworking.jpg" alt="Background Image"/>
                            <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-full flex justify-center">
                                <p className="w-2/3 font-bold text-2xl text-white">I’m freelancer, looking for work</p>
                            </div>
                        </div>
                    </div>
                    <RegularRoundedButton text='Create Account' onClick={() => {
                        if(checkedRadio === 'client'){
                            navigate('/createclientaccount');
                        }
                        else{
                            navigate('/createfreelanceraccount');
                        }
                    }}/>
                    <p className="mt-7 text-xl ">Already have an account?  <Link to='/' className="text-aamdanBlue">Login</Link></p>
                </div>
            </div>
        </div>
    </div> );
}

export default JoinAsPage;