import { useState } from "react";

function PasswordInputField({placeholder,register}) {

    
    let [passwordReveal,setpasswordReveal] = useState(false);

    return ( 
        <div className="relative">
            <input
                className="rounded-lg bg-aamdanBackground py-3 px-5 border border-strokeColor border-opacity-50 w-full pr-10 focus:outline-none focus:border-blue-500"
                placeholder={placeholder}
                type = {passwordReveal ? 'type' : 'password'}
                {...register}
            />
            {passwordReveal ? <img src="passwordeyeopen.svg" alt="Password Eye" className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer" onClick={() => {setpasswordReveal(false)}} /> : <img src="passwordEye.svg" alt="Password Eye" className="absolute top-1/2 transform -translate-y-1/2 right-3 cursor-pointer" onClick={() => {setpasswordReveal(true)}} />}
            
            
        </div>
     );
}

export default PasswordInputField;