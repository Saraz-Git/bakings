import { Container , VStack} from '@chakra-ui/react';
import PostCard from '../components/PostCard';

const ListPage = () => {
  return (
    <Container py={12}>
      <VStack spacing='24px'>
       <PostCard title='Coffee Latte'imgUrl='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'/>
       <PostCard title='Coffee Latte'imgUrl='https://images.unsplash.com/photo-1667489022797-ab608913feeb?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxlZGl0b3JpYWwtZmVlZHw5fHx8ZW58MHx8fHw%3D&auto=format&fit=crop&w=800&q=60'/>
      </VStack>
    </Container>
  )
}

export default ListPage