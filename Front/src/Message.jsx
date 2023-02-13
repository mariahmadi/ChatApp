import './index.css'
import { useState, useEffect } from 'react';

const Messages = ({ socket }) => {

  const [messagesRecieved, setMessagesReceived] = useState([]);

  const messagesColumnRef = useRef(null); // Add this

  // Runs whenever a socket event is recieved from the server
  useEffect(() => {
    socket.on('receive_message', (data) => {
      console.log(data);
      setMessagesReceived((state) => [
        ...state,
        {
          message: data.message,
          username: data.username,
          __createdtime__: data.__createdtime__,
        },
      ]);
    });

    // Remove event listener on component unmount
    return () => socket.off('receive_message');
  }, [socket]);

  // Add this
  useEffect(() => {
    // Last 100 messages sent in the chat room (fetched from the db in backend)
    socket.on('output-messages', (result) => {
      console.log('Last 100 messages:', JSON.parse(result));
      last100Messages = JSON.parse(result);
      // Sort these messages by __createdtime__
      last100Messages = sortMessagesByDate(last100Messages);
      setMessagesReceived((state) => [...last100Messages, ...state]);
    });

    return () => socket.off('output-messages');
  }, [socket]);

  // Add this
  // Scroll to the most recent message
  useEffect(() => {
    messagesColumnRef.current.scrollTop =
      messagesColumnRef.current.scrollHeight;
  }, [messagesRecieved]);

  // Add this
  function sortMessagesByDate(messages) {
    return messages.sort(
      (a, b) => parseInt(a.__createdtime__) - parseInt(b.__createdtime__)
    );
  }

  // dd/mm/yyyy, hh:mm:ss
  function formatDateFromTimestamp(timestamp) {
    const date = new Date(timestamp);
    return date.toLocaleString();
  }

  return (
    // Add ref to this div
    <div className='messagesColumn' ref={messagesColumnRef}>
      {messagesRecieved.map((msg, i) => (
        <div className='message' key={i}>
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <span className='msgMeta'>{msg.username}</span>
            <span className='msgMeta'>
              {formatDateFromTimestamp(msg.__createdtime__)}
            </span>
          </div>
          <p className='msgText'>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
};

export default Messages;