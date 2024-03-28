function AdminDashboardCard({text1, text2, icon, percentageText}) {
    return ( 
        <div className="flex flex-col rounded-2xl bg-aamdanDeepWhite dark:bg-aamdanDeepBlack py-6 px-8 w-full">
                        <p className="text-lightGrayWhite dark:text-lightGray text-lg mb-4">{text1}</p>
                        <h1 className="font-bold text-3xl mb-4">{text2}</h1>
                    </div>
     );
}

export default AdminDashboardCard;