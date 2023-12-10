import { useNavigate } from "react-router-dom";
import RegularSkillTag from "../Tag/RegularSkillTag";
import { extractDateTime } from "../../Utilities/ExtractDate";



function Proposaltile({id,postTime,description,amount,rating,country,user,pinned,url,jobId}) {

    const navigate = useNavigate();

    return ( 
        <button className="w-full text-left rounded-xl px-11 py-14 bg-aamdanDeepBlack mb-14 hover:bg-aamdanDarkGray" onClick={() => {
            navigate(`/job/${jobId}/proposal/${id}`);
        }}>
                <div className="flex justify-between">
                    <h1 className="text-3xl font-bold mb-4">Proposal by {user}</h1>
                    <img className="rounded-full w-12 h-12" src={url} alt="" />
                </div>
                <p className="text-lightGray mb-10">Posted on {extractDateTime(postTime)}</p>
                <p className="mb-10">{description}</p>
                <div className="flex mb-5 flex-col sm:flex-row">
                    
                </div>
                <div className="flex justify-between">
                    <div className="flex sm:items-center flex-col sm:flex-row">
                        <p className="text-xl mb-3 sm:mb-0 sm:mr-12">Bid Amount: ${amount}</p>
                        <div className="flex mb-3 sm:mb-0 sm:mr-12">
                            <p className="text-lg font-bold mr-2">{rating}</p>
                            <img src="/Star.svg" alt="" />
                        </div>
                        <div className="flex items-center">
                            <img className="mr-2" src="/Location.svg" alt="" />
                            <p className="text-xs">{country}</p>
                        </div>
                    </div>
                    <div className="flex">
                        <div className="flex flex-col items-center mr-5">
                            <img src={`${!pinned ? '/Pin.svg' : '/Pin (1).svg'}`} alt="" />
                        </div>
                    </div>
                </div>
            </button>
     );
}

export default Proposaltile;