import {  useEffect, useState } from "react";
import {  useLocation } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import MessageUserTile from "../../../Components/Tiles/MessageUserTile";
import Footer from "../../../Components/Nav/Footer";
import { addDoc, collection, onSnapshot, or, query, serverTimestamp, where } from "firebase/firestore";
import { db } from "../../../firebase";
import MessageTile from "../../../Components/Tiles/MessageTile";
import NavBarClient from "../../../Components/Nav/NavBarClient";


function ClientMessagingPage() {

    const location = useLocation();
    const freelancerid = location.state ? location.state.id : '';

    const [checker, setChecker] = useState(1);

    const [selectedFreelancer, setSelectedFreelancer] = useState({id: 1});
    const [client, setClient] = useState({})

    
    const [messages, setMessages] = useState([]); 
    const [users, setUsers] = useState([]);

    useEffect(() => {

        let messageFetching = async () => {
            let data;

            if(freelancerid){
                data = await fetchData(freelancerid)
            }
            else{
                data = await fetchOnlyClientData()
            }

            const q = query(collection(db, "Messages"), or(
                where("senderid", "==", data.clientId), 
                where("receiverid", "==", data.clientId)
            ));
            const unsubscribe = onSnapshot(q, (querySnapshot) => {
                const temp = [];
                querySnapshot.forEach((doc) => {
                    temp.push(doc.data());
                });

                for(let i = 0; i < temp.length ; i++){
                    for(let j = 0; j < temp.length - 1 ; j++){
                        if(temp[j].timestamp < temp[j+1].timestamp){
                            const x = temp[j];
                            temp[j] = temp[j+1];
                            temp[j+1] = x;
                        }
                    }
                }

                const temporaryUsers = []
                for(let i = 0; i < temp.length ; i++){

                    if(temp[i].senderid === data.clientId){
                        let flag = false;
                        for(let j = 0; j < temporaryUsers.length ; j++){
                            if(temp[i].receiverid === temporaryUsers[j].id){
                                flag = true
                                break;
                            }
                        }
                        if(!flag){
                            temporaryUsers.push({
                                id: temp[i].receiverid,
                                name: temp[i].receiver
                            })
                        } 
                    }
                    else if(temp[i].receiverid === data.clientId){
                        let flag = false;
                        for(let j = 0; j < temporaryUsers.length ; j++){
                            if(temp[i].senderid === temporaryUsers[j].id){
                                flag = true
                                break;
                            }
                        }
                        if(!flag){
                            temporaryUsers.push({
                                id: temp[i].senderid,
                                name: temp[i].sender
                            })
                        }
                    }
                }

                setClient({id: data.clientId, name: data.client_fname + ' ' + data.client_lname})
                if(freelancerid !== '' && selectedFreelancer.id === 1){
                    setSelectedFreelancer((prev) => {return {id: data.freelancerId , name: data.freelancer_fname + ' ' + data.freelancer_lname}});
                } else{
                    setSelectedFreelancer((prev) => {return {id: temporaryUsers[0]?.id , name: temporaryUsers[0]?.name}});
                }

                setMessages(temp);
                setUsers(temporaryUsers);
            });
        }

        messageFetching()
    }, [checker])

    

    const fetchData = async (id) => {
        try{
            let path = process.env.REACT_APP_GigPath+'gig/namegetter/'+id;

            let response = await axios.post(path,{},{
                headers: {
                    token: localStorage.getItem('token')
                }
            })
            
            return response.data;
        }
        catch(e){
            console.log(e);
        }
    }
    const fetchOnlyClientData = async () => {
        try{
            let path = process.env.REACT_APP_GigPath+'gig/clientData'; 

            let response = await axios.get(path,{
                headers: {
                    token: localStorage.getItem('token')
                }
            })

            return response.data;
        }
        catch(e){
            console.log(e);
        }
    }

    const [text, setText] = useState('');

    const send = async (e) => {
        e.preventDefault();
        if(text !== ''){
            setChecker(checker+1)            
            const temp = text;
            setText('');
            await addDoc(collection(db, "Messages"), {
                senderid: client.id,
                receiverid: selectedFreelancer.id,
                sender: client.name,
                receiver: selectedFreelancer.name,
                message: temp,
                timestamp: serverTimestamp()
            });

            
        }
        
    }

    const mapUsers = () => {
        return users.map((val, index) => {
            return <MessageUserTile img={'/femaleUser.svg'} message={'Freelancer'} name={val.name}  selected={selectedFreelancer.id === val.id} id={val.id} setSelectedFreelancer={setSelectedFreelancer} />
        })
    }

    const mapMessages = () => {
         const x = messages.toReversed()
         return x.map((val, index) => {
            if(selectedFreelancer.id === val.senderid || selectedFreelancer.id === val.receiverid)
                return <MessageTile key={index} text={val.message} isMe={val.senderid !== selectedFreelancer.id } />
        })
    }

    return ( <div className="w-full flex justify-center bg-white dark:bg-aamdanBackground text-aamdanBackground dark:text-white">
    <div className="w-full lg:w-4/5">
        <NavBarClient />
        <div className="bg-aamdanSuperDeepWhite dark:bg-aamdanSuperDeepBlack rounded-xl w-full flex">
            <div className="w-1/4 flex flex-col items-center py-10 px-5">
                <h2 className="text-3xl font-bold mb-7">Messages</h2>
                <div className="bg-aamdanDeepWhite dark:bg-aamdanDeepBlack rounded-xl py-5 w-full mb-5 h-[650px] overflow-auto">
                    {mapUsers()}

                </div>
                <p className="text-lightGrayWhite dark:text-lightGray text-xs">Make sure to be careful about sensitive information when conversing with others.</p>
            </div>
            <div className="flex flex-col border-l w-3/4">
                <section className="flex flex-col px-5 py-8 border-b w-full">
                    <div className="flex items-center mb-3">
                        <img className="mr-2" src="/femaleUser.svg" alt="" />
                        <h2 className="text-2xl font-bold">{selectedFreelancer.name}</h2>
                    </div>
                </section>
                <section className="flex flex-col justify-end px-5 pb-8 w-full h-[600px] overflow-auto">
                    {mapMessages()}
                </section>


                <section className="flex flex-col px-5 py-3 w-full border">
                    <form className="flex">
                        <input type="text" className="w-full rounded-full px-4 py-1 bg-aamdanDarkWhite dark:bg-aamdanDarkGray mr-2" placeholder="Write a Message..." value={text} onChange={(e) => {setText(e.target.value)}} />
                        <button onClick={send}>
                            <img src="/Sent.svg" alt="" />
                        </button>
                    </form>
                </section>
            </div>
        </div>
        <ToastContainer />
        <Footer />
    </div>
</div> );
}

export default ClientMessagingPage;