import styles from './styles.module.css';
import Messages from './Messages';
import React from 'react';
import SendMessage from './SendMessage';
import RoomAndUsers from './RoomAndUsers';

const Chat = () => {
  return (
    <div className={styles.chatContainer}>
      <RoomAndUsers />
      <div>
        <Messages />
        <SendMessage />
      </div>
    </div>
  );
};

export default Chat;
