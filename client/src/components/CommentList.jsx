import {
  Container,
  Box,
  Divider,
  Flex,
  Text,
  Image,
  CloseButton,
} from "@chakra-ui/react";
import Auth from "../utils/auth";
import { useParams } from "react-router-dom";
import { useQuery, useMutation } from "@apollo/client";
import { QUERY_SINGLE_POST } from "../utils/queries";
import { REMOVE_COMMENT } from "../utils/mutations";
import DeleteButton from "./DeleteButton";

const CommentList = (comments) => {
  const commentsArr = comments.comments || [];
  if (!commentsArr.length) {
    return <Box>No reviews yet</Box>;
  }

  const { postId } = useParams();

  const [removeComment, { error }] = useMutation(REMOVE_COMMENT);

  // const deleteComment = async (e) => {
  //   const commentId = e.target.parentElement.getAttribute("data-index");
  //   try {
  //     await removeComment({
  //       variables: { postId: postId, commentId: commentId },
  //     });
  //   } catch (e) {
  //     console.error(e);
  //   }
  // };
  return (
    <Box>
      {Auth.loggedIn() && (
        <Box>
          {commentsArr.length &&
            commentsArr.map((comment) => (
              <Box px={4} key={comment._id}>
                <Flex my={3} justifyContent={"space-between"}>
                  <Box textAlign={"left"} fontSize={"sm"}>
                    <Text py={3}>{comment.commentText}</Text>

                    {comment.rating && <Text>Rating: {comment.rating}</Text>}

                    {!comment.rating && <br />}
                    <Text>
                      Commented by {comment.commentAuthor} on{" "}
                      {comment.createdAt}
                    </Text>
                  </Box>
                  <Flex>
                    {comment.commentImg && (
                      <Image
                        className="thumbnail"
                        p={2}
                        src={comment.commentImg}
                        fallbackSrc="https://via.placeholder.com/150"
                        alt="commentPicture"
                        objectFit="cover"
                      />
                    )}
                    {comment.commentAuthor ==
                      Auth.getProfile().data.username && (
                      // <CloseButton
                      //   colorScheme="pink"
                      //   size="sm"
                      //   mx={0}
                      //   data-index={comment._id}
                      //   onClick={deleteComment}
                      // />
                      <DeleteButton
                        dataIndex={comment._id}
                        target={"comment"}
                      />
                    )}
                  </Flex>
                </Flex>
                <Divider />
              </Box>
            ))}
        </Box>
      )}
    </Box>
  );
};

export default CommentList;
