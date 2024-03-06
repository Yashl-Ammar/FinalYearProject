function RoundedTransparentButton({text, onClick}) {
    return ( <button className="py-3 flex justify-center border border-aamdanPurple rounded-full font-bold w-full text-lg dark:text-white" onClick={onClick}>{text}</button> );
}

export default RoundedTransparentButton;