import React, { useState, ChangeEvent } from 'react';
import {FaCamera, FaTimes, FaUser, FaEnvelope, FaPhone, FaLock, FaEyeSlash, FaEye, FaCreditCard, FaSave, FaBars, FaSort, FaFilter } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

interface Product {
  id: number;
  name: string;
  price: number;
  category: string;
  image: string;
}

interface User {
  name: string;
  email: string;
  phone: string;
  avatar: string;
  username: string;
  password: string;
  bankAccount: string;
  bankCV: string;
}

const Profile: React.FC = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(true);
  const [sortBy, setSortBy] = useState<string>("name");
  const [filterCategory, setFilterCategory] = useState<string>("all");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [showBankInfo, setShowBankInfo] = useState<boolean>(false);

  const products: Product[] = [
    { id: 1, name: "Laptop", price: 999.99, category: "Electronics", image: "https://images.unsplash.com/photo-1496181133206-80ce9b88a853?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80" },
        { id: 2, name: "Smartphone", price: 699.99, category: "Electronics", image: "https://images.unsplash.com/photo-1511707171634-5f897ff02aa9?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" },
        { id: 3, name: "Headphones", price: 199.99, category: "Audio", image: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" },
        { id: 4, name: "Camera", price: 799.99, category: "Electronics", image: "https://images.unsplash.com/photo-1516035069371-29a1b244cc32?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" },
        { id: 5, name: "Smartwatch", price: 299.99, category: "Wearables", image: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" },
        { id: 6, name: "Wireless Earbuds", price: 149.99, category: "Audio", image: "https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1050&q=80" }
      
  ];

  const [user, setUser] = useState<User>({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (123) 456-7890",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80",
    username: "johndoe123",
    password: "********",
    bankAccount: "**** **** **** 1234",
    bankCV: "123"
  });

  const toggleSidebar = (): void => setIsSidebarOpen(!isSidebarOpen);

  const sortedAndFilteredProducts = products
    .filter(product => filterCategory === "all" || product.category === filterCategory)
    .sort((a, b) => {
      if (sortBy === "name") return a.name.localeCompare(b.name);
      if (sortBy === "price") return a.price - b.price;
      return 0;
    });

  const handleAvatarChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUser({ ...user, avatar: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleUpdateProfile = (): void => {
    console.log("Updated user profile:", user);
    alert("Profile updated successfully!");
  };

  // ... (rest of the component remains largely unchanged)

  return (
    <div className="container mx-auto p-4">
       <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <AnimatePresence>
        {isSidebarOpen && (
          <motion.aside
            initial={{ x: -300 }}
            animate={{ x: 0 }}
            exit={{ x: -300 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="w-80 bg-white shadow-lg p-6 space-y-6 overflow-y-auto"
          >
            <div className="flex justify-between items-center">
              <h2 className="text-2xl font-semibold">Profile</h2>
              <button
                onClick={toggleSidebar}
                className="lg:hidden text-gray-500 hover:text-gray-700 focus:outline-none focus:ring-2 focus:ring-gray-500 rounded-md"
                aria-label="Close sidebar"
              >
                <FaTimes size={24} />
              </button>
            </div>
            <div className="flex flex-col items-center space-y-4">
              <div className="relative">
                <img
                  src={user.avatar}
                  alt="User avatar"
                  className="w-32 h-32 rounded-full object-cover"
                />
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
              <h3 className="text-xl font-medium">{user.name}</h3>
            </div>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <FaUser className="text-gray-500" />
                <input
                  type="text"
                  name="username"
                  value={user.username}
                  onChange={handleInputChange}
                  className="flex-1 border-b border-gray-300 focus:border-blue-500 outline-none"
                  placeholder="Username"
                />
              </div>
              <div className="flex items-center space-x-3">
                <FaEnvelope className="text-gray-500" />
                <input
                  type="email"
                  name="email"
                  value={user.email}
                  onChange={handleInputChange}
                  className="flex-1 border-b border-gray-300 focus:border-blue-500 outline-none"
                  placeholder="Email"
                />
              </div>
              <div className="flex items-center space-x-3">
                <FaPhone className="text-gray-500" />
                <input
                  type="tel"
                  name="phone"
                  value={user.phone}
                  onChange={handleInputChange}
                  className="flex-1 border-b border-gray-300 focus:border-blue-500 outline-none"
                  placeholder="Phone"
                />
              </div>
              <div className="flex items-center space-x-3">
                <FaLock className="text-gray-500" />
                <input
                  type={showPassword ? "text" : "password"}
                  name="password"
                  value={user.password}
                  onChange={handleInputChange}
                  className="flex-1 border-b border-gray-300 focus:border-blue-500 outline-none"
                  placeholder="Password"
                />
                <button
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-500 focus:outline-none"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <FaCreditCard className="text-gray-500" />
                <input
                  type={showBankInfo ? "text" : "password"}
                  name="bankAccount"
                  value={user.bankAccount}
                  onChange={handleInputChange}
                  className="flex-1 border-b border-gray-300 focus:border-blue-500 outline-none"
                  placeholder="Bank Account"
                />
                <button
                  onClick={() => setShowBankInfo(!showBankInfo)}
                  className="text-gray-500 focus:outline-none"
                >
                  {showBankInfo ? <FaEyeSlash /> : <FaEye />}
                </button>
              </div>
              <div className="flex items-center space-x-3">
                <FaCreditCard className="text-gray-500" />
                <input
                  type={showBankInfo ? "text" : "password"}
                  name="bankCV"
                  value={user.bankCV}
                  onChange={handleInputChange}
                  className="flex-1 border-b border-gray-300 focus:border-blue-500 outline-none"
                  placeholder="Bank CV"
                />
              </div>
            </div>
            <button
              onClick={handleUpdateProfile}
              className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition-colors flex items-center justify-center space-x-2"
            >
              <FaSave />
              <span>Cập nhật</span>
            </button>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 p-6 lg:p-10">
        <div className="flex justify-between items-center mb-6">
          <h1 className="text-3xl font-bold">My Purchases</h1>
          <button
            onClick={toggleSidebar}
            className="lg:hidden bg-white p-2 rounded-md shadow-md focus:outline-none focus:ring-2 focus:ring-gray-500"
            aria-label="Open sidebar"
          >
            <FaBars size={24} />
          </button>
        </div>

        {/* Filters and Sorting */}
        <div className="flex flex-wrap gap-4 mb-6">
          <div className="flex items-center space-x-2">
            <FaSort className="text-gray-500" />
            <select
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Sort by"
            >
              <option value="name">Sort by Name</option>
              <option value="price">Sort by Price</option>
            </select>
          </div>
          <div className="flex items-center space-x-2">
            <FaFilter className="text-gray-500" />
            <select
              value={filterCategory}
              onChange={(e) => setFilterCategory(e.target.value)}
              className="bg-white border border-gray-300 rounded-md px-3 py-2 focus:outline-none focus:ring-2 focus:ring-blue-500"
              aria-label="Filter by category"
            >
              <option value="all">All Categories</option>
              <option value="Electronics">Electronics</option>
              <option value="Audio">Audio</option>
              <option value="Wearables">Wearables</option>
            </select>
          </div>
        </div>

        {/* Product Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {sortedAndFilteredProducts.map((product) => (
            <motion.div
              key={product.id}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="bg-white rounded-lg shadow-md overflow-hidden transition-shadow duration-300 hover:shadow-lg"
            >
              <img
                src={product.image}
                alt={product.name}
                className="w-full h-48 object-cover"
              />
              <div className="p-4">
                <h3 className="text-lg font-semibold mb-2">{product.name}</h3>
                <p className="text-gray-600 mb-2">{product.category}</p>
                <p className="text-blue-600 font-bold">${product.price.toFixed(2)}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </main>
    </div>
    </div>
  );
};

export default Profile;
