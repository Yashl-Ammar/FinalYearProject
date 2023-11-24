function RegularRoundedButton({text,onClick,type}) {
    return ( 
        <button type={type} className="py-3 flex justify-center bg-gradient-to-r from-aamdanBlue to-aamdanPurple rounded-full font-bold w-full text-lg" onClick={onClick}>{text}</button>
     );
}

export default RegularRoundedButton;