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
  Table,
  TableContainer,
  Tbody,
  Tr,
  Td,
} from "@chakra-ui/react";
import { useRef, useState, useEffect } from "react";

const AddIngredientsFrom = ({ onData }) => {
  const [formKey, setFormKey] = useState(Date.now());

  const [ingredients, setIngredients] = useState([]);
  const [formState, setFormState] = useState({ material: "", amount: "" });

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };
  const handleAdd = (e) => {
    e.preventDefault();
    ingredients.push(formState);
    setIngredients(ingredients);
    setFormKey(Date.now());
    setFormState({ material: "", amount: "" });
  };

  onData(ingredients);

  return (
    <>
      <TableContainer>
        <Table size="sm" variant="simple">
          <Tbody>
            {ingredients &&
              ingredients.map((ingredient) => (
                <Tr key={ingredients.indexOf(ingredient)}>
                  <Td>{ingredient.material}</Td>
                  <Td>{ingredient.amount}</Td>
                </Tr>
              ))}
          </Tbody>
        </Table>
      </TableContainer>
      <Box
        border="1px"
        borderColor="gray.200"
        bg={useColorModeValue("white", "gray.700")}
        p={8}
        my={2}
      >
        <Stack spacing={4}>
          <HStack>
            <Box w="full">
              <FormControl id="material">
                <Input
                  placeholder="Material"
                  type="text"
                  name="material"
                  value={formState.material}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
            <Box>
              <FormControl id="amount">
                <Input
                  placeholder="Amount"
                  type="text"
                  name="amount"
                  value={formState.amount}
                  onChange={handleChange}
                />
              </FormControl>
            </Box>
          </HStack>

          <Stack spacing={10} pt={2}>
            <Button onClick={handleAdd} loadingText="Submitting" size="md">
              + Add Ingredient
            </Button>
          </Stack>
        </Stack>
      </Box>
    </>
  );
};

export default AddIngredientsFrom;
