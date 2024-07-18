import { Container, AspectRatio, Image, Flex,FormControl, FormLabel, Textarea ,NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  Box,
  Button} from "@chakra-ui/react"


const CommentForm = () => {
  return (
    <Container p='0px' w='full' >
      <Flex  border='1px' borderColor='gray.200'>
        
          

          <Box w='full' p={2}>
            <FormControl>
               <FormLabel size='sm' fontWeight={'normal'}>
                Comment Text
              </FormLabel>
              <Textarea></Textarea>
           </FormControl>

           <Flex>
            <FormControl>
              <FormLabel size='sm' fontWeight={'normal'}>
               Rating
              </FormLabel>
              <NumberInput size='sm' maxW={20} defaultValue={9} min={1} max={10} step={0.1} >
                <NumberInputField />
                <NumberInputStepper>
                  <NumberIncrementStepper />
                  <NumberDecrementStepper />
                </NumberInputStepper>
              </NumberInput>
              </FormControl>

              <Button mt={8} size='sm'>Comment</Button>

           </Flex>

       

          </Box>

          <Image p={2} src='' fallbackSrc='https://via.placeholder.com/150' alt='commentPicture' objectFit='cover' />

          
        

      </Flex>
      
      
    </Container>
  )
}

export default CommentForm