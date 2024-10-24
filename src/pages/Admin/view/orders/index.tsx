import{ useState, useEffect } from 'react';
import { Box, Flex, CircularProgress, Text } from '@chakra-ui/react';
//@ts-ignore
import { Table, Pagination, Button, Input, Select, message, Popconfirm } from 'antd';

import CustomCard from '../../../../components/card/Card';
import http from '../../../../utils/http';
import {useQuery  } from '@tanstack/react-query';
import { formatCurrency } from '../../../Payment/Payment';

// const { Option } = Select;

// Define Order Interface
// interface Order {
//   _id: string;
//   code: string;
//   date: string;
//   paymentMethod: string;
//   totalPrice: number;
//   status: string;
//   orderDetail: {
//     productId: string;
//     name: string;
//     image: string;
//     price: number;
//     quantity: number;
//     colors: string;
//   }[];
//   infoCustomer: {
//     userId: string;
//     name: string;
//     email: string;
//     address: string;
//     phone: string;
//   };
//   shippingMethod: string; // Add this property
//   shippingCharge: number; // Add this property
//   discount: number; // Add this property
// }

// Define OrderDetailModalProps Interface
// interface OrderDetailModalProps {
//   visible: boolean;
//   onClose: () => void;
//   order: Order | null;
// }
interface Withdrawal {
  withdrawalsId: string;
  requestedAmount: string;
  actualReceivedAmount: string;
  status: string;
  createdAt: string;
  userId: string;
  userEmail: string;
  bankName: string;
  bankOwnerName: string;
  bankAccountNumber: string;
}
interface WithdrawalResponse {
  data: Withdrawal[];
  total: number;
  page: number;
  limit: number;
}


export default function OrderManagement() {
  const [currentPage, setCurrentPage] = useState<number>(0);
  
  const [searchTerm, setSearchTerm] = useState<string>('');
  // const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  //@ts-ignore
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const [limit, setLimit] = useState<number>(2);
  const fetchWithdrawals = async (page: number, limit: number): Promise<WithdrawalResponse> => {
    const response = await http.get<WithdrawalResponse>(`/admin/withdrawals?page=${page}&limit=${limit}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem('admin_token')}`, // Include the token in the headers
      },
    });
    return response.data; // Return the response data
  };
  const { data:mockData, isLoading, refetch } = useQuery<WithdrawalResponse, Error>({
    queryKey: ['withdrawals', currentPage, limit],
    queryFn: () => fetchWithdrawals(currentPage, limit),
  });
  const [withdrawal, setWithdrawal] = useState<Withdrawal[]>(mockData?.data || []);
  console.log(mockData);
  //@ts-ignore
  const [processedWithdrawals, setProcessedWithdrawals] = useState<Set<string>>(new Set());
  const [totalPages,setTotalPages] = useState<number>(mockData?.total || 0);
  
  useEffect(() => {
    if (mockData) {
      setWithdrawal(mockData.data); 
      setTotalPages(mockData.total);
    }
    if(isLoading){
      message.loading('Loading...');
    }else{
      message.destroy();
    }
  }, [isLoading,mockData,limit,currentPage]);
 
  const handlePageChange = (page: number) => {
    setWithdrawal([])
    setCurrentPage(page);
  };

  // View Order Details
  const handleViewDetail = () => {
    //setSelectedOrder(order);
    setIsModalVisible(true);
  };
  
  const toggleWithdrawalStatus = async (withdrawalsId: string) => {
    console.log(withdrawalsId)
    try {
      const response = await http.post('/admin/withdrawals/solved', {
        "withdrawalsId":withdrawalsId ,
      });
  
      if (response.status === 200) {
        message.success('Withdrawal request processed successfully.');
      } else {
        message.error('Failed to process the withdrawal request.');
      }
    } catch (error) {
      message.error('An error occurred while processing the request.');
      console.error(error);
    }
  };
  // Define Columns
  const columns = [
    {
      title: 'No',
      key: 'index',
      render: (_: any, __: any, index: number) => index + 1,
    },
    {
      title: 'Requested Amount',
      dataIndex: 'requestedAmount',
      key: 'requestedAmount',
      render: (amount: string) => `${formatCurrency( parseFloat(amount)) } VND`, // Format as currency
    },
    {
      title: 'Actual Received Amount',
      dataIndex: 'actualReceivedAmount',
      key: 'actualReceivedAmount',
      render: (amount: string) => `${formatCurrency( parseFloat(amount))} VND`, // Format as currency
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
    },
    {
      title: 'Created At',
      dataIndex: 'createdAt',
      key: 'createdAt',
      render: (text: string) => new Date(text).toLocaleString(), // Format date
    },
    {
      title: 'User Email',
      dataIndex: 'userEmail',
      key: 'userEmail',
    },
    {
      title: 'Bank Name',
      dataIndex: 'bankName',
      key: 'bankName',
    },
    {
      title: 'Bank Owner Name',
      dataIndex: 'bankOwnerName',
      key: 'bankOwnerName',
    },
    {
      title: 'Bank Account Number',
      dataIndex: 'bankAccountNumber',
      key: 'bankAccountNumber',
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center' as 'center',
      //@ts-ignore
      render: (text: any, record: any) => (
        <Button onClick={() => handleViewDetail()}>Detail</Button>
      ),
    }, {
      title: 'Action',
      dataIndex: 'status',
      key: 'status',
      render: (record: Withdrawal) => (
        <Popconfirm
      title="Are you sure you want to process this withdrawal?"
      onConfirm={() => toggleWithdrawalStatus(record.withdrawalsId)}
      okText="Yes"
      cancelText="No"
    >
      {/* Make sure record.status exists here */}
      <Button
        disabled={record.status === 'approved'}
        onClick={async () => {
          await toggleWithdrawalStatus(record.withdrawalsId);
          refetch(); // Refetch data after processing
        }}
      >
        Process
      </Button>
    </Popconfirm>
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
          <Text fontSize="22px" fontWeight="700" lineHeight="100%">
            Withdraw Management
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
        </Flex>

        {isLoading ? (
          <Flex justifyContent="center" mt="20px">
            <CircularProgress isIndeterminate color="blue.300" />
          </Flex>
        ) : (
          <>
            <Table
              columns={columns}
              dataSource={withdrawal}
              pagination={false}
              rowKey={(record: Withdrawal) => record.withdrawalsId}
              style={{ width: '100%', cursor: 'pointer' }}
            />

            <Pagination
              current={currentPage}
              total={totalPages}
              pageSize={limit}
              onChange={handlePageChange}
              pageSizeOptions={[2,5,10]}
              showSizeChanger
              //@ts-ignore
              onShowSizeChange={(current, pageSize) => setLimit(pageSize)}
              style={{ marginTop: '20px', textAlign: 'center' }}
            />
          </>
        )}
        {/* <OrderDetailModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          order={selectedOrder}
        /> */}
      </CustomCard>
    </Box>
  );
}
