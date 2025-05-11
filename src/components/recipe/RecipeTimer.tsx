import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, Bell, Volume2, VolumeX } from 'lucide-react';

interface BackgroundTrack {
  url: string;
  name: string;
}

interface RecipeTimerProps {
  minutes: number;
  seconds: number;
  stepIndex: number;
}

const backgroundTracks: BackgroundTrack[] = [
  { 
    url: "https://hoox53krl6prf51l.public.blob.vercel-storage.com/Samajavaragamana-song-Jmtcx2poY314dvXQWvttZInON2AnrI.MP3",
    name: 'Samajavaragamana' 
  }
];

const alarmSound = "https://hoox53krl6prf51l.public.blob.vercel-storage.com/mixkit-morning-clock-alarm-1003-qtAKDZecsk5V7WjAFLq8ykTPiouIkO.wav";

const RecipeTimer: React.FC<RecipeTimerProps> = ({ minutes, seconds, stepIndex }) => {
  const totalSeconds = minutes * 60 + seconds;
  const [timeLeft, setTimeLeft] = useState<number>(totalSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(true);
  const [currentTrack, setCurrentTrack] = useState<BackgroundTrack | null>(null);
  const [isMusicPlaying, setIsMusicPlaying] = useState<boolean>(false);
  const [audioContextAllowed, setAudioContextAllowed] = useState<boolean>(false);
  const [isAlarmPlaying, setIsAlarmPlaying] = useState<boolean>(false);

  const alarmRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const musicPositionRef = useRef<number>(0);
  const userInteractedRef = useRef<boolean>(false);
  const alarmTimeoutRef = useRef<number | null>(null);

  
  useEffect(() => {
    try {
    
      alarmRef.current = new Audio(alarmSound);
      alarmRef.current.preload = 'auto';
      
   
      setCurrentTrack(backgroundTracks[0]);
      bgMusicRef.current = new Audio(backgroundTracks[0].url);
      bgMusicRef.current.preload = 'auto';
      bgMusicRef.current.loop = true;
      bgMusicRef.current.volume = 0.5;
    } catch (err) {
      console.error("Audio initialization failed:", err);
      setAudioError("Failed to load audio files");
    }

    return () => {
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
      if (alarmRef.current) {
        alarmRef.current.pause();
        alarmRef.current = null;
      }
      if (intervalRef.current) clearInterval(intervalRef.current);
      if (alarmTimeoutRef.current) clearTimeout(alarmTimeoutRef.current);
    };
  }, []);

  const handleUserInteraction = async () => {
    if (!userInteractedRef.current) {
      userInteractedRef.current = true;
      
      try {
        const silentAudio = new Audio('data:audio/wav;base64,UklGRl9vT19XQVZFZm10IBAAAAABAAEAQB8AAEAfAAABAAgAZGF0YU...');
        silentAudio.volume = 0;
        await silentAudio.play();
        silentAudio.pause();
        setAudioContextAllowed(true);
      } catch (err) {
        console.log("Silent audio play failed, falling back to regular interaction");
        setAudioContextAllowed(true);
      }
    }
  };

  const startBackgroundMusic = async () => {
    if (!musicEnabled || !bgMusicRef.current || !audioContextAllowed) return;
    
    try {
      const res = await fetch(bgMusicRef.current.src, { method: 'HEAD' });
      if (!res.ok) throw new Error("Audio file not found");

      bgMusicRef.current.currentTime = musicPositionRef.current;
      await bgMusicRef.current.play();
      setIsMusicPlaying(true);
      setAudioError(null);
    } catch (err) {
      console.error("Music play failed:", err);
      setAudioError("Background music unavailable");
      setIsMusicPlaying(false);
      setMusicEnabled(false);
    }
  };

  const stopBackgroundMusic = () => {
    if (bgMusicRef.current) {
      musicPositionRef.current = bgMusicRef.current.currentTime;
      bgMusicRef.current.pause();
      setIsMusicPlaying(false);
    }
  };

  // Handle music enable/disable
  useEffect(() => {
    if (!audioContextAllowed) return;

    if (musicEnabled && isActive) {
      startBackgroundMusic();
    } else {
      stopBackgroundMusic();
    }
  }, [musicEnabled, audioContextAllowed, isActive]);

  // Handle timer logic
  useEffect(() => {
    if (isActive && timeLeft > 0) {
      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (timeLeft === 0 && !showNotification) {
     
      setIsActive(false);
      setShowNotification(true);
      stopBackgroundMusic();
      
      // Play alarm if enabled
      if (musicEnabled && audioContextAllowed && alarmRef.current && !isAlarmPlaying) {
        setIsAlarmPlaying(true);
        alarmRef.current.currentTime = 0;
        alarmRef.current.play().catch(err => {
          console.error("Alarm play failed:", err);
          setAudioError("Could not play alarm sound");
        });
        
        // Stop alarm after 5 seconds
        alarmTimeoutRef.current = window.setTimeout(() => {
          if (alarmRef.current) {
            alarmRef.current.pause();
            alarmRef.current.currentTime = 0;
          }
          setIsAlarmPlaying(false);
        }, 5000);
      }
    } else if (!isActive) {
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft, musicEnabled, audioContextAllowed, showNotification, isAlarmPlaying]);

  const toggleTimer = async () => {
    await handleUserInteraction();
    const willBeActive = !isActive;
    setIsActive(willBeActive);
    setShowNotification(false);
    
    if (!willBeActive && isAlarmPlaying) {
      stopAlarm();
    }
  };

  const stopAlarm = () => {
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
    }
    if (alarmTimeoutRef.current) {
      clearTimeout(alarmTimeoutRef.current);
      alarmTimeoutRef.current = null;
    }
    setIsAlarmPlaying(false);
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(totalSeconds);
    setShowNotification(false);
    musicPositionRef.current = 0;
    
    stopAlarm();
    
    if (bgMusicRef.current) {
      bgMusicRef.current.currentTime = 0;
    }
  };

  const toggleMusic = () => {
    setMusicEnabled(prev => !prev);
  };

  const formatTime = (time: number): string => {
    const mins = Math.floor(time / 60);
    const secs = time % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const progress = (timeLeft / totalSeconds) * 100;

  return (
    <div 
      className="bg-amber-50 rounded-lg p-3"
      onClick={handleUserInteraction}
    >
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
          
          {musicEnabled && isMusicPlaying && currentTrack && (
            <div className="text-xs text-gray-500 mt-1">
              Now playing: {currentTrack.name}
            </div>
          )}
          
          {audioError && (
            <div className="text-red-500 text-sm mt-1">{audioError}</div>
          )}
          
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
          <button
            onClick={toggleMusic}
            className={`p-2 rounded-full ${
              musicEnabled 
                ? 'bg-blue-100 text-blue-700' 
                : 'bg-gray-200 text-gray-700'
            } hover:bg-opacity-90 transition-colors duration-200`}
            title={musicEnabled ? "Disable music" : "Enable music"}
          >
            {musicEnabled ? <Volume2 className="h-5 w-5" /> : <VolumeX className="h-5 w-5" />}
          </button>
        </div>
      </div>
    </div>
  );
};

export default RecipeTimer;