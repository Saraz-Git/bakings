import {
  Container,
  Input,
  AspectRatio,
  Image,
  Flex,
  FormControl,
  FormLabel,
  Textarea,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Button,
} from "@chakra-ui/react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {
  useLocation,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import { useRef, useState, useEffect } from "react";
import { useMutation, useQuery } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../utils/queries";

import usePreviewImg from "../hooks/usePreviewImg";
import { ADD_COMMENT } from "../utils/mutations";

import Auth from "../utils/auth";

const CommentForm = (postId) => {
  const [commentText, setCommentText] = useState("");
  const [rating, setRating] = useState(0);
  const fileRef = useRef(null);
  const { handleImageChange, imgUrl } = usePreviewImg();
  const [addComment, { error }] = useMutation(ADD_COMMENT, {
    refetchQueries: [QUERY_SINGLE_POST],
  });

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    if (rating > 0) {
      try {
        const { data } = await addComment({
          variables: {
            postId: postId.postId,
            commentImg: imgUrl,
            commentText: commentText,
            rating: rating,
          },
        });
      } catch (err) {
        console.error(err);
      }
    } else {
      try {
        const { data } = await addComment({
          variables: {
            postId: postId.postId,
            commentImg: imgUrl,
            commentText: commentText,
          },
        });
      } catch (err) {
        console.error(err);
      }
    }

    setRating(0);
    setCommentText("");

    toast("Comment sent!");
  };

  return (
    <Container p="0px" w="100%">
      <Flex border="1px" borderColor="gray.200">
        <Box w="full" p={2}>
          <FormControl>
            <FormLabel size="sm" fontWeight={"normal"}>
              Comment Text
            </FormLabel>
            <Textarea
              name="comment"
              onChange={(e) => setCommentText(e.target.value)}
            ></Textarea>
          </FormControl>

          <Flex>
            <FormControl>
              <FormLabel size="sm" fontWeight={"normal"}>
                Rating
              </FormLabel>
              <NumberInput
                name="rating"
                onChange={(e) => {
                  setRating(parseFloat(e));
                }}
                size="sm"
                maxW={20}
                defaultValue={9}
                min={1}
                max={10}
                step={0.1}
              >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
            </FormControl>

            <Button mt={8} size="sm" type="submit" onClick={handleFormSubmit}>
              Comment
            </Button>
          </Flex>
        </Box>

        <Image
          p={2}
          name="commentImg"
          onClick={() => fileRef.current.click()}
          src={imgUrl || ""}
          fallbackSrc="https://res.cloudinary.com/dkeswd23y/image/upload/v1722083874/mjmxbi8ekeyklqfolaxl.jpg"
          alt="commentPicture"
          className="stepImg"
        />
        <Input type="file" hidden ref={fileRef} onChange={handleImageChange} />
      </Flex>
    </Container>
  );
};

export default CommentForm;
