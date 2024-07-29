import { Button, Container, Input } from "@chakra-ui/react";
import "video-react/dist/video-react.css";
import { useRef, useState, useEffect } from "react";

import { Player } from "video-react";
import useVideoPreview from "../hooks/useVideoPreview";

const VideoPage = () => {
  const fileRef = useRef(null);
  const { handleVideoChange, videoSrc } = useVideoPreview();

  return (
    <Container py={6}>
      <Button onClick={() => fileRef.current.click()}>Upload Video</Button>
      <Input type="file" hidden ref={fileRef} onChange={handleVideoChange} />
      <Player
        playsInline
        src={videoSrc}
        fluid={false}
        width={480}
        height={272}
      />
    </Container>
  );
};

export default VideoPage;
