import React from 'react'

const Room = ({name, setName, surname, setSurname, room, setRoom, setChatScreen, socket}) => {
  const sendRoom = () => {
    socket.emit('room', room);
    setChatScreen(true);
  }  

  return (
    <div className='flex items-center justify-center h-full'>
        <div className='w-2/4 h-3/4 bg-orange-200 rounded shadow-2xl'>
            <div className="flex items-center justify-center h-3/4">
                <div className='w-3/4'>
                    <h1 className='text-center text-2xl text-orange-800 pl-1 font-bold'>Chat Login</h1>
                    <input value={name} onChange={e => setName(e.target.value)} className='block p-2 w-full rounded my-5 outline-none' type="text" placeholder='Name'/>
                    <input value={surname} onChange={e => setSurname(e.target.value)} className='block p-2 w-full rounded my-5 outline-none' type="text" placeholder='Surname'/>
                    <input value={room} onChange={e => setRoom(e.target.value)} className='block p-2 w-full rounded my-5 outline-none' type="text" placeholder='Room Id'/>
                    <button onClick={sendRoom} className='bg-orange-800 text-gray-200 rounded p-2 w-full hover:opacity-80'>Chat</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Room