import React, { useState } from "react";
import { Box, Button, Heading, VStack, HStack, IconButton, useDisclosure, Drawer, DrawerBody, DrawerHeader, DrawerOverlay, DrawerContent, DrawerCloseButton, Input, Textarea, useToast, Flex, Spacer, Text, Image } from "@chakra-ui/react";
import { FaPlus } from "react-icons/fa";

const Index = () => {
  const [widgets, setWidgets] = useState([
    { id: 1, title: "Welcome", content: "Welcome to our content site!" },
    { id: 2, title: "About", content: "Learn more about us." },
  ]);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const toast = useToast();

  const addWidget = () => {
    if (title && content) {
      const newWidget = {
        id: widgets.length + 1,
        title,
        content,
      };
      setWidgets([...widgets, newWidget]);
      setTitle("");
      setContent("");
      onClose();
      toast({
        title: "Widget added.",
        status: "success",
        duration: 2000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>
      <Flex align="center" p={4} bg="gray.100">
        <Heading size="xl">My Content Site</Heading>
        <Spacer />
        <IconButton icon={<FaPlus />} aria-label="Add Widget" onClick={onOpen} colorScheme="blue" />
      </Flex>

      <VStack spacing={4} align="stretch" p={4}>
        {widgets.map((widget) => (
          <Box key={widget.id} p={4} shadow="md" borderWidth="1px">
            <Heading size="lg">{widget.title}</Heading>
            <Text mt={2}>{widget.content}</Text>
          </Box>
        ))}
      </VStack>

      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerCloseButton />
            <DrawerHeader>Add Widget</DrawerHeader>
            <DrawerBody>
              <VStack spacing={4} align="stretch">
                <Input placeholder="Title" value={title} onChange={(e) => setTitle(e.target.value)} />
                <Textarea placeholder="Content" value={content} onChange={(e) => setContent(e.target.value)} />
                <Button onClick={addWidget} colorScheme="blue">
                  Add
                </Button>
              </VStack>
            </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
      </Drawer>
    </Box>
  );
};

export default Index;
