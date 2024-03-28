import { Link, useNavigate } from "react-router-dom";

function GigCard({id, img, userImg, name, rating, title, completedOrders, startingPrice, freelancer}) {
    
    const navigate = useNavigate();

    return ( 
        <button className="flex flex-col hover:bg-aamdanDeepWhite dark:hover:bg-aamdanDeepBlack p-5 rounded-lg" onClick={() => {
            if(freelancer)
                navigate('/freelancer/viewyourspecificgig', {state : {data : id}})
            else
                navigate('/client/viewSpecificGig', {state : {data : id}})
        }}>
            <div className="mb-2 w-full"><img className="object-cover w-full h-96 rounded-lg" src={img} alt="" /></div>
            <div className="flex justify-between items-center w-full">
                <div className="flex items-center">
                    {!userImg && <img src='/femaleUser.svg' alt="" />}
                    {userImg && <img className="w-10 h-10 mr-1 object-cover rounded-full" src={userImg} alt="" />}
                    <p>{name}</p>
                </div>
                <div className="flex items-center">
                    <p>{rating}</p>
                    <img src="/Star.svg" alt="" />
                </div>
            </div>
            <p className="text-lightGrayWhite dark:text-lightGray text-left">{title}</p>
            <p className="font-bold">Completed Orders ({completedOrders})</p>
            <p className="text-lightGrayWhite dark:text-lightGray font-bold">Starting at <span className="text-aamdanBackground dark:text-white font-bold">$ {startingPrice}</span></p>
        </ button>
     );
}

export default GigCard;
