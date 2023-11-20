import { createContext } from 'react';
import ChatService from '../services/ChatService';

export const ChatContext = createContext<ChatService | null>(null);
