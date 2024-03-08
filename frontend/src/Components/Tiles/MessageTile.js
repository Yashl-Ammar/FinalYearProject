

function MessageTile({text, isMe}) {
    return ( 
        <div className={`flex w-full ${isMe ? 'justify-end' : ''}`} >
            <div className={`${isMe ? 'bg-aamdanPurple px-5 py-5 rounded-t-xl rounded-l-xl max-w-max w-4/5 mb-7' : "bg-aamdanDarkWhite dark:bg-aamdanDarkGray px-5 py-5 rounded-t-xl rounded-r-xl max-w-max w-4/5 mb-7" }`}>
                <p>{text}
                </p>
            </div>
        </div>
     );
}

export default MessageTile;