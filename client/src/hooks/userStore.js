import {create} from 'zustand';

export const useUserStore = create((set) => ({
  user: null, 
  setUser: (userData) => set({ user: userData }), 
  clearUser: () => set({ user: null }) 
}));

export const useConversation = create((set) => ({
  selectedConversation: null,
  setSelectedConversation: (selectedConversation) => set({selectedConversation}),
  messages: [],
  setMessages: (messages) => set({messages})
}))
