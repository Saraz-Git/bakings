import { Box, Stack, Button, Flex, Textarea, Image} from "@chakra-ui/react"


const AddStepForm = () => {
  return (
    <Box border='1px' borderColor='gray.200' p={2}>
      <Flex direction={{ base: 'column', md: 'row' }}>
          <Image className='stepImg'src='' fallbackSrc='https://via.placeholder.com/150' alt='Indication Image' />    
        <Textarea ml={2}p={2}></Textarea>
      </Flex >
      <Stack spacing={10} pt={2}>
        <Button loadingText="Submitting" size="md">+ Add Step</Button>
      </Stack>

    </Box>
  )
}

export default AddStepForm