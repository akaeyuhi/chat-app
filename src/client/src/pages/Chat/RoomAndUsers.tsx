import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styles from './styles.module.css';
import { ChatContext } from '../../utils/chatContext';

interface User {
  username: string,
  socketId: string,
}

interface ServerResponse {
  chatUsers: User[],
  date: Date
}

function RoomAndUsers() {
  const chat = useContext(ChatContext)!;
  const [roomUsers, setRoomUsers] = useState<User[]>([]);

  const navigate = useNavigate();

  useEffect(() => {
    chat.subscribe('chatUsers', (data: ServerResponse) => {
      setRoomUsers(data.chatUsers);
    });
    return () => chat?.unsubscribe('chatUsers');
  }, [chat]);

  const leaveRoom = () => {
    chat.disconnect();
    navigate('/', { replace: true });
  };

  return (
    <div className={styles.roomAndUsersColumn}>
      <h2 className={styles.roomTitle}>Chat</h2>
      <div>
        {roomUsers.length > 0 && <h5 className={styles.usersTitle}>Users:</h5>}
        <ul className={styles.usersList}>
          {roomUsers.map(user => (
            <li
              style={{
                fontWeight: `${user.username === chat?.username ? 'bold' : 'normal'}`,
              }}
              key={user.socketId}
            >
              {user.username}
            </li>
          ))}
        </ul>
      </div>

      <button type="button" className="btn btn-outline" onClick={leaveRoom}>
        Leave
      </button>
    </div>
  );
}

export default RoomAndUsers;
