import React, { useMemo } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home';
import ChatService from './services/ChatService';
import Chat from './pages/Chat';
import { ChatContext } from './utils/chatContext';

function App() {
  const chat = useMemo(() => new ChatService('http://localhost:4000'), []);

  return (
    <Router>
      <div className="App">
        <ChatContext.Provider value={chat}>
          <Routes>
            <Route
              path="/"
              element={<Home />}
            />
            <Route
              path="/chat"
              element={<Chat />}
            />
          </Routes>
        </ChatContext.Provider>
      </div>
    </Router>
  );
}

export default App;
