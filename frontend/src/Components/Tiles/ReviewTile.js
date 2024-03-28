function ReviewTile({name, review, rating, date}) {
    return ( 
        <div className="mt-7">
            <div>
                <div className="flex items-center mb-7">
                    <img  className="mr-5" src="/femaleUser.svg" alt="" />
                    <p className="font-bold text-3xl">{name}</p>
                </div>
                <div className="flex items-center mb-5">
                    <p className="font-bold text-lg mr-5">{rating}</p>
                    <img src="/Star.svg" alt="" />
                </div>
                <p className="text-lightGray dark:text-lightGray mb-7">Posted on {date}</p>
                <p className="text-lg">{review}</p>
            </div>
            <hr className="mt-10" />
        </div>
     );
}

export default ReviewTile;