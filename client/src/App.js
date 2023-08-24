import Room from "./pages/Room";
import Chat from "./pages/Chat";
import { useState } from "react";
import io from 'socket.io-client';

const socket = io.connect('http://localhost:5000');

function App() {
  const [name, setName] = useState('');
  const [surname, setSurname] = useState('');
  const [room, setRoom] = useState('');

  const [chatScreen, setChatScreen] = useState(false);

  return (
    <>
      {
        !chatScreen ?
          <Room name={name} setName={setName} surname={surname} setSurname={setSurname} room={room} setRoom={setRoom} setChatScreen={setChatScreen} socket={socket} />
        :
          <Chat socket={socket} name={name} surname={surname} room={room} />
      }
    </>
  );
}

export default App;
