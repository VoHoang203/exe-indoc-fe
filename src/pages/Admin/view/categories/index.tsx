import {
  Box,
  Flex,
  CircularProgress,
  useDisclosure,
  Button as ChakraButton,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import { Table, Button, Popconfirm, Pagination, Input } from 'antd';
import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { message } from 'antd';
// import Card from 'components/card/Card';
import EditCategoryModal from './components/EditCategoryModal';
import CreateCategoryModal from './components/CreateCategoryModal';
import CustomCard from '../../../../components/card/Card';

// Định nghĩa kiểu dữ liệu cho Category
interface Category {
  _id: string;
  name: string;
  image: string;
  isDelete: boolean;
  description: string;
}

// Mock data
const mockData = {
  categories: [
    {
      _id: '66efd7085dec982815af882a',
      name: 'Teddy bear',
      image: 'https://via.placeholder.com/50',
      isDelete: false,
      description: 'Teddy bear description',
    },
    {
      _id: '66efd8bad3eb218645176347',
      name: 'Key chain',
      image: 'https://via.placeholder.com/50',
      isDelete: false,
      description: 'Key chain description',
    },
    {
      _id: '66efd94bd3eb21864517634c',
      name: 'Tote bag',
      image: 'https://via.placeholder.com/50',
      isDelete: false,
      description: 'Tote bag description',
    },
    {
      _id: '66f26c73d49d13131da51e4d',
      name: 'Plants',
      image: 'https://via.placeholder.com/50',
      isDelete: false,
      description: 'Móc khóa móc từ len',
    },
    {
      _id: '66f26c93d49d13131da51e53',
      name: 'Hats',
      image: 'https://via.placeholder.com/50',
      isDelete: false,
      description: 'Móc khóa móc từ len',
    },
  ],
  currentPage: 1,
  totalPages: 2,
  totalCategories: 7,
};

export default function Category() {
  const [categories, setCategories] = useState<Category[]>(mockData.categories);
  const [currentPage, setCurrentPage] = useState<number>(mockData.currentPage);
  const [totalPages, setTotalPages] = useState<number>(mockData.totalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editCategoryData, setEditCategoryData] = useState<Category | null>(
    null,
  );
  const limit = 5;
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  // For Create Dialog
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

  // For Edit Dialog
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  // Fetch categories from mock data
  const fetchCategories = useCallback(
    (search = searchTerm, page = currentPage) => {
      setLoading(true);
      let filteredCategories = mockData.categories;

      if (search) {
        filteredCategories = filteredCategories.filter((category) =>
          category.name.toLowerCase().includes(search.toLowerCase()),
        );
      }

      const paginatedCategories = filteredCategories.slice(
        (page - 1) * limit,
        page * limit,
      );

      setTimeout(() => {
        setCategories(paginatedCategories);
        setTotalPages(Math.ceil(filteredCategories.length / limit));
        setLoading(false);
      }, 500);
    },
    [searchTerm, currentPage],
  );

  // Debounced search functionality
  const debouncedFetchCategories = useCallback(
    debounce((value: string) => {
      setCurrentPage(1);
      fetchCategories(value, 1);
    }, 800),
    [fetchCategories],
  );

  // Handle page change
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Handle Edit click
  const handleEditClick = (record: Category) => {
    setEditCategoryData(record);
    onEditOpen(); // Mở modal Edit
  };

  // Handle Delete
  const confirmDeleteCategory = (categoryId: string) => {
    setCategories((prevCategories) =>
      prevCategories.filter((category) => category._id !== categoryId),
    );
    message.success('Category deleted.');
  };

  // Define columns for Ant Design table
  const columns = [
    {
      title: 'Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Description',
      dataIndex: 'description',
      key: 'description',
    },
    {
      title: 'Image',
      dataIndex: 'image',
      key: 'image',
      render: (text: string) => (
        <img src={text} alt="category" width="50" style={{ borderRadius: 10 }} />
      ),
    },
    {
      title: 'Action',
      key: 'action',
      align: 'center' as 'center', // Ensure the type is a specific align value
      render: (text: any, record: Category) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="primary"
            onClick={() => handleEditClick(record)} // Trigger edit modal
          >
            Edit
          </Button>
          <Popconfirm
            title="Are you sure you want to delete this category?"
            onConfirm={() => confirmDeleteCategory(record._id)} // Trigger delete
            okText="Yes"
            cancelText="No"
          >
            <Button type="dashed" style={{ marginLeft: 10 }}>
              Delete
            </Button>
          </Popconfirm>
        </div>
      ),
    },
  ];

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} w="100%">
      <CustomCard
        flexDirection={'column'}
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
            Category Management
          </Text>
        </Flex>
        <Flex justifyContent="space-between" mb="20px">
          <Input
            placeholder="Search category..."
            allowClear
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              debouncedFetchCategories(e.target.value);
            }}
            style={{ width: '85%' }}
          />
          <ChakraButton colorScheme="blue" onClick={onCreateOpen}>
            Add New
          </ChakraButton>
        </Flex>

        {loading ? (
          <Flex justifyContent="center" mt="20px">
            <CircularProgress isIndeterminate color="blue.300" />
          </Flex>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={categories}
              pagination={false}
              rowKey={(record: Category) => record._id}
              style={{ width: '100%', cursor: 'pointer' }}
            />

            <Pagination
              current={currentPage}
              total={totalPages * limit}
              pageSize={limit}
              onChange={handlePageChange}
              style={{ marginTop: '20px', textAlign: 'center' }}
            />

            <CreateCategoryModal
              isOpen={isCreateOpen}
              onClose={onCreateClose}
            />

            {editCategoryData && (
              <EditCategoryModal
                isOpen={isEditOpen}
                onClose={onEditClose}
                category={editCategoryData} // Truyền dữ liệu vào modal
              />
            )}
          </>
        )}
      </CustomCard>
    </Box>
  );
}
