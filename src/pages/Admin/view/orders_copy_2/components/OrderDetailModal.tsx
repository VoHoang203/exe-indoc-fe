import React, { useState, useEffect } from 'react';
import { Button, Modal, Steps, message } from 'antd';
import { Feedback } from '../index';
import { Textarea } from '@chakra-ui/react';
import http from '../../../../../utils/http';

const { Step } = Steps;

// Interface for customer information
// interface CustomerInfo {
//   name: string;
//   email: string;
//   phone?: string;
//   address: string;
// }

// Interface for order details
// interface OrderDetail {
//   productId: string;
//   name: string;
//   colors: string;
//   image: string;
//   quantity: number;
//   price: number;
// }

// Interface for the main order
// interface Order {
//   _id: string;
//   code: string;
//   date: string;
//   status: string;
//   totalPrice: number;
//   shippingMethod: string;
//   shippingCharge: number;
//   discount: number;
//   note?: string;
//   orderDetail: OrderDetail[];
//   infoCustomer: CustomerInfo;
// }

// Interface for the modal props
interface OrderDetailModalProps {
  visible: boolean;
  onClose: () => void;
  order: Feedback | null; // Use 'Order' type or null for the initial state
}

const statusSteps = [
  'unsovled',
  'resolved',
];

const generateStatus = (status: string) => {
  let color = '';
  switch (status) {
    case 'unsovled':
      color = '#FF9900'; // Orange
      break;
    case 'resolved':
      color = '#008080'; // Teal
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
        backgroundColor: `${color}20`, // Light background color
        textAlign: 'center',
        display: 'inline-block',
      }}
    >
      {status}
    </span>
  );
};

const OrderDetailModal2: React.FC<OrderDetailModalProps> = ({
  visible,
  onClose,
  order,
}) => {
  const [currentStatus, setCurrentStatus] = useState<string>(
    order?.status || '',
  );
  const currentStatusIndex = statusSteps.indexOf(currentStatus);

  useEffect(() => {
    if (order) {
      setCurrentStatus(order.status);
    }
  }, [order]);
  const solveFeedback = async () => {
    if (!order?.id) return;
    message.loading('Loading...');
    try {
      const response = await http.post('/admin/feedback/solved', {
        feedbackId: order?.id,
      });

      if (response.status === 200) {
        setCurrentStatus(response.data.status);
        message.success('Feedback resolved successfully.');
        
      } else {
        message.error('Failed to resolve feedback.');
      }
    } catch (error) {
      message.error('An error occurred while resolving feedback.');
      console.error(error);
    }
    message.destroy();
  };

  const handleStatusClick = async () => {
    try {
      solveFeedback();
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <Modal
      title={`Order Details: Nội dung chi tiết feedback`}
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
      key={order?.id}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
          Email khách hàng: {order?.email}
        </h2>
        {generateStatus(currentStatus)}
      </div>
      

      <div style={{ marginBottom: '2rem', marginTop: '2rem' }}>
        <Steps current={currentStatusIndex} size="small">
          {statusSteps.map((status) => (
            <Step
              key={status}
              title={status}
              onClick={() => handleStatusClick()}
              style={{
                cursor: 'pointer',
              }}
            />
          ))}
        </Steps>
      </div>

      
      <div
        style={{
          border: '1px solid #E5E7EB',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginTop: '1rem',
        }}
      >
        <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
          Chi tiết feedback
        </h3>
        <Textarea value={order?.feedback}/>
        <div className="mt-4">
          Feedback ID: {order?.id}
        </div>
      </div>

      
      <Button onClick={onClose}>Đóng</Button>
    </Modal>
  );
};

export default OrderDetailModal2;
