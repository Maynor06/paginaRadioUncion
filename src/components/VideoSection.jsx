import React, { useState, useEffect } from 'react';
import useSWR from 'swr';
import axios from 'axios';
import { FaFacebook, FaTiktok, FaYoutube } from 'react-icons/fa';

const fetcher = url => axios.get(url).then(res => res.data);

const VideoSection = () => {
    // Optimización de la llamada API: SWR ya es rápido, pero añadimos opciones para 
    // evitar peticiones innecesarias cuando el usuario cambie de pestaña y vuelva.
    const { data, error } = useSWR('/api/get-video', fetcher, {
        revalidateOnFocus: false, // No recargar si el usuario solo cambia de pestaña
        dedupingInterval: 60000,  // Reutilizar la respuesta durante al menos 1 minuto
    });

    if (!data && !error) {
        // SKELETON: Mantiene la misma estructura y espacios para evitar que el diseño salte
        return (
            <div className="w-full max-w-4xl mx-auto px-4">
                {/* Video Container Skeleton */}
                <div className="relative pt-[56.25%] rounded-2xl overflow-hidden shadow-2xl bg-gray-200 animate-pulse mb-6"></div>

                {/* Title and Info Skeleton */}
                <div className="text-center mb-8 flex flex-col items-center">
                    <div className="h-8 bg-gray-200 rounded-lg w-48 mb-3 animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded-lg w-3/4 max-w-md mb-4 animate-pulse"></div>
                    <div className="h-5 bg-gray-100 rounded-lg w-64 animate-pulse"></div>
                </div>

                {/* Social Icons Skeleton */}
                <div className="flex justify-center gap-8 mt-6">
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                    <div className="w-10 h-10 bg-gray-200 rounded-full animate-pulse"></div>
                </div>
            </div>
        );
    }

    if (error) {
        return <div className="text-center py-10 font-medium text-gray-500">Video no disponible por el momento.</div>;
    }

    const videoId = data.id.videoId;
    const videoTitle = data.snippet.title;
    const isLive = data.isLive;

    const videoSrc = isLive
        ? `https://www.youtube.com/embed/${videoId}?autoplay=1&mute=1`
        : `https://www.youtube.com/embed/${videoId}`;

    return (
        <div className="w-full max-w-4xl mx-auto px-4 min-h-[500px]">
            {/* Video Container */}
            <div className="relative pt-[56.25%] rounded-2xl overflow-hidden shadow-2xl bg-black mb-6">
                {videoId && (
                    <iframe
                        className="absolute top-0 left-0 w-full h-full"
                        src={videoSrc}
                        title="Radio Unción Video"
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                        allowFullScreen
                    ></iframe>
                )}
            </div>

            {/* Title and Info */}
            <div className="text-center mb-8">
                <h3 className="text-2xl font-bold text-gray-800 mb-2">
                    {isLive ? "🔴 EN VIVO AHORA" : "Última Transmisión"}
                </h3>
                <p className="text-lg text-gray-700 font-medium mb-2 leading-relaxed">{videoTitle}</p>
                <p className="text-gray-500 text-sm">Sigue la Santa Misa y nuestros programas.</p>
            </div>

            {/* Social Icons */}
            <div className="flex justify-center gap-8 mt-6">
                <a href="https://www.facebook.com/search/top?q=radio%20y%20tv%20unci%C3%B3n" target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:text-blue-800 transition-transform hover:scale-110">
                    <FaFacebook size={40} />
                </a>
                <a href="https://www.tiktok.com/@radiotvuncion" target="_blank" rel="noopener noreferrer" className="text-black hover:text-gray-800 transition-transform hover:scale-110">
                    <FaTiktok size={40} />
                </a>
                <a href="https://www.youtube.com/@radiouncion" target="_blank" rel="noopener noreferrer" className="text-red-600 hover:text-red-800 transition-transform hover:scale-110">
                    <FaYoutube size={40} />
                </a>
            </div>
        </div>
    );
};

export default VideoSection;
