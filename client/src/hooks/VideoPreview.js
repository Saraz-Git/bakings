import React, { useState } from 'react';

const videoPreview = () => {
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



export default videoPreview