import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import './index.css'


export default function Home() {
        const [username, setUsername] = useState(''); // Add this
        const [room, setRoom] = useState(''); // Add this
        const navigate = useNavigate()
        const joinRoom = () => {
                if (room !== '' && username !== '') {
                        socket.emit('join_room', { username, room });
                }
                navigate('/Chat', { replace: true });
        };
        return (
                <>
                       
                        <div className='container'>
                                <div className='formContainer'>
                                        <h1>{`Chatrooms`}</h1>

                                        <input
                                                className='input'
                                                placeholder='Username...'

                                                onChange={(e) => setUsername(e.target.value)}
                                        />

                                        <select
                                                className='input'
                                                onChange={(e) => setRomm(e.target.value)}
                                        >
                                                <option>-- Select Room --</option>
                                                <option value='javascript'>JavaScript</option>
                                                <option value='node'>Node</option>
                                                <option value='express'>Express</option>
                                                <option value='react'>React</option>
                                        </select>

                                        <button className='btn btn-secondary' onClick={joinRoom}>Join Room</button>
                                </div>
                        </div>
                </>
        )
}