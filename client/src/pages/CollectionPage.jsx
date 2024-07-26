import PostList from "../components/PostList";
import { useQuery } from "@apollo/client";
import { QUERY_ME } from "../utils/queries";
import { Navigate, useParams } from "react-router-dom";
import Auth from "../utils/auth";
import { Container, Spinner, Text } from "@chakra-ui/react";

const CollectionPage = () => {
  if (!Auth.loggedIn()) {
    return <Navigate to="/" />;
  }

  const { data, error, loading } = useQuery(QUERY_ME);
  console.log(data);
  const me = data?.me || {};

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

  return (
    <Container py={6}>
      <Text fontSize={"lg"}>Your collection: </Text>

      {me && <PostList posts={me.collections} />}
    </Container>
  );
};

export default CollectionPage;
