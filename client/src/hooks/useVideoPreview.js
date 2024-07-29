import { useState } from 'react';

const useVideoPreview = () => {
    const [videoSrc, setVideoSrc] = useState(null);

    const handleVideoChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            const videoUrl = URL.createObjectURL(file);
            setVideoSrc(videoUrl);
        }
    };
    return { handleVideoChange, videoSrc, setVideoSrc };
}



export default useVideoPreview