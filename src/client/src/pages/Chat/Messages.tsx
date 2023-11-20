import React, { useContext, useEffect, useState } from 'react';
import styles from './styles.module.css';
import { ChatContext } from '../../utils/chatContext';

interface Message {
  message: string,
  username: string,
  date: Date
}

function Messages() {
  const chat = useContext(ChatContext)!;
  const [messagesReceived, setMessagesReceived] = useState<Message[]>([]);

  useEffect(() => {
    chat.subscribe('receiveMessage', data => {
      console.log(data);
      setMessagesReceived(state => [
        ...state,
        {
          message: data.message,
          username: data.username,
          date: data.date,
        },
      ]);
    });
    return () => chat.unsubscribe('receiveMessage');
  }, [chat]);

  const formatDateFromTimestamp = (timestamp: Date) => {
    const date = new Date(timestamp);
    return date.toLocaleString();
  };

  return (
    <div className={styles.messagesColumn}>
      {messagesReceived.map((msg, i) => (
        <div className={styles.message} key={i}>
          <div style={{
            display: 'flex',
            justifyContent: 'space-between',
          }}
          >
            <span className={styles.msgMeta}>{msg.username}</span>
            <span className={styles.msgMeta}>
              {formatDateFromTimestamp(msg.date)}
            </span>
          </div>
          <p className={styles.msgText}>{msg.message}</p>
          <br />
        </div>
      ))}
    </div>
  );
}

export default Messages;
