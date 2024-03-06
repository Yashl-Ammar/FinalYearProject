function NavBarOnlyLogo() {
    return ( 
        <div className="flex justify-center w-full text-aamdanBackground dark:text-white">
            <div className="flex py-8 w-full">
                <div className="w-8 flex">
                        <img src="/AamdanLogo.svg" alt="" />
                        <h2 className="text-aamdanBackground dark:text-white font-bold text-3xl" style={{fontFamily:'Playfair-Display'}}>Aamdan</h2>
                </div>
            </div>
        
        </div>
        
     );
}

export default NavBarOnlyLogo;