import {
  Box,
  Flex,
  useDisclosure,
  useColorModeValue,
  Text,
} from '@chakra-ui/react';
import {
  Input,
  Table,
  Button,
  Pagination,
} from 'antd';
import  {  useState, useEffect } from 'react';
import { message } from 'antd';
import Card from '../../../../components/card/Card';
import EditProductModal, { TransactionDetail } from './components/EditProductModal';
import { useQuery } from '@tanstack/react-query';
import http from '../../../../utils/http';
import { toast } from 'react-toastify';

// Định nghĩa kiểu dữ liệu cho sản phẩm và danh mục
// interface Category {
//   _id: string;
//   name: string;
// }

 interface Transaction {
  purchase_id: string
  buyerEmail: string
  purchaseDate: string
  cost: string
  status: string

}
interface TransactionResponse {
  total: number;          
  limit: number;          
  page: number;           
  data: Transaction[];
}

// Dữ liệu danh mục

const fetchTransactions = async (page: number, limit: number) => {
  const response = await http.get(`/admin/transactions`, {
    params: { page, limit },
  });
  return response.data;
};
const fetchTransactionDetail = async (tran: string) => {
  const response = await http.post<TransactionDetail[]>(`/admin/transactions/detail`, {
    transactionId: tran,
  });
  return response.data[0] as TransactionDetail;
};

export default function ProductManagement3() {
   
  const [currentPage, setCurrentPage] = useState<number>(0);
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [editTransactionData, setEditProductData] = useState<Transaction | null>(null); // Kiểu Product hoặc null
  const [limit, setLimit] = useState<number>(5);
  const textColor = useColorModeValue('secondaryGray.900', 'white');
  const { data: transactionsData, isLoading:loading} = useQuery<TransactionResponse>({
    queryKey: ['transactions', currentPage, limit],
    queryFn: () => fetchTransactions(currentPage, limit),
  });
  const [transactions, setTransactions] = useState<Transaction[]>(transactionsData?.data || []);
  const [totalPages, setTotalPages] = useState<number>(transactionsData?.total || 0);
  console.log(editTransactionData?.purchase_id)
  const { data: transactionDetail} = useQuery<TransactionDetail>({
    queryKey: ['transactiondetail',editTransactionData?.purchase_id ],
    queryFn: () => fetchTransactionDetail(editTransactionData?.purchase_id || "2a5af0f1-1435-4246-8377-5046c8349f92")
  });
console.log(transactionDetail)
  // Quản lý trạng thái mở/đóng modal chỉnh sửa sản phẩm
  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  useEffect(() => {
      setTransactions([])
      setTransactions(transactionsData?.data || []);
      setTotalPages(transactionsData?.total || 0);
  }, [transactionsData,limit,currentPage]);
  useEffect(() => {
    if(loading){
      message.loading('Loading...');
    }else{
      message.destroy();
    }
  }, [loading]);
  // Xử lý thay đổi trang
  const handlePageChange = (page: number) => {
    setTransactions([])
    setCurrentPage(page -1);
  };

  // Xử lý khi nhấn nút Edit
  const handleEditClick = (record: Transaction) => {
    setEditProductData(record);
    onEditOpen();
  };
  //@ts-ignore
  const handlePageSizeChange = (current: number, pageSize: number) => {
    if (pageSize > totalPages) {
      toast.error('Page size cannot exceed the current limit.');
    } else {
      setLimit(pageSize);
    }
  };

  // Cấu hình cột cho bảng
  const columns = [
    {
      title: 'Purchase ID',
      dataIndex: 'purchaseId',
      key: 'purchaseId',
    },
    {
      title: 'Buyer Email',
      dataIndex: 'buyerEmail',
      key: 'buyerEmail',
    },
    {
      title: 'Purchase Date',
      dataIndex: 'purchaseDate',
      key: 'purchaseDate',
      render: (date: string) => new Date(date).toLocaleString(), // Định dạng ngày
    },
    {
      title: 'Cost',
      dataIndex: 'cost',
      key: 'cost',
      render: (cost: string) => <span>{parseFloat(cost).toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>, // Định dạng chi phí
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center' as 'center', // Fixed the alignment type
      //@ts-ignore
      render: (text: any, record: Transaction) => (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <Button
            type="primary"
            onClick={(e) => {
              e.stopPropagation();
              handleEditClick(record);
            }}
          >
            Detail
          </Button>
        </div>
      ),
    },
  ];

  return (
    <Box pt={{ base: '130px', md: '80px', xl: '80px' }} w="100%">
      <Card
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
            }}
            style={{ width: '50%', height: '40px' }}
          />

        </Flex>

        <Table
          columns={columns}
          dataSource={transactions}
          pagination={false}
          rowKey={(record: Transaction) => record.purchase_id}
          style={{ width: '100%', cursor: 'pointer' }}
        />

        <Pagination
          current={currentPage +1}
          total={totalPages}
          pageSize={limit}
          onChange={handlePageChange}
          pageSizeOptions={[3,5,10]}
          showSizeChanger
          onShowSizeChange={(current, pageSize) => handlePageSizeChange(current, pageSize)}
          style={{ marginTop: '20px', textAlign: 'center' }}
        />

        
        {editTransactionData && (
          <EditProductModal
            isOpen={isEditOpen}
            onClose={onEditClose}
            transactionDetail={transactionDetail || null}
          />
        )}
      </Card>
    </Box>
  );
}
