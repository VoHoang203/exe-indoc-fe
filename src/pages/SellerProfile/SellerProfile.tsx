import React, {  useEffect, useState } from 'react';
import avt from "../../assets/avt.png"
import edit_icon from "../../assets/edit_icon.png"
import search_normal from "../../assets/search-normal.png"
import board from "../../assets/board.png"
import seeicon from  "../../assets/seeicon.png"
import dateicon from "../../assets/dateicon.png"
import { getAccessToken } from '../../utils/auth';
import {useMutation, useQuery } from '@tanstack/react-query';
import { toast } from 'react-toastify';
import http from '../../utils/http';
import { useAuth, User } from '../../context/app.context';
import ReactModal from 'react-modal'
import { FaCamera } from 'react-icons/fa';
import { formatCurrency } from '../Payment/Payment';
import request from "../../assets/hugeicons_money-receive-circle.png"
import upload from "../../assets/hugeicons_money-send-circle.png"
import { message, Pagination } from 'antd';
import { fetchBankData } from '../SellerRegister/SellerRegistration';
// }
interface Document2 {
  documentId: string;
  title: string;
  description: string;
  price: string;
  filePath: string;
  saleCount: number | string;
  date: string;
  author: string;
  createdAt: string;
  purchaseDate?:string
  ownerId:string
}
interface DocumentResponse {
  total: number;          // Total number of documents
  limit: number;          // Limit of documents per page
  page: number;           // Current page index (0-based)
  data: Document2[];       // Array of documents
}
export interface Transaction2 {
  title: string
  documentid: string
  buyerid: string
  purchasedate: string
  amount: string
}
interface TransactionResponse {
  total: number;          // Total number of transactions
  limit: number;          // Limit of transactions per page
  page: number;           // Current page index (0-based)
  data: Transaction2[];    // Array of transactions
}
// interface UserInfo {
//   user: string;
//   email: string;
//   phone: string;
//   role: string;
//   bankAccount: string;
//   avatar: string;
//   storeName?: string;
//   accountBalance?: string;
//   bankName?: string;
//   bankAccountNumber?: string;
//   bankOwnerName?: string;
//   createdAt?: string;
//   isVerified?: boolean;
// }
interface FormDataInterface {
  title:string;
  categoryId:string;
  price:string;
  description:string;
  file:File | undefined;
};
const fetchPaidDocuments = async (currentPage: number, limit: number) : Promise<DocumentResponse> => {
  const accessToken = getAccessToken();
  const response = await http.get(`documents/paid?page=${currentPage}&limit=${limit}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const data = await response.data;
  return {
    total: data.total,
    limit: data.limit,
    page: data.page,
    data:data.data.map((doc: Document2) => ({
    id: doc.documentId ,
    title: doc.title,
    saleCount: doc.saleCount,
    filePath: doc.filePath,
    purchaseDate : doc.purchaseDate ? new Date(doc.purchaseDate).toLocaleDateString() : new Date(doc.createdAt).toLocaleDateString(),
    author: 'Unknown',
  }))} 
};
ReactModal.setAppElement('#root');
const fetchOwnDocuments = async (currentPage: number, limit: number) : Promise<DocumentResponse>=> {
  const accessToken = getAccessToken();
  const response = await http.get(`/documents/own?page=${currentPage}&limit=${limit}`, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const data = await response.data;
  console.log(data)
  return {
    total: data.total,
    limit: data.limit,
    page: data.page,
    data:data.data.map((doc: Document2) => ({
      id: doc.documentId,
      title: doc.title,
      saleCount: doc.saleCount,
      filePath: doc.filePath,
      createdAt: new Date(doc.createdAt).toLocaleDateString() ,
      author: 'Unknown',
      amount: parseFloat(doc.price),
  }))} 
};
const fetchTransactions = async (currentPage: number, limit: number): Promise<TransactionResponse>  => {
  const accessToken = getAccessToken();
  const response = await http.get(`/v1/seller/transaction?page=${currentPage}&limit=${limit}`, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${accessToken}`,
    },
  });
  const data = await response.data;
  return {
    total: data.total,
    limit: data.limit,
    page: data.page,
    data: data.data.map((transaction: Transaction2) => ({
        title: transaction.title,
        documentId: transaction.documentid,
        buyerId: transaction.buyerid,
        purchasedate: new Date(transaction.purchasedate).toLocaleDateString(),
        amount: parseFloat(transaction.amount),
  }))};
};
const SellerProfile: React.FC = () => {
  const [activeTab, setActiveTab] = useState('purchased');
  const [showAddDocModal, setShowAddDocModal] = useState(false);
  const [showDetailSellerModal, setShowDetailSellerModal] = useState(false);
  const { isSeller,setUser,user } = useAuth(); 
  const [limit, setLimit] = useState<number>(3);
  const [currentPage, setCurrentPage] = useState<number>(0);
  const { data: documents , isLoading:isLoading1} = useQuery<DocumentResponse>({
    queryKey: ['ownDocuments', currentPage, limit],
    queryFn: () => fetchOwnDocuments(currentPage, limit),
  })
  const { data: paid, isLoading:isLoading2 } = useQuery<DocumentResponse>({
    queryKey: ['paidDocuments', currentPage, limit],
    queryFn: () => fetchPaidDocuments(currentPage, limit),
  });
  const { data: transactions , isLoading:isLoading3 } = useQuery<TransactionResponse>({
    queryKey: ['transactions', currentPage, limit],
    queryFn: () => fetchTransactions(currentPage, limit),
  });
  const [totalDocuments, setTotalDocuments] = useState<number>(0); 
  const [ownDocuments, setOwnDocuments] = useState<Document2[]>(documents?.data || []); // State để lưu tài liệu của người dùng
  const [paidDocuments, setPaidDocuments] = useState<Document2[]>(paid?.data || []); // State để lưu tài liệu đã mua
  const [transactionsData, setTransactionsData] = useState<Transaction2[]>(transactions?.data || []); // State để lưu giao dịch
  console.log("paid",paidDocuments)
  const [userInfo, setUserInfo] = useState<User>({
    user: user?.user || '',
    email: user?.email || '',
    phoneNumber: user?.phoneNumber || '',
    role: user?.role || '',
    bankAccount: user?.bankAccount || '',
    avatar: user?.avatar || '',
    storeName: user?.storeName || '',
    accountBalance: user?.accountBalance ||   '',
    bankName: user?.bankName || '',
    bankAccountNumber: user?.bankAccountNumber || '',
    bankOwnerName: user?.bankOwnerName || '',
    createdAt: user?.createdAt || '',
    isVerified: user?.isVerified || false,
    electronicInvoiceEmail: user?.electronicInvoiceEmail || '',
  });

 
  useEffect(() => {
    setCurrentPage(0);
    setLimit(3); 
    if (activeTab === 'purchased') {
      setTotalDocuments(paid?.total || 0); 
      setPaidDocuments(paid?.data || []);
    } else if (activeTab === 'uploaded') {
      setTotalDocuments(documents?.total || 0);
      setOwnDocuments(documents?.data || []);
    } else if (activeTab === 'transactions') {
      setTotalDocuments(transactions?.total || 0);
      setTransactionsData(transactions?.data || []);
    }
  }, [activeTab]); // Thêm các state vào dependency array
  const isLoading = isLoading1 || isLoading2 || isLoading3
  useEffect(() => {
    if (isLoading) {
      message.loading('Loading...');
    } else {
      message.destroy();
    }
    
  }, [isLoading]);
  useEffect(()=>{
    if (documents) {
      setOwnDocuments([])
      setOwnDocuments(documents.data );
    }
    if (paid) {
      setPaidDocuments([])
      setPaidDocuments(paid.data );
    }
    if (transactions) {
      setTransactionsData([])
      setTransactionsData(transactions.data );
    }
  },[documents,paid,transactions,currentPage,limit])
   const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const updatedUserInfo = { 
          ...userInfo, 
          avatar: reader.result as string,
          phoneNumber: user?.phoneNumber || '' // Ensure phoneNumber is included
        };
        setUserInfo(updatedUserInfo);
        setUser(updatedUserInfo as User);
        localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo)); // Save to localStorage
      };
      reader.readAsDataURL(file);
    }
  };
  //@ts-ignore
  const handlePageSizeChange = (current: number, pageSize: number) => {
    if (pageSize > totalDocuments) {
      toast.error('Page size cannot exceed the current limit.');
    } else {
      setLimit(pageSize);
    }
  };
  const handleAddDocModalToggle = () => {
    setShowAddDocModal((prev) => !prev);
  };

  const handleDetailSellerModalToggle = () => {
    setShowDetailSellerModal((prev) => !prev);
  };
  const handleUserInfoUpdate = (updatedUserInfo: User) => {
    console.log("updatedUserInfo",updatedUserInfo)
    setUserInfo({
      ...updatedUserInfo,
      accountBalance: updatedUserInfo.accountBalance ,
      avatar: updatedUserInfo.avatar ,
      bankAccountNumber: updatedUserInfo.bankAccountNumber,
      bankCV: updatedUserInfo.bankCV ,
      bankName: updatedUserInfo.bankName ,
      bankOwnerName: updatedUserInfo.bankOwnerName ,
      email: updatedUserInfo.email ,
      phoneNumber: updatedUserInfo.phoneNumber ,
      role: updatedUserInfo.role,
      storeName: updatedUserInfo.storeName ,
      user: updatedUserInfo.user ,
      createdAt: updatedUserInfo.createdAt
    });
    setUser(updatedUserInfo); 
  };
console.log(ownDocuments)
console.log("doc", documents?.data + " " + documents?.total + " " + documents?.page + " " + documents?.limit)
console.log(transactions)

const handleWithdrawalRequest = async () => {
  const accessToken = getAccessToken();
  const loading = toast.loading('Loading...');
  const amount = parseFloat(userInfo.accountBalance?.toString() || '0') || 0; // Get the user's account balance
  try {
    const response = await http.post('/users/withdrawals', {
      amount: amount,
    }, {
      headers: {
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
      },
    });

    if (response.status === 200) {
      toast.success('Withdrawal request successful');
    }
  } catch (error) {
    const axiosError = error as { response?: { status: number; data: { message: string } } };
    if (axiosError.response?.status === 400) {
      toast.error('Withdrawal request exceeds available balance');
    } else {
      toast.error('An error occurred while processing the request');
    }
  }
  toast.done(loading);
};
  return (
    <div className="flex gap-5 bg-white w-full h-screen p-5 overflow-y-auto  mb-10 pb-5">
      <div className={` ${isSeller ? 'w-2/5' : 'w-1/3'}`}>
        {isSeller && ( <div className='flex gap-2 justify-around'>
          <button onClick={() => handleAddDocModalToggle()} className="flex items-center gap-2 text-gray-400 mb-2">
            <img src={upload} alt="" className="w-6" />
            <p className="text-lg text-cyan-500 focus:underline">Tải tài liệu lên</p>
          </button>
          <button onClick={() => handleWithdrawalRequest()} className="flex items-center gap-2 text-gray-400 mb-2">
            <img src={request} alt="" className="w-6" />
            <p className="text-lg text-cyan-500 focus:underline">Request</p>
          </button>
          
          </div>
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
          <table className="w-full text-center border-collapse pb-5">
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
                    <td className="p-4 text-left">{userInfo.phoneNumber}</td>
                    <td className="p-4  border-l border-gray-300">
                  <button onClick={() =>handleDetailSellerModalToggle()}>
                    <img src={edit_icon} alt="" className="w-5 h-5" />
                  </button>
                </td>
                  </tr>
                  <tr className='border-b border-gray-300 last:border-b-0'>
                    <td className="p-4 font-medium text-left border-r border-gray-300">Số dư tài khoản</td>
                    <td className="p-4 text-left">{userInfo.accountBalance? userInfo.accountBalance +" VND" : "0 VND"}</td>
                    <td className="p-4  border-l border-gray-300">
                  <button onClick={() =>handleDetailSellerModalToggle()}>
                    <img src={edit_icon} alt="" className="w-5 h-5" />
                  </button>
                </td>
                  </tr>
                  <tr className='border-b border-gray-300 last:border-b-0'>
                    <td className="p-4 font-medium text-left border-r border-gray-300">Ngân hàng</td>
                    <td className="p-4 text-left" >{userInfo.bankName}</td>
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
                    <td className="p-4 text-sm text-left">{userInfo.email}</td>
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
                    <td className="p-4 text-left">{userInfo.isVerified ? "Đã xác thực" : "Chưa xác thực"}</td>
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
      <div className={` ${isSeller ? 'w-3/5' : 'w-2/3'}`}style={{ maxHeight: 'calc(100vh - 200px)' }}>
        <div className="border border-teal-500 rounded-xl flex items-center overflow-hidden mb-8">
          <input type="text" placeholder="Tìm kiếm ...." className="w-full p-2 outline-none text-gray-600 text-lg" />
          <img src={search_normal} alt="" className="w-10 p-2" />
        </div>
        {activeTab === 'uploaded' && (
            <p className="text-red-500 mb-4">* Nếu bạn vừa tải tài liệu vui lòng chờ trong giây lát</p>
          )}
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
         
          <div className="bg-gray-100 rounded-b-xl rounded-tr-xl p-10 shadow-md ">
            
          {activeTab === 'uploaded' && (
              <>
                  
                  {(Array.isArray(ownDocuments) && ownDocuments.map((doc: Document2, index:number) => (
                  <DocumentItem key={index} document={doc} />
                )))}
                <Pagination total={totalDocuments} pageSizeOptions={[3,4,5,7,10]}
                  showSizeChanger
                  
                    onShowSizeChange={(current, pageSize) => handlePageSizeChange(current, pageSize)} current={currentPage +1} onChange={(page) => setCurrentPage(page -1)} pageSize={limit}/>
              </>
            )}
            {activeTab === 'transactions' && (
              <>
                 {Array.isArray(transactionsData) && transactionsData.map((transaction: Transaction2, index:number)=> (
                    <TransactionItem key={index} transaction={transaction} />
                  ))}
                {transactionsData && transactionsData && (
                  <TotalTransactions 
                    total={transactionsData.reduce((sum, transaction) => sum + Number(transaction.amount), 0)} // Access data here
                    date={new Date().toLocaleDateString()} 
                  />
                )}
                  <Pagination total={totalDocuments} pageSizeOptions={[3,4,5,7,10]}
                  showSizeChanger
                    onShowSizeChange={(current, pageSize) => handlePageSizeChange(current, pageSize)}
                   current={currentPage +1} 
                   onChange={(page) => setCurrentPage(page -1)} pageSize={limit}/>
              </>
            )} 
            {activeTab ===  'purchased' && (
              <>
                 {Array.isArray(paidDocuments) && paidDocuments.map((doc: Document2, index:number) => (
                  <DocumentItem key={index} document={doc} />
                ))}
                <Pagination total={totalDocuments} 
                pageSizeOptions={[3,4,5,7,10]}
                showSizeChanger
                  onShowSizeChange={(current, pageSize) => handlePageSizeChange(current, pageSize)}
                   current={currentPage +1} onChange={(page) => setCurrentPage(page -1)} pageSize={limit}/>
              </>
            )}
            
          </div>
        </div>
      </div>
      {showAddDocModal && <AddDocModal  isOpen={showAddDocModal} onClose={() => setShowAddDocModal(false)} />}
      {showDetailSellerModal && <DetailSellerModal  isOpen={showDetailSellerModal} onClose={() => setShowDetailSellerModal(false)} isSeller={isSeller}  userInfo={userInfo} onUserInfoUpdate={handleUserInfoUpdate}/>}
    </div>
  );
};

const DocumentItem: React.FC<{ document: Document2 }> = ({ document }) => (

  <div className="flex items-center gap-2 py-4 border-b border-gray-300 mb-4">
    <img src={board} alt="" className="w-1/12" />
    <div className="flex-grow">
      <h3 className="text-xl font-bold text-gray-700 mb-2">{document.title}</h3>
      <div className="flex gap-2 items-center">
        {document.saleCount && (<div className="flex items-center gap-1">
          <img src={seeicon} alt="" className="w-6" />
          <p className="text-gray-400">{document.saleCount} lượt tải về</p>
        </div> )}
        <div className="flex items-center gap-1">
          <img src={dateicon} alt="" className="w-6" />
          <p className="text-gray-400">{document.purchaseDate ? `Ngày mua: ${document.purchaseDate}` : `Ngày tải: ${document.createdAt}`}</p>
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
      <h3 className="text-xl font-bold text-gray-700 mb-2">{transaction.title}</h3>
      <div className="flex gap-2 items-center">
        {/* <div className="flex items-center gap-1">
          <img src={seeicon} alt="" className="w-6" />
          <p className="text-gray-400">{formatCurrency(Number(transaction.amount))} lượt tải về</p>
        </div> */}
        <div className="flex items-center gap-1">
          <img src={dateicon} alt="" className="w-6" />
          <p className="text-gray-400">Ngày mua: {transaction.purchasedate}</p>
        </div>
      </div>
    </div>
    <div className="bg-teal-500 text-white rounded px-4 py-2 min-w-[150px]">+ {transaction.amount.toLocaleString()} vnd</div>
  </div>
);

const TotalTransactions: React.FC<{ total: number; date: string }> = ({ total, date }) => (
  <div className="flex justify-between items-center p-5 bg-white rounded-xl shadow-md mt-4 mb-5">
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
      const file = e.target.files[0];
      const fileSizeInMB = file.size / (1024 * 1024); // Convert size to MB
      if (fileSizeInMB > 15) {
        toast.error('Kích cỡ file tối đa 15MB. Vui lòng chọn file nhỏ hơn');
        e.target.value = '';
        return;
      }
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

    const loadingToastId = toast.loading('Đang xử lý tài liệu tải lên...')
    try {
    
      
    const response = await http.post<FormDataInterface >('/document/upload',formData, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${accessToken}`,
          'Content-Type': 'multipart/form-data',
        },
      })
      

    if (response.status === 201 || response.status === 200 || response.status === 204) {
      toast.success('Upload thành công');
      onClose();
    } else {
      toast.error('Upload thất bại');
    }
    if(response.status === 500){
      toast.error("Kích cỡ tài liệu quá lớn, vui lòng chọn file nhỏ hơn")
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
          <p className="text-red-500 mb-1">* Kích thước file tối đa 15MB</p>
          <div className="border-2 border-dashed border-gray-300 rounded-xl p-8 text-center">
            <p className="mb-2">Thả file tại đây</p>
            <p>hoặc</p>
            <input type="file" className="mt-2" onChange={handleFileChange} accept=".pdf"/>
          </div>
        </div>
        <div className="flex justify-end gap-4">
          <button type="button" onClick={onClose} className="px-4 py-2 border border-gray-400 rounded-xl">Hủy</button>
          <button type="submit" className="px-4 py-2 bg-teal-500 text-white rounded-xl">Lưu lại</button>
        </div>
      </form></ReactModal>
  )
};
const updateSellerInfo = async (payload: {
  storeName: string;
  phoneNumber: string;
  typeOfBusiness: string;
  electronicInvoiceEmail: string;
  typeOfAuthen: string;
  idNumber: string;
  bankName: string ;
  bankOwnerName: string | undefined;
  bankAccountNumber: string;
}) => {
  const accessToken = getAccessToken(); // Lấy access token
  const loadingToastId = toast.loading('Cập nhật thông tin...')
  const response = await http.post('/seller/profile/update', payload, {
    headers: {
      'Authorization': `Bearer ${accessToken}`,
      'Content-Type': 'application/json',
    },
  });

  if (response.status !== 200) {
    throw new Error('Failed to update seller info');
  }
  toast.dismiss(loadingToastId)
  return response.data; // Trả về dữ liệu nếu cần
};
const DetailSellerModal: React.FC<{  isOpen: boolean;onClose: () => void;isSeller: boolean; userInfo: User ; onUserInfoUpdate: (userInfo: User) => void }> = ({ isOpen,onClose,isSeller, userInfo, onUserInfoUpdate }) => {
  const { user, setUser } = useAuth();
  const [storeName, setStoreName] = useState(user?.storeName || '');
  const [email] = useState(user?.email || '');
  const [phoneNumber, setPhoneNumber] = useState(user?.phoneNumber || '');
  const [bankCV] = useState(user?.bankCV || '');
  const [bankOwnerName, setBankOwnerName] = useState(user?.bankOwnerName || '');
  const [bankAccountNumber, setBankAccountNumber] = useState(user?.bankAccountNumber || '');
  const [bankName, setBankName] = useState(user?.bankName || '');
  const [electronicInvoiceEmail ] = useState(user?.electronicInvoiceEmail || '');
  const [createdAt] = useState(user?.createdAt || '');
  const mutation = useMutation( {
    mutationFn: updateSellerInfo,
    onSuccess: (data: User) => {
      toast.success('Cập nhật thông tin thành công');
      onClose();
      console.log("Cập nhật thông tin thành công", data);
      onUserInfoUpdate({ ...user, ...data }); // Cập nhật user info
      
    },
    onError: (error) => {
      console.error("Có lỗi xảy ra:", error);
    },
  });
  console.log("electronicInvoiceEmail",electronicInvoiceEmail)
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const updatedUserInfo = { ...user , email, phoneNumber, bankCV,storeName, bankOwnerName, bankAccountNumber, electronicInvoiceEmail,bankName };
    setUser(updatedUserInfo as User);
    
    mutation.mutate({
      storeName: storeName,
      phoneNumber: phoneNumber,
      bankAccountNumber: bankAccountNumber,
      bankOwnerName: bankOwnerName,
      bankName: bankName,
      typeOfBusiness: 'Trường Học', 
      electronicInvoiceEmail: electronicInvoiceEmail, 
      idNumber: '934534535454' ,
      typeOfAuthen: 'CMND'
  });
  
    localStorage.setItem('userInfo', JSON.stringify(updatedUserInfo));
    onUserInfoUpdate(updatedUserInfo as User);
    
  };
  const [bankOptions, setBankOptions] = useState<{ id: number; name: string; shortName: string }[]>([]);

  useEffect(() => {
    const loadBankData = async () => {
      const banks = await fetchBankData();
      setBankOptions(banks);
    };
    loadBankData();
  }, []);
  return (
    <ReactModal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Edit User Information"
      className="bg-white rounded-xl p-8 w-2/3 max-w-2xl mx-auto mt-20"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center"
    >
      <h3 className="text-center text-2xl font-medium mb-6">{isSeller ? "Chỉnh sửa thông tin người dùng" : "Thông tin người dùng"}</h3>
      <form onSubmit={handleSubmit}>
      {isSeller ? (
          <>
            <div className="mb-4">
              <label className="block mb-1">Tên cửa hàng</label>
              <input type="text" className="w-full border rounded-xl p-2" value={storeName} onChange={(e) => setStoreName(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block mb-1">SĐT</label>
              <input type="text" minLength={10} maxLength={10} className="w-full border rounded-xl p-2" value={phoneNumber} onChange={(e) => setPhoneNumber(e.target.value)} />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Số dư tài khoản</label>
              <input type="text" className="w-full border rounded-xl p-2" value={(userInfo.accountBalance) + " VNĐ"} readOnly />
            </div>
            <div className="mb-4">
              <label className="block mb-1">Ngân hàng</label>
              <select
                    className="w-full border rounded-xl p-2"
                    value={bankName}
                    onChange={(e) => setBankName(e.target.value)}
                    required
                  >
                    <option value="" disabled>{bankName}</option>
                    {bankOptions.map(bank => (
                      <option key={bank.id} value={bank.shortName}>
                        {bank.shortName}
                      </option>
                    ))}
                </select>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Số tài khoản</label>
              <input type="text" className="w-full border rounded-xl p-2" value={bankAccountNumber} onChange={(e) => setBankAccountNumber(e.target.value)}/>
            </div>
            <div className="mb-4">
              <label className="block mb-1">Chủ tài khoản</label>
              <input type="text" className="w-full border rounded-xl p-2" value={bankOwnerName} onChange={(e) => setBankOwnerName(e.target.value)}/>
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