import React from "react";
import Messages from "./Message";
import SendMessage from "./SendMessage";
import Rooms from "./Rooms";
export default function Chat({ username, room, socket }) {
    return (
        <>

            <div className='chatContainer'>
                <Rooms socket={socket} username={username} room={room} />
                <div>
                    <Messages socket={socket} />
                    <SendMessage socket={socket} username={username} room={room} />
                </div>
            </div>


        </>
    );
}

