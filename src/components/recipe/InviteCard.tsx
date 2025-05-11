import React, { useState } from 'react';
import { Bell, Check, X } from 'lucide-react';
import { Invite } from '../../services/mockService';

interface InviteCardProps {
  invite: Invite;
  onAccept: () => Promise<void>;
  onDecline: () => Promise<void>;
}

const InviteCard: React.FC<InviteCardProps> = ({ invite, onAccept, onDecline }) => {
  const [isAccepting, setIsAccepting] = useState(false);
  const [isDeclining, setIsDeclining] = useState(false);
  
  const handleAccept = async () => {
    setIsAccepting(true);
    try {
      await onAccept();
    } finally {
      setIsAccepting(false);
    }
  };
  
  const handleDecline = async () => {
    setIsDeclining(true);
    try {
      await onDecline();
    } finally {
      setIsDeclining(false);
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm p-4 border border-amber-100">
      <div className="flex items-start">
        <div className="flex-shrink-0 mr-4">
          <div className="w-10 h-10 rounded-full bg-amber-100 flex items-center justify-center">
            <Bell className="h-5 w-5 text-amber-600" />
          </div>
        </div>
        
        <div className="flex-grow">
          <h3 className="font-semibold text-amber-800">{invite.inviterName} invited you to collaborate</h3>
          <p className="text-gray-600 text-sm">
            You've been invited to collaborate on <span className="font-medium">{invite.recipeName}</span>
          </p>
          
          <div className="mt-3 flex space-x-3">
            <button
              onClick={handleAccept}
              disabled={isAccepting || isDeclining}
              className="flex items-center space-x-1 px-3 py-1.5 bg-amber-500 hover:bg-amber-600 text-white rounded-md transition-colors disabled:opacity-70"
            >
              {isAccepting ? (
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <Check className="h-4 w-4" />
              )}
              <span>Accept</span>
            </button>
            
            <button
              onClick={handleDecline}
              disabled={isAccepting || isDeclining}
              className="flex items-center space-x-1 px-3 py-1.5 bg-gray-200 hover:bg-gray-300 text-gray-700 rounded-md transition-colors disabled:opacity-70"
            >
              {isDeclining ? (
                <div className="w-4 h-4 border-2 border-gray-700 border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <X className="h-4 w-4" />
              )}
              <span>Decline</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InviteCard;