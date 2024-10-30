import {
  Box,
  Flex,
  useDisclosure,
  Button as ChakraButton,
  useColorModeValue,
  Text,
  
} from '@chakra-ui/react';
import { Input, Table, Button, Popconfirm, Pagination, Switch } from 'antd';
import {  useEffect, useState } from 'react';

import { message } from 'antd';
import UpdateUserModal from './components/UpdateUserModal';
import CreateUserModal from './components/CreateUserModal';
import CustomCard from '../../../../components/card/Card';
import http from '../../../../utils/http';
import { useQuery } from '@tanstack/react-query';
// Define types for user and pagination data
// interface User {
//   _id: string;
//   email: string;
//   phone: string;
//   address: string;
//   role: string;
//   isEnable: boolean;
//   avatar?: string | null;
//   firstName: string;
//   lastName: string;
// }
interface User {
  usersId: string;
  usersEmail: string;
  usersRole: string;
  accountBalance: string;
  createdAt: string;
  isVerified: boolean;
}
interface UserResponse {
  data: User[];
  total: number;
  page: number;
  limit: number;
}
const fetchUsers = async (page: number, limit: number): Promise<UserResponse> => {
  const response = await http.get(`/admin/users?page=${page}&limit=${limit}`);
  if (response.status !== 200) {
    message.error('Network response was not ok');
    throw new Error('Network response was not ok');
  }
  return response.data;
};
// const mockData: { users: User[]; currentPage: number; totalPages: number } = {
//   users: [
//     {
//       _id: '66f58850ad088e16022b4f18',
//       email: 'john.doe1@example.com',
//       phone: '01234567866',
//       address: '123 Main St, New York',
//       role: 'user',
//       isEnable: true,
//       avatar: 'https://via.placeholder.com/50',
//       firstName: 'John',
//       lastName: 'Doe',
//     },
//     {
//       _id: '66f7084343e83b05deb7b0ad',
//       firstName: 'Alice',
//       lastName: 'Doe',
//       email: 'alice.doe@example.com',
//       phone: '123123123123',
//       address: '2960 Vanport Dr, San Jose, CA',
//       role: 'user',
//       isEnable: true,
//       avatar: 'https://via.placeholder.com/50',
//     },
//     {
//       _id: '66f7128e225106893012bf14',
//       firstName: 'Michael',
//       lastName: 'Doe',
//       email: 'michael.doe@example.com',
//       phone: '0967626400',
//       address: '25/27 Đường 6, Phường Tăng Nhơn Phú B, TP Thủ Đức',
//       role: 'admin',
//       isEnable: true,
//       avatar: 'https://via.placeholder.com/50',
//     },
//   ],
//   currentPage: 1,
//   totalPages: 2,
// };

export default function UserManagement() {
 
  // Use mock data with User type
  const [currentPage, setCurrentPage] = useState<number>(0);
  // @ts-ignore
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editUserData, setEditUserData] = useState<User | null>(null); // For the edit modal
  
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const [limit,setLimit] = useState<number>(3);
  const { data:mockData, isLoading} = useQuery<UserResponse, Error>({
    queryKey: ['users', currentPage,limit], // Key cho query
    queryFn: () => fetchUsers(currentPage, limit)
  });
  const [totalPages,setTotalPages] = useState<number>(mockData?.total || 0);
  const [users, setUsers] = useState<User[] | []>(mockData?.data || []); 
  const [isLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);
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
  const [searching, setSearching] = useState<boolean>(false);
  const [searchUser, setSearchUser] = useState<User[]>([]);
  // Handle status change
  const toggleUserStatus = (userId: string) => {
    const updatedUsers = users.map((user) =>
      user.usersId === userId ? { ...user, isVerified: !user.isVerified} : user,
    );
    setUsers(updatedUsers);
    message.success('User status updated successfully.');
  };

 // Debounced search for users
  // const debouncedFetchUsers = useCallback(
  //   debounce((value: string) => {
  //     setCurrentPage(1);
  //     if (value.trim() === '') {
  //       setUsers(mockData?.data || []);
  //       setTotalPages(mockData?.total || 0);
  //     } else {
  //       const filteredUsers = users.filter((user) =>
  //         `${user.usersEmail}`
  //           .toLowerCase()
  //           .includes(value.toLowerCase()),
  //       );
  //       setUsers(filteredUsers || []);
  //       setTotalPages(filteredUsers.length);
  //     }
  //   }, 800),
  //   [mockData],
  // );

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };
// Hàm để cập nhật thông tin người dùng
const updateUser = (updatedUser: User) => {
  setUsers((prevUsers) =>
    prevUsers.map((user) =>
      user.usersId === updatedUser.usersId ? updatedUser : user // Cập nhật thông tin người dùng
    )
  );
};

// Giả sử bạn có một hàm để xử lý khi người dùng lưu thông tin đã chỉnh sửa
const handleSaveEdit = (updatedUser: User) => {
  updateUser(updatedUser); // Gọi hàm cập nhật
  onEditClose(); // Đóng modal chỉnh sửa
};
  const handleEditClick = (record: User) => {
    setEditUserData(record);
    onEditOpen();
  };
  useEffect(() => {
    if (mockData) {
      setUsers(mockData.data); // Cập nhật state users với dữ liệu mới
      setTotalPages(mockData.total);
    }
    if(isLoading){
      message.loading('Loading...');
    }else{
      message.destroy();
    }
  }, [isLoading,mockData,limit,currentPage]);
  
console.log(mockData)
  // const columns = [
  //   {
  //     title: 'First Name',
  //     dataIndex: 'firstName',
  //     key: 'firstName',
  //   },
  //   {
  //     title: 'Last Name',
  //     dataIndex: 'lastName',
  //     key: 'lastName',
  //   },
  //   {
  //     title: 'Avatar',
  //     dataIndex: 'avatar',
  //     key: 'avatar',
  //     render: (avatar: string | null) => (
  //       <Image
  //         src={avatar || DefaultAvatar}
  //         alt="User Avatar"
  //         width={50}
  //         height={50}
  //         style={{ borderRadius: '25%' }}
  //       />
  //     ),
  //   },
  //   {
  //     title: 'Phone',
  //     dataIndex: 'phone',
  //     key: 'phone',
  //   },
  //   {
  //     title: 'Email',
  //     dataIndex: 'email',
  //     key: 'email',
  //   },
  //   {
  //     title: 'Role',
  //     dataIndex: 'role',
  //     key: 'role',
  //     render: (role: string) => (
  //       <span style={{ fontWeight: 'bold', cursor: 'pointer' }}>
  //         {role === 'admin' ? 'Admin' : 'User'}
  //       </span>
  //     ),
  //   },
  //   {
  //     title: 'Status',
  //     dataIndex: 'isEnable',
  //     key: 'isEnable',
  //     render: (status: boolean, record: User) => (
  //       <Popconfirm
  //         title={`Are you sure you want to ${
  //           status ? 'disable' : 'activate'
  //         } this user?`}
  //         onConfirm={() => toggleUserStatus(record.usersId)}
  //         okText="Yes"
  //         cancelText="No"
  //       >
  //         <Switch
  //           checked={status}
  //           checkedChildren="Active"
  //           unCheckedChildren="Disabled"
  //         />
  //       </Popconfirm>
  //     ),
  //   },
  //   {
  //     title: 'Actions',
  //     key: 'actions',
  //     align: 'center' as const, // Ensure alignment is typed correctly
  //     // @ts-ignore
  //     render: (text: string, record: User) => (
  //       <div style={{ display: 'flex', justifyContent: 'center' }}>
  //         <Button
  //           type="primary"
  //           onClick={(e) => {
  //             e.stopPropagation();
  //             handleEditClick(record);
  //           }}
  //         >
  //           Edit
  //         </Button>
  //       </div>
  //     ),
  //   },
  // ];
  const columns = [
    {
      title: 'User ID',
      dataIndex: 'usersId',
      key: 'usersId',
    },
    {
      title: 'Email',
      dataIndex: 'usersEmail',
      key: 'usersEmail',
    },
    {
      title: 'Role',
      dataIndex: 'usersRole',
      key: 'usersRole',
    },
    {
      title: 'Account Balance',
      dataIndex: 'accountBalance',
      key: 'accountBalance',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => new Date(text).toLocaleString(), // Chuyển đổi định dạng ngày
    },
    {
      title: 'Verified',
      dataIndex: 'isVerified',
      key: 'isVerified',
      render: (isVerified: boolean) => (isVerified ? 'Yes' : 'No'), // Hiển thị Yes/No cho trạng thái xác minh
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center' as const, // Ensure alignment is typed correctly
      // @ts-ignore
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
      {
        title: 'Status',
        dataIndex: 'isVerified',
        key: 'isVerified',
        render: (status: boolean, record: User) => (
          <Popconfirm
            title={`Are you sure you want to ${
              status ? 'disable' : 'activate'
            } this user?`}
            onConfirm={() => toggleUserStatus(record.usersId)}
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
      }
  ];
  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} w="100%" h="100vh" overflowY="auto">
      <CustomCard
        flexDirection="column"
        w="100%"
        px="25px"
        overflowX={{ sm: 'scroll', lg: 'hidden' }}
        overflowY="auto"
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
              const value = e.target.value;
              setSearchTerm(e.target.value);
              if (value.trim() === '') {
                
                setSearching(false);
                setSearchUser([]);
                message.destroy(); 
                setIsLoadingSearch(false); 
              } else  {
                if (!isLoadingSearch) { 
                  message.loading('Searching...');
                  setIsLoadingSearch(true); 
                }
                setSearching(true);
                const filteredUsers = users.filter((user) =>
                  user.usersEmail.toLowerCase().includes(value.toLowerCase())
                );
                setSearchUser(filteredUsers);
              }
            }}
            style={{ width: '85%' }}
          />

          <ChakraButton colorScheme="blue" onClick={onCreateOpen}>
            Add New
          </ChakraButton>
        </Flex>

        <Table
          columns={columns}
          dataSource={searching ? searchUser : users}
          pagination={false}
          rowKey={(record) => record.usersId}
          style={{ width: '100%', cursor: 'pointer' }}
        />
        
        <Pagination
            current={currentPage}
            total={totalPages}
            pageSize={searching ? searchUser.length :limit}
            onChange={handlePageChange}
            pageSizeOptions={[3,4,5,7,10]}
            //@ts-ignore
            onShowSizeChange={(current, pageSize) => setLimit(pageSize)}
            style={{ marginTop: '20px', textAlign: 'center' }}
          />
        

        <CreateUserModal isOpen={isCreateOpen} onClose={onCreateClose} />
        {editUserData && (
          <UpdateUserModal
            isOpen={isEditOpen}
            onClose={onEditClose}
            userData={editUserData}
            onSave={handleSaveEdit}
          />
        )}
      </CustomCard>
    </Box>
  );
}
