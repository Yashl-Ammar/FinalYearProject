function RegularDropDown({data,register}) {

    let mapData = () => { 
        return data.map((value,index) => {
            return <option key={index}>{value}</option>
        })
    }

    return ( 
        <select className="rounded-lg bg-white dark:bg-aamdanBackground py-3 px-5 border border-strokeColor border-opacity-50 w-full" {...register}>
            {mapData()}
        </select>
     );
}

export default RegularDropDown;