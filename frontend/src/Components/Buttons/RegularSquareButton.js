function RegularSquareButton({text,onClick,type}) {
    return ( 
        <button type={type} className="py-3 px-5 flex justify-center bg-gradient-to-r from-aamdanBlue to-aamdanPurple rounded-lg font-bold w-full text-lg" onClick={onClick}>{text}</button>
     );
}

export default RegularSquareButton;