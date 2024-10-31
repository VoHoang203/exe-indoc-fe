import {
  Box,
  Flex,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import {
  Input,
  Table,
  Button,
  Popconfirm,
  Pagination,
  Switch,
} from 'antd';
import  {  useState, useCallback, useEffect } from 'react';
import { debounce } from 'lodash';
import { message } from 'antd';
// import CreateProductModal from './components/CreateProductModal';
// import EditProductModal from './components/EditProductModal';
import CustomCard from '../../../../components/card/Card';
import http from '../../../../utils/http';
import { useQuery } from '@tanstack/react-query';
import { formatCurrency } from '../../../Payment/Payment';

// Định nghĩa kiểu dữ liệu cho sản phẩm và danh mục
// interface Category {
//   _id: string;
//   name: string;
// }

// interface Product {
//   _id: string;
//   img: string;
//   productName: string;
//   price: number;
//   color: string;
//   badge: string;
//   tag: string;
//   discount: number | null;
//   description: string;
//   isDelete: boolean;
//   stock: number;
//   categoryId: Category;
//   isNewProduct: boolean;
//   isSale: boolean;
//   isSpecial: boolean;
//   imagePreview: string;
// }
interface Document {
  documentId: string;
  sellerStoreName: string;
  documentTitle: string;
  documentPrice: string;
  documentCategoryName: string;
}

interface DocumentResponse {
  data: Document[];
  total: number;
  page: number;
  limit: number;
}

// Dữ liệu danh mục
// const categoriesData: Category[] = [
//   {
//     _id: '66efd7085dec982815af882a',
//     name: 'Teddy bear',
//   },
//   {
//     _id: '66efd8bad3eb218645176347',
//     name: 'Key chain',
//   },
//   {
//     _id: '66efd94bd3eb21864517634c',
//     name: 'Tote bag',
//   },
//   {
//     _id: '66f26c73d49d13131da51e4d',
//     name: 'Plants',
//   },
// ];
const fetchDocuments = async (page: number, limit: number): Promise<DocumentResponse> => {
  const response = await http.get(`/admin/documents?page=${page}&limit=${limit}`);
  if (response.status !== 200) {
    message.error('Network response was not ok');
    throw new Error('Network response was not ok');
  }
  return response.data;
};
// Dữ liệu giả cho sản phẩm
// const mockData = {
//   products: [
//     {
//       _id: '66f006bf9538b745a44a14f1',
//       img: 'https://via.placeholder.com/50',
//       productName: 'Bear keychain',
//       price: 15,
//       color: 'Blue',
//       badge: 'New',
//       tag: 'popular',
//       discount: 30,
//       description: 'Description sdasd',
//       isDelete: false,
//       stock: 49,
//       categoryId: {
//         _id: '66efd8bad3eb218645176347',
//         name: 'Key chain',
//       },
//       isNewProduct: false,
//       isSale: true,
//       isSpecial: true,
//       imagePreview: 'https://via.placeholder.com/50',
//     },
//     // Thêm các sản phẩm khác tương tự...
//   ],
//   totalPages: 3,
//   currentPage: 1,
//   totalProducts: 14,
// };

export default function ProductManagement() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [limit, setLimit] = useState<number>(5);
  const { data: mockData, isLoading:isLoading } = useQuery<DocumentResponse, Error>({
    queryKey: ['documents', currentPage, limit],
    queryFn: () => fetchDocuments(currentPage, limit),
  });
  
  const [total, setTotal] = useState<number>(mockData?.total || 0);
  const [documents, setDocuments] = useState<Document[]>(mockData?.data || []);
  const [searchTerm, setSearchTerm] = useState('');
  useEffect(() => {
    if (mockData) {
      setDocuments(mockData.data);
      setTotal(mockData.total);
    }
    if(isLoading){
      message.loading('Loading...');
    }else{
      message.destroy();
    }
  }, [isLoading,mockData,limit]);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
console.log("documents:",documents)


  // Hàm debounce để tìm kiếm sản phẩm
  const debouncedFetchProducts = useCallback(
    debounce((value: string) => {
      setCurrentPage(1);
      const filteredProducts = mockData?.data.filter((document) =>
        document.documentTitle.toLowerCase().includes(value.toLowerCase()),
      );
      setDocuments(filteredProducts || []);
    }, 800),
    [],
  );

  // Xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    setDocuments([])
    setCurrentPage(page -1);
  };

  // Xử lý khi nhấn nút Edit
  

  
  const toggleProductStatus = (productId: string, isDelete: boolean) => {
    const updatedProducts = documents.map((product) =>
      product.documentId === productId ? { ...product, isDelete: !isDelete } : product,
    );
    setDocuments(updatedProducts);
    message.success('Product status updated successfully.');
  };

  // Xử lý thay đổi danh mục
  // const handleCategoryChange = (value: string) => {
  //   setCategoryId(value);
  //   setCurrentPage(1);
  //   const filteredProducts = mockData.products.filter(
  //     (product) => product.categoryId._id === value,
  //   );
  //   setDocuments(filteredProducts);
  // };

  // Cấu hình cột cho bảng
  const columns = [
    // {
    //   title: 'Image',
    //   dataIndex: 'img',
    //   key: 'img',
    //   render: (text: string) => (
    //     <img
    //       src={text}
    //       alt="Product"
    //       width={50}
    //       height={50}
    //       style={{ borderRadius: '25%' }}
    //     />
    //   ),
    // },
    {
      title: 'Document Title',
      dataIndex: 'documentTitle',
      key: 'documentTitle',
    },
    {
      title: 'Seller Store Name',
      dataIndex: 'sellerStoreName',
      key: 'sellerStoreName',
    },
    {
      title: 'Price',
      dataIndex: 'documentPrice',
      key: 'documentPrice',
      render: (text: string) => <span>{formatCurrency(parseFloat(text))}</span>, // Format price
    },
    {
      title: 'Category',
      dataIndex: 'documentCategoryName',
      key: 'documentCategoryName',
    },
    {
      title: 'Status',
      dataIndex: 'isDelete',
      key: 'isDelete',
      render: (status: boolean, record: Document) => (
        <Popconfirm
          title="Are you sure you want to change the status of this product?"
          onConfirm={() => toggleProductStatus(record.documentId, status)}
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
      // @ts-ignore
      render: (text: any, record: Document) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
            }}
          >
            Edit
          </Button>
        </div>
      ),
    }
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


         
        </Flex>

        <Table
          columns={columns}
          dataSource={documents}
          pagination={false}
          rowKey={(record) => record.documentId}
          style={{ width: '100%', cursor: 'pointer' }}
        />

        <Pagination
          current={currentPage +1}
          total={total}
          pageSize={limit}
          pageSizeOptions={[3,5,10]}
          onChange={handlePageChange}
          showSizeChanger
          //@ts-ignore
          onShowSizeChange={(current, pageSize) => setLimit(pageSize)}
          style={{ marginTop: '20px', textAlign: 'center' }}
        />

        {/* <CreateProductModal
          categories={categories}
          isOpen={isCreateOpen}
          onClose={onCreateClose}
        />
        
         {editProductData && (
          <EditProductModal
            categories={categories}
            isOpen={isEditOpen}
            onClose={onEditClose}
            product={editProductData as Product}
          />
        )} */}
      </CustomCard>
    </Box>
  );
}
