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
} from '@chakra-ui/react';
import React, { useState } from 'react';
import { message, Input, Select } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

// Define types for user and props
interface CreateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
}

interface NewUser {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  password: string;
  confirmPassword: string;
  address: string;
  role: string;
  avatar: File | null;
  avatarPreview: string | null;
}

export default function CreateUserModal({
  isOpen,
  onClose,
}: CreateUserModalProps) {
  const [newUser, setNewUser] = useState<NewUser>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
    role: '',
    avatar: null,
    avatarPreview: null,
  });

  const [loading, setLoading] = useState(false);

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
  const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/150';

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        message.warning('Please select an image less than 5MB.');
        return;
      }

      setNewUser({
        ...newUser,
        avatar: file,
        avatarPreview: URL.createObjectURL(file),
      });
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Validation logic
    if (!newUser.firstName || !newUser.lastName) {
      message.warning('Please enter both first name and last name.');
      setLoading(false);
      return;
    }

    if (!newUser.email) {
      message.warning('Please enter an email.');
      setLoading(false);
      return;
    }

    if (!newUser.phone) {
      message.warning('Please enter a phone number.');
      setLoading(false);
      return;
    }

    if (!newUser.password) {
      message.warning('Please enter a password.');
      setLoading(false);
      return;
    }

    if (newUser.password !== newUser.confirmPassword) {
      message.warning('Passwords do not match.');
      setLoading(false);
      return;
    }

    try {
      // Add your logic to create the user, e.g., make an API request
      message.success('User created successfully');
      onClose();
      setNewUser({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        confirmPassword: '',
        address: '',
        role: 'user',
        avatar: null,
        avatarPreview: null,
      });
    } catch (error) {
      message.error(
        (error as any)?.response?.data?.message || 'Failed to create user',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <div style={{ display: 'flex', gap: '16px' }}>
            <Input
              placeholder="First Name"
              value={newUser.firstName}
              onChange={(e) =>
                setNewUser({ ...newUser, firstName: e.target.value })
              }
              style={{ marginBottom: '16px', height: '40px', flex: 1 }}
              allowClear
            />
            <Input
              placeholder="Last Name"
              value={newUser.lastName}
              onChange={(e) =>
                setNewUser({ ...newUser, lastName: e.target.value })
              }
              style={{ marginBottom: '16px', height: '40px', flex: 1 }}
              allowClear
            />
          </div>

          {/* Email Input */}
          <Input
            placeholder="Email"
            value={newUser.email}
            onChange={(e) => setNewUser({ ...newUser, email: e.target.value })}
            style={{ marginBottom: '16px', height: '40px' }}
            allowClear
          />
          {/* Phone Input */}
          <Input
            placeholder="Phone"
            value={newUser.phone}
            onChange={(e) => setNewUser({ ...newUser, phone: e.target.value })}
            style={{ marginBottom: '16px', height: '40px' }}
            allowClear
          />
          {/* Password Input */}
          <Input.Password
            placeholder="Password"
            value={newUser.password}
            onChange={(e) =>
              setNewUser({ ...newUser, password: e.target.value })
            }
            style={{ marginBottom: '16px', height: '40px' }}
            allowClear
          />
          {/* Confirm Password Input */}
          <Input.Password
            placeholder="Confirm Password"
            value={newUser.confirmPassword}
            onChange={(e) =>
              setNewUser({ ...newUser, confirmPassword: e.target.value })
            }
            style={{ marginBottom: '16px', height: '40px' }}
            allowClear
          />
          {/* Address Input as TextArea */}
          <TextArea
            placeholder="Address"
            value={newUser.address}
            onChange={(e) =>
              setNewUser({ ...newUser, address: e.target.value })
            }
            style={{ marginBottom: '16px', height: '100px' }}
            allowClear
          />
          {/* Role Select */}
          <Select
            placeholder="Select Role"
            value={newUser.role}
            onChange={(value) => setNewUser({ ...newUser, role: value })}
            style={{ marginBottom: '16px', width: '100%', height: '40px' }}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          >
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>

          {/* Image Preview */}
          <Image
            src={newUser.avatarPreview || PLACEHOLDER_IMAGE}
            alt="User Avatar"
            boxSize="150px"
            objectFit="cover"
            mt={4}
            mb={8}
            borderRadius="8px"
          />
          {/* Avatar File Input */}
          <Input
            type="file"
            accept="image/*"
            onChange={handleFileChange}
          />
        </ModalBody>
        <ModalFooter>
          {/* Save Button with loading state */}
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
