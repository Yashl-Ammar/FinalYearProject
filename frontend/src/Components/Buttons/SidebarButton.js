function SidebarButton({text, icon, onClick, active}) {
    return ( 
        <button className={`flex items-center justify-center px-10 py-6 w-full hover:bg-aamdanSuperDeepWhite dark:hover:bg-aamdanSuperDeepBlack font-bold my-2 ${active ? ' bg-aamdanDarkWhite dark:bg-aamdanDarkGray' : 'bg-aamdanBackgroundWhite dark:bg-aamdanBackground'}`} onClick={onClick}>
            <div className="flex justify-start items-center w-4/5">
                <img className="mr-14" src={icon} alt="" />
                {text}
            </div>
        </button>
     );
}

export default SidebarButton;