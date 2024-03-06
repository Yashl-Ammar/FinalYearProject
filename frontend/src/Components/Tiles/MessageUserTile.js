function MessageUserTile({name, message, img, selected, id, setSelectedFreelancer}) {
    return ( 
        <div className={`${selected ? 'bg-white dark:bg-aamdanBackground' : ''} flex items-center px-4 py-5 hover:bg-aamdanDarkWhite dark:hover:bg-aamdanDarkGray`} onClick={() => {setSelectedFreelancer((prev) => {return {id: id, name: name}})}}>
            <div className="ml-7 mr-2"><img src={img} alt="" /></div>
            <div className="flex flex-col ">
                <p className="font-bold text-xl">{name}</p>
                <p className="text-lightGrayWhite dark:text-lightGray">{message}</p>
            </div>
        </div>
     );
}

export default MessageUserTile;