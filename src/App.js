import React, { useState, useEffect } from 'react';
import Header from './assets/components/Header';
import SongList from './assets/components/SongList';
import MusicPlayer from './assets/components/MusicPlayer';
import './App.css';

const App = () => {
    const [songs, setSongs] = useState([]);
    const [forYouSongs, setForYouSongs] = useState([]);
    const [topTrackSongs, setTopTrackSongs] = useState([]);
    const [currentSongIndex, setCurrentSongIndex] = useState(null);
    const [isTopTrackSelected, setIsTopTrackSelected] = useState(false);

    useEffect(() => {
        const fetchSongs = async () => {
            try {
                const response = await fetch('https://cms.samespace.com/items/songs');
                if (!response.ok) {
                    throw new Error('Failed to fetch songs');
                }
                const data = await response.json();
                if (data && data.data) {
                    setSongs(data.data);
                    setForYouSongs(data.data.filter(song => !song.top_track));
                    setTopTrackSongs(data.data.filter(song => song.top_track));
                    console.log(data.data,'=== data ===')
                    setCurrentSongIndex({ list: 'forYou', index: 0 }); // Set the first song initially
                }
            } catch (error) {
                console.error('Error fetching songs:', error);
            }
        };

        fetchSongs();
    }, []);

    const handleSongSelect = (list, index) => {
        setCurrentSongIndex({ list, index });
    };

    const getCurrentSong = () => {
        if (currentSongIndex) {
            const { list, index } = currentSongIndex;
            return list === 'forYou' ? forYouSongs[index] : topTrackSongs[index];
        }
        return null;
    };

    const playNext = () => {
        if (currentSongIndex) {
            const { list, index } = currentSongIndex;
            const songList = list === 'forYou' ? forYouSongs : topTrackSongs;
            setCurrentSongIndex({ list, index: (index + 1) % songList.length });
        }
    };

    const playPrevious = () => {
        if (currentSongIndex) {
            const { list, index } = currentSongIndex;
            const songList = list === 'forYou' ? forYouSongs : topTrackSongs;
            setCurrentSongIndex({ list, index: (index - 1 + songList.length) % songList.length });
        }
    };

    return (
        <div className="app-container">
            <Header />
            <div className="main-container">
                <div className="left-panel">
                <div className="category-buttons">
                        <span
                            className={isTopTrackSelected ? "category-text selected" : "category-text"}
                            onClick={() => setIsTopTrackSelected(false)}
                        >
                            For You
                        </span>
                        <span
                            className={!isTopTrackSelected ? "category-text selected" : "category-text"}
                            onClick={() => setIsTopTrackSelected(true)}
                        >
                            Top Tracks
                        </span>
                    </div>
                    <SongList 
                        songs={isTopTrackSelected ? topTrackSongs : forYouSongs} 
                        onSongSelect={(index) => handleSongSelect(isTopTrackSelected ? 'topTracks' : 'forYou', index)} 
                    />
                </div>
                <div className="right-panel">
                    <MusicPlayer 
                        currentSong={getCurrentSong()} 
                        playNext={playNext} 
                        playPrevious={playPrevious} 
                    />
                </div>
            </div>
        </div>
    );
};

export default App;
