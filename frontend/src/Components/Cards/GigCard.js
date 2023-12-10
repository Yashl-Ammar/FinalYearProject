import { Link, useNavigate } from "react-router-dom";

function GigCard({id, img, userImg, name, rating, title, completedOrders, startingPrice}) {
    
    const navigate = useNavigate();
    
    return ( 
        <button className="flex flex-col hover:bg-aamdanDeepBlack p-5 rounded-lg" onClick={() => {
            navigate('/client/viewSpecificGig', {state : {data : id}})
        }}>
            <div className="mb-2 w-full"><img className="object-cover w-full h-full rounded-lg" src={img} alt="" /></div>
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                    <img src={userImg} alt="" />
                    <p>{name}</p>
                </div>
                <div className="flex items-center">
                    <p>{rating}</p>
                    <img src="/Star.svg" alt="" />
                </div>
            </div>
            <p className="text-lightGray">{title}</p>
            <p className="font-bold">Completed Orders ({completedOrders})</p>
            <p className="text-lightGray font-bold">Starting at <span className="text-white font-bold">$ {startingPrice}</span></p>
        </ button>
     );
}

export default GigCard;