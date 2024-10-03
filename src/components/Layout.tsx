import React from 'react';
import { FaChevronCircleRight, FaCircle } from 'react-icons/fa';
import { RiFilterLine } from "react-icons/ri";


  interface LayoutProps {
    children: React.ReactNode;
    onCategoryChange: (categoryId: string) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
    handleSearch: (e: React.FormEvent) => void;
    
    categories: {
      id: string;
      name: string;
      subcategories: {
          id: string;
          name: string;
      }[];
  }[];
   commentsSidebar?: React.ReactNode;
  }
  // const categories = [
  //   { id: "906bf6b2-1085-45e9-ac00-176427393b37", name: "Chuyên ngành CNTT" },
  //   { id: "bc65da8f-036b-4f04-9661-ababa9d75f61", name: "Chuyên ngành Kinh tế" },
  //   { id: "f6c90cad-8d8c-400b-8199-9aba7e5b8757", name: "Chuyên ngành Ngôn ngữ" },
  // ];
const Layout = ({ children, categories,commentsSidebar ,
    onCategoryChange}: LayoutProps) => {
      const [activeCategory, setActiveCategory] = React.useState<string | null>(
        null
      );
      const [expandedCategory, setExpandedCategory] = React.useState<string | null>(
        null
      );
      const [activeSubcategory, setActiveSubcategory] = React.useState<
        string | null
      >(null);
    
      const handleCategoryClick = (categoryId: string): void => {
        setActiveCategory(categoryId);
        setActiveSubcategory(null);
        onCategoryChange(categoryId);
      };
    
      const handleExpandClick = (categoryId: string): void => {
        setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
      };
    
      const handleSubCategoryClick = (subCategoryId: string): void => {
        setActiveSubcategory(subCategoryId);
        onCategoryChange(subCategoryId); // Use subcategory ID for filtering
      };
    

  // const handleCategoryClick = (categoryId: string) => {
  //   setActiveCategory(categoryId);
    
  // };

  // const handleExpandClick = (categoryId: string) => {
  //   setExpandedCategory(expandedCategory === categoryId ? null : categoryId);
  // };

  return (
    <div className="flex justify-between  gap-8 py-4 mx-auto">
      {/* Sidebar */}
      <div className="w-1/3 bg-white shadow-lg p-6 overflow-y-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="flex items-center text-lg font-semibold text-teal-600">
            <RiFilterLine className="mr-2 text-2xl font-bold text-gray-800" /> Tài liệu
          </h2>
          <button className="text-blue-600 hover:text-blue-800 transition duration-300">
            Clear All
          </button>
        </div>
        
        <nav className="p-4 w-full">
          <ul className="space-y-2 w-full">
          {categories.map((category, index) => (
            <li key={index} className="mb-4 w-full">
              <div className="flex items-start justify-between">
                <button
                  className={`text-left focus:outline-none font-semibold ${
                    activeCategory === category.id ? "text-cyan-500" : "text-gray-600"
                  }`}
                  onClick={() => handleCategoryClick(category.id)}
                >
                  {category.name}
                </button>
                <button
                  className={`text-gray-400 focus:outline-none transition-transform duration-200 ${
                    expandedCategory === category.id? "transform rotate-90" : ""
                  }`}
                  onClick={() => handleExpandClick(category.id)}
                  aria-expanded={expandedCategory === category.id}
                  aria-controls={`subcategories-${category.id}`}
                >
                  <FaChevronCircleRight />
                </button>
              </div>
              {expandedCategory === category.id && (
                <ul
                  id={`subcategories-${index}`}
                  className="ml-4 mt-2 space-y-2"
                >
                  {category.subcategories.map((sub, index) => (
                    <li
                      key={index}
                      className={`flex items-center space-x-2 text-sm cursor-pointer ${
                        activeSubcategory === `${index}-${sub.id}`
                          ? "text-cyan-500"
                          : "text-gray-500"
                      } hover:text-cyan-500 transition-colors duration-200`}
                      onClick={() => handleSubCategoryClick( sub.id)}
                    >
                      <FaCircle className="text-xs" />
                      <span>{sub.name}</span>
                    </li>
                  ))}
                </ul>
              )}
            </li>
          ))}
          </ul>
        </nav>
        {commentsSidebar && (
        <div className="w-full bg-gray-100 shadow-lg p-6 overflow-y-auto">
          {commentsSidebar}
        </div>
        )}
      </div>

      {/* Main Content */}
      <div className="w-2/3 flex-1   bg-white shadow-lg p-6 overflow-y-auto">
      
        {children}
      </div>
      
    </div>
  );
};

export default Layout;