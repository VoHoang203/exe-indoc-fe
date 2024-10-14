import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import qrCodeImage from '../../assets/qrcode-default2.jpg'
interface PaymentDetailsProps {
  bank: string;
  accountNumber: string;
  accountName: string;
  amount?: number;
  note?: string;
  qrCodeSrc?: string;
  expirationTime: number;
}

const PaymentDetails: React.FC<PaymentDetailsProps> = ({
  bank,
  accountNumber,
  accountName,
  expirationTime,
}) => {
    const order_url = localStorage.getItem('order_url');
    const navigate = useNavigate();
    const [countdown, setCountdown] = useState(expirationTime);
    useEffect(() => {
        const timer = setInterval(() => {
          setCountdown((prevCountdown) => {
            if (prevCountdown <= 1) {
              clearInterval(timer);
              navigate('/profile');
              return 0;
            }
            return prevCountdown - 1;
          });
        }, 1000);
    
        return () => clearInterval(timer); 
      }, [navigate]);
      const formatCountdown = (seconds: number) => {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = seconds % 60;
        return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
      };
  return (
    <div className="flex  items-center h-screen bg-white p-6 rounded-lg shadow-md w-full max-w-xxl mx-auto mt-10 mb-6">
      

      <div className="text-center w-1/2 items-center">
        <img src={order_url || qrCodeImage} alt="VietQR Code" className="w-56 h-4/5 mb-4 mx-auto" />
        <p className="text-sm text-gray-500 mb-6">Thời gian hết hạn: <span className="text-red-500">{formatCountdown(countdown)}</span></p>

        <button  onClick={() => {
            const link = document.createElement('a');
            link.href = order_url || qrCodeImage;
            link.download = 'qrcode.jpg';
            link.click();
          }}
        className="bg-blue-500 hover:bg-blue-600 text-white text-sm font-medium py-2 px-4 rounded mb-8">
          TẢI XUỐNG QR CODE
        </button>
      </div>
<div className="w-1/2">
      <div className="w-full flex flex-col space-y-4 mb-8">
        <div className="flex justify-between">
          <p className="text-gray-600">Ngân Hàng:</p>
          <p className="font-semibold">{bank}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Số Tài Khoản:</p>
          <p className="font-semibold">{accountNumber}</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Tên Tài Khoản:</p>
          <p className="font-semibold">{accountName}</p>
        </div>
        {/* <div className="flex justify-between">
          <p className="text-gray-600">Số tiền:</p>
          <p className="font-semibold text-green-500">{amount.toLocaleString()} VND</p>
        </div>
        <div className="flex justify-between">
          <p className="text-gray-600">Nội dung chuyển khoản:</p>
          <p className="font-semibold text-red-500">{note}</p>
        </div> */}
      </div>

      <div className="bg-blue-100 text-blue-800 p-4 rounded-md mb-8 text-center ">
        <p ><strong>CHÚ Ý:</strong> Vui lòng điền nội dung chuyển khoản, nếu không sẽ không cộng điểm.</p>
      </div>

      <div className="bg-blue-200 text-blue-900 p-4 rounded-md text-left text-sm">
        <p className="font-semibold mb-2">Lưu ý</p>
        <ol className="list-decimal list-inside space-y-1">
          <li>Quét mã QR hoặc chọn phương thức chuyển tiền nhanh 24/7</li>
          <li>Nhập chính xác số tài khoản nhận, số tiền và nội dung yêu cầu từ hệ thống.</li>
          <li>Lưu lại biên lai giao dịch để đối chiếu khi cần thiết.</li>
        </ol>
        <p className="mt-2">Nếu không thể sử dụng mã QR, vui lòng sao chép thông tin bên dưới để chuyển tiền.</p>
      </div>
      </div>
    </div>
  );
};

export default PaymentDetails;