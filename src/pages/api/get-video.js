// src/pages/api/get-video.js
import axios from 'axios';

export async function GET() {
    const API_KEY = import.meta.env.YOUTUBE_API_KEY;
    const CHANNEL_ID = import.meta.env.YOUTUBE_CHANNEL_ID;

    try {
        // Intentamos buscar el en vivo
        const liveRes = await axios.get(`https://www.googleapis.com/youtube/v3/search?part=snippet&channelId=${CHANNEL_ID}&type=video&eventType=live&key=${API_KEY}`);

        if (liveRes.data.items.length > 0) {
            return new Response(JSON.stringify({ ...liveRes.data.items[0], isLive: true }));
        }

        // Si no hay en vivo, buscamos el último video
        const latestRes = await axios.get(`https://www.googleapis.com/youtube/v3/search?key=${API_KEY}&channelId=${CHANNEL_ID}&part=snippet&type=video&order=date&maxResults=1`);

        return new Response(JSON.stringify({ ...latestRes.data.items[0], isLive: false }));
    } catch (e) {
        return new Response(JSON.stringify({ error: 'Error fetching YouTube' }), { status: 500 });
    }
}