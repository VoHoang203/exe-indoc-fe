import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Bookshelf from "../../assets/Bookshelf.png"
import muitenImage from '../../assets/muiten.png'; 
import tick from '../../assets/tick.png';
import { getAccessToken } from '../../utils/auth';
import http from '../../utils/http';
import { useAuth } from '../../context/app.context';
// Định nghĩa các type cho state
type SellerInfo = {
  storeName: string;
  email: string;
  phone: string;
};

type TaxInfo = {
  businessType: 'Cá nhân' | 'school' | '';
  emailInvoice: string;
  taxId: string;
};

type IdentityInfo = {
  idType: 'cccd' | 'cmnd' | 'passport' | '';
  idNumber: string;
  bank: string;
  accountNumber: string;
  idFrontImage: File | null;
  idBackImage: File | null;
  qrCodeImage: File | null;
  bankOwner: string; 
};

// Component chính
const SellerRegistration: React.FC = () => {
  const [step, setStep] = useState(0);
  const [sellerInfo, setSellerInfo] = useState<SellerInfo>({ storeName: '', email: '', phone: '' });
  const [taxInfo, setTaxInfo] = useState<TaxInfo>({
    businessType: '',
    emailInvoice: '',
    taxId: ''
  });
  const [identityInfo, setIdentityInfo] = useState<IdentityInfo>({
    idType: '',
    idNumber: '',
    bank: '',
    accountNumber: '',
    idFrontImage: null,
    idBackImage: null,
    qrCodeImage: null,
    bankOwner: '',
  });
const {setIsSeller} = useAuth()
  const handleSellerInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSellerInfo({ ...sellerInfo, [e.target.name]: e.target.value });
  };


  const handleIdentityInfoChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setIdentityInfo({ ...identityInfo, [e.target.name]: e.target.value });
  };

  
  const [previewImages, setPreviewImages] = useState<{ [key: string]: string | null }>({
    idFrontImage: null,
    idBackImage: null,
  });
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      const file = e.target.files[0];
      const name = e.target.name;
      setIdentityInfo({ ...identityInfo, [name]: file });
      setPreviewImages({ ...previewImages, [name]: URL.createObjectURL(file) });
    }
  };
  const handleTaxInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setTaxInfo(prev => ({ ...prev, [name]: value }));
  };

  // const handleArrayInputChange = (index: number, field: 'emails' | 'phones', value: string) => {
  //   setTaxInfo(prev => {
  //     const newArray = [...prev[field]];
  //     newArray[index] = value;
  //     return { ...prev, [field]: newArray };
  //   });
  // };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = getAccessToken();
    const formData = new FormData();
    formData.append('storeName', sellerInfo.storeName);
    formData.append('electronicInvoiceEmail', taxInfo.emailInvoice);
    formData.append('phoneNumber', sellerInfo.phone);
    formData.append('typeOfBusiness', taxInfo.businessType);
    formData.append('taxCode', taxInfo.taxId);
    formData.append('typeOfAuthen', identityInfo.idType);
    formData.append('idNumber', identityInfo.idNumber);
    formData.append('bankName', identityInfo.bank);
    formData.append('bankNumber', identityInfo.accountNumber);
    formData.append('bankOwner', identityInfo.bankOwner);
    if (identityInfo.idFrontImage) formData.append('files', identityInfo.idFrontImage);
    if (identityInfo.idBackImage) formData.append('files', identityInfo.idBackImage);
    for (const [name, value] of formData.entries()) {
      console.log(`${name}: ${value}`); // Logs each form name and value
    }
    console.log(accessToken)
    try {
      const response = await http.post('/seller/register',formData, {
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        }
      });
      console.log('Registration successful:', response.data);
      setStep(4);
      setIsSeller(true)
    } catch (error) {
      console.error('Registration failed:', error);
    }
  };
  // const addField = (field: 'emails' | 'phones') => {
  //   setTaxInfo(prev => ({ ...prev, [field]: [...prev[field], ''] }));
  // };

  const renderStepIndicator = () => {
    if (step === 0) return null;
    return (
        <div className="flex justify-center items-center mb-12 gap-2">
        {[1, 2, 3, 4].map((num) => (
          <React.Fragment key={num}>
            <div className={`flex flex-col items-center ${step >= num ? 'text-[#1AB3BC]' : 'text-gray-500'}`}>
              <div className={`w-12 h-12 rounded-full border flex justify-center items-center mb-2 ${
                step > num ? 'bg-[#1AB3BC] text-white border-[#1AB3BC]' : 
                step === num ? 'bg-[#1AB3BC] text-white border-[#1AB3BC]' : 
                'border-gray-300'
              }`}>
                {step > num ? '✔' : num}
              </div>
              <p className="text-sm">{getStepName(num)}</p>
            </div>
            {num < 4 && <img src={muitenImage} alt="" className="h-4" />}
          </React.Fragment>
        ))}
      </div>
    );
  };

  const getStepName = (stepNumber: number) => {
    switch (stepNumber) {
      case 1: return 'Thông tin cửa hàng';
      case 2: return 'Thông tin thuế';
      case 3: return 'Thông tin định danh';
      case 4: return 'Hoàn thành';
      default: return '';
    }
  };
  const renderStep0 = () => (
    <div className="text-center">
      <div className="mb-6">
        <img src={Bookshelf} alt="InDocs Icon" className="w-24 h-24 mx-auto" />
      </div>
      <h2 className="text-2xl font-bold mb-4">Chào mừng đến với InDocs</h2>
      <p className="text-gray-600 mb-6">
        Hãy trở thành một người bán hàng uy tín bằng cách cung cấp<br />
        đầy đủ thông tin đáng tin cậy cho khách hàng của bạn
      </p>
      <button 
        onClick={() => setStep(1)} 
        className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600"
      >
        Bắt đầu đăng ký
      </button>
    </div>
  );

  const renderStep1 = () => (
    <form onSubmit={(e) => { e.preventDefault(); setStep(2); }}>
      <div className="flex items-center mb-4">
        <label htmlFor="storeName" className="w-1/4 text-gray-700">
          <span className="text-red-500">*</span> Tên cửa hàng
        </label>
        <input
          type="text"
          id="storeName"
          name="storeName"
          className="w-3/4 p-2 border border-gray-300 rounded"
          placeholder="Điền tên cửa hàng của bạn"
          required
          value={sellerInfo.storeName}
          onChange={handleSellerInfoChange}
        />
      </div>
      <div className="flex items-center mb-4">
        <label htmlFor="email" className="w-1/4 text-gray-700">
          <span className="text-red-500">*</span> Email nhận
          hóa đơn điện tử
        </label>
        <input
          type="text"
          id="storeName"
          name="bankOwner"
          className="w-3/4 p-2 border border-gray-300 rounded"
          placeholder="Tên chủ sở hữu tài khoản ngân hàng"
          required
          value={identityInfo.bankOwner}
          onChange={handleIdentityInfoChange}
        />
      </div>
      <div className="flex items-center mb-4">
        <label htmlFor="sdt" className="w-1/4 text-gray-700">
          <span className="text-red-500">*</span> Phone
        </label>
        <input
          type="text"
          id="storeName"
          name="phone"
          className="w-3/4 p-2 border border-gray-300 rounded"
          placeholder="Điền tên cửa hàng của bạn"
          required
          value={sellerInfo.phone}
          onChange={handleSellerInfoChange}
        />
      </div>
     < div className="flex items-center mb-4">
    <div className="w-1/4" />
    <div className="w-3/4 text-gray-500 text-sm mb-6">
      <p>Theo Quy định về Thương mại điện tử Việt Nam (Nghị định 52/2013/ND-CP), Người Bán phải cung cấp
        thông tin Mã số thuế cho Shopee.</p>
    </div>
  </div>
  <div className="border-t border-gray-300 my-4" />
      <div className="flex justify-between">
      <button onClick={()=>setStep(prev=>(prev-1))} type="button" className="bg-white text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 border border-gray-400">Quay
      lại</button>
        <button type="submit" className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600">
          Tiếp theo
        </button>
      </div>

    </form>
  );

  const renderStep2 = () => (
    <form onSubmit={(e) => { e.preventDefault(); setStep(3); }}>
      <div className="flex items-center mb-4">
        <label className="w-1/4 text-gray-700">
          <span className="text-red-500">*</span> Loại hình kinh doanh
        </label>
        <div className="w-3/4 flex">
          <label className="mr-6">
            <input
              type="radio"
              name="businessType"
              value="Cá nhân"
              checked={taxInfo.businessType === 'Cá nhân'}
              onChange={handleTaxInfoChange}
              className="mr-2"
            /> Cá nhân
          </label>
          <label className="mr-6">
            <input
              type="radio"
              name="businessType"
              value="school"
              checked={taxInfo.businessType === 'school'}
              onChange={handleTaxInfoChange}
              className="mr-2"
            /> Trường học
          </label>
        </div>
      </div>
  
      <div className="flex items-center mb-4">
        <label htmlFor="emailInvoice" className="w-1/4 text-gray-700">
          <span className="text-red-500">*</span> Email nhận hóa đơn điện tử
        </label>
        <input
          type="email"
          id="emailInvoice"
          name="emailInvoice"
          className="w-3/4 p-2 border border-gray-300 rounded"
          placeholder="Email"
          required
          value={taxInfo.emailInvoice}
          onChange={handleTaxInfoChange}
        />
      </div>
  
      <div className="flex items-center mb-4">
        <label htmlFor="taxId" className="w-1/4 text-gray-700">
          <span className="text-red-500">*</span> Mã số thuế
        </label>
        <input
          type="text"
          id="taxId"
          name="taxId"
          className="w-3/4 p-2 border border-gray-300 rounded"
          placeholder="Nhập mã số thuế"
          required
          value={taxInfo.taxId}
          onChange={handleTaxInfoChange}
        />
      </div>
  
      <div className="border-t border-gray-300 my-4" />
      <div className="flex justify-between">
        <button onClick={() => setStep(1)} type="button" className="bg-white text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 border border-gray-400">
          Quay lại
        </button>
        <button type="submit" className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600">
          Tiếp theo
        </button>
      </div>
    </form>
  );

  const renderStep3 = () => {
    
    return (
   
    <form onSubmit={handleSubmit}>
    <div className="bg-blue-100 text-blue-600 p-4 rounded-lg mb-6">
      <p>Vui lòng cung cấp Thông Tin Định Danh của Chủ Shop (nếu là cá nhân), hoặc Người Đại Diện Pháp Lý trên giấy đăng ký kinh doanh.</p>
    </div>

    <div className="flex items-center mb-4">
      <label className="w-1/4 text-gray-700"><span className="text-red-500">*</span> Hình thức định danh</label>
      <div className="w-3/4 flex">
        {['cccd', 'cmnd', 'passport'].map((type) => (
          <label key={type} className="mr-6">
            <input
              type="radio"
              name="idType"
              value={type}
              checked={identityInfo.idType === type}
              onChange={handleIdentityInfoChange}
              className="mr-2"
            />
            {type === 'cccd' ? 'Căn cước công dân' : type === 'cmnd' ? 'Chứng minh nhân dân' : 'Hộ chiếu'}
          </label>
        ))}
      </div>
    </div>

    <div className="flex items-center mb-4">
      <label htmlFor="idNumber" className="w-1/4 text-gray-700"><span className="text-red-500">*</span> Số {identityInfo.idType}</label>
      <input
        type="text"
        id="idNumber"
        name="idNumber"
        value={identityInfo.idNumber}
        onChange={handleIdentityInfoChange}
        className="w-3/4 p-2 border border-gray-300 rounded"
        placeholder="Điền vào"
        required
      />
    </div>

    <div className="flex items-center mb-4">
      <label htmlFor="bank" className="w-1/4 text-gray-700"><span className="text-red-500">*</span> Tài khoản ngân hàng</label>
      <div className="w-3/4 flex space-x-4">
        <select
          id="bank"
          name="bank"
          value={identityInfo.bank}
          onChange={handleIdentityInfoChange}
          className="w-1/2 p-2 border border-gray-300 rounded"
          required
        >
          <option value="" disabled>Ngân hàng</option>
          <option value="vietcombank">Vietcombank</option>
          <option value="bidv">BIDV</option>
        </select>
        <input
          type="text"
          id="accountNumber"
          name="accountNumber"
          value={identityInfo.accountNumber}
          onChange={handleIdentityInfoChange}
          className="w-1/2 p-2 border border-gray-300 rounded"
          placeholder="Số tài khoản"
          required
        />
      </div>
    </div>

    <div className="flex items-center mb-4">
      <label className="w-1/4 text-gray-700"><span className="text-red-500">*</span> Hình chụp của thẻ {identityInfo.idType}</label>
      <div className="w-3/4">
        <div className="flex space-x-4">
          {['idFrontImage', 'idBackImage'].map((field, index) => (
            <div key={field} className={`w-1/3 text-center`}>
              <span className="text-sm text-gray-500 block mb-2">
                {index === 0 ? 'Mặt trước' :  'Mặt sau'}
              </span>
              <div className="border-2 border-gray-300 p-4 rounded-lg hover:border-blue-600 hover:text-blue-600">
              <input
                    type="file"
                    id={field}
                    name={field}
                    className="hidden"
                    accept="image/*"
                    onChange={handleFileChange}
                  />
                 <label htmlFor={field} className="cursor-pointer">
                    <span className="text-2xl text-gray-400">+</span>
                  </label>
                  {previewImages[field] && (
                    <img src={previewImages[field]} alt={`Preview ${field}`} className="mt-2" />
                  )}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>

    <div className="flex items-center mb-4">
      <label className="flex items-center space-x-3">
        <input type="checkbox" className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded" />
        <span className="text-gray-700">Tôi xác nhận tất cả dữ liệu đã cung cấp là chính xác và trung thực. Tôi đã đọc và đồng ý với Chính Sách Bảo Mật của InDocs.</span>
      </label>
    </div>

    <div className="border-t border-gray-300 my-4" />
    <div className="flex justify-between">
      <button type="button" onClick={() => setStep(2)} className="bg-white text-gray-700 py-2 px-4 rounded-lg hover:bg-gray-400 border border-gray-400">
        Quay lại
      </button>
      <button type="submit" className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600">
        Tiếp theo
      </button>
    </div>
  </form>
  )};

  const renderStep4 = () => (
    <div className="text-center">
      <img src={tick} alt="Document Icon" className="w-24 mx-auto mb-4" />
      <h2 className="text-2xl font-bold mb-4">Đăng ký thành công</h2>
      <p className="text-gray-600 mb-6">
        Chúc mừng bạn đã tham gia góp phần xây dựng cộng đồng InDocs
        <br /> Hãy cùng nhau chia sẻ những tài liệu tuyệt vời
      </p>
      <Link to="/profile" className="bg-teal-500 text-white py-2 px-4 rounded-lg hover:bg-teal-600">
        Thêm tài liệu
      </Link>
    </div>
  );

  return (
    <div className="bg-gray-100 min-h-screen">
      
      <div className="container mx-auto mt-1 bg-white h-[100%] p-10 rounded-lg shadow-lg max-w-3xl">
        {renderStepIndicator()}
        <div className="border-t border-gray-300 my-4"></div>
        {step === 0 && renderStep0()}
        {step === 1 && renderStep1()}
        {step === 2 && renderStep2()}
        {step === 3 && renderStep3()}
        {step === 4 && renderStep4()}
      </div>
    </div>
  );
};

export default SellerRegistration;