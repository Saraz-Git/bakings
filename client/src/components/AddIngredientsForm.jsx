import {
  Flex,
  Box,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  HStack,
  InputRightElement,
  Stack,
  Button,
  Text,
  useColorModeValue,
  Link,
} from '@chakra-ui/react'


const AddIngredientsFrom = () => {
  return (
    <Box
          border='1px'
          borderColor='gray.200'
          bg={useColorModeValue('white', 'gray.700')}
          p={8}
          my={2}>
          <Stack spacing={4}>
            <HStack >
              <Box w='full'>
                <FormControl id="material" >
                  
                  <Input placeholder='Material' type="text" />
                </FormControl>
              </Box>
              <Box>
                <FormControl id="amount" >
                  
                  <Input placeholder='Amount' type="text" />
                </FormControl>
              </Box>
            </HStack>
            
            
            <Stack spacing={10} pt={2}>
              <Button
                loadingText="Submitting"
                size="md"
                >
                + Add Ingredient
              </Button>
            </Stack>
            
          </Stack>
        </Box>
  )
}

export default AddIngredientsFrom