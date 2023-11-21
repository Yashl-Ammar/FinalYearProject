function RegularTextArea({placeholder,type,register}) {
    return ( <textarea className="resize-none rounded-lg bg-aamdanBackground py-3 px-5 border border-strokeColor border-opacity-50 w-full" placeholder={placeholder} type={type} {...register} rows={7} /> );
}

export default RegularTextArea;