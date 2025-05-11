import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { Invite, mockInvites } from '../services/mockService';
import { useAuth } from './AuthContext';

interface NotificationContextType {
  invites: Invite[];
  loading: boolean;
  acceptInvite: (inviteId: string) => Promise<void>;
  declineInvite: (inviteId: string) => Promise<void>;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (context === undefined) {
    throw new Error('useNotification must be used within a NotificationProvider');
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [invites, setInvites] = useState<Invite[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    const fetchInvites = async () => {
      if (!user) {
        setInvites([]);
        setLoading(false);
        return;
      }

      setLoading(true);
      try {
        const userInvites = await mockInvites.getInvitesByUserId(user.id);
        setInvites(userInvites);
      } catch (error) {
        console.error('Failed to fetch invites:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchInvites();
  }, [user]);

  const acceptInvite = async (inviteId: string) => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    try {
      await mockInvites.acceptInvite(inviteId);
      setInvites(prev => prev.filter(invite => invite.id !== inviteId));
    } catch (error) {
      console.error('Failed to accept invite:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const declineInvite = async (inviteId: string) => {
    if (!user) throw new Error('User not authenticated');
    
    setLoading(true);
    try {
      await mockInvites.declineInvite(inviteId);
      setInvites(prev => prev.filter(invite => invite.id !== inviteId));
    } catch (error) {
      console.error('Failed to decline invite:', error);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const value = {
    invites,
    loading,
    acceptInvite,
    declineInvite
  };

  return <NotificationContext.Provider value={value}>{children}</NotificationContext.Provider>;
};