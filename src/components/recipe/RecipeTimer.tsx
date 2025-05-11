import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell } from 'lucide-react';

interface RecipeTimerProps {
  minutes: number;
  seconds: number;
  stepIndex: number;
}

const RecipeTimer: React.FC<RecipeTimerProps> = ({ minutes, seconds, stepIndex }) => {
  const totalSeconds = minutes * 60 + seconds;
  const [timeLeft, setTimeLeft] = useState<number>(totalSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  
  // Initialize audio on component mount
  useEffect(() => {
    audioRef.current = new Audio('https://assets.mixkit.co/sfx/preview/mixkit-alarm-digital-clock-beep-989.mp3');
    audioRef.current.loop = false;
    
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);
  
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      setShowNotification(true);
      
      // Play sound
      if (audioRef.current) {
        audioRef.current.play().catch(error => {
          console.error('Failed to play audio:', error);
        });
      }
      
      // Clear interval
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    } else if (!isActive && intervalRef.current) {
      clearInterval(intervalRef.current);
    }
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isActive, timeLeft]);
  
  const toggleTimer = () => {
    setIsActive(!isActive);
    setShowNotification(false);
  };
  
  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(totalSeconds);
    setShowNotification(false);
    
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
  };
  
  const formatTime = (time: number): string => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };
  
  const progress = (timeLeft / totalSeconds) * 100;

  return (
    <div className="bg-amber-50 rounded-lg p-3">
      <div className={`flex items-center ${showNotification ? 'animate-pulse' : ''}`}>
        <div className="flex-grow">
          <div className="flex items-center space-x-2 mb-1">
            {showNotification && (
              <Bell className="h-4 w-4 text-amber-600 animate-bounce" />
            )}
            <span className={`font-semibold ${showNotification ? 'text-amber-600' : 'text-amber-700'}`}>
              {showNotification ? 'Time is up!' : 'Timer'}
            </span>
          </div>
          <div className="text-xl font-mono">{formatTime(timeLeft)}</div>
          <div className="w-full bg-gray-200 rounded-full h-2 mt-2">
            <div 
              className={`h-2 rounded-full ${
                timeLeft === 0 
                  ? 'bg-green-500' 
                  : timeLeft < totalSeconds * 0.25 
                    ? 'bg-red-500' 
                    : 'bg-amber-500'
              }`}
              style={{ width: `${progress}%` }}
            ></div>
          </div>
        </div>
        
        <div className="flex-shrink-0 flex items-center space-x-2 ml-4">
          <button
            onClick={toggleTimer}
            className={`p-2 rounded-full ${
              isActive 
                ? 'bg-amber-100 text-amber-700' 
                : 'bg-amber-500 text-white'
            } hover:bg-opacity-90 transition-colors duration-200`}
          >
            {isActive ? <Pause className="h-5 w-5" /> : <Play className="h-5 w-5" />}
          </button>
          <button
            onClick={resetTimer}
            className="p-2 rounded-full bg-gray-200 text-gray-700 hover:bg-gray-300 transition-colors duration-200"
          >
            <RotateCcw className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeTimer;