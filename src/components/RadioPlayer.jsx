import React, { useState, useRef, useEffect } from 'react';

const RadioPlayer = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.8);
  const [isLive, setIsLive] = useState(true); // Assuming always live for now
  const audioRef = useRef(null);

  // Placeholder stream URL - User needs to provide actual stream
  // Using a generic reliable stream for testing or the actual one if known.
  // I will use a placeholder or try to find one. For now, empty or example.
  // Many radios use shoutcast/icecast.
  const STREAM_URL = "https://stream.zeno.fm/ezw4k3v70w8uv"; // Example stream, replace with actual

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-auto border border-gray-100" transition:persist>
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-xl font-bold text-gray-800 flex items-center gap-2">
          <span className="text-sky-500">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 9l10.5-3m0 6.553v3.75a2.25 2.25 0 01-1.632 2.163l-1.32.377a1.803 1.803 0 11-2.53-2.095V10.757c0-.297.106-.587.302-.823.197-.235.49-.395.795-.457l6.906-1.503M18 14a3 3 0 01-3 3m3-3a3 3 0 013 3m-3-3l1.5-1.5" />
            </svg>
          </span>
          Radio Unción
        </h2>
        {isLive && (
          <span className="flex items-center gap-1 bg-red-100 text-red-700 px-2 py-1 rounded-full text-xs font-bold animate-pulse">
            <span className="w-2 h-2 bg-red-600 rounded-full"></span>
            LIVE
          </span>
        )}
      </div>

      <audio ref={audioRef} src={STREAM_URL} preload="none" />

      <div className="flex flex-col gap-4">
        {/* Play/Pause Button */}
        <button
          onClick={togglePlay}
          className={`w-full py-4 rounded-xl flex items-center justify-center gap-3 transition-all transform hover:scale-105 ${isPlaying
            ? 'bg-red-500 hover:bg-red-600 text-white shadow-red-200'
            : 'bg-sky-600 hover:bg-sky-700 text-white shadow-sky-200'
            } shadow-lg font-bold text-lg`}
        >
          {isPlaying ? (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 5.25v13.5m-7.5-13.5v13.5" />
              </svg>
              Pausar Transmisión
            </>
          ) : (
            <>
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-8 h-8">
                <path strokeLinecap="round" strokeLinejoin="round" d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.348a1.125 1.125 0 010 1.971l-11.54 6.347a1.125 1.125 0 01-1.667-.985V5.653z" />
              </svg>
              Escuchar en Vivo
            </>
          )}
        </button>

        {/* Volume Control */}
        <div className="flex items-center gap-3 text-gray-600">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5" aria-hidden="true">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17.25 9.75L19.5 12m0 0l2.25 2.25M19.5 12l2.25-2.25M19.5 12l-2.25 2.25m-10.5-6l4.72-4.72a.75.75 0 011.28.53v15.88a.75.75 0 01-1.28.53l-4.72-4.72H4.51c-.88 0-1.704-.507-1.938-1.354A9.01 9.01 0 012.25 12c0-.83.112-1.633.322-2.396C2.806 8.756 3.63 8.25 4.51 8.25H6.75z" />
          </svg>
          <label htmlFor="volume-control" className="sr-only">Control de volumen</label>
          <input
            id="volume-control"
            type="range"
            min="0"
            max="1"
            step="0.01"
            value={volume}
            onChange={handleVolumeChange}
            aria-label="Control de volumen"
            aria-valuemin="0"
            aria-valuemax="100"
            aria-valuenow={Math.round(volume * 100)}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-sky-500"
          />
        </div>
      </div>

      <div className="mt-4 text-center text-xs text-gray-600">
        Si la reproducción se detiene, recarga la página.
      </div>
    </div>
  );
};

export default RadioPlayer;
