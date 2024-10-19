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
import React, { useState, useEffect } from 'react';
import { message, Input, Select } from 'antd';

const { Option } = Select;
const { TextArea } = Input;

// Define types for props and user data
interface UserData {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  avatar?: string;
}

interface UpdateUserModalProps {
  isOpen: boolean;
  onClose: () => void;
  userData: UserData | null;
}

interface UpdatedUser extends Omit<UserData, 'avatar'> {
  avatar: File | null;
  avatarPreview: string | null;
}

export default function UpdateUserModal({
  isOpen,
  onClose,
  userData,
}: UpdateUserModalProps) {
  const [updatedUser, setUpdatedUser] = useState<UpdatedUser>({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
    role: 'user',
    avatar: null,
    avatarPreview: null,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
  const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/150';

  useEffect(() => {
    if (userData) {
      setUpdatedUser({
        firstName: userData.firstName || '',
        lastName: userData.lastName || '',
        email: userData.email,
        phone: userData.phone,
        address: userData.address,
        role: userData.role,
        avatarPreview: userData.avatar || PLACEHOLDER_IMAGE,
        avatar: null,
      });
    }
  }, [userData]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];

    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        message.warning('Please select an image less than 5MB.');
        return;
      }

      setUpdatedUser((prev) => ({
        ...prev,
        avatar: file,
        avatarPreview: URL.createObjectURL(file),
      }));
    }
  };

  const handleSubmit = async () => {
    setLoading(true);

    // Validation checks
    if (!updatedUser.firstName || !updatedUser.lastName) {
      message.warning('Please enter both first name and last name.');
      setLoading(false);
      return;
    }

    if (!updatedUser.email) {
      message.warning('Please enter an email.');
      setLoading(false);
      return;
    }

    if (!updatedUser.phone) {
      message.warning('Please enter a phone number.');
      setLoading(false);
      return;
    }

    try {
      // Add logic for updating the user
      message.success('User updated successfully');
      onClose();
    } catch (error) {
      message.error(
        (error as any)?.response?.data?.message || 'Failed to update user',
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Update User</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* First Name and Last Name Input Fields in one line */}
          <div style={{ display: 'flex', gap: '16px' }}>
            <Input
              placeholder="First Name"
              value={updatedUser.firstName}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, firstName: e.target.value })
              }
              style={{ marginBottom: '16px', height: '40px', flex: 1 }}
              allowClear
            />
            <Input
              placeholder="Last Name"
              value={updatedUser.lastName}
              onChange={(e) =>
                setUpdatedUser({ ...updatedUser, lastName: e.target.value })
              }
              style={{ marginBottom: '16px', height: '40px', flex: 1 }}
              allowClear
            />
          </div>

          {/* Email Input */}
          <Input
            placeholder="Email"
            value={updatedUser.email}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, email: e.target.value })
            }
            style={{ marginBottom: '16px', height: '40px' }}
            allowClear
          />
          {/* Phone Input */}
          <Input
            placeholder="Phone"
            value={updatedUser.phone}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, phone: e.target.value })
            }
            style={{ marginBottom: '16px', height: '40px' }}
            allowClear
          />
          {/* Address Input as TextArea */}
          <TextArea
            placeholder="Address"
            value={updatedUser.address}
            onChange={(e) =>
              setUpdatedUser({ ...updatedUser, address: e.target.value })
            }
            style={{ marginBottom: '16px', height: '100px' }}
            allowClear
          />
          {/* Role Select */}
          <Select
            placeholder="Select Role"
            value={updatedUser.role}
            onChange={(value) =>
              setUpdatedUser({ ...updatedUser, role: value })
            }
            style={{ marginBottom: '16px', width: '100%', height: '40px' }}
            getPopupContainer={(triggerNode) => triggerNode.parentNode}
          >
            <Option value="user">User</Option>
            <Option value="admin">Admin</Option>
          </Select>

          {/* Image Preview */}
          <Image
            src={updatedUser.avatarPreview || PLACEHOLDER_IMAGE}
            alt="User Avatar"
            boxSize="150px"
            objectFit="cover"
            mt={4}
            mb={8}
            borderRadius="8px"
          />
          {/* Avatar File Input */}
          <Input type="file" accept="image/*" onChange={handleFileChange} />
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isLoading={loading}
          >
            Save
          </Button>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
