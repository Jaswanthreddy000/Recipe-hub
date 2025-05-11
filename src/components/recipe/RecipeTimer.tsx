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
  { url: '/assets/Samajavaragamana.mp3', name: 'Samajavaragamana' }
];

const alarmSound = '/assets/Samajavaragamana.mp3';

const RecipeTimer: React.FC<RecipeTimerProps> = ({ minutes, seconds, stepIndex }) => {
  const totalSeconds = minutes * 60 + seconds;
  const [timeLeft, setTimeLeft] = useState<number>(totalSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [showNotification, setShowNotification] = useState<boolean>(false);
  const [userInteracted, setUserInteracted] = useState<boolean>(false);
  const [audioError, setAudioError] = useState<string | null>(null);
  const [musicEnabled, setMusicEnabled] = useState<boolean>(true);
  const [currentTrack, setCurrentTrack] = useState<BackgroundTrack | null>(null);

  const alarmRef = useRef<HTMLAudioElement | null>(null);
  const bgMusicRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<number | null>(null);
  const musicPositionRef = useRef<number>(0);
  const wasPlayingRef = useRef<boolean>(false);

  // Load audio elements on mount
  useEffect(() => {
    try {
      alarmRef.current = new Audio(alarmSound);
      alarmRef.current.preload = 'auto';
      alarmRef.current.loop = false;
    } catch (err) {
      console.error("Failed to load alarm sound:", err);
      setAudioError("Failed to load alarm sound");
    }

    return () => {
      stopAllAudio();
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const stopAllAudio = () => {
    if (bgMusicRef.current) {
      musicPositionRef.current = bgMusicRef.current.currentTime;
      bgMusicRef.current.pause();
      bgMusicRef.current = null;
    }
    if (alarmRef.current) {
      alarmRef.current.pause();
      alarmRef.current.currentTime = 0;
    }
  };

  const startBackgroundMusic = () => {
    if (!userInteracted || !musicEnabled || bgMusicRef.current) return;

    try {
      const track = currentTrack || backgroundTracks[Math.floor(Math.random() * backgroundTracks.length)];
      if (!currentTrack) setCurrentTrack(track);
      
      bgMusicRef.current = new Audio(track.url);
      bgMusicRef.current.preload = 'auto';
      bgMusicRef.current.loop = true;
      bgMusicRef.current.volume = 0.5;
      bgMusicRef.current.currentTime = musicPositionRef.current;

      bgMusicRef.current.play().catch(err => {
        console.error("Music play failed:", err);
        setAudioError("Could not play background music");
      });
    } catch (err) {
      console.error("Failed to initialize background music:", err);
      setAudioError("Failed to load background music");
    }
  };

  useEffect(() => {
    if (isActive && timeLeft > 0) {
      // Start background music if needed
      startBackgroundMusic();

      intervalRef.current = window.setInterval(() => {
        setTimeLeft(prev => prev - 1);
      }, 1000);
    } else if (isActive && timeLeft === 0) {
      setIsActive(false);
      setShowNotification(true);

      // Stop background music
      if (bgMusicRef.current) {
        bgMusicRef.current.pause();
        bgMusicRef.current.currentTime = 0;
        bgMusicRef.current = null;
        musicPositionRef.current = 0;
      }

      // Play final alarm sound if music is enabled
      if (userInteracted && alarmRef.current && musicEnabled) {
        alarmRef.current.play().catch(err => {
          console.error("Alarm play failed:", err);
          setAudioError("Could not play alarm sound");
        });
      }

      if (intervalRef.current) clearInterval(intervalRef.current);
    } else if (!isActive) {
      // When pausing, just stop the interval but keep music state
      if (intervalRef.current) clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isActive, timeLeft, userInteracted, musicEnabled]);

  const handleUserInteraction = () => {
    if (!userInteracted) {
      setUserInteracted(true);
    }
  };

  const toggleTimer = () => {
    handleUserInteraction();
    const willBeActive = !isActive;
    setIsActive(willBeActive);
    setShowNotification(false);

    if (willBeActive) {
      // When starting/resuming timer
      if (musicEnabled) {
        if (bgMusicRef.current) {
          // If we have an existing audio element, just play it
          bgMusicRef.current.currentTime = musicPositionRef.current;
          bgMusicRef.current.play().catch(err => {
            console.error("Music play failed:", err);
            setAudioError("Could not play background music");
          });
        } else {
          // Otherwise start new music
          startBackgroundMusic();
        }
      }
    } else {
      // When pausing timer
      if (bgMusicRef.current) {
        musicPositionRef.current = bgMusicRef.current.currentTime;
        bgMusicRef.current.pause();
      }
    }
  };

  const resetTimer = () => {
    handleUserInteraction();
    setIsActive(false);
    setTimeLeft(totalSeconds);
    setShowNotification(false);
    stopAllAudio();
    musicPositionRef.current = 0;
  };

  const toggleMusic = () => {
    if (musicEnabled) {
      // Disabling music - save current position
      if (bgMusicRef.current) {
        musicPositionRef.current = bgMusicRef.current.currentTime;
        bgMusicRef.current.pause();
        bgMusicRef.current = null;
      }
    } else {
      // Enabling music - restore position
      if (isActive) {
        startBackgroundMusic();
      }
    }
    setMusicEnabled(prev => !prev);
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
          
          {musicEnabled && bgMusicRef.current && currentTrack && (
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