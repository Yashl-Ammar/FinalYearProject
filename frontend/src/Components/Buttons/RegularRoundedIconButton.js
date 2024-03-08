function RegularRoundedIconButton({ text, img, onClick }) {
    return (
      <button className="flex items-center justify-center px-4 py-3 bg-gradient-to-r from-aamdanBlue to-aamdanPurple rounded-full font-bold w-full text-lg text-white" onClick={onClick}>
        <img src={img} alt="" />
        <p className="ml-2">{text}</p>
      </button>
    );
  }
  

export default RegularRoundedIconButton;