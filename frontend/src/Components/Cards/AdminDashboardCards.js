function AdminDashboardCard({text1, text2, icon, percentageText}) {
    return ( 
        <div className="flex flex-col rounded-2xl bg-aamdanDeepBlack py-6 px-8 w-full">
                        <p className="text-lightGray text-lg mb-4">{text1}</p>
                        <h1 className="font-bold text-3xl mb-4">{text2}</h1>
                        <div className="flex items-center">
                            <img className="mr-2" src={icon} alt="" /> 
                            <p><span className="font-bold">{percentageText}%</span> from last month</p>
                        </div>
                    </div>
     );
}

export default AdminDashboardCard;