import {
  Box,
  Flex,
  CircularProgress,
  useDisclosure,
  Button as ChakraButton,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import {
  Input,
  Table,
  Button,
  Popconfirm,
  Pagination,
  Select,
  Switch,
} from 'antd';
import React, { useEffect, useState, useCallback } from 'react';
import { debounce } from 'lodash';
import { message } from 'antd';
import CreateProductModal from './components/CreateProductModal';
import EditProductModal from './components/EditProductModal';
import CustomCard from '../../../../components/card/Card';

// Định nghĩa kiểu dữ liệu cho sản phẩm và danh mục
interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  img: string;
  productName: string;
  price: number;
  color: string;
  badge: string;
  tag: string;
  discount: number | null;
  description: string;
  isDelete: boolean;
  stock: number;
  categoryId: Category;
  isNewProduct: boolean;
  isSale: boolean;
  isSpecial: boolean;
  imagePreview: string;
}

// Dữ liệu danh mục
const categoriesData: Category[] = [
  {
    _id: '66efd7085dec982815af882a',
    name: 'Teddy bear',
  },
  {
    _id: '66efd8bad3eb218645176347',
    name: 'Key chain',
  },
  {
    _id: '66efd94bd3eb21864517634c',
    name: 'Tote bag',
  },
  {
    _id: '66f26c73d49d13131da51e4d',
    name: 'Plants',
  },
];

// Dữ liệu giả cho sản phẩm
const mockData = {
  products: [
    {
      _id: '66f006bf9538b745a44a14f1',
      img: 'https://via.placeholder.com/50',
      productName: 'Bear keychain',
      price: 15,
      color: 'Blue',
      badge: 'New',
      tag: 'popular',
      discount: 30,
      description: 'Description sdasd',
      isDelete: false,
      stock: 49,
      categoryId: {
        _id: '66efd8bad3eb218645176347',
        name: 'Key chain',
      },
      isNewProduct: false,
      isSale: true,
      isSpecial: true,
      imagePreview: 'https://via.placeholder.com/50',
    },
    // Thêm các sản phẩm khác tương tự...
  ],
  totalPages: 3,
  currentPage: 1,
  totalProducts: 14,
};

export default function ProductManagement() {
  const [products, setProducts] = useState<Product[]>(mockData.products || []); // Ensure it's an array
  const [categories, setCategories] = useState<Category[]>(
    categoriesData || [],
  ); // Ensure it's an array
  const [currentPage, setCurrentPage] = useState<number>(mockData.currentPage);
  const [totalPages, setTotalPages] = useState<number>(mockData.totalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [categoryId, setCategoryId] = useState<string>('');
  const [editProductData, setEditProductData] = useState<Product | null>(null); // Kiểu Product hoặc null
  const limit = 5;
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  // Quản lý trạng thái mở/đóng modal tạo sản phẩm
  const {
    isOpen: isCreateOpen,
    onOpen: onCreateOpen,
    onClose: onCreateClose,
  } = useDisclosure();

  // Quản lý trạng thái mở/đóng modal chỉnh sửa sản phẩm
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  // Hàm debounce để tìm kiếm sản phẩm
  const debouncedFetchProducts = useCallback(
    debounce((value: string) => {
      setCurrentPage(1);
      const filteredProducts = mockData.products.filter((product) =>
        product.productName.toLowerCase().includes(value.toLowerCase()),
      );
      setProducts(filteredProducts);
    }, 800),
    [],
  );

  // Xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // Xử lý khi nhấn nút Edit
  const handleEditClick = (record: Product) => {
    setEditProductData(record);
    onEditOpen();
  };

  // Chuyển đổi trạng thái của sản phẩm
  const toggleProductStatus = (productId: string, isDelete: boolean) => {
    const updatedProducts = products.map((product) =>
      product._id === productId ? { ...product, isDelete: !isDelete } : product,
    );
    setProducts(updatedProducts);
    message.success('Product status updated successfully.');
  };

  // Xử lý thay đổi danh mục
  const handleCategoryChange = (value: string) => {
    setCategoryId(value);
    setCurrentPage(1);
    const filteredProducts = mockData.products.filter(
      (product) => product.categoryId._id === value,
    );
    setProducts(filteredProducts);
  };

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: 'Name',
      dataIndex: 'productName',
      key: 'productName',
    },
    {
      title: 'Image',
      dataIndex: 'img',
      key: 'img',
      render: (text: string) => (
        <img
          src={text}
          alt="Product"
          width={50}
          height={50}
          style={{ borderRadius: '25%' }}
        />
      ),
    },
    {
      title: 'Price',
      dataIndex: 'price',
      key: 'price',
      render: (text: number) => <span>${text}</span>,
    },
    {
      title: 'Discount',
      dataIndex: 'discount',
      key: 'discount',
      render: (discount: number | null) => <span>{discount || '0'}%</span>,
    },
    {
      title: 'Stock',
      dataIndex: 'stock',
      key: 'stock',
    },
    {
      title: 'Category',
      dataIndex: ['categoryId', 'name'],
      key: 'category',
    },
    {
      title: 'Status',
      dataIndex: 'isDelete',
      key: 'isDelete',
      render: (status: boolean, record: Product) => (
        <Popconfirm
          title="Are you sure you want to change the status of this product?"
          onConfirm={() => toggleProductStatus(record._id, status)}
          okText="Yes"
          cancelText="No"
        >
          <Switch
            checked={!status}
            checkedChildren="Active"
            unCheckedChildren="Deleted"
          />
        </Popconfirm>
      ),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center' as 'center', // Fixed the alignment type
      render: (text: any, record: Product) => (
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
            Product Management
          </Text>
        </Flex>

        <Flex justifyContent="space-between" mb="20px" alignItems="center">
          <Input
            placeholder="Search product..."
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
              debouncedFetchProducts(e.target.value);
            }}
            style={{ width: '50%', height: '40px' }}
          />

          <Select
            placeholder="Filter by category"
            value={categoryId}
            onChange={handleCategoryChange}
            style={{ width: '30%', height: '40px' }}
          >
            <Select.Option value="">All Categories</Select.Option>
            {categories.map((category) => (
              <Select.Option key={category._id} value={category._id}>
                {category.name}
              </Select.Option>
            ))}
          </Select>

          <ChakraButton colorScheme="blue" onClick={onCreateOpen}>
            Add New
          </ChakraButton>
        </Flex>

        <Table
          columns={columns}
          dataSource={products}
          pagination={false}
          rowKey={(record: Product) => record._id}
          style={{ width: '100%', cursor: 'pointer' }}
        />

        <Pagination
          current={currentPage}
          total={totalPages * limit}
          pageSize={limit}
          onChange={handlePageChange}
          style={{ marginTop: '20px', textAlign: 'center' }}
        />

        <CreateProductModal
          categories={categories}
          isOpen={isCreateOpen}
          onClose={onCreateClose}
        />
        {editProductData && (
          <EditProductModal
            categories={categories}
            isOpen={isEditOpen}
            onClose={onEditClose}
            product={editProductData}
          />
        )}
      </CustomCard>
    </Box>
  );
}
