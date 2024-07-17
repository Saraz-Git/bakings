import { Container , VStack} from '@chakra-ui/react';
import PostCard from '../components/PostCard';
import { Link as RouterLink } from "react-router-dom";
import PostList from "../components/PostList";
import { useParams } from 'react-router-dom';

import { useQuery } from '@apollo/client';
import { QUERY_TAG } from '../utils/queries';

const ListPage = () => {
  const {loading, data}= useQuery(QUERY_TAG, {variables: { tagId: useParams().tagId }});
  const tag = data?.tag||{};
  console.log(tag.posts);





  return (
    <Container py={12}>
      
      {tag.posts && <PostList posts={tag.posts}/>}


    </Container>
  )
}

export default ListPage