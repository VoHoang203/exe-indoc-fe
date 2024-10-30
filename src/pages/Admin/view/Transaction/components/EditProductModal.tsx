import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Flex,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { Input} from 'antd';
import { formatCurrency } from '../../../../Payment/Payment';
import { formatDate } from '../../../../../utils/formatCurrency';

// Định nghĩa kiểu dữ liệu cho danh mục và sản phẩm


interface Transaction {
  purchase_id: string
  buyerEmail: string
  purchaseDate: string
  cost: string
  status: string

}
// export type Root = Root2[]

export interface TransactionDetail {
  purchase_id: string
  order_by: string
  document_title: string
  purchase_date: string
  cost: string
  type_of_payment: string
  document_category_name: string
}

// Định nghĩa kiểu dữ liệu cho props của EditProductModal
interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  transaction?: Transaction | null;
  transactionDetail: TransactionDetail | null;
}

// Component EditProductModal
const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  transactionDetail
}) => {
  // Mảng màu có kiểu rõ ràng
 
 
  // Khởi tạo state cho sản phẩm chỉnh sửa và imagePreview
  
  
  const [editProduct, setEditProduct] = useState<TransactionDetail | null>(transactionDetail || null);
  useEffect(() => {
    if (transactionDetail) {
      setEditProduct(transactionDetail);
    }
  }, [transactionDetail]);

  if (!editProduct) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Edit Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Product Name Input */}
          <Input
            placeholder="Email buyer"
            value={editProduct.order_by}
            
            style={{ height: '40px' }}
          />
            <Input
            placeholder="Document title"
            value={editProduct.document_title}
            
            style={{ height: '40px' }}
          />
          {/* Price and Stock Inputs */}
          <Flex justifyContent="space-between" mt={4}>
            <Input
              placeholder="Price"
              type="string"
              style={{ width: '48%', height: '40px' }}
              value={formatCurrency(Number(editProduct.cost)) + " VND"}
            />
            <Input
              placeholder="Date purchase"
              value={formatDate(editProduct.purchase_date)}
              
              style={{ width: '48%', height: '40px' }}
            />
          </Flex>
         
          {/* Badge and Discount Inputs */}
          
            <Input
              placeholder="Purchase ID"
              value={editProduct.purchase_id}
              
              style={{ width: '100%', height: '40px' ,marginTop: '16px'}}
            />
          

          
          
        </ModalBody>
        <ModalFooter>
         
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProductModal;
