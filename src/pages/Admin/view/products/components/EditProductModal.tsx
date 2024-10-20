import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Image,
  Flex,
  Button,
  Text,
} from '@chakra-ui/react';
import React, { useState, useEffect } from 'react';
import { message, Switch, Input, Select } from 'antd';

// Định nghĩa kiểu dữ liệu cho danh mục và sản phẩm
interface Category {
  _id: string;
  name: string;
}

interface Product {
  _id: string;
  productName: string;
  price: number;
  color: string;
  badge: string;
  tag: string;
  discount: number;
  description: string;
  stock: number;
  categoryId: { _id: string; name: string };
  img: string;
  isNewProduct: boolean;
  isSale: boolean;
  isSpecial: boolean;
}

// Định nghĩa kiểu dữ liệu cho props của EditProductModal
interface EditProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[];
  product: Product | null;
}

// Component EditProductModal
const EditProductModal: React.FC<EditProductModalProps> = ({
  isOpen,
  onClose,
  categories,
  product,
}) => {
  // Mảng màu có kiểu rõ ràng
  const colors = [
    { _id: 9001, title: 'Green', base: '#22c55e' },
    { _id: 9002, title: 'Red', base: '#ef4444' },
    { _id: 9003, title: 'Blue', base: '#3b82f6' },
    { _id: 9004, title: 'Yellow', base: '#facc15' },
    { _id: 9005, title: 'Black', base: '#000000' },
    { _id: 9006, title: 'White', base: '#f0f0f0' },
    { _id: 9007, title: 'Purple', base: '#a855f7' },
    { _id: 9008, title: 'Orange', base: '#fb923c' },
    { _id: 9009, title: 'Gray', base: '#6b7280' },
    { _id: 9010, title: 'Pink', base: '#ec4899' },
    { _id: 9011, title: 'Brown', base: '#a52a2a' },
    { _id: 9012, title: 'Teal', base: '#14b8a6' },
    { _id: 9013, title: 'Navy', base: '#1e3a8a' },
    { _id: 9014, title: 'Lime', base: '#84cc16' },
    { _id: 9015, title: 'Cyan', base: '#06b6d4' },
    { _id: 9016, title: 'Magenta', base: '#d946ef' },
  ];

  // Khởi tạo state cho sản phẩm chỉnh sửa và imagePreview
  const [editProduct, setEditProduct] = useState<Product | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const MAX_IMAGE_SIZE = 5 * 1024 * 1024;
  const PLACEHOLDER_IMAGE = 'https://via.placeholder.com/150';

  useEffect(() => {
    if (product) {
      setEditProduct(product);
      setImagePreview(product.img || '');
    }
  }, [product]);

  // Xử lý khi thay đổi file ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        message.warning('Please select an image less than 5MB.');
        return;
      }
      setEditProduct((prev) => (prev ? { ...prev, img: file.name } : null));
      setImagePreview(URL.createObjectURL(file)); // Only update the preview
    }
  };

  // Xử lý thay đổi giá trị các switch
  const handleSwitchChange = (field: keyof Product, value: boolean) => {
    setEditProduct((prev) => (prev ? { ...prev, [field]: value } : null));
  };

  // Xử lý khi nhấn nút "Save"
  const handleSubmit = async () => {
    setLoading(true);
    try {
      message.success('Product updated successfully');
      onClose();
    } catch (error) {
      message.error(
        (error as any).response?.data?.message || 'Failed to update product',
      );
    } finally {
      setLoading(false);
    }
  };

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
            placeholder="Product Name"
            value={editProduct.productName}
            onChange={(e) =>
              setEditProduct({ ...editProduct, productName: e.target.value })
            }
            style={{ height: '40px' }}
          />

          {/* Price and Stock Inputs */}
          <Flex justifyContent="space-between" mt={4}>
            <Input
              placeholder="Price"
              type="number"
              style={{ width: '48%', height: '40px' }}
              value={editProduct.price}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  price: Number(e.target.value),
                })
              }
            />
            <Input
              placeholder="Stock"
              type="number"
              value={editProduct.stock}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  stock: Number(e.target.value),
                })
              }
              style={{ width: '48%', height: '40px' }}
            />
          </Flex>

          {/* Badge and Discount Inputs */}
          <Flex justifyContent="space-between" mt={4}>
            <Input
              placeholder="Badge"
              value={editProduct.badge}
              onChange={(e) =>
                setEditProduct({ ...editProduct, badge: e.target.value })
              }
              style={{ width: '48%', height: '40px' }}
            />
            <Input
              placeholder="Discount"
              value={editProduct.discount}
              onChange={(e) =>
                setEditProduct({
                  ...editProduct,
                  discount: Number(e.target.value),
                })
              }
              style={{ width: '48%', height: '40px' }}
            />
          </Flex>

          {/* Category and Color Selects */}
          <Flex justifyContent="space-between" mt={4}>
            <Select
              getPopupContainer={(trigger) => trigger.parentNode}
              placeholder="Select Category"
              style={{ width: '48%', height: '40px' }}
              value={editProduct.categoryId._id}
              onChange={(value) =>
                setEditProduct({
                  ...editProduct,
                  categoryId: { _id: value, name: '' },
                })
              }
            >
              {categories.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
            <Select
              getPopupContainer={(trigger) => trigger.parentNode}
              placeholder="Select Color"
              style={{ width: '48%', height: '40px' }}
              value={editProduct.color}
              onChange={(value) =>
                setEditProduct({ ...editProduct, color: value })
              }
            >
              {colors.map((color) => (
                <Select.Option key={color._id} value={color.title}>
                  <span style={{ color: color.base }}>{color.title}</span>
                </Select.Option>
              ))}
            </Select>
          </Flex>

          {/* Description Input */}
          <Input.TextArea
            placeholder="Description"
            style={{ marginTop: '16px', minHeight: '100px', color: '#aaa' }}
            value={editProduct.description}
            onChange={(e) =>
              setEditProduct({ ...editProduct, description: e.target.value })
            }
          />

          {/* Image Preview */}
          <Image
            src={imagePreview || PLACEHOLDER_IMAGE}
            alt="Product"
            boxSize="150px"
            objectFit="cover"
            mt={4}
            borderRadius="8px"
            loading="lazy"
          />

          {/* Image File Input */}
          <Input
            type="file"
            style={{ marginTop: '16px', height: '40px' }}
            accept="image/*"
            onChange={handleFileChange}
          />

          {/* Switches for isSale, isSpecial, isNewProduct */}
          <Flex mt={4} justifyContent="space-between">
            <Flex align="center">
              <Switch
                checked={editProduct.isNewProduct}
                onChange={(value) => handleSwitchChange('isNewProduct', value)}
              />
              <Text ml={2}>New Product</Text>
            </Flex>
            <Flex align="center">
              <Switch
                checked={editProduct.isSale}
                onChange={(value) => handleSwitchChange('isSale', value)}
              />
              <Text ml={2}>On Sale</Text>
            </Flex>
            <Flex align="center">
              <Switch
                checked={editProduct.isSpecial}
                onChange={(value) => handleSwitchChange('isSpecial', value)}
              />
              <Text ml={2}>Special</Text>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          {/* Save Button */}
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isLoading={loading}
          >
            Save
          </Button>
          {/* Cancel Button */}
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default EditProductModal;
