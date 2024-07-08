import React from 'react';
import '../CSS/SongList.css';

const SongList = ({ songs, onSongSelect }) => {
    return (
        <div className="song-list">
            {songs.map((song, index) => (
                <div key={song.id} className="song-item" onClick={() => onSongSelect(index)}>
                    <img src={`https://cms.samespace.com/assets/${song.cover}`} alt={song.name} />
                    <div>
                        <h3>{song.name}</h3>
                        <p>{song.artist}</p>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SongList;
