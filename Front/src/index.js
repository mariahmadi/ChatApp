import React, { useState } from "react";
import { createBrowserRouter, createRoutesFromElements, RouterProvider } from 'react-router-dom'
import Home from "./Home";
import ErrorPage from "./Errorpage";
import Root from "./Chat";
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Contact from "./Message";
import { io } from 'socket.io-client'
import Display from "./SendMessage";
import DisplayNav from "./Navbar";
const socket = io('http://localhost:4000')
//import { createRoot } from 'react-dom/client'
import { createRoot } from 'react-dom/client'
import Chat from "./Chat";
import Login from "./Login";
import Register from "./Register";
function App() {
    const [username, setUsername] = useState(''); // Add this
    const [room, setRoom] = useState(''); // Add this
    // const router = createBrowserRouter(
    //     createRoutesFromElements(

    //         <Route path="/" element={<Home />}>

    //         </Route>
    //     ))
    return (

        <div>
            <Router>
                <DisplayNav />
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/Register"  element={<Register />}></Route>

                    <Route path="/Login" element={<Login />}></Route>

                    <Route path="/Chat" element={<Chat />}></Route>

                </Routes>
            </Router>
        </div>
    )

}

// [

//     {
//         path: '/',

//         element:
//             < DisplayNav
//             // username={username} // Add this
//             // setUsername={setUsername} // Add this
//             // room={room} // Add this
//             // setRoom={setRoom} // Add this
//             // socket={socket} // Add this
//             />,
//         children: [
//             {
//                 path: 'Register',
//                 element: < Register />
//             }
//         ]
//     },
//     {
//         path: 'Login',
//         element: < Login />
//     },
//     // {
//     //     path: '/Ressgister',
//     //     element: < Register />
//     // }
//     , {
//         path: '/Chat',
//         element: <Chat />
//     }
// ])

//<>

{/* <Router>
                <div>
                    <Routes>
                        <Route
                            path='/'
                        
                            element={
                                <Home
                                    username={username} // Add this
                                    setUsername={setUsername} // Add this
                                    room={room} // Add this
                                    setRoom={setRoom} // Add this
                                    socket={socket} // Add this
                                />,
                                
                            }

                        />
                        <Route
                            path='/chat'
                            element={<Chat username={username} room={room} socket={socket} />}
                        />
                        <Route
                            path='/Register'
                            element={<Register />}
                        />
                    </Routes>
                </div>
            </Router> */}
//  </>





//}


createRoot(document.getElementById("root")).render(


    <App />



)