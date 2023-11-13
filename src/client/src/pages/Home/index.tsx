import styles from './styles.module.css';
import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ChatContext } from '../../App';

const Home = () => {
  const [username, setUsername] = useState('');
  const chat = useContext(ChatContext)!;
  const navigate = useNavigate();

  const joinChat = () => {
    if (username !== '') {
      chat.init(username);
    }
    navigate('/chat', { replace: true });
  };

  return (
    <div className={styles.container}>
      <div className={styles.formContainer}>
        <h1>{`Chat`}</h1>
        <input
          value={username}
          className={styles.input}
          placeholder='Username...'
          onChange={(e) => setUsername(e.target.value)}
        />
        <button className='btn btn-secondary' style={{ width: '100%' }} onClick={joinChat}>Join
        </button>
      </div>
    </div>
  );
};

export default Home;
