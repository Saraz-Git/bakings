import { Button, Heading, VStack, Box, Center } from "@chakra-ui/react";
import { TbFaceIdError } from "react-icons/tb";
import { Link as RouterLink } from "react-router-dom";
import { FaCamera } from "react-icons/fa";

const ErrorPage = () => {
  return (
    <VStack mt={12} py={12}>
      <TbFaceIdError size={48} />
      <Heading py={6} fontWeight="normal">
        Page not found
      </Heading>
      <Button
        as={RouterLink}
        to={"/"}
        bg={"orange.400"}
        color={"white"}
        _hover={{
          bg: "orange.500",
        }}
        mt={12}
      >
        Back to home
      </Button>
    </VStack>
  );
};

export default ErrorPage;
