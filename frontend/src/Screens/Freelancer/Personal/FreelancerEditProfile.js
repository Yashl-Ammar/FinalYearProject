import {  useEffect, useState } from "react";
import {   useNavigate, } from "react-router-dom";
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
import RegularSkillTag from "../../../Components/Tag/RegularSkillTag";
import GigCard from "../../../Components/Cards/GigCard";
import Footer from "../../../Components/Nav/Footer";
import RegularDropDown from "../../../Components/InputFields/RegularDropDown";
import { allCountries } from "../../../Data/Countries";
import SkillTagWithClose from "../../../Components/Tag/SkillTagwithClose";
import { Box, Button, Modal } from "@mui/material";
import DragDrop from "../../../Components/DragDrop/DragDrop";
import DragDropSingleFile from "../../../Components/DragDrop/DragDropSingleFile";

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

function FreelancerEditProfilePage() {

    const navigate = useNavigate();

    const [file, setFile] = useState();


    const [skill, setskill] = useState('');
    const [languages, setLanguages] = useState('');
    const [education, setEducation] = useState('');

    const [profile, setProfile] = useState({
        fname: '',
        lname: '',
        languages: [],
        skills: [],
        education: [],
    })

    const [profPic, setProfPic] = useState('');

    const [open, setOpen] = useState(false);
    const handleOpen = () => {
      setOpen(true);
    };
    const handleClose = () => {
      setOpen(false);
    };
    

    useEffect(() => {
        fetchData()
    },[])

    const addSkill = () => {
        const newSkill = skill
        setProfile(prevProfile => ({
            ...prevProfile,
            skills: [...prevProfile.skills, newSkill]
        }));
        
    }
    const addLanguage = () => {
        const newLanguage = languages
        setProfile(prevProfile => ({
            ...prevProfile,
            languages: [...prevProfile.languages, newLanguage]
        }));
        
    }
    const addEducation = () => {
        const newEducation = education
        setProfile(prevProfile => ({
            ...prevProfile,
            education: [...prevProfile.education, newEducation]
        }));
        
    }

    const fetchData = async () => {
        try{
            let response = await axios.get(process.env.REACT_APP_ProfilePath+'profileManagement/getFreelancerData',{
                headers:{
                    'token':localStorage.getItem('token')
                }
            })

            const obj = {
                fname: response.data.fname,
                lname: response.data.lname,
                languages: response.data.languages,
                skills: response.data.skills,
                education: response.data.education,
            } 

            console.log(response.data)
            setProfPic(response.data.profilepic)
            setProfile(obj);
        }  
        catch(e){
            console.log(e)
        }
    }

    const mapSkills = () => {
        return profile.skills.map((val,i) => {
            return (
            <div className="mr-2" key={i}>
                <SkillTagWithClose text={val} onClick={() => {
                    setProfile({
                        ...profile,
                        skills: profile.skills.filter(s => s !== val)
                    })
                }} />
            </div>)
        })
    }
    const mapLanguages = () => {
        return profile.languages.map((val,i) => {
            return (
            <div className="mr-2" key={i}>
                <SkillTagWithClose text={val} onClick={() => {
                    setProfile({
                        ...profile,
                        languages: profile.languages.filter(s => s !== val)
                    })
                }} />
            </div>)
        })
    }
    const mapEducation = () => {
        return profile.education.map((val,i) => {
            return (
            <div className="mr-2" key={i}>
                <SkillTagWithClose text={val} onClick={() => {
                    setProfile({
                        ...profile,
                        education: profile.education.filter(s => s !== val)
                    })
                }} />
            </div>)
        })
    }

    const updateProfile = async () => {
        try{
            if(profile.fname === '' || profile.lname === '' || !file){
                toast('Fields should not be empty and you must choose a profile picture')
            }
            else{

                const formData = new FormData();

                
                formData.append('fname', profile.fname);
                formData.append('lname', profile.lname);

                profile.skills.forEach(val => {
                    formData.append('skills', val);
                })
                profile.languages.forEach(val => {
                    formData.append('languages', val);
                })
                profile.education.forEach(val => {
                    formData.append('education', val);
                })

                // Append files to the FormData
                formData.append('file', file);

                console.log(file);

                let response = await axios.put(process.env.REACT_APP_ProfilePath+'profileManagement/freelancerEditProfile', formData, {
                    headers: {
                        'token': localStorage.getItem('token'),
                        'Content-Type': 'multipart/form-data'
                    }
                });

                navigate('/freelancer/home')

            }



        } catch(e){
            toast('There was an issue updating your profile')
        }
    }


    console.log(profPic)

    return ( <div className="w-full flex justify-center bg-white dark:bg-aamdanBackground text-aamdanBackground dark:text-white">
    <div className="w-full lg:w-4/5">
        <NavBarFreelancer />
            <div className="bg-aamdanSuperDeepWhite dark:bg-aamdanSuperDeepBlack py-7 rounded-xl flex justify-center">
                <div className="flex flex-col items-center w-1/2">
                    <h1 className="text-5xl font-heading mb-5">Profile Management</h1>
                    {!profPic && <img className="w-40" src="/femaleUser.svg" alt="" />}
                    {profPic && <img className="w-40 h-40 rounded-full object-cover" src={profPic} alt="" />}
                    <Button onClick={handleOpen}>Change Profile Picture</Button>
                    <div className="w-full mb-5">
                        <h2 className="text-3xl font-heading font-bold mb-5">First Name</h2>
                        <input type="text" className="w-full rounded-md py-2 px-5 bg-white dark:bg-aamdanBackground border" placeholder="First Name" value={profile.fname} onChange={(e) => {setProfile({...profile, fname: e.target.value})}} />
                    </div>
                    <div className="w-full mb-5">
                        <h2 className="text-3xl font-heading font-bold mb-5">Last Name</h2>
                        <input type="text" className="w-full rounded-md py-2 px-5 bg-white dark:bg-aamdanBackground border" placeholder="Last Name" value={profile.lname} onChange={(e) => {setProfile({...profile, lname: e.target.value})}} />
                    </div>
                    <div className="w-full">
                        <h2 className="text-3xl font-heading font-bold mb-5">Languages</h2>
                        <div className="relative flex mb-5">
                            <input type="text" className="w-full rounded-md py-2 px-5 bg-white dark:bg-aamdanBackground border" placeholder="Add Language" value={languages} onChange={(e) => {setLanguages(e.target.value)}} />
                            <button className="absolute top-0 right-0 h-full bg-gradient-to-r from-aamdanBlue to-aamdanPurple rounded-r px-5" onClick={addLanguage}>
                                <p className="font-bold">Add</p>
                            </button>
                        </div>
                        <div className="flex flex-wrap mb-5">
                            {mapLanguages()}
                        </div>
                    </div>
                    <div className="w-full">
                        <h2 className="text-3xl font-heading font-bold mb-5">Skills</h2>
                        <div className="relative flex mb-5">
                            <input type="text" className="w-full rounded-md py-2 px-5 bg-white dark:bg-aamdanBackground border" placeholder="Add Skill" value={skill} onChange={(e) => {setskill(e.target.value)}} />
                            <button className="absolute top-0 right-0 h-full bg-gradient-to-r from-aamdanBlue to-aamdanPurple rounded-r px-5" onClick={addSkill}>
                                <p className="font-bold">Add</p>
                            </button>
                        </div>
                        <div className="flex flex-wrap mb-5">
                        {mapSkills()}
                        </div>
                    </div>
                    <div className="w-full">
                        <h2 className="text-3xl font-heading font-bold mb-5">Education</h2>
                        <div className="relative flex mb-5">
                            <input type="text" className="w-full rounded-md py-2 px-5 bg-white dark:bg-aamdanBackground border" placeholder="Add Education" value={education} onChange={(e) => {setEducation(e.target.value)}} />
                            <button className="absolute top-0 right-0 h-full bg-gradient-to-r from-aamdanBlue to-aamdanPurple rounded-r px-5" onClick={addEducation}>
                                <p className="font-bold">Add</p>
                            </button>
                        </div>
                        <div className="flex flex-wrap mb-5">
                            {mapEducation()}
                        </div>
                    </div>
                    <div className="w-1/2">
                        <RegularRoundedButton text={'Update Profile'} onClick={updateProfile} />
                    </div>
                </div>
            </div>
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
            <Box sx={style}>
                <h3 className="font-bold text-3xl mb-5">Drop new profile picture here</h3>
                <DragDropSingleFile file={file} setFile={setFile} />
            </Box>
        </Modal>
        <Footer />
        <ToastContainer />
        
    </div>
</div> );
}

export default FreelancerEditProfilePage;