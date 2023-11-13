import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import { createContext } from 'react';
import ChatService from './services/ChatService';
import Chat from './pages/Chat';

export const ChatContext = createContext<ChatService | null>(null);

function App() {
  const chat = new ChatService('http://localhost:4000');

  return (
    <Router>
      <div className='App'>
        <ChatContext.Provider value={chat}>
          <Routes>
            <Route
              path='/'
              element={<Home />} />
            <Route
              path='/chat'
              element={<Chat />}
            />
          </Routes>
        </ChatContext.Provider>
      </div>
    </Router>
  );
}

export default App;
