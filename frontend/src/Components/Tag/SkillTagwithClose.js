function SkillTagWithClose({text, onClick}) {
    return ( 
        <div className="rounded-full py-1 px-3 flex border w-fit my-3"> 
            <p className="mr-2">{text}</p>
            <img src="/Close.svg" alt="" onClick={onClick}/>
        </div>
     );
}

export default SkillTagWithClose;