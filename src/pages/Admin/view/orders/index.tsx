import{ useState, useCallback } from 'react';
import { Box, Flex, CircularProgress, Text } from '@chakra-ui/react';
import { Table, Pagination, Button, Input, Select } from 'antd';
import OrderDetailModal from './components/OrderDetailModal';
import CustomCard from '../../../../components/card/Card';

const { Option } = Select;

// Define Order Interface
interface Order {
  _id: string;
  code: string;
  date: string;
  paymentMethod: string;
  totalPrice: number;
  status: string;
  orderDetail: {
    productId: string;
    name: string;
    image: string;
    price: number;
    quantity: number;
    colors: string;
  }[];
  infoCustomer: {
    userId: string;
    name: string;
    email: string;
    address: string;
    phone: string;
  };
  shippingMethod: string; // Add this property
  shippingCharge: number; // Add this property
  discount: number; // Add this property
}

// Define OrderDetailModalProps Interface
// interface OrderDetailModalProps {
//   visible: boolean;
//   onClose: () => void;
//   order: Order | null;
// }

const mockData = {
  orders: [
    {
      _id: 'order1',
      code: 'ORD52995076',
      date: '2024-09-27T18:31:07.070Z',
      paymentMethod: 'PayPal',
      totalPrice: 71.35,
      status: 'Pending',
      shippingMethod: 'Standard Shipping',
      shippingCharge: 5.99,
      discount: 2.5,
      orderDetail: [
        {
          productId: 'prod1', // Ensure this field is present
          name: 'Student ID card lanyard',
          image: 'https://via.placeholder.com/50',
          price: 10.5,
          quantity: 6,
          colors: 'Yellow',
          _id: '66f6f9ebe4daa97252980ed7',
        },
      ],
      infoCustomer: {
        userId: '66f6c117237f525066ff8c03',
        name: 'Jonh Doe',
        email: 'jonh@gmail.com',
        address: 'Ho Chi Minh, Vietnam',
        phone: '0123456789',
        _id: 'user1',
      },
    },
  ],
  currentPage: 1,
  totalPages: 2,
  totalOrders: 3,
};

// Status Colors
const generateStatus = (status: string) => {
  let color = '';
  switch (status) {
    case 'Pending':
      color = '#FF9900';
      break;
    case 'Processing':
      color = '#0000FF';
      break;
    case 'Shipped':
      color = '#800080';
      break;
    case 'Delivered':
      color = '#008000';
      break;
    case 'Cancelled':
      color = '#FF0000';
      break;
    case 'Completed':
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
const generatePaymentMethod = (method: string) => {
  switch (method) {
    case 'PayPal':
      return (
        <img
          src="https://www.paypalobjects.com/webstatic/icon/pp258.png"
          alt="PayPal"
          width="50"
        />
      );
    case 'CreditCard':
      return (
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/4/41/Visa_Logo.png"
          alt="Credit Card"
          width="50"
        />
      );
    default:
      return <span>{method}</span>;
  }
};

export default function OrderManagement() {
  const [orders, setOrders] = useState<Order[]>(mockData.orders);
  const [currentPage, setCurrentPage] = useState<number>(mockData.currentPage);
  const [totalPages] = useState<number>(mockData.totalPages);
  const [loading, setLoading] = useState<boolean>(false);
  const [searchTerm, setSearchTerm] = useState<string>('');
  const [status, setStatus] = useState<string>('');
  const [paymentMethod, setPaymentMethod] = useState<string>('');
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [isModalVisible, setIsModalVisible] = useState<boolean>(false);
  const limit = 5;

  // Fetch Orders Data
  const fetchOrdersData = useCallback(
    (search: string = searchTerm, status?: string, paymentMethod?: string) => {
      setLoading(true);
      let filteredOrders = mockData.orders;

      if (search) {
        filteredOrders = filteredOrders.filter(
          (order) =>
            order.code.includes(search) ||
            order.infoCustomer.name.includes(search) ||
            order.infoCustomer.phone.includes(search) ||
            order.infoCustomer.email.includes(search),
        );
      }

      if (status) {
        filteredOrders = filteredOrders.filter(
          (order) => order.status === status,
        );
      }

      if (paymentMethod) {
        filteredOrders = filteredOrders.filter(
          (order) => order.paymentMethod === paymentMethod,
        );
      }

      setTimeout(() => {
        setOrders(filteredOrders);
        setLoading(false);
      }, 500);
    },
    [searchTerm, status, paymentMethod],
  );

  // Change Page
  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  // View Order Details
  const handleViewDetail = (order: Order) => {
    setSelectedOrder(order);
    setIsModalVisible(true);
  };

  // Define Columns
  const columns = [
    {
      title: 'Ordered By',
      dataIndex: 'infoCustomer',
      key: 'infoCustomer',
      render: (infoCustomer: Order['infoCustomer']) => infoCustomer.name,
    },
    {
      title: 'Phone',
      dataIndex: 'infoCustomer',
      key: 'infoCustomer',
      render: (infoCustomer: Order['infoCustomer']) => infoCustomer.phone,
    },
    {
      title: 'Email',
      dataIndex: 'infoCustomer',
      key: 'infoCustomer',
      render: (infoCustomer: Order['infoCustomer']) => infoCustomer.email,
    },
    {
      title: 'Order ID',
      dataIndex: 'code',
      key: 'code',
    },
    {
      title: 'Date',
      dataIndex: 'date',
      key: 'date',
      render: (text: string) => new Date(text).toLocaleDateString(),
    },
    {
      title: 'Total Cost',
      dataIndex: 'totalPrice',
      key: 'totalPrice',
      render: (price: number) => `$${price.toFixed(2)}`,
    },
    {
      title: 'Status',
      dataIndex: 'status',
      key: 'status',
      align: 'center' as 'center',
      render: (status: string) => generateStatus(status),
    },
    {
      title: 'Payment Method',
      dataIndex: 'paymentMethod',
      key: 'paymentMethod',
      align: 'center' as 'center',
      render: (method: string) => generatePaymentMethod(method),
    },
    {
      title: 'Actions',
      key: 'actions',
      align: 'center' as 'center',
      // @ts-ignore
      render: (text: any, record: Order) => (
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
              fetchOrdersData(e.target.value, status, paymentMethod);
            }}
            style={{ width: '48%', height: '40px' }}
          />

          <Select
            placeholder="Filter by Status"
            value={status}
            onChange={(value: string) => {
              setStatus(value);
              fetchOrdersData(searchTerm, value, paymentMethod);
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
              fetchOrdersData(searchTerm, status, value);
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
              dataSource={orders}
              pagination={false}
              rowKey={(record: Order) => record._id}
              style={{ width: '100%', cursor: 'pointer' }}
            />

            <Pagination
              current={currentPage}
              total={totalPages * limit}
              pageSize={limit}
              onChange={handlePageChange}
              style={{ marginTop: '20px', textAlign: 'center' }}
            />
          </>
        )}
        <OrderDetailModal
          visible={isModalVisible}
          onClose={() => setIsModalVisible(false)}
          order={selectedOrder}
        />
      </CustomCard>
    </Box>
  );
}
