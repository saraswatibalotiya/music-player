import React, { useState, useEffect, useRef } from 'react';
import '../CSS/MusicPlayer.css'; // Import your CSS file for styling
import { FaStepBackward, FaPlay, FaPause, FaStepForward } from 'react-icons/fa'; // Import Font Awesome icons

const MusicPlayer = ({ currentSong, playNext, playPrevious }) => {
    const [isPlaying, setIsPlaying] = useState(false);
    const audioRef = useRef(null);

    useEffect(() => {
        if (audioRef.current) {
            if (isPlaying) {
                audioRef.current.play().catch(error => console.error('Error playing audio:', error));
            } else {
                audioRef.current.pause();
            }
        }
    }, [isPlaying]);

    const togglePlayPause = () => {
        setIsPlaying(prevIsPlaying => !prevIsPlaying);
    };

    return (
        <div className="music-player">
            {currentSong && (
                <div className="song-details">
                    <h3>{currentSong.name}</h3>
                    <p>{currentSong.artist}</p>
                    <img src={`https://cms.samespace.com/assets/${currentSong.cover}`} alt={currentSong.name} />
                </div>
            )}
            <div className="controls">
                <button onClick={playPrevious}><FaStepBackward /></button>
                <button onClick={togglePlayPause}>
                    {isPlaying ? <FaPause /> : <FaPlay />}
                </button>
                <button onClick={playNext}><FaStepForward /></button>
            </div>
            {/* Hide the audio element using CSS */}
            {currentSong && <audio ref={audioRef} controls src={currentSong.url} className="hidden-audio" />}
        </div>
    );
};

export default MusicPlayer;
