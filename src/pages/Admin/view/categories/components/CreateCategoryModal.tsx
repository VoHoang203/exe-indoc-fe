import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Image,
} from "@chakra-ui/react";
import React, { useState, ChangeEvent } from "react";
import { Input, message } from "antd";

interface CreateCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NewCategory {
  name: string;
  description: string;
  image: File | null;
  imagePreview: string | null;
}

export default function CreateCategoryModal({
  isOpen,
  onClose,
}: CreateCategoryModalProps) {
  const [newCategory, setNewCategory] = useState<NewCategory>({
    name: "",
    description: "",
    image: null,
    imagePreview: null,
  });

  const [loading, setLoading] = useState(false);

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
  const PLACEHOLDER_IMAGE = "https://via.placeholder.com/150";

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        message.warning("Please select an image less than 5MB.");
        return;
      }

      setNewCategory({
        ...newCategory,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    if (!newCategory.name) {
      message.warning("Please enter a category name.");
      setLoading(false);
      return;
    }

    if (!newCategory.description) {
      message.warning("Please enter a description.");
      setLoading(false);
      return;
    }

    if (!newCategory.image) {
      message.warning("Please upload an image.");
      setLoading(false);
      return;
    }

    try {
      message.success("Category created successfully");
      onClose();
      setNewCategory({
        name: "",
        description: "",
        image: null,
        imagePreview: null,
      });
    } catch (error) {
      message.error(
        (error as Error).message || "Failed to create category"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Name Input */}
          <Input
            allowClear
            placeholder="Name"
            value={newCategory.name}
            onChange={(e) =>
              setNewCategory({ ...newCategory, name: e.target.value })
            }
            style={{ height: "40px", marginBottom: 10 }}
          />

          <Input.TextArea
            allowClear
            placeholder="Description"
            value={newCategory.description}
            onChange={(e) =>
              setNewCategory({ ...newCategory, description: e.target.value })
            }
            rows={4}
          />
          {/* Image Preview */}
          <Image
            src={newCategory.imagePreview || PLACEHOLDER_IMAGE}
            alt="Category"
            boxSize="150px"
            objectFit="cover"
            mt={4}
            mb={8}
            borderRadius="8px"
          />
          {/* Image File Input */}
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </ModalBody>
        <ModalFooter>
          {/* Save Button */}
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isLoading={loading}
          >
            Save
          </Button>
          {/* Cancel Button */}
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
