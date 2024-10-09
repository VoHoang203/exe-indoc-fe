import React, { useState } from 'react';
import payment from '../../assets/payment_indoc.png';
import { useLocation } from 'react-router-dom';
import { Document } from '../ListItem/ListItems';
import { getAccessToken } from '../../utils/auth';
import { useAuth, User } from '../../context/app.context';
import http from '../../utils/http';

// Types
type BankOption = 'Vietcombank' | 'Techcombank' | 'VPBank';
type PaymentMethod = 'Visa' | 'ZaloPay';

interface CardInfo {
  cardNumber: string;
  expiryDate: string;
  cardholderName: string;
  cvv: string;
}

interface PaymentInfo {
  amount: number;
  transactionId: string;
  content: string;
}
export function formatCurrency(currency: number) {
  return Intl.NumberFormat('vi-VN', { minimumFractionDigits: 0 }).format(currency);
}
// BankPopUp Component
const BankPopUp: React.FC<{ onClose: () => void; onSelect: (bank: BankOption) => void }> = ({ onClose, onSelect }) => {
  const [selectedBank, setSelectedBank] = useState<BankOption | null>(null);

  const handleSelect = () => {
    if (selectedBank) {
      onSelect(selectedBank);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-sm">
        <h3 className="text-lg font-bold mb-4">Chọn ngân hàng</h3>
        <ul className="space-y-2">
          {['Vietcombank', 'Techcombank', 'VPBank'].map((bank) => (
            <li key={bank}>
              <label className="cursor-pointer flex items-center space-x-2">
                <input
                  type="radio"
                  name="bank"
                  value={bank}
                  checked={selectedBank === bank}
                  onChange={() => setSelectedBank(bank as BankOption)}
                  className="form-radio"
                />
                <span>{bank}</span>
              </label>
            </li>
          ))}
        </ul>
        <div className="mt-6 flex justify-end space-x-2">
          <button className="py-2 px-4 bg-gray-300 rounded-lg" onClick={onClose}>Hủy</button>
          <button className="py-2 px-4 bg-red-500 text-white rounded-lg" onClick={handleSelect}>Chọn</button>
        </div>
      </div>
    </div>
  );
};

// ConfirmPayment Component
const ConfirmPayment: React.FC<{ paymentInfo: PaymentInfo }> = ({ paymentInfo }) => {
  const [cardInfo, setCardInfo] = useState<CardInfo>({
    cardNumber: '',
    expiryDate: '',
    cardholderName: '',
    cvv: '',
  });
  const [saveInfo, setSaveInfo] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCardInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle payment submission
    console.log('Payment submitted', { cardInfo, saveInfo });
  };

  return (
    <div className="container mx-auto mt-10 p-8 max-w-6xl">
      <div className="flex gap-6">
        <div className="w-3/5 p-6 bg-white shadow-lg rounded-lg">
          <h2 className="font-semibold text-xl mb-6">Nhập thông tin thẻ</h2>
          <form onSubmit={handleSubmit}>
            <div className="grid grid-cols-2 gap-4">
              <div className="input-wrapper">
                <input
                  type="text"
                  name="cardNumber"
                  placeholder="Nhập số thẻ"
                  value={cardInfo.cardNumber}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-lg w-5/6"
                />
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="expiryDate"
                  placeholder="Ngày hết hạn"
                  value={cardInfo.expiryDate}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-lg w-5/6"
                />
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="cardholderName"
                  placeholder="Nhập tên trên thẻ"
                  value={cardInfo.cardholderName}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-lg w-5/6"
                />
              </div>
              <div className="input-wrapper">
                <input
                  type="text"
                  name="cvv"
                  placeholder="Số CVV"
                  value={cardInfo.cvv}
                  onChange={handleInputChange}
                  className="border border-gray-300 p-2 rounded-lg w-5/6"
                />
              </div>
            </div>
            <div className="mt-6 flex items-center">
              <input
                type="checkbox"
                id="save-info"
                checked={saveInfo}
                onChange={(e) => setSaveInfo(e.target.checked)}
                className="mr-2"
              />
              <label htmlFor="save-info" className="text-gray-600">Lưu thông tin cho lần thanh toán sau</label>
            </div>
            <button type="submit" className="mt-6 bg-red-500 text-white py-2 px-6 rounded-lg">Thanh toán</button>
          </form>
        </div>
        <div className="w-2/5 flex flex-col justify-between">
          <div className="p-6 bg-white shadow-lg rounded-lg mb-6 flex-grow">
            <div className="flex items-center justify-between">
              <img src="/path-to-visa-logo.png" alt="VISA logo" className="w-24" />
            </div>
            <div className="flex items-center justify-between">
              <p className="text-gray-600">Số tiền thanh toán</p>
              <p className="text-green-500 font-bold text-lg">đ {paymentInfo.amount.toLocaleString()}</p>
            </div>
            <div className="mt-4">
              <hr className="my-2" />
              <p className="text-sm text-gray-600">Mã giao dịch</p>
              <p>{paymentInfo.transactionId}</p>
              <hr className="my-2" />
              <p className="text-sm text-gray-600">Nội dung</p>
              <p>{paymentInfo.content}</p>
            </div>
          </div>
          <div className="p-4 bg-yellow-100 shadow-lg rounded-lg">
            <h2 className="font-semibold text-lg mb-2">Giao dịch hết hạn sau</h2>
            <p className="text-lg font-bold text-gray-800">14 : 59</p>
          </div>
        </div>
      </div>
    </div>
  );
};

// GeneralPayment Component
const GeneralPayment: React.FC<{ document: Document ,user:User}> = ({ document ,user}) => {
  
  const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<PaymentMethod | null>(null);
  const [showBankInfo, setShowBankInfo] = useState(false);

  const handlePaymentMethodSelect = (method: PaymentMethod) => {
    setSelectedPaymentMethod(method);
    setShowBankInfo(true);
  };
  if (!document) {
    return <p>Document not found or not provided.</p>;
  }
  return (
    <div className="container mx-auto mt-10 p-8 max-w-6xl">
      <div className="flex gap-6">
        <div className="w-3/5 space-y-6 flex flex-col">
          <div className="p-4 bg-white shadow-lg rounded-lg flex-grow">
            <h2 className="font-bold text-xl mb-2">1. Tên đăng nhập của người dùng/Người mua hàng</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm">
              <p>Tên đăng nhập: {user.email}</p>
              <p>Người mua hàng: {user?.user}</p>
            </div>
          </div>
          <div className="p-4 bg-white shadow-lg rounded-lg flex-grow">
            <h2 className="font-bold text-xl mb-2">2. Sản phẩm thanh toán</h2>
            <div className="flex items-center bg-white p-4 rounded-lg shadow-sm">
            <iframe src={`https://docs.google.com/viewer?url=${encodeURIComponent(document.previewPath)}&embedded=true#page=1`} className="w-56 h-56 mr-4" />
              {/* <img src={book} alt="Book Image" className="w-20 h-28 object-cover mr-4" /> */}
              <div>
                <p className="font-bold">{document.title}</p>
                {/* <p>by {document.author}</p> */}
              </div>
            </div>
          </div>
          <div className="p-4 bg-white shadow-lg rounded-lg flex-grow">
            <h2 className="font-bold text-xl mb-2">3. Phương thức thanh toán</h2>
            <img src={payment} alt="Book Image" className="w-50 h-28 object-cover mr-4" onClick={() => handlePaymentMethodSelect('ZaloPay')} />
            {showBankInfo && (
              <div className="mt-4 p-4 bg-gray-100 rounded-lg">
                <p className="text-lg font-bold">Thông tin chuyển khoản:</p>
                <p>Số tài khoản: {user.bankAccount}</p>
                <p>Chủ tài khoản: {user.user}</p>
              </div>
            )}
          </div>
        </div>
        <div className="w-2/5 space-y-6 flex flex-col justify-between">
          <div className="p-4 bg-white shadow-lg rounded-lg flex-grow">
            <h2 className="font-bold text-xl mb-2">4. Xác nhận thông tin</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-500 border-dashed">
              <p>Người mua: {user.user}</p>
              <p>Ngày mua: {new Date().toLocaleDateString()}</p>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            <h2 className="text-xl mb-2">Chi tiết thanh toán</h2>
            <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-300">
              <div className="flex justify-between items-center mb-2">
                <p className="text-gray-500">Sản phẩm</p>
              </div>
              <div className="flex justify-between items-center mb-2">
                <p className="text-lg text-gray-800">{document.title}</p>
                <p className="text-red-500 font-bold">{formatCurrency(Number(document.price))} VND</p>
              </div>
              <hr className="my-2" />
              <div className="flex justify-between items-center">
                <p className="text-lg">Tổng thanh toán</p>
                <p className="text-red-500 font-bold">{formatCurrency(Number(document.price))} VND</p>
              </div>
            </div>
            <div className="border-t border-gray-300 my-4"></div>
            <h2 className="text-xl mb-2">Phương thức thanh toán</h2>
            {selectedPaymentMethod ? (
                <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-500 border-dashed">
                <div className="flex justify-between items-center mb-2">
                  <p className="text-gray-500">Phương thức thanh toán</p>
                </div>
                <div className="flex justify-between items-center">
                  <button className="py-1 px-3 bg-gray-200 text-gray-700 rounded-lg text-sm" style={{ lineHeight: 1 }}>
                    Thẻ tín dụng/Ví điện tử
                  </button>
                </div>
                <div className="mt-2">
                  <p className="text-gray-700">Tài khoản ngân hàng: {user.bankAccount}</p>
                </div>
              </div>
            ) : (
              <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-500 border-dashed text-center">
                <p className="text-red-500 font-bold">Chọn phương thức thanh toán</p>
              </div>
            )}
            <div className="text-gray-500 text-sm mb-6 text-center">
              <p><br />Bằng việc nhấn vào nút Thanh toán ngay, Bạn đồng ý rằng, giao dịch này là không hoàn, không hủy.</p>
            </div>
            <button className="w-full bg-red-500 text-white py-2 px-6 rounded-lg hover:bg-red-600" disabled={!selectedPaymentMethod} onClick={async () => {
              // Gọi API và chuyển hướng đến order_url
              const response = await http.post('/create-order',{
                documentId: document.id,
                amount: Number.parseInt(document.price),
              }, {
                method: 'POST',
                headers: {
                  'Content-Type': 'application/json',
                  'Authorization': `Bearer ${getAccessToken()}`,
                }
              });
              const data = await response.data;
              if (data.return_code === 1) {
                window.location.href = data.order_url; // Mở cửa sổ mới
              } else {
                alert('Giao dịch thất bại');
              }
            }}>
              Thanh toán ngay
            </button>
          </div>
          <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-300">
            <div className="flex justify-between items-center mb-2">
              <p className="text-gray-500">Sản phẩm</p>
            </div>
            <div className="flex justify-between items-center mb-2">
              <p className="text-lg text-gray-800">{document.title ?? 'N/A'}</p>
              <p className="text-red-500 font-bold">{formatCurrency(Number(document.price)) ?? 'N/A'} VND</p>
            </div>
            <hr className="my-2" />
            <div className="flex justify-between items-center">
              <p className="text-lg">Tổng thanh toán</p>
              <p className="text-red-500 font-bold">{formatCurrency(Number(document.price)) ?? 'N/A'} VND</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

// QRPopUp Component
const QRPopUp: React.FC<{ onClose: () => void }> = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-6 rounded-lg shadow-lg max-w-md w-full text-center">
        <h2 className="text-xl font-bold mb-4">Quét mã QR bằng ứng dụng ZaloPay để thanh toán</h2>
        <p className="text-sm mb-4">Mã giao dịch: 03162263046264</p>
        <div className="mb-6">
          <img src="/path-to-qr-code.png" alt="QR Code" className="mx-auto w-64 h-64" />
        </div>
        <button className="bg-red-500 text-white px-4 py-2 rounded-lg" onClick={onClose}>
          Đóng
        </button>
      </div>
    </div>
  );
};

// Main Payment Component
const Payment: React.FC = () => {
  const [showBankPopUp, setShowBankPopUp] = useState(false);
  const [showQRPopUp, setShowQRPopUp] = useState(false);
  const [paymentStep ] = useState<'general' | 'confirm'>('general');
  const [selectedBank, setSelectedBank] = useState<BankOption | null>(null);
  const location = useLocation();
  const {user} = useAuth();
  const document = location.state?.document as Document;

  const handleBankSelect = (bank: BankOption) => {
    setSelectedBank(bank);
    setShowBankPopUp(false);
  };

  // const handlePaymentMethodSelect = (method: PaymentMethod) => {
  //   setSelectedPaymentMethod(method);
  //   setPaymentStep('confirm');
  // };

  const paymentInfo: PaymentInfo = {
    amount: parseFloat(document.price.replace(/[^0-9.-]+/g,"")),
    transactionId: '03162263046264',
    content: `Người dùng ${user?.user} đã mua tài liệu "${document.title}" của ${document.author} bằng ví điện tử Visa vào ngày 8/12/2024`,
  };

  return (
    <div>
      {selectedBank && <p>Selected bank: {selectedBank}</p>}
      {paymentStep === 'general' && (
        <GeneralPayment document={document} user={user as User}/>
      )}
      {paymentStep === 'confirm' && (
        <ConfirmPayment paymentInfo={paymentInfo} />
      )}
      {showBankPopUp && (
        <BankPopUp onClose={() => setShowBankPopUp(false)} onSelect={handleBankSelect} />
      )}
      {showQRPopUp && (
        <QRPopUp onClose={() => setShowQRPopUp(false)} />
      )}
    </div>
  );
};

export default Payment;