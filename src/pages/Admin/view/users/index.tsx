import {
  Box,
  Flex,
  useDisclosure,
  Button as ChakraButton,
  useColorModeValue,
  Text,
  Image,
} from '@chakra-ui/react';
import { Input, Table, Button, Popconfirm, Pagination, Switch } from 'antd';
import { useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { message } from 'antd';
import UpdateUserModal from './components/UpdateUserModal';
import CreateUserModal from './components/CreateUserModal';
import DefaultAvatar from '/src/assets/admin/bear.png';
import CustomCard from '../../../../components/card/Card';

// Define types for user and pagination data
interface User {
  _id: string;
  email: string;
  phone: string;
  address: string;
  role: string;
  isEnable: boolean;
  avatar: string | null;
  firstName: string;
  lastName: string;
}

const mockData: { users: User[]; currentPage: number; totalPages: number } = {
  users: [
    {
      _id: '66f58850ad088e16022b4f18',
      email: 'john.doe1@example.com',
      phone: '01234567866',
      address: '123 Main St, New York',
      role: 'user',
      isEnable: true,
      avatar: 'https://via.placeholder.com/50',
      firstName: 'John',
      lastName: 'Doe',
    },
    {
      _id: '66f7084343e83b05deb7b0ad',
      firstName: 'Alice',
      lastName: 'Doe',
      email: 'alice.doe@example.com',
      phone: '123123123123',
      address: '2960 Vanport Dr, San Jose, CA',
      role: 'user',
      isEnable: true,
      avatar: 'https://via.placeholder.com/50',
    },
    {
      _id: '66f7128e225106893012bf14',
      firstName: 'Michael',
      lastName: 'Doe',
      email: 'michael.doe@example.com',
      phone: '0967626400',
      address: '25/27 Đường 6, Phường Tăng Nhơn Phú B, TP Thủ Đức',
      role: 'admin',
      isEnable: true,
      avatar: 'https://via.placeholder.com/50',
    },
  ],
  currentPage: 1,
  totalPages: 2,
};

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>(mockData.users); // Use mock data with User type
  const [currentPage, setCurrentPage] = useState<number>(mockData.currentPage);
  const [totalPages, setTotalPages] = useState<number>(mockData.totalPages);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editUserData, setEditUserData] = useState<User | null>(null); // For the edit modal
  const limit = 5;
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  // Handle status change
  const toggleUserStatus = (userId: string) => {
    const updatedUsers = users.map((user) =>
      user._id === userId ? { ...user, isEnable: !user.isEnable } : user,
    );
    setUsers(updatedUsers);
    message.success('User status updated successfully.');
  };

  // Debounced search for users
  const debouncedFetchUsers = useCallback(
    debounce((value: string) => {
      setCurrentPage(1);
      const filteredUsers = mockData.users.filter((user) =>
        `${user.firstName} ${user.lastName}`
          .toLowerCase()
          .includes(value.toLowerCase()),
      );
      setUsers(filteredUsers);
    }, 800),
    [],
  );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleEditClick = (record: User) => {
    setEditUserData(record);
    onEditOpen();
  };

  const columns = [
    {
      title: 'First Name',
      dataIndex: 'firstName',
      key: 'firstName',
    },
    {
      title: 'Last Name',
      dataIndex: 'lastName',
      key: 'lastName',
    },
    {
      title: 'Avatar',
      dataIndex: 'avatar',
      key: 'avatar',
      render: (avatar: string | null) => (
        <Image
          src={avatar || DefaultAvatar}
          alt="User Avatar"
          width={50}
          height={50}
          style={{ borderRadius: '25%' }}
        />
      ),
    },
    {
      title: 'Phone',
      dataIndex: 'phone',
      key: 'phone',
    },
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Role',
      dataIndex: 'role',
      key: 'role',
      render: (role: string) => (
        <span style={{ fontWeight: 'bold', cursor: 'pointer' }}>
          {role === 'admin' ? 'Admin' : 'User'}
        </span>
      ),
    },
    {
      title: 'Status',
      dataIndex: 'isEnable',
      key: 'isEnable',
      render: (status: boolean, record: User) => (
        <Popconfirm
          title={`Are you sure you want to ${
            status ? 'disable' : 'activate'
          } this user?`}
          onConfirm={() => toggleUserStatus(record._id)}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            checked={status}
            checkedChildren="Active"
            unCheckedChildren="Disabled"
          />
        </Popconfirm>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center' as const, // Ensure alignment is typed correctly
      render: (text: string, record: User) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(record);
            }}
          >
            Edit
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} w="100%">
      <CustomCard
        flexDirection="column"
        w="100%"
        px="25px"
        overflowX={{ sm: 'scroll', lg: 'hidden' }}
      >
        <Flex justify="space-between" mb="15px" align="center">
          <Text
            color={textColor}
            fontSize="22px"
            fontWeight="700"
            lineHeight="100%"
          >
            User Management
          </Text>
        </Flex>

        {/* Search and Add New Button */}
        <Flex justifyContent="space-between" mb="20px">
          <Input
            allowClear
            placeholder="Search user..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              debouncedFetchUsers(e.target.value);
            }}
            style={{ width: '85%' }}
          />

          <ChakraButton colorScheme="blue" onClick={onCreateOpen}>
            Add New
          </ChakraButton>
        </Flex>

        <Table
          columns={columns}
          dataSource={users}
          pagination={false}
          rowKey={(record) => record._id}
          style={{ width: '100%', cursor: 'pointer' }}
        />

        <Pagination
          current={currentPage}
          total={totalPages * limit}
          pageSize={limit}
          onChange={handlePageChange}
          style={{ marginTop: '20px', textAlign: 'center' }}
        />

        <CreateUserModal isOpen={isCreateOpen} onClose={onCreateClose} />
        {editUserData && (
          <UpdateUserModal
            isOpen={isEditOpen}
            onClose={onEditClose}
            userData={editUserData}
          />
        )}
      </CustomCard>
    </Box>
  );
}
