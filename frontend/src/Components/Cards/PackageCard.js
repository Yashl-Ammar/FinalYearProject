import RegularSquareButton from "../Buttons/RegularSquareButton";
import RegularInputField from "../InputFields/RegularInputField";

function PackageCard({disabled,title,description, registerPrice, registerTime, registerOffer, registerRevision, bullet, setBullet, allBullet, setAllBullets, bulletsError, errorPrice, errorTime, errorOffer, errorRevision, priceValue, timeValue, offerValue, revisionValue}) {


    const mapBullets = () => {
        return allBullet.map((value, index) => {
            return (
                <div key={index} className="py-1 px-3 flex border-b w-fit my-3"> 
                    <p className="mr-2">{value}</p>
                    {disabled !== true && 
                        <img src="/Close.svg" alt="" onClick={() => {
                            let temp = [...allBullet];
                            temp.splice(index,1);
                            setAllBullets(temp);
                        }}/>
                    }
                </div>
            );
        })
    }

    return ( 
    <div className="bg-aamdanSuperDeepBlack rounded-xl w-full px-8 py-8">
        <h2 className="text-3xl font-bold mb-8">{title}</h2>
        <p className="text-lightGray mb-8">{description}</p>
        <div className="mb-8">
            <div className="flex items-center justify-between w-full mb-4">
                <label className="text-lg">Pricing of this package</label>
            </div>
            <RegularInputField placeholder='Amount in dollars' type='number' register={registerPrice} disabled={disabled} val={priceValue}/>
            <p className="text-red">{errorPrice}</p>
        </div>
        <div className="mb-8">
            <div className="flex items-center justify-between w-full mb-4">
                <label className="text-lg">Total time for delivery in days</label>
            </div>
            <RegularInputField placeholder='e.g 10' type='number' register={registerTime} disabled={disabled} val={timeValue}/>
            <p className="text-red">{errorTime}</p>
        </div>
        <p className="text-lg mb-5">What you offer</p>
        <div className="mb-8">
            <div className="flex items-center justify-between w-full mb-4">
                <label className="text-lg">Write a small detail about what you offer in this package</label>
            </div>
            <RegularInputField placeholder='e.g A total of 5 screen + payment gateway' type='text' register={registerOffer} disabled={disabled} val={offerValue}/>
            <p className="text-red">{errorOffer}</p>
        </div>
        <div className="flex items-center justify-between w-full mb-4">
            <label className="text-lg">Write about what you offer in the form of bullets (up to 6)</label>
            <p className={`${bullet?.length > 30 ? 'text-red' : 'text-lightGray ' }`}>{bullet ? bullet.length : 0}/30</p>
        </div>
        <div className="w-full flex flex-col lg:flex-row mb-6">
            <input className="rounded-lg bg-aamdanBackground py-3 px-5 border border-strokeColor border-opacity-50 w-full" placeholder='e.g 5 screen' value={bullet} onChange={(e) => {setBullet(e.target.value)}} disabled={disabled} />
            <div className="lg:ml-2 mt-4 lg:mt-0">
                <RegularSquareButton text='Add' onClick={(e) => {
                    e.preventDefault();
                    if(bullet.length <= 30 && bullet.length >= 2 && allBullet.length < 6) {
                        setAllBullets([...allBullet, bullet]);
                        setBullet('');
                    }}}
                />
            </div>
        </div>
        <p className="text-lightGray mb-6">Description in Bullets</p>
        <div className="flex flex-col">
            {mapBullets()}
        </div>
        <p className="py-2 text-red" >{bulletsError}</p>
        <div className="mb-8">
            <div className="flex items-center justify-between w-full mb-4">
                <label className="text-lg">Number of revisions</label>
            </div>
            <RegularInputField placeholder='e.g 5' type='number' register={registerRevision} disabled={disabled} val={revisionValue}/>
            <p className="text-red">{errorRevision}</p>
        </div>
    </div> );
}

export default PackageCard;