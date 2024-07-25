import { Container, Box, Divider, Flex, Text, Image } from "@chakra-ui/react";

const CommentList = (comments) => {
  const commentsArr = comments.comments || [];

  if (!commentsArr.length) {
    return <Box>No reviews yet</Box>;
  }
  return (
    <Box>
      {commentsArr.length &&
        commentsArr.map((comment) => (
          <Box key={comment._id}>
            <Flex my={3} justifyContent={"space-between"}>
              <Box textAlign={"left"} fontSize={"sm"}>
                <Text py={3}>{comment.commentText}</Text>

                {comment.rating && <Text>Rating: {comment.rating}</Text>}

                {!comment.rating && <br />}
                <Text>
                  Commented by {comment.commentAuthor} on {comment.createdAt}
                </Text>
              </Box>
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
            </Flex>
            <Divider />
          </Box>
        ))}
    </Box>
  );
};

export default CommentList;
