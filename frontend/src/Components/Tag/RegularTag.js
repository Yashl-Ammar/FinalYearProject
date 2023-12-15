function RegularTag({text, color}) {
    return ( 
        <div className={`${color} rounded-md w-28 text-xs py-2 px-2 text-center`}>{text}</div>
     );
}

export default RegularTag;