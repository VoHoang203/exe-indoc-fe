import React, { useState, useEffect } from 'react';
import { Modal, Steps, message } from 'antd';

const { Step } = Steps;

// Interface for customer information
interface CustomerInfo {
  name: string;
  email: string;
  phone?: string;
  address: string;
}

// Interface for order details
interface OrderDetail {
  productId: string;
  name: string;
  colors: string;
  image: string;
  quantity: number;
  price: number;
}

// Interface for the main order
interface Order {
  _id: string;
  code: string;
  date: string;
  status: string;
  totalPrice: number;
  shippingMethod: string;
  shippingCharge: number;
  discount: number;
  note?: string;
  orderDetail: OrderDetail[];
  infoCustomer: CustomerInfo;
}

// Interface for the modal props
interface OrderDetailModalProps {
  visible: boolean;
  onClose: () => void;
  order: Order | null; // Use 'Order' type or null for the initial state
}

const statusSteps = [
  'Pending',
  'Processing',
  'Shipped',
  'Delivered',
  'Completed',
  'Cancelled',
];

const generateStatus = (status: string) => {
  let color = '';
  switch (status) {
    case 'Pending':
      color = '#FF9900'; // Orange
      break;
    case 'Processing':
      color = '#0000FF'; // Blue
      break;
    case 'Shipped':
      color = '#800080'; // Purple
      break;
    case 'Delivered':
      color = '#008000'; // Green
      break;
    case 'Cancelled':
      color = '#FF0000'; // Red
      break;
    case 'Completed':
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

const OrderDetailModal: React.FC<OrderDetailModalProps> = ({
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

  const handleStatusClick = async (status: string) => {
    try {
      setCurrentStatus(status);
      message.success(`Order status updated to ${status}`);
    } catch (error: any) {
      message.error(error.response?.data?.message || 'Failed to update status');
    }
  };

  return (
    <Modal
      title={`Order Details: ${order?.code}`}
      visible={visible}
      onCancel={onClose}
      footer={null}
      width={1000}
      key={order?._id}
    >
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
        }}
      >
        <h2 style={{ fontSize: '1.25rem', fontWeight: '600' }}>
          Order ID: {order?.code}
        </h2>
        {generateStatus(currentStatus)}
      </div>
      <p style={{ color: '#6B7280' }}>
        {order ? new Date(order.date).toLocaleString() : ''}
      </p>

      <div style={{ marginBottom: '2rem', marginTop: '2rem' }}>
        <Steps current={currentStatusIndex} size="small">
          {statusSteps.map((status) => (
            <Step
              key={status}
              title={status}
              onClick={() => handleStatusClick(status)}
              style={{
                cursor: 'pointer',
              }}
            />
          ))}
        </Steps>
      </div>

      {/* Order Items */}
      <div
        style={{
          border: '1px solid #E5E7EB',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginTop: '1rem',
        }}
      >
        <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
          Order Items
        </h3>
        {order?.orderDetail.map((item) => (
          <div
            key={item.productId}
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              marginBottom: '1rem',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
              <img
                src={item.image}
                alt={item.name}
                style={{
                  width: '80px',
                  height: '80px',
                  objectFit: 'cover',
                  borderRadius: '0.5rem',
                }}
              />
              <div>
                <p style={{ fontWeight: '600' }}>{item.name}</p>
                <p style={{ fontSize: '0.875rem', color: '#6B7280' }}>
                  Color: {item.colors}
                </p>
              </div>
            </div>
            <div>
              <p style={{ color: '#6B7280' }}>x{item.quantity}</p>
              <p style={{ fontWeight: '600' }}>${item.price.toFixed(2)}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Order Summary */}
      <div
        style={{
          border: '1px solid #E5E7EB',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginTop: '1rem',
        }}
      >
        <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
          Order Summary
        </h3>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
          }}
        >
          <p>Subtotal</p>
          <p>
            $
            {(
              order?.totalPrice -
              order?.shippingCharge +
              order?.discount
            ).toFixed(2)}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
          }}
        >
          <p>Coupon Discount</p>
          <p>- ${order?.discount.toFixed(2)}</p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            marginBottom: '0.5rem',
          }}
        >
          <p>Shipping</p>
          <p>
            {order?.shippingMethod} ${order?.shippingCharge.toFixed(2)}
          </p>
        </div>
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            fontWeight: '700',
            fontSize: '1.125rem',
          }}
        >
          <p>Total</p>
          <p>${order?.totalPrice.toFixed(2)}</p>
        </div>
      </div>

      {/* Notes */}
      <div
        style={{
          border: '1px solid #E5E7EB',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginTop: '1rem',
        }}
      >
        <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>Notes</h3>
        <p>{order?.note || 'No special instructions'}</p>
      </div>

      {/* Customer Information */}
      <div
        style={{
          border: '1px solid #E5E7EB',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginTop: '1rem',
        }}
      >
        <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
          Customer Information
        </h3>
        <div style={{ display: 'flex', justifyContent: 'space-between' }}>
          <div>
            <p>
              <strong>Customer:</strong> {order?.infoCustomer.name}
            </p>
            <p>
              <strong>Email:</strong> {order?.infoCustomer.email}
            </p>
          </div>
          <div>
            <p>
              <strong>Phone:</strong>{' '}
              {order?.infoCustomer.phone || 'No phone number'}
            </p>
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div
        style={{
          border: '1px solid #E5E7EB',
          borderRadius: '0.5rem',
          padding: '1rem',
          marginTop: '1rem',
        }}
      >
        <h3 style={{ fontWeight: '600', marginBottom: '0.5rem' }}>
          Shipping Address
        </h3>
        <p>{order?.infoCustomer.name}</p>
        <p>{order?.infoCustomer.address}</p>
        <p>{order?.infoCustomer.phone}</p>
      </div>
    </Modal>
  );
};

export default OrderDetailModal;
