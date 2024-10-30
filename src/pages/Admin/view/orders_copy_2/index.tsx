import{ useState, useEffect } from 'react';
import { Box, Flex, CircularProgress, Text } from '@chakra-ui/react';
import { Table, Pagination, Button, Input, Select, message } from 'antd';
import OrderDetailModal from './components/OrderDetailModal';
import CustomCard from '../../../../components/card/Card';
import http from '../../../../utils/http';
import { useQuery } from '@tanstack/react-query';

const { Option } = Select;


//Define OrderDetailModalProps Interface

export interface Feedback {
  id: string;
  email: string;
  feedback: string;
  status: string;
}
interface FeedbackResponse {
  total: number;          // Total number of documents
  limit: number;          // Limit of documents per page
  page: number;           // Current page index (0-based)
  data: Feedback[];
}

//   orders: [
//     {
//       _id: 'order1',
//       code: 'ORD52995076',
//       date: '2024-09-27T18:31:07.070Z',
//       paymentMethod: 'PayPal',
//       totalPrice: 71.35,
//       status: 'Pending',
//       shippingMethod: 'Standard Shipping',
//       shippingCharge: 5.99,
//       discount: 2.5,
//       orderDetail: [
//         {
//           productId: 'prod1', // Ensure this field is present
//           name: 'Student ID card lanyard',
//           image: 'https://via.placeholder.com/50',
//           price: 10.5,
//           quantity: 6,
//           colors: 'Yellow',
//           _id: '66f6f9ebe4daa97252980ed7',
//         },
//       ],
//       infoCustomer: {
//         userId: '66f6c117237f525066ff8c03',
//         name: 'Jonh Doe',
//         email: 'jonh@gmail.com',
//         address: 'Ho Chi Minh, Vietnam',
//         phone: '0123456789',
//         _id: 'user1',
//       },
//     },
//   ],
//   currentPage: 1,
//   totalPages: 2,
//   totalOrders: 3,
// };

// Status Colors
const generateStatus = (status: string) => {
  let color = '';
  switch (status) {
    case 'unsovled':
      color = '#FF9900';
      break;
    case 'resolved':
      color = '#008080';
      break;
    default:
      color = 'gray';
  }
  return (
    <span
      style={{
        color: color,
        padding: '3px 8px',
        border: `1px solid ${color}`,
        borderRadius: '5px',
        backgroundColor: `${color}20`,
        textAlign: 'center',
        display: 'inline-block',
      }}
    >
      {status}
    </span>
  );
};

// Payment Method Icons

const fetchFeedback = async (page: number, limit: number) => {
 
  try {
    const response = await http.get(`/admin/feedback?limit=${limit}&page=${page}`);
    return response.data;
  } catch (error) {
    message.error('Failed to fetch feedback data.');
    console.error(error);
  }
};
export default function OrderManagement2() {
  
  const [currentPage, setCurrentPage] = useState<number>(0);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(5);
  const {data: mockData, isLoading:loading, refetch} = useQuery<FeedbackResponse>({
    queryKey: ['feedback', currentPage, limit],
    queryFn: () => fetchFeedback(currentPage, limit),
  });
  const [feedbacks, setFeedbacks] = useState<Feedback[]>(mockData?.data || []);
  // Fetch Orders Data

  const [totalPages, setTotalPages] = useState<number>(mockData?.total || 0);
console.log(mockData)
  useEffect(() => {
    if(mockData){
      setFeedbacks(mockData.data);
      setTotalPages(mockData.total);
    }
  }, [mockData ,limit,currentPage]);
  useEffect(() => {
    if(loading){
      message.loading('Loading...');
    }else{
      message.destroy();
    }
  }, [loading]);

  // Change Page
  const handlePageChange = (page: number) => {
    setFeedbacks([])
    setCurrentPage(page-1);
  };

  // View Order Details
  const handleViewDetail = (feedback: Feedback) => {
    setSelectedFeedback(feedback);
    setIsModalVisible(true);
  };
console.log(feedbacks)
  // Define Columns
  const columns = [
    {
      title: 'Email',
      dataIndex: 'email',
      key: 'email',
    },
    {
      title: 'Feedback ID',
      dataIndex: 'id',
      key: 'id',
    },
    {title: 'Feedback',
      dataIndex: 'feedback',
      key: 'feedback',},
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as 'center',
      render: (status: string) => generateStatus(status),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center' as 'center',
      // @ts-ignore
      render: (text: any, record: Feedback) => (
        <Button onClick={() => handleViewDetail(record)}>Detail</Button>
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
          <Text fontSize="22px" fontWeight="700" lineHeight="100%">
            Order Management
          </Text>
        </Flex>

        <Flex justifyContent="space-between" mb="20px">
          <Input
            allowClear
            placeholder="Search order by order id, name, phone, email"
            value={searchTerm}
            onChange={(e) => {
              setSearchTerm(e.target.value);
            }}
            style={{ width: '48%', height: '40px' }}
          />

          <Select
            placeholder="Filter by Status"
            value={status}
            onChange={(value: string) => {
              setStatus(value);
            }}
            allowClear
            style={{ width: '23%', height: '40px' }}
          >
            <Option value="Pending">Pending</Option>
            <Option value="Processing">Processing</Option>
            <Option value="Shipped">Shipped</Option>
            <Option value="Delivered">Delivered</Option>
            <Option value="Cancelled">Cancelled</Option>
            <Option value="Completed">Completed</Option>
          </Select>

          <Select
            placeholder="Filter by Payment Method"
            value={paymentMethod}
            onChange={(value: string) => {
              setPaymentMethod(value);
            }}
            allowClear
            style={{ width: '23%', height: '40px' }}
          >
            <Option value="PayPal">PayPal</Option>
            <Option value="CreditCard">Credit Card</Option>
          </Select>
        </Flex>

        {loading ? (
          <Flex justifyContent="center" mt="20px">
            <CircularProgress isIndeterminate color="blue.300" />
          </Flex>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={feedbacks}
              pagination={false}
              rowKey={(record: Feedback) => record.id}
              style={{ width: '100%', cursor: 'pointer' }}
            />

            <Pagination
              current={currentPage+1}
              total={totalPages}
              pageSize={limit}
              onChange={handlePageChange}
              pageSizeOptions={[3,4,5,7,10]}
              //@ts-ignore
              onShowSizeChange={(current, pageSize) => setLimit(pageSize)}
              style={{ marginTop: '20px', textAlign: 'center' }}
            />
          </>
        )}
         <OrderDetailModal
          visible={isModalVisible}
          onClose={() => {setIsModalVisible(false); refetch()}}
          order={selectedFeedback}
        /> 
      </CustomCard>
    </Box>
  );
}
