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
  Text,
} from '@chakra-ui/react';
import { Input, message } from 'antd';
import React, { useState, useEffect, ChangeEvent } from 'react';

interface Category {
  name: string;
  description: string;
  image?: string;
}

interface EditCategoryModalProps {
  isOpen: boolean;
  onClose: () => void;
  category: Category | null;
}

const EditCategoryModal: React.FC<EditCategoryModalProps> = ({
  isOpen,
  onClose,
  category,
}) => {
  const [editCategory, setEditCategory] = useState({
    name: '',
    description: '',
    image: null as File | null,
  });
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (category) {
      setEditCategory({
        name: category.name,
        description: category.description,
        image: null,
      });
      setPreviewImage(category.image || 'https://via.placeholder.com/150');
    }
  }, [category]);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        message.warning('Please select an image less than 5MB.');
      } else {
        setEditCategory({ ...editCategory, image: file });
        setPreviewImage(URL.createObjectURL(file)); // Update the image preview
      }
    }
  };

  const handleSubmit = async () => {
    if (!editCategory.name) {
      message.warning('Please enter a category name.');
      return;
    }
    if (!editCategory.description) {
      message.warning('Please enter a description.');
      return;
    }
    setLoading(true);

    try {
      message.success('Category updated successfully');
      onClose();
    } catch (error: any) {
      message.error(
        error.response?.data?.message || 'Failed to update category',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Category</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Category Name */}
          <Input
            allowClear
            placeholder="Name"
            value={editCategory.name}
            onChange={(e) =>
              setEditCategory({ ...editCategory, name: e.target.value })
            }
            style={{ height: '40px', marginBottom: 10 }}
          />
          {/* Category Description */}
          <Input.TextArea
            allowClear
            placeholder="Description"
            value={editCategory.description}
            onChange={(e) =>
              setEditCategory({
                ...editCategory,
                description: e.target.value,
              })
            }
            rows={4}
          />
          {/* Display Current or Preview Image */}
          <Text mt={4}>Current Image:</Text>
          <Image
            src={previewImage || 'https://via.placeholder.com/150'}
            alt="Category"
            boxSize="150px"
            objectFit="cover"
            mt={4}
            mb={8}
            borderRadius="8px"
          />

          {/* File Upload */}
          <Input type="file" accept="image/*" onChange={handleFileChange} />
        </ModalBody>
        <ModalFooter>
          <Button
            isLoading={loading}
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
          >
            Save
          </Button>
          <Button variant="ghost" onClick={onClose}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditCategoryModal;
