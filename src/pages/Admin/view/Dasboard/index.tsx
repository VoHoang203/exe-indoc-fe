/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  // Box,
  Icon,
  SimpleGrid,
  useColorModeValue,
  Text,
  Button,
  Flex,
  Box,
} from '@chakra-ui/react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from 'recharts';
import { Table, DatePicker, Select } from 'antd';
import React, { useState } from 'react';
import {
  MdAttachMoney,
  MdPeople,
  MdStore,
  MdShoppingCart,
} from 'react-icons/md';
import dayjs, { Dayjs } from 'dayjs';
import CustomCard from '../../../../components/card/Card';
import MiniStatistics from '../../../../components/card/MiniStatistics';
import { formatCurrency } from '../../../../utils/formatCurrency';
import IconBox from '../../../../components/icons/IconBox';

const { Option } = Select;
const { RangePicker } = DatePicker;

// Định nghĩa kiểu dữ liệu cho các trạng thái thống kê
interface Statistic {
  totalUsers: number;
  totalProducts: number;
  totalOrders: number;
  revenueToday: number;
  revenueThisMonth: number;
  revenueThisYear: number;
  monthlyChange: number;
  dailyChange: number;
  yearlyChange: number;
}

interface Revenue {
  _id: string;
  totalRevenue: number;
}

interface ProductSold {
  _id: string;
  image: string;
  name: string;
  totalQuantitySold: number;
}

interface StatisticsTime {
  revenue: Revenue[];
  productsSold: ProductSold[];
}

export default function Dasboard() {
  const [statistics] = useState<Statistic>({
    totalUsers: 15,
    totalProducts: 25,
    totalOrders: 35,
    revenueToday: 213,
    revenueThisMonth: 561.22,
    revenueThisYear: 1156.78,
    monthlyChange: 25.5,
    dailyChange: -15.2,
    yearlyChange: 20.1,
  });

  const [statisticsTime] = useState<StatisticsTime>({
    revenue: [
      { _id: '2024-09-01', totalRevenue: 4500 },
      { _id: '2024-09-02', totalRevenue: 6700 },
      { _id: '2024-09-03', totalRevenue: 8200 },
      { _id: '2024-09-04', totalRevenue: 5000 },
    ],
    productsSold: [
      {
        _id: '1',
        image: 'https://via.placeholder.com/50',
        name: 'Product A',
        totalQuantitySold: 10,
      },
      {
        _id: '2',
        image: 'https://via.placeholder.com/50',
        name: 'Product B',
        totalQuantitySold: 5,
      },
      {
        _id: '3',
        image: 'https://via.placeholder.com/50',
        name: 'Product C',
        totalQuantitySold: 8,
      },
    ],
  });

  const [dateRange, setDateRange] = useState<[Dayjs, Dayjs]>([
    dayjs(),
    dayjs(),
  ]);
  const [type, setType] = useState<string>('day');

  const handleTypeChange = (value: string) => {
    setType(value);
    setDateRange([dayjs(), dayjs()]);
  };

  const handleDateChange = (dates: any) => {
    if (dates) {
      setDateRange(dates);
    } else {
      setDateRange([dayjs(), dayjs()]);
    }
  };

  const columns = [
    {
      title: 'Product Image',
      dataIndex: 'image',
      key: 'image',
      render: (image: string) => (
        <img
          src={image}
          alt="product"
          width="50"
          height="50"
          style={{ borderRadius: '25%' }}
        />
      ),
    },
    {
      title: 'Product Name',
      dataIndex: 'name',
      key: 'name',
    },
    {
      title: 'Quantity Sold',
      dataIndex: 'totalQuantitySold',
      key: 'totalQuantitySold',
    },
  ];

  // Chakra Color Mode
  const brandColor = useColorModeValue('brand.500', 'white');
  const boxBg = useColorModeValue('secondaryGray.300', 'whiteAlpha.100');
  const textColor = useColorModeValue('secondaryGray.900', 'white');

  return (
    <>
      <Box pt={{ base: '130px', md: '80px', xl: '80px' }}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 3, '2xl': 6 }}
          gap="20px"
          mb="20px"
        >
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={<Icon w="32px" h="32px" as={MdPeople} color={brandColor} />}
              />
            }
            content=""
            name="Total users"
            value={statistics.totalUsers}
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={<Icon w="32px" h="32px" as={MdStore} color={brandColor} />}
              />
            }
            content=""
            name="Total products"
            value={statistics.totalProducts}
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon
                    w="32px"
                    h="32px"
                    as={MdShoppingCart}
                    color={brandColor}
                  />
                }
              />
            }
            content=""
            name="Total orders"
            value={statistics.totalOrders}
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
                }
              />
            }
            name="Daily Revenue"
            value={formatCurrency(statistics.revenueToday)}
            growth={statistics.dailyChange.toFixed(2)}
            content="since yesterday"
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
                }
              />
            }
            name="Monthly revenue"
            value={formatCurrency(statistics.revenueThisMonth)}
            growth={statistics.monthlyChange.toFixed(2)}
            content="since last month"
          />
          <MiniStatistics
            startContent={
              <IconBox
                w="56px"
                h="56px"
                bg={boxBg}
                icon={
                  <Icon w="32px" h="32px" as={MdAttachMoney} color={brandColor} />
                }
              />
            }
            name="Yearly revenue"
            value={formatCurrency(statistics.revenueThisYear)}
            growth={statistics.yearlyChange.toFixed(2)}
            content="since last year"
          />
        </SimpleGrid>

        <CustomCard
          flexDirection={'column'}
          w="100%"
          px="25px"
          overflowX={{ sm: 'scroll', lg: 'hidden' }}
          mb="20px"
        >
          <Flex justify="space-between" align="center" mb="20px">
            <RangePicker
              onChange={handleDateChange}
              value={dateRange}
              style={{ marginRight: '20px' }}
            />
            <Select
              defaultValue="day"
              style={{ width: 120, marginRight: '20px' }}
              onChange={handleTypeChange}
            >
              <Option value="day">Day</Option>
              <Option value="month">Month</Option>
            </Select>
            <Button colorScheme="blue">Calculate</Button>
          </Flex>
        </CustomCard>

        <CustomCard
          flexDirection={'column'}
          w="100%"
          px="25px"
          overflowX={{ sm: 'scroll', lg: 'hidden' }}
        >
          <Text
            lineHeight="100%"
            color={textColor}
            fontSize={{
              base: 'xl',
            }}
            fontWeight={'bold'}
            mb={5}
          >
            Revenue Over Time
          </Text>

          <ResponsiveContainer width="100%" height={300}>
            <LineChart
              data={statisticsTime.revenue || []}
              margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="_id" />
              <YAxis />
              <Tooltip />
              <Line
                type="monotone"
                dataKey="totalRevenue"
                stroke="#8884d8"
                activeDot={{ r: 8 }}
              />
            </LineChart>
          </ResponsiveContainer>

          <Text
            lineHeight="100%"
            color={textColor}
            fontSize={{
              base: 'xl',
            }}
            fontWeight={'bold'}
            mt={5}
            mb={4}
          >
            Products Sold
          </Text>
          <Table
            dataSource={statisticsTime.productsSold || []}
            columns={columns}
            rowKey="_id"
          />
        </CustomCard>
      </Box>
    </>
  );
}
