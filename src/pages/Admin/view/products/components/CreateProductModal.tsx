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
} from "@chakra-ui/react";
import React, { useState } from "react";
import { message, Switch, Input, Select } from "antd";

// Định nghĩa kiểu dữ liệu cho danh mục (categories) và các thông tin của sản phẩm
interface Category {
  _id: string;
  name: string;
}

interface CreateProductModalProps {
  isOpen: boolean;
  onClose: () => void;
  categories: Category[]; // Mảng các danh mục sản phẩm
}

// Định nghĩa kiểu dữ liệu cho các màu sản phẩm
interface Color {
  _id: number;
  title: string;
  base: string;
}

// Modal tạo sản phẩm
const CreateProductModal: React.FC<CreateProductModalProps> = ({
  isOpen,
  onClose,
  categories,
}) => {
  const colors: Color[] = [
    { _id: 9001, title: "Green", base: "#22c55e" },
    { _id: 9002, title: "Red", base: "#ef4444" },
    { _id: 9003, title: "Blue", base: "#3b82f6" },
    { _id: 9004, title: "Yellow", base: "#facc15" },
    { _id: 9005, title: "Black", base: "#000000" },
    { _id: 9006, title: "White", base: "#f0f0f0" },
    { _id: 9007, title: "Purple", base: "#a855f7" },
    { _id: 9008, title: "Orange", base: "#fb923c" },
    { _id: 9009, title: "Gray", base: "#6b7280" },
    { _id: 9010, title: "Pink", base: "#ec4899" },
    { _id: 9011, title: "Brown", base: "#a52a2a" },
    { _id: 9012, title: "Teal", base: "#14b8a6" },
    { _id: 9013, title: "Navy", base: "#1e3a8a" },
    { _id: 9014, title: "Lime", base: "#84cc16" },
    { _id: 9015, title: "Cyan", base: "#06b6d4" },
    { _id: 9016, title: "Magenta", base: "#d946ef" },
  ];

  // Kiểu dữ liệu cho sản phẩm mới
  interface NewProduct {
    productName: string;
    price: string;
    color: string;
    badge: string;
    tag: string;
    discount: string;
    description: string;
    stock: string;
    categoryId: string;
    image: File | null;
    imagePreview: string | null;
    isNewProduct: boolean;
    isSale: boolean;
    isSpecial: boolean;
  }

  // Khởi tạo state cho sản phẩm mới
  const [newProduct, setNewProduct] = useState<NewProduct>({
    productName: "",
    price: "",
    color: "",
    badge: "",
    tag: "",
    discount: "",
    description: "",
    stock: "",
    categoryId: "",
    image: null,
    imagePreview: null,
    isNewProduct: false,
    isSale: false,
    isSpecial: false,
  });

  const [loading, setLoading] = useState<boolean>(false);

  const MAX_IMAGE_SIZE = 5 * 1024 * 1024; // 5MB
  const PLACEHOLDER_IMAGE = "https://via.placeholder.com/150";

  // Xử lý khi chọn ảnh
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > MAX_IMAGE_SIZE) {
        message.warning("Please select an image less than 5MB.");
        return;
      }

      setNewProduct({
        ...newProduct,
        image: file,
        imagePreview: URL.createObjectURL(file),
      });
    }
  };

  // Xử lý bật/tắt các switch (isNewProduct, isSale, isSpecial)
  const handleSwitchChange = (field: keyof NewProduct, value: boolean) => {
    setNewProduct((prev) => ({ ...prev, [field]: value }));
  };

  // Xử lý khi nhấn nút "Save"
  const handleSubmit = async () => {
    setLoading(true);

    if (!newProduct.productName || !newProduct.price || !newProduct.stock) {
      message.warning("Please fill all required fields.");
      setLoading(false);
      return;
    }

    if (!newProduct.image) {
      message.warning("Please upload an image.");
      setLoading(false);
      return;
    }

    try {
      message.success("Product created successfully");
      onClose(); // Đóng modal
      setNewProduct({
        productName: "",
        price: "",
        color: "",
        badge: "",
        tag: "",
        discount: "",
        description: "",
        stock: "",
        categoryId: "",
        image: null,
        imagePreview: null,
        isNewProduct: false,
        isSale: false,
        isSpecial: false,
      });
    } catch (error) {
      message.error(
        (error as any).response?.data?.message || "Failed to create product"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Create New Product</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          {/* Product Name Input */}
          <Input
            placeholder="Product Name"
            value={newProduct.productName}
            onChange={(e) =>
              setNewProduct({ ...newProduct, productName: e.target.value })
            }
            style={{ height: "40px" }}
          />

          {/* Price and Stock Inputs */}
          <Flex justifyContent="space-between" mt={4}>
            <Input
              placeholder="Price"
              type="number"
              style={{ width: "48%", height: "40px" }}
              value={newProduct.price}
              onChange={(e) =>
                setNewProduct({ ...newProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Stock"
              type="number"
              value={newProduct.stock}
              onChange={(e) =>
                setNewProduct({ ...newProduct, stock: e.target.value })
              }
              style={{ width: "48%", height: "40px" }}
            />
          </Flex>

          {/* Badge and Discount Inputs */}
          <Flex justifyContent="space-between" mt={4}>
            <Input
              placeholder="Badge"
              value={newProduct.badge}
              onChange={(e) =>
                setNewProduct({ ...newProduct, badge: e.target.value })
              }
              style={{ width: "48%", height: "40px" }}
            />
            <Input
              placeholder="Discount"
              value={newProduct.discount}
              onChange={(e) =>
                setNewProduct({ ...newProduct, discount: e.target.value })
              }
              style={{ width: "48%", height: "40px" }}
            />
          </Flex>

          {/* Category and Color Selects */}
          <Flex justifyContent="space-between" mt={4}>
            <Select
              placeholder="Select Category"
              style={{ width: "48%", height: "40px" }}
              value={newProduct.categoryId}
              onChange={(value: string) =>
                setNewProduct({ ...newProduct, categoryId: value })
              }
            >
              {categories.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
            </Select>
            <Select
              placeholder="Select Color"
              style={{ width: "48%", height: "40px" }}
              value={newProduct.color}
              onChange={(value: string) =>
                setNewProduct({ ...newProduct, color: value })
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
            style={{ marginTop: "16px", height: "100px" }}
            value={newProduct.description}
            onChange={(e) =>
              setNewProduct({ ...newProduct, description: e.target.value })
            }
          />

          {/* Image Preview */}
          <Image
            src={newProduct.imagePreview || PLACEHOLDER_IMAGE}
            alt="Product"
            boxSize="150px"
            objectFit="cover"
            mt={4}
            borderRadius="8px"
          />

          {/* Image File Input */}
          <Input
            type="file"
            style={{ marginTop: "16px", height: "40px" }}
            accept="image/*"
            onChange={handleFileChange}
          />

          {/* Switches for isSale, isSpecial, isNewProduct */}
          <Flex mt={4} justifyContent="space-between">
            <Flex align="center">
              <Switch
                checked={newProduct.isNewProduct}
                onChange={(value) =>
                  handleSwitchChange("isNewProduct", value)
                }
              />
              <Text ml={2}>New Product</Text>
            </Flex>
            <Flex align="center">
              <Switch
                checked={newProduct.isSale}
                onChange={(value) => handleSwitchChange("isSale", value)}
              />
              <Text ml={2}>On Sale</Text>
            </Flex>
            <Flex align="center">
              <Switch
                checked={newProduct.isSpecial}
                onChange={(value) => handleSwitchChange("isSpecial", value)}
              />
              <Text ml={2}>Special</Text>
            </Flex>
          </Flex>
        </ModalBody>
        <ModalFooter>
          <Button
            colorScheme="blue"
            mr={3}
            onClick={handleSubmit}
            isLoading={loading}
          >
            Save
          </Button>
          <Button variant="ghost" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CreateProductModal;
