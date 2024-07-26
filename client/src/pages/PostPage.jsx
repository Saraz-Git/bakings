import {
  Flex,
  Box,
  AspectRatio,
  Container,
  Image,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Tr,
  Spinner,
  Button,
  Tooltip,
  Link,
  Center,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  Accordion,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "@chakra-ui/react";
import { BsStar, BsChatText } from "react-icons/bs";
import { SlLike } from "react-icons/sl";
import { RiThumbUpLine } from "react-icons/ri";
import { SlPrinter } from "react-icons/sl";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.bubble.css";
import generatePDF, { Resolution, Margin } from "react-to-pdf";
import { useParams } from "react-router-dom";
import { Link as RouterLink } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_POST, QUERY_USER } from "../utils/queries";
import {
  ADD_COLLECTION,
  REMOVE_COLLECTION,
  ADD_LIKE,
  REMOVE_LIKE,
} from "../utils/mutations";
import CommentList from "../components/CommentList";
import CommentForm from "../components/CommentForm";
import Auth from "../utils/auth";
import { useEffect, useState } from "react";

const PostPage = () => {
  const [showModal, setShowModal] = useState(false);
  const { postId } = useParams();

  const { loading, error, data } = useQuery(QUERY_SINGLE_POST, {
    // pass URL parameter
    variables: { postId: postId },
  });
  const post = data?.post || {};

  const [addCollection, { error: error3 }] = useMutation(ADD_COLLECTION, {
    refetchQueries: [QUERY_SINGLE_POST, QUERY_USER],
  });

  const [removeCollection, { error: error4 }] = useMutation(REMOVE_COLLECTION, {
    refetchQueries: [QUERY_SINGLE_POST],
  });

  const [addLike, { error: error5 }] = useMutation(ADD_LIKE, {
    refetchQueries: [QUERY_SINGLE_POST, QUERY_USER],
  });

  const [removeLike, { error: error6 }] = useMutation(REMOVE_LIKE, {
    refetchQueries: [QUERY_SINGLE_POST],
  });

  const options = {
    // default is `save`
    method: "open",
    // default is Resolution.MEDIUM = 3, which should be enough, higher values
    // increases the image quality but also the size of the PDF, so be careful
    // using values higher than 10 when having multiple pages generated, it
    // might cause the page to crash or hang.
    resolution: Resolution.HIGH,
    page: {
      margin: Margin.MEDIUM,
      // default is 'A4'
      format: "A5",
      orientation: "portrait",
    },
    canvas: {
      mimeType: "image/jpeg",
      qualityRatio: 1,
    },
  };
  const getTargetElement = () => document.getElementById("content-id");

  if (loading) {
    return (
      <Spinner
        thickness="4px"
        speed="0.65s"
        emptyColor="gray.200"
        color="orange.500"
        size="xl"
        m={12}
      />
    );
  }

  if (error || error3 || error4) {
    return <Center pt={6}>post not found</Center>;
  }

  const handleCollect = async (event) => {
    event.preventDefault();
    const collectors = post.collectedBy;
    const idArr = collectors.map((collector) => collector._id);
    let isCollected = idArr.includes(Auth.getProfile()?.data._id);
    if (!isCollected) {
      try {
        await addCollection({
          variables: { postId: postId },
        });
      } catch (e) {
        console.error(e);
      }
      toast("Successfully collected the post!");
    } else {
      try {
        await removeCollection({
          variables: { postId: postId },
        });
      } catch (e) {
        console.error(e);
      }
      toast("un-collected the post!");
    }
  };

  const handleLikeUnlike = async (event) => {
    event.preventDefault();
    const likers = post.likedBy;
    const idArr = likers.map((liker) => liker._id);
    let isLiked = idArr.includes(Auth.getProfile()?.data._id);
    if (!isLiked) {
      try {
        await addLike({
          variables: { postId: postId },
        });
      } catch (e) {
        console.error(e);
      }
      toast("Successfully liked the post!");
    } else {
      try {
        await removeLike({
          variables: { postId: postId },
        });
      } catch (e) {
        console.error(e);
      }
      toast("unliked the post!");
    }
  };

  return (
    <Container py={6}>
      <Box id="content-id">
        <AspectRatio ratio={3 / 2}>
          <Image
            w={"full"}
            objectFit="cover"
            src={post.coverUrl}
            fallbackSrc="https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60"
            alt={post.title}
          />
        </AspectRatio>
        <Text py={4} fontSize="1.8em" fontWeight={"bold"} textAlign={"center"}>
          {post.title}
        </Text>

        <Flex justifyContent={"space-between"}>
          <Flex
            bg={useColorModeValue("red.100", "gray.800")}
            borderRadius={"md"}
            p={2}
          >
            <Text fontSize={"sm"}>
              4.8 120 ratings {post.likedBy.length} likes{" "}
              {post.collectedBy.length} collects
            </Text>
          </Flex>
          <Box
            bg={useColorModeValue("red.100", "gray.800")}
            borderRadius={"md"}
            p={2}
            textAlign={"center"}
          >
            <Text
              as={RouterLink}
              to={`/profiles/${post.postAuthor._id}`}
              fontSize={"sm"}
            >
              Author-{post.postAuthor.username}
            </Text>
          </Box>
        </Flex>

        {post.ingredients.length > 0 && (
          <Text mt={8} fontSize="1.2em" fontWeight={"bold"}>
            Ingredients
          </Text>
        )}
        <TableContainer>
          <Table size="sm" variant="simple">
            <Tbody>
              {post.ingredients.length > 0 &&
                post.ingredients.map((ingredient) => (
                  <Tr key={ingredient._id}>
                    <Td>{ingredient.material}</Td>
                    <Td>{ingredient.amount}</Td>
                  </Tr>
                ))}
            </Tbody>
          </Table>
        </TableContainer>

        {post.detail && (
          <Text mt={8} fontSize="1.2em" fontWeight={"bold"}>
            Instructions
          </Text>
        )}
        {post.detail && (
          <ReactQuill value={post.detail} readOnly={true} theme={"bubble"} />
        )}
      </Box>

      <ToastContainer
        position="top-center"
        autoClose={3000}
        closeOnClick
        hideProgressBar={true}
        theme="colored"
        type="error"
      />

      {Auth.loggedIn() &&
        post.postAuthor.username !== Auth.getProfile().data.username && (
          <Box p={0} m={0}>
            <Center>
              <Flex my={12} gap={"8"}>
                {Auth.loggedIn() &&
                  post.postAuthor.username !==
                    Auth.getProfile().data.username && (
                    <>
                      <Tooltip
                        hasArrow
                        placement="top"
                        label="Collect"
                        bg="gray.200"
                        color="gray.600"
                      >
                        <Link>
                          <BsStar
                            onClick={handleCollect}
                            className="zoom"
                            size={24}
                          />
                        </Link>
                      </Tooltip>

                      <Tooltip
                        hasArrow
                        placement="top"
                        label="Like"
                        bg="gray.200"
                        color="gray.600"
                      >
                        <Link>
                          <SlLike
                            onClick={handleLikeUnlike}
                            className="zoom"
                            size={22}
                          />{" "}
                        </Link>
                      </Tooltip>

                      <Tooltip
                        hasArrow
                        placement="top"
                        label="Feedback"
                        bg="gray.200"
                        color="gray.600"
                      >
                        <Link>
                          <BsChatText
                            onClick={() => {
                              setShowModal(!showModal);
                            }}
                            className="zoom"
                            size={21}
                          />{" "}
                        </Link>
                      </Tooltip>

                      <Tooltip
                        hasArrow
                        placement="top"
                        label="Print"
                        bg="gray.200"
                        color="gray.600"
                      >
                        <Box>
                          <SlPrinter
                            onClick={() =>
                              generatePDF(getTargetElement, options)
                            }
                            className="zoom"
                            size={20}
                          />{" "}
                        </Box>
                      </Tooltip>
                    </>
                  )}
              </Flex>
            </Center>

            {showModal && <CommentForm postId={post._id} />}
          </Box>
        )}

      <Accordion pt={12} allowToggle>
        <AccordionItem>
          <h2>
            <AccordionButton px={0}>
              <Box
                as="span"
                flex="1"
                textAlign="left"
                fontSize="1.2em"
                fontWeight={"bold"}
              >
                Reviews
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel p={0}>
            <CommentList comments={post.comments} />
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </Container>
  );
};

export default PostPage;
