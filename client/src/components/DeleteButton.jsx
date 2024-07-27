import {
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverBody,
  PopoverArrow,
  IconButton,
  Button,
  Stack,
  Flex,
} from "@chakra-ui/react";

import { BsThreeDotsVertical, BsChatSquareQuote } from "react-icons/bs";
import {
  RiShutDownLine,
  RiDeleteBinLine,
  RiRestartLine,
  RiFileShredLine,
} from "react-icons/ri";
import Auth from "../utils/auth";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_POST, QUERY_ME, QUERY_USER } from "../utils/queries";
import { REMOVE_COMMENT, DELETE_POST } from "../utils/mutations";

const DeleteButton = ({ dataIndex, target }) => {
  const { postId } = useParams();
  const [removeComment, { error }] = useMutation(REMOVE_COMMENT);
  const [deletePost, { error: error2 }] = useMutation(DELETE_POST, {
    refetchQueries: [QUERY_ME],
  });

  const handleDelete = async (e) => {
    console.log(e.target);
    console.log(dataIndex);
    console.log(target);

    if (target == "comment") {
      const commentId = dataIndex;
      try {
        await removeComment({
          variables: { postId: postId, commentId: commentId },
        });
      } catch (e) {
        console.error(e);
      }
    }

    if (target == "post") {
      console.log("delete post function to be developped");
      // const postToDeleteId = dataIndex;
      try {
        await deletePost({
          variables: { postId: postId },
        });
        window.location.replace("/me");
      } catch (e) {
        console.error(e);
      }
    }
  };
  return (
    <Flex justifyContent="center" align="center" mt={2}>
      <Popover placement="bottom" isLazy>
        <PopoverTrigger>
          <IconButton
            aria-label="More server options"
            icon={<BsThreeDotsVertical />}
            variant="ghost"
            w="fit-content"
          />
        </PopoverTrigger>
        <PopoverContent w="fit-content" _focus={{ boxShadow: "none" }}>
          <PopoverArrow />
          <PopoverBody>
            <Stack>
              <Button
                w="100px"
                variant="ghost"
                rightIcon={<BsChatSquareQuote />}
                justifyContent="space-between"
                fontWeight="normal"
                fontSize="sm"
              >
                Edit
              </Button>

              <Button
                onClick={handleDelete}
                w="100px"
                variant="ghost"
                rightIcon={<RiDeleteBinLine />}
                justifyContent="space-between"
                fontWeight="normal"
                colorScheme="red"
                fontSize="sm"
              >
                Delete
              </Button>
            </Stack>
          </PopoverBody>
        </PopoverContent>
      </Popover>
    </Flex>
  );
};

export default DeleteButton;
