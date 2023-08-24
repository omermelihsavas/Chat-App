import { useEffect, useState } from "react"

const Chat = ({ socket, name, surname, room }) => {
    const [message, setMessage] = useState('');
    const [messageList, setMessageList] = useState([]);

    useEffect(() => {
        socket.on('returnMessage', (messages) => {
            setMessageList((prev) => [...prev, messages]);
        });

    }, [socket]);

    const dateNow = new Date().toLocaleTimeString('tr-TR');

    const sendMessage = async () => {
        const messageContent = {
            name: name,
            surname: surname,
            message: message,
            room: room,
            date: dateNow
        }

        if (messageContent.message != '') {
            await socket.emit('message', messageContent);

            setMessageList((prev) => [...prev, messageContent]);
            setMessage('');
        }
        else return
    };

    return (
        <div className='flex items-center justify-center h-full'>
            <div className='w-2/4 h-3/4 bg-orange-200 rounded shadow-2xl relative'>
                <div className="p-2 w-full bg-orange-900 flex items-center rounded-t">
                    <img src="https://cdn-icons-png.flaticon.com/512/1077/1077114.png" alt="photo" className='bg-white w-12 h-12 rounded-full bg-contain' />
                    <span className="ml-5 text-gray-200">{name}</span>
                    <span className="ml-1 text-gray-200">{surname}</span>
                </div>

                <div className="w-full h-[450px] overflow-auto mr-10 p-3">
                    {
                        messageList && messageList.map((messages, index) => (
                            <div className={`${name === messages.name && surname === messages.surname ? '' : 'flex justify-end'}`}>

                                <div className={`${name === messages.name && surname === messages.surname ? 'bg-green-600 rounded-bl-none' : 'bg-blue-600 rounded-br-none'} w-1/2 p-2 text-gray-200 rounded-xl mt-3`}>
                                    <span className="block break-words">{messages.message}</span>
                                    <div className="flex justify-between mt-3">
                                        <span className="text-xs">{messages.date}</span>
                                        <span className="text-xs">{messages.name}</span>
                                    </div>
                                </div>

                            </div>
                        ))
                    }

                </div>

                <div className="absolute bottom-0 left-0 w-full">
                    <input value={message} onChange={e => setMessage(e.target.value)} className='p-2 w-3/4 rounded-l outline-none' type="text" placeholder='Message...' />
                    <button onClick={sendMessage} className='p-2 w-1/4 rounded-r text-center bg-orange-900 text-gray-200 hover:opacity-80'>Send</button>
                </div>
            </div>
        </div>
    )
}

export default Chat