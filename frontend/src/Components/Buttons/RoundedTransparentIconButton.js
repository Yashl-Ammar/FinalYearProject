function RoundedTransparentIconButton({ text, img, onClick }) {
    return (
      <button className="flex items-center justify-center px-4 py-3 border border-aamdanPurple rounded-full font-bold w-full text-lg dark:text-white" onClick={onClick} type="button">
        <img src={img} alt="" />
        <p className="ml-2">{text}</p>
      </button>
    );
  }
  

export default RoundedTransparentIconButton;