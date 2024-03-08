

function RegularInputField({placeholder, register, type, disabled, val}) {
    return ( <input className="rounded-lg bg-white dark:bg-aamdanBackground py-3 px-5 border border-strokeColor border-opacity-50 w-full" placeholder={placeholder} type={type} {...register} disabled={disabled} value={val} /> );
}

export default RegularInputField;