import React from 'react';
import styles from './styles.module.css';
import Messages from './Messages';
import SendMessage from './SendMessage';
import RoomAndUsers from './RoomAndUsers';

function Chat() {
  return (
    <div className={styles.chatContainer}>
      <RoomAndUsers />
      <div>
        <Messages />
        <SendMessage />
      </div>
    </div>
  );
}

export default Chat;
