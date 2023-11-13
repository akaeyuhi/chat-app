import styles from './styles.module.css';
import React, { useContext, useState } from 'react';
import { ChatContext } from '../../App';

const SendMessage = () => {
  const chat = useContext(ChatContext);
  const [message, setMessage] = useState('');

  const sendMessage = () => {
    if (message !== '') {
      chat?.sendMessage(message);
      setMessage('');
    }
  };

  return (
    <div className={styles.sendMessageContainer}>
      <input
        className={styles.messageInput}
        placeholder='Message...'
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button className='btn btn-primary' onClick={sendMessage}>
        Send Message
      </button>
    </div>
  );
};

export default SendMessage;
