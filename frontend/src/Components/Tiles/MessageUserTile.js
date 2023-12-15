function MessageUserTile({name, message, img}) {
    return ( 
        <div className="flex items-center px-4 py-5 hover:bg-aamdanDarkGray">
            <div className="ml-7 mr-2"><img src={img} alt="" /></div>
            <div className="flex flex-col ">
                <p className="font-bold text-xl">{name}</p>
                <p className="text-lightGray">{message}</p>
            </div>
        </div>
     );
}

export default MessageUserTile;