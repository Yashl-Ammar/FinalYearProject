

function RegularInputField({placeholder, register, type}) {
    return ( <input className="rounded-lg bg-aamdanBackground py-3 px-5 border border-strokeColor border-opacity-50 w-full" placeholder={placeholder} type={type} {...register} /> );
}

export default RegularInputField;