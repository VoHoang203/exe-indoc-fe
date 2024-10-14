import React, {  useEffect, useState } from 'react';
import addDoc  from "../../assets/addDoc.png"
import avt from "../../assets/avt.png"
import edit_icon from "../../assets/edit_icon.png"
import search_normal from "../../assets/search-normal.png"
import board from "../../assets/board.png"
import seeicon from  "../../assets/seeicon.png"
import dateicon from "../../assets/dateicon.png"
import useicon from "../../assets/useicon.png"
import { getAccessToken } from '../../utils/auth';
import {useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import http from '../../utils/http';
import { useAuth, User } from '../../context/app.context';
import ReactModal from 'react-modal'
import { FaCamera } from 'react-icons/fa';
import { formatCurrency } from '../Payment/Payment';
// }
interface Document2 {
  id: string;
  title: string;
  description: string;
  price: string;
  filePath: string;
  downloads: number;
  date: string;
  author: string;
}

export interface Transaction2 {
  title: string
  documentid: string
  buyerid: string
  purchasedate: string
  amount: string
}
interface UserInfo {
  user: string;
  email: string;
  phone: string;
  role: string;
  bankAccount: string;
  avatar: string;
  storeName?: string;
  accountBalance?: string;
  bankName?: string;
  bankAccountNumber?: string;
  bankOwnerName?: string;
  createdAt?: string;
  isVerified?: boolean;
}
interface FormDataInterface {
  title:string;
  categoryId:string;
  price:string;
  description:string;
  file:File | undefined;
};
const fetchPaidDocuments = async () => {
  const accessToken = getAccessToken();
  const response = await http.get('documents/paid', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const data = await response.data;
  return data.data.map((doc: Document2, index: number) => ({
    id: index,
    title: doc.title,
    downloads: 0,
    filePath: doc.filePath,
    date: new Date().toLocaleDateString(),
    author: 'Unknown',
  }));
};
ReactModal.setAppElement('#root');
const fetchOwnDocuments = async () => {
  const accessToken = getAccessToken();
  const response = await http.get('documents/own', {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const data = await response.data;
  return data.data.map((doc: Document2, index: number) => ({
    id: index,
    title: doc.title,
    downloads: 0,
    filePath: doc.filePath,
    date: new Date().toLocaleDateString(),
    author: 'Unknown',
    amount: parseFloat(doc.price),
  }));
};
const fetchTransactions = async () => {
  const accessToken = getAccessToken();
  const response = await http.get('/v1/seller/transaction', {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const data = await response.data;
  return data.data.map((transaction: Transaction2) => ({
    title: transaction.title,
    documentId: transaction.documentid,
    buyerId: transaction.buyerid,
    purchaseDate: new Date(transaction.purchasedate).toLocaleDateString(),
    amount: parseFloat(transaction.amount),
  }));
};
const SellerProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('purchased');
  const [showAddDocModal, setShowAddDocModal] = useState(false);
  const [showDetailSellerModal, setShowDetailSellerModal] = useState(false);
  const { isSeller,setUser,user } = useAuth(); 
  const { data: documents,refetch:refetchOwnDocument, isLoading:isLoadingOwnDocument} = useQuery<Document2[]>({
    queryKey: ['ownDocuments'],
    queryFn: fetchOwnDocuments,
  })
  const { data: paidDocuments,refetch:refetchPaidDocument } = useQuery<Document2[]>({
    queryKey: ['paidDocuments'],
    queryFn: fetchPaidDocuments,
  });
  const { data: transactions,refetch:refetchTransaction } = useQuery<Transaction2[]>({
    queryKey: ['transactions'],
    queryFn: fetchTransactions,
  });
  const [userInfo, setUserInfo] = useState<UserInfo>({
    user: '',
    email: '',
    phone: '',
    role: '',
    bankAccount: '',
    avatar: '',
    storeName: '',
    accountBalance: '',
    bankName: '',
    bankAccountNumber: '',
    bankOwnerName: '',
    createdAt: '',
    isVerified: false,
  });

  useEffect(() => {
    const storedUserInfo = localStorage.getItem('userInfo');
    if (storedUserInfo) {
      setUserInfo(JSON.parse(storedUserInfo));
    }
  }, [showDetailSellerModal]);
  useEffect(() => {
    refetchOwnDocument();
    refetchPaidDocument();
    refetchTransaction();
  }, [activeTab]);

   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUserInfo = { 
          ...userInfo, 
          avatar: reader.result as string,
          password: user?.password|| '', // Ensure password is included
          phoneNumber: user?.phoneNumber || '' // Ensure phoneNumber is included
        };
        setUserInfo(updatedUserInfo);
        setUser(updatedUserInfo as User);
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo)); // Save to localStorage
      };
      reader.readAsDataURL(file);
    }
  };
  const handleAddDocModalToggle = () => {
    setShowAddDocModal((prev) => !prev);
  };

  const handleDetailSellerModalToggle = () => {
    setShowDetailSellerModal((prev) => !prev);
  };
console.log(paidDocuments)
console.log(transactions)
console.log(getAccessToken())
  return (
    <div className="flex gap-5 bg-white w-full h-screen p-5">
      <div className="w-1/3">
        {isSeller && ( 
          <button onClick={() => handleAddDocModalToggle()} className="flex items-center gap-2 text-gray-400 mb-2">
            <p className="text-lg">Tải tài liệu lên</p>
            <img src={addDoc} alt="" className="w-12" />
          </button>
        )}
        <div className="bg-gray-100 rounded-xl shadow-md p-5 animate-fadeLeft">
          <div className="flex justify-center">
            <div className="relative">
                  <img src={userInfo.avatar || avt} alt="" className="w-24 mt-6 rounded-full" />
                  <label htmlFor="avatar-upload" className="absolute bottom-0 right-0 bg-blue-500 text-white p-2 rounded-full cursor-pointer hover:bg-blue-600 transition-colors">
                    <FaCamera />
                    <input
                      id="avatar-upload"
                      type="file"
                      accept="image/*"
                      className="hidden"
                      onChange={handleAvatarChange}
                    />
                  </label>
            </div>
          </div>
          <div className="mt-12">
          <table className="w-full text-center border-collapse">
          {isSeller ? (
                <>
                  <tr className='border-b border-gray-300 last:border-b-0'>
                    <td className="p-4 font-medium text-left border-r border-gray-300">Email</td>
                    <td className="p-4 text-left">{userInfo.email}</td>
                    <td className="p-4  border-l border-gray-300">
                  <button onClick={() =>handleDetailSellerModalToggle()}>
                    <img src={edit_icon} alt="" className="w-5 h-5" />
                  </button>
                </td>
                  </tr>
                  <tr className='border-b border-gray-300 last:border-b-0'>
                    <td className="p-4 font-medium text-left border-r border-gray-300">Tên cửa hàng</td>
                    <td className="p-4 text-left">{userInfo.storeName}</td>
                    <td className="p-4  border-l border-gray-300">
                  <button onClick={() =>handleDetailSellerModalToggle()}>
                    <img src={edit_icon} alt="" className="w-5 h-5" />
                  </button>
                </td>
                  </tr>
                  <tr className='border-b border-gray-300 last:border-b-0'>
                    <td className="p-4 font-medium text-left border-r border-gray-300">SĐT</td>
                    <td className="p-4 text-left">{userInfo.phone}</td>
                    <td className="p-4  border-l border-gray-300">
                  <button onClick={() =>handleDetailSellerModalToggle()}>
                    <img src={edit_icon} alt="" className="w-5 h-5" />
                  </button>
                </td>
                  </tr>
                  <tr className='border-b border-gray-300 last:border-b-0'>
                    <td className="p-4 font-medium text-left border-r border-gray-300">Số dư tài khoản</td>
                    <td className="p-4 text-left">{userInfo.accountBalance}</td>
                    <td className="p-4  border-l border-gray-300">
                  <button onClick={() =>handleDetailSellerModalToggle()}>
                    <img src={edit_icon} alt="" className="w-5 h-5" />
                  </button>
                </td>
                  </tr>
                  <tr className='border-b border-gray-300 last:border-b-0'>
                    <td className="p-4 font-medium text-left border-r border-gray-300">Ngân hàng</td>
                    <td className="p-4 text-left">{userInfo.bankName}</td>
                    <td className="p-4  border-l border-gray-300">
                  <button onClick={() =>handleDetailSellerModalToggle()}>
                    <img src={edit_icon} alt="" className="w-5 h-5" />
                  </button>
                </td>
                  </tr>
                  <tr className='border-b border-gray-300 last:border-b-0'>
                    <td className="p-4 font-medium text-left border-r border-gray-300">Số tài khoản</td>
                    <td className="p-4 text-left">{userInfo.bankAccountNumber}</td>
                    <td className="p-4  border-l border-gray-300">
                  <button onClick={() =>handleDetailSellerModalToggle()}>
                    <img src={edit_icon} alt="" className="w-5 h-5" />
                  </button>
                </td>
                  </tr>
                  <tr className='border-b border-gray-300 last:border-b-0'>
                    <td className="p-4 font-medium text-left border-r border-gray-300">Chủ tài khoản</td>
                    <td className="p-4 text-left">{userInfo.bankOwnerName}</td>
                    <td className="p-4  border-l border-gray-300">
                  <button onClick={() =>handleDetailSellerModalToggle()}>
                    <img src={edit_icon} alt="" className="w-5 h-5" />
                  </button>
                </td>
                  </tr>
                </>
              ) : (
                <>
                  <tr className='border-b border-gray-300 last:border-b-0'>
                    <td className="p-4 font-medium text-left border-r border-gray-300">Email</td>
                    <td className="p-4 text-left">{userInfo.email}</td>
                    <td className="p-4  border-l border-gray-300">
                  <button onClick={() =>handleDetailSellerModalToggle()}>
                    <img src={edit_icon} alt="" className="w-5 h-5" />
                  </button>
                </td>
                  </tr>
                  <tr className='border-b border-gray-300 last:border-b-0'>
                    <td className="p-4 font-medium text-left border-r border-gray-300">Ngày tham gia</td>
                    <td className="p-4 text-left">{userInfo.createdAt}</td>
                    <td className="p-4  border-l border-gray-300">
                  <button onClick={() =>handleDetailSellerModalToggle()}>
                    <img src={edit_icon} alt="" className="w-5 h-5" />
                  </button>
                </td>
                  </tr>
                  <tr className='border-b border-gray-300 last:border-b-0'>
                    <td className="p-4 font-medium text-left border-r border-gray-300">Đã xác thực</td>
                    <td className="p-4 text-left">{userInfo.isVerified ? "Có" : "Không"}</td>
                    <td className="p-4  border-l border-gray-300">
                  <button onClick={() =>handleDetailSellerModalToggle()}>
                    <img src={edit_icon} alt="" className="w-5 h-5" />
                  </button>
                </td>
                  </tr>
                  <tr className='border-b border-gray-300 last:border-b-0'>
                    <td className="p-4 font-medium text-left border-r border-gray-300">Role</td>
                    <td className="p-4 text-left">{isSeller ? "Người bán" : "Người mua"}</td>
                    <td className="p-4  border-l border-gray-300">
                  <button onClick={() =>handleDetailSellerModalToggle()}>
                    <img src={edit_icon} alt="" className="w-5 h-5" />
                  </button>
                </td>
                  </tr>
                </>
              )}
              
            </table>
          </div>
        </div>
      </div>
      <div className="w-2/3 " style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <div className="border border-teal-500 rounded-xl flex items-center overflow-hidden mb-8">
          <input type="text" placeholder="Tìm kiếm ...." className="w-full p-2 outline-none text-gray-600 text-lg" />
          <img src={search_normal} alt="" className="w-10 p-2" />
        </div>
        <div className="animate-fateIn">
          <div className="flex">
            <div className="bg-gray-100 rounded-t-xl p-2 w-48">
              <select
                className="bg-gray-100 p-2 text-lg w-full"
                value={activeTab}
                onChange={(e) => setActiveTab(e.target.value)}
              >
                <option value="purchased">Tài liệu đã mua</option>
                <option value="uploaded">Tài liệu tải lên</option>
                <option value="photos">Hình ảnh</option>
                {isSeller && <option value="transactions">Các giao dịch</option>}
              </select>
            </div>
          </div>
          <div className="bg-gray-100 rounded-b-xl rounded-tr-xl p-10 shadow-md overflow-y-auto">
          {activeTab === 'uploaded' && (
              <>
                  {isLoadingOwnDocument ? (
                                <div role="status">
                <svg aria-hidden="true" className="inline w-full h-full text-gray-200 animate-spin dark:text-gray-600 fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor" />
                  <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill" />
                </svg>
                      <span className="sr-only">Loading...</span>
                  </div>

                  ):(Array.isArray(documents) && documents.map((doc: Document2) => (
                  <DocumentItem key={doc.id} document={doc} />

                )))}
              </>
            )}
            {activeTab === 'transactions' && (
              <>
                 {Array.isArray(transactions) && transactions.map((transaction: Transaction2) => (
                    <TransactionItem key={transaction.buyerid} transaction={transaction} />
                  ))}
                {transactions && (
                    <TotalTransactions 
                    total={transactions.reduce((sum, transaction) => sum + Number(transaction.amount), 0)} 
                    date={new Date().toLocaleDateString()} 
                  />
                  )}
              </>
            )} 
            {activeTab ===  'purchased' && (
              <>
                 {Array.isArray(paidDocuments) && paidDocuments.map((doc: Document2) => (
                  <DocumentItem key={doc.id} document={doc} />
                ))}
              </>
            )}
            {/* Add content for other tabs */}
          </div>
        </div>
      </div>
      {showAddDocModal && <AddDocModal  isOpen={showAddDocModal} onClose={() => setShowAddDocModal(false)} />}
      {showDetailSellerModal && <DetailSellerModal  isOpen={showDetailSellerModal} onClose={() => setShowDetailSellerModal(false)} isSeller={isSeller}  userInfo={userInfo}/>}
    </div>
  );
};

const DocumentItem: React.FC<{ document: Document2 }> = ({ document }) => (

  <div className="flex items-center gap-2 py-4 border-b border-gray-300">
    <img src={board} alt="" className="w-1/12" />
    <div className="flex-grow">
      <h3 className="text-2xl font-bold text-gray-700 mb-2">{document.title}</h3>
      <div className="flex gap-2 items-center">
        <div className="flex items-center gap-1">
          <img src={seeicon} alt="" className="w-6" />
          <p className="text-gray-400">{document.downloads} lượt tải về</p>
        </div>
        <div className="flex items-center gap-1">
          <img src={dateicon} alt="" className="w-6" />
          <p className="text-gray-400">{document.date}</p>
        </div>
        <div className="flex items-center gap-1">
          <img src={useicon} alt="" className="w-6" />
          <p className="text-gray-400">{document.author}</p>
        </div>
      </div>
    </div>
    <button onClick={() => window.open(document.filePath, '_blank')} className="bg-teal-500 text-white rounded px-4 py-2">Xem</button>
  </div>
);

const TransactionItem: React.FC<{ transaction: Transaction2 }> = ({ transaction }) => (
  <div className="flex items-center gap-2 py-4 border-b border-gray-300">
    <img src={board} alt="" className="w-1/12 basis-2" />
    <div className="flex-grow">
      <h3 className="text-2xl font-bold text-gray-700 mb-2">{transaction.title}</h3>
      <div className="flex gap-2 items-center">
        <div className="flex items-center gap-1">
          <img src={seeicon} alt="" className="w-6" />
          <p className="text-gray-400">{formatCurrency(Number(transaction.amount))} lượt tải về</p>
        </div>
        <div className="flex items-center gap-1">
          <img src={dateicon} alt="" className="w-6" />
          <p className="text-gray-400">{transaction.purchasedate}</p>
        </div>
        <div className="flex items-center gap-1">
          <img src={seeicon} alt="" className="w-6" />
          <p className="text-gray-400">{transaction.buyerid}</p>
        </div>
      </div>
    </div>
    <div className="bg-teal-500 text-white rounded px-4 py-2">+ {transaction.amount.toLocaleString()} vnd</div>
  </div>
);

const TotalTransactions: React.FC<{ total: number; date: string }> = ({ total, date }) => (
  <div className="flex justify-between items-center p-5 bg-white rounded-xl shadow-md mt-4">
    <div>
      <h2 className="text-xl font-medium">Tổng tiền trong tháng</h2>
      <p>{date}</p>
    </div>
    <div className="text-2xl font-medium text-teal-500">{ formatCurrency(Number(total))} VND</div>
  </div>
);

const AddDocModal: React.FC<{isOpen: boolean; onClose: () => void }> = ({ isOpen,onClose }) => {
  const [title, setTitle] = useState('');
  const [categoryId, setCategoryId] = useState('85883e4d-9939-43a0-9be9-cb3d46d0757d');
  const [price, setPrice] = useState('');
  const [description, setDescription] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const accessToken = getAccessToken();
    const formData = new FormData();
    formData.append('title', title);
    formData.append('categoryId', categoryId);
    formData.append('price', price);
    formData.append('description', description);
    if (file) {
      formData.append('file', file);
    }else{
      toast.error('Vui lòng chọn file')
      return;
    }
    
    onClose();
    const loadingToastId = toast.loading('Uploading...')
    try {
    
      
    const response = await http.post<FormDataInterface >('/document/upload',formData, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      

    if (response.status === 201) {
      toast.success('Upload thành công');
      onClose();
    } else {
      toast.error('Upload thất bại');
    }
  } catch (error) {
    const axiosError = error as { response?: { data: { message: string; error: string; statusCode: number } } };
    toast.error('Đã xảy ra lỗi trong quá trình upload, mã: '+ axiosError.response?.data.statusCode + ' Nội dung: ' + axiosError.response?.data.message);
    console.error('Upload failed', axiosError.response?.data.message);
}
    toast.dismiss(loadingToastId)
  };
 
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Upload Document"
      className="bg-white rounded-xl p-8 w-2/3 max-w-2xl mx-auto mt-20 my-10"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h3 className="text-center text-2xl font-medium mb-6">Tải tài liệu lên</h3>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block mb-1">Tên tài liệu</label>
          <input
            type="text"
            className="w-full border rounded-xl p-2"
            placeholder="Nhập tên tài liệu"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Danh mục tài liệu</label>
          <select
            className="w-full border rounded-xl p-2"
            value={categoryId}
            onChange={(e) => setCategoryId(e.target.value)}
          >
            <option value="">Chọn danh mục</option>
            <option value="5ad030a0-ddc5-4c90-84a5-217f367b8fc1">Quản trị truyền thông đa phương tiện</option>
            <option value="feaa5236-df12-4184-8b4f-c02dea2915ae">Digital Marketing</option>
            <option value="85883e4d-9939-43a0-9be9-cb3d46d0757d">Kinh doanh quốc tế</option>
            <option value="3924cc67-64d1-4ae1-a4e7-b86846f73e7a">Tài chính</option>
            <option value="0fd22189-1265-426b-aac5-1463732bc6ed">Quản trị khách sạn</option>
            <option value="29457e46-d44e-457b-b961-667bf8c3234b">Kĩ thuật phần mềm</option>
            <option value="3569edb7-32e5-45d9-a67f-a38906245606">Hệ thống thông tin</option>
            <option value="7c56df76-5930-4ea2-87cd-b3a361fcf64d">An toàn thông tin</option>
            <option value="e7b7b530-b209-4001-a034-1fb947739351">Trí tuệ nhân tạo</option>
            <option value="6dc5bfe1-5c0a-414f-9e13-617411f913b0">Thiết kế mĩ thuật số</option>
            <option value="abbd09ea-9d24-4b8a-b67c-bded17077d64">Ngôn ngữ Anh</option>
            <option value="9287e4a5-a183-49fe-b364-15c94e37a326">Ngôn ngữ Nhật</option>
            <option value="bb66a421-1d26-486b-90ca-efb3ae88f9e9">Ngôn ngữ Hàn Quốc</option>
          </select>
        </div>
        <div className="mb-4">
          <label className="block mb-1">Giá ( Đơn vị : VNĐ )</label>
          <input
            type="text"
            className="w-full border rounded-xl p-2"
            placeholder="Nhập giá bán"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Mô tả</label>
          <input
            type="text"
            className="w-full border rounded-xl p-2"
            placeholder="Nhập mô tả"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>
        <div className="mb-4">
          <label className="block mb-1">Tài liệu tải lên</label>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <p className="mb-2">Thả file tại đây</p>
            <p>hoặc</p>
            <input type="file" className="mt-2" onChange={handleFileChange} />
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-400 rounded-xl">Hủy</button>
          <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-xl">Lưu lại</button>
        </div>
      </form></ReactModal>
  )
};

const DetailSellerModal: React.FC<{  isOpen: boolean;onClose: () => void;isSeller: boolean; userInfo: UserInfo }> = ({ isOpen,onClose,isSeller, userInfo }) => {
  const { user, setUser } = useAuth();
  const [name, setName] = useState(user?.user || '');
  const [email] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.phoneNumber || '');
  const [bankAccount] = useState(user?.bankAccount || '');
  const [bankCV] = useState(user?.bankCV || '');
  const [createdAt] = useState(user?.createdAt || '');
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUserInfo = { ...user , email, phone, bankAccount, bankCV };
    setUser(updatedUserInfo as User);
    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
    onClose();
  };
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit User Information"
      className="bg-white rounded-xl p-8 w-2/3 max-w-2xl mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h3 className="text-center text-2xl font-medium mb-6">Chỉnh sửa thông tin người dùng</h3>
      <form onSubmit={handleSubmit}>
      {isSeller ? (
          <>
            <div className="mb-4">
              <label className="block mb-1">Tên cửa hàng</label>
              <input type="text" className="w-full border rounded-xl p-2" value={name} onChange={(e) => setName(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block mb-1">SĐT</label>
              <input type="text" className="w-full border rounded-xl p-2" value={phone} onChange={(e) => setPhone(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Số dư tài khoản</label>
              <input type="text" className="w-full border rounded-xl p-2" value={userInfo.accountBalance} readOnly />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Ngân hàng</label>
              <input type="text" className="w-full border rounded-xl p-2" value={userInfo.bankName} readOnly />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Số tài khoản</label>
              <input type="text" className="w-full border rounded-xl p-2" value={userInfo.bankAccountNumber} readOnly />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Chủ tài khoản</label>
              <input type="text" className="w-full border rounded-xl p-2" value={userInfo.bankOwnerName} readOnly />
            </div>
          </>
        ) : (
          <>
            <div className="mb-4">
              <label className="block mb-1">Ngày tham gia</label>
              <input type="text" className="w-full border rounded-xl p-2" value={createdAt} readOnly />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Đã xác thực</label>
              <input type="text" className="w-full border rounded-xl p-2" value={userInfo.isVerified ? "Có" : "Không"} readOnly />
            </div>
          </>
        )}
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-400 rounded-xl">Hủy</button>
          <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-xl">Lưu lại</button>
        </div>
      </form>
   </ReactModal>
)};

export default SellerProfile;