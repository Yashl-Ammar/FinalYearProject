function RegularTextArea({placeholder,type,register, disabled, val}) {
    return ( <textarea className="resize-none rounded-lg bg-white dark:bg-aamdanBackground py-3 px-5 border border-strokeColor border-opacity-50 w-full" placeholder={placeholder} type={type} {...register} rows={7} disabled={disabled} value={val} /> );
}

export default RegularTextArea;