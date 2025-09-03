// src/pages/NotFound.jsx
import { Box, Heading, Text, Button, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

export default function NotFound() {
  const navigate = useNavigate();

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg="gray.50"
      p={4}
    >
      <VStack spacing={6}>
        <Heading fontSize="6xl" color="red.500">
          404
        </Heading>
        <Text fontSize="2xl" color="gray.700" textAlign="center">
          Oops! The page you’re looking for doesn’t exist.
        </Text>
        <Button colorScheme="teal" size="lg" onClick={() => navigate("/")}>
          Go Back Home
        </Button>
      </VStack>
    </Box>
  );
}
