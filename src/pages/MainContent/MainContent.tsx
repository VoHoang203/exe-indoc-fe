import man from "../../assets/man.png"
import lapLeft from "../../assets/lapLeft.png"
import rightArrow from "../../assets/bxs_up-arrow.png"
import docHocThuat from "../../assets/docHocThuat.png"
import faq from "../../assets/faq.png"
import community from "../../assets/community.png"
import picture from "../../assets/picture.png"
import cntt from "../../assets/icon-park_code-computer.png"
import dohoa from "../../assets/ic_outline-draw.png"
import marketing from "../../assets/nimbus_marketing.png"
import ngonngu from "../../assets/ic_baseline-language.png"
import mutot from "../../assets/material-symbols-light_school-outline-rounded.png"
import document from "../../assets/solar_document-text-linear.png"
import arrowngangxanh from "../../assets/arrowngangxanh.png"
import arrowCheo from "../../assets/arrowCheo.png"
import nuocxanh from "../../assets/nuocxanh.png"
import nuocxam from "../../assets/nuocxam.png"
import tintuc from "../../assets/tintuc.jpg"
import { Link } from "react-router-dom"
import { useAuth } from "../../context/app.context"
const MainContent = () => {
  const {user} = useAuth()
  console.log(user)
  console.log(localStorage.getItem("test"))
  return (
    <>
      {/* Main Section */}
      <main className="container mx-auto text-center py-16">
        <h1 className="text-3xl font-bold text-gray-800">
          Xin chào, <span className="text-blue-600">InDocs</span> có thể giúp gì
          cho bạn?
        </h1>
        <p className="mt-4 text-lg text-gray-600">
          Tìm kiếm tất cả tài liệu và hình ảnh nhanh chóng và tiện lợi
        </p>
        {/* SearchBar */}
        
        {/*search bar -2 */}
        <div className="mt-3 mt-lg-4 bg-white shadow-lg rounded-full px-5 py-2 w-1/2 mx-auto border-blue-500 border-solid border-[3px]">
          <form className="flex flex-wrap gap-3 items-center" action="">
            <div className="flex-grow ">
              <input
                type="text"
                className="w-full form-control border-0 font-light text-gray-800 bg-transparent focus:ring-0"
                placeholder="Bạn đang tìm kiếm tài liệu gì?"
              />
            </div>
            <div className="flex-grow  border-l border-gray-300">
              <select className="p-4 border-gray-300 border-0 font-light text-gray-800 bg-transparent focus:ring-0">
                <option value="articles">Bài viết</option>
                {/* Add more options here */}
              </select>
              {/* <input
                type="text"
                className=" w-full form-control border-0 font-light text-gray-800 bg-transparent focus:ring-0"
                placeholder="Location"
              /> */}
            </div>
            <div className="flex-shrink-0  border-l border-gray-300 text-center">
              <button className="w-14 h-14 mx-2 rounded-full bg-blue-600 text-white flex items-center justify-center hover:bg-blue-800 transition duration-300 ease-in-out">
                <svg
                  viewBox="0 0 1024 1024"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
                </svg>
              </button>
            </div>
          </form>
          
        </div>
        <p className="mt-4 text-gray-600">
            Từ khóa: Học thuật, Công nghệ, ...
          </p>

        {/* Link section */}
        <div className="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 bg-gray-100 ">
          <div className="  text-white rounded-lg py-2 px-12 gap-4 flex justify-between items-center"
          style={{ backgroundImage: `url(${docHocThuat})`, backgroundSize: 'cover' } }>
            <svg
              fill="none"
              viewBox="0 0 24 24"
              height="1em"
              width="1em"
              className="text-2xl mb-4 block"
            >
              <path
                fill="currentColor"
                d="M7 18h10v-2H7v2zM17 14H7v-2h10v2zM7 10h4V8H7v2z"
              />
              <path
                fill="currentColor"
                fillRule="evenodd"
                d="M6 2a3 3 0 00-3 3v14a3 3 0 003 3h12a3 3 0 003-3V9a7 7 0 00-7-7H6zm0 2h7v5h6v10a1 1 0 01-1 1H6a1 1 0 01-1-1V5a1 1 0 011-1zm9 .1A5.009 5.009 0 0118.584 7H15V4.1z"
                clipRule="evenodd"
              />
            </svg>
            {/* <span className="text-2xl mb-4 block ">📘</span> */}
            <div className="items-center">
              <p className="text-md font-bold">Tài liệu học thuật</p>
              <p className="text-md mt-2">34 tài liệu PDF / 6 Học phần</p>
            </div>
          </div>
          <div className="bg-blue-500 text-white rounded-lg p-10"
          style={{ backgroundImage: `url(${picture})`, backgroundSize: 'cover' } }>
            <p className="text-2xl font-bold">Hình ảnh</p>
            <p className="mt-2">900+</p>
          </div>
          <div className="bg-green-500 text-white rounded-lg p-10"
          style={{ backgroundImage: `url(${community})`, backgroundSize: 'cover' } }>
            <p className="text-2xl font-bold">Cộng đồng</p>
            <p className="mt-2">163 bài viết / 600 đánh giá</p>
          </div>
          <div className="bg-yellow-500 text-white rounded-lg p-10"
          style={{ backgroundImage: `url(${faq})`, backgroundSize: 'cover' } }>
            <p className="text-2xl font-bold">FAQ</p>
            <p className="mt-2">6 câu hỏi thường gặp</p>
          </div>
        </div>

        {/*---------------------------------------------------------------------------------------------------------------------------------*/}

        {/* Các chủ đề thường gặp */}
        <section className="text-center">
          <h2 className="text-xl font-semibold text-blue-600">Giới thiệu</h2>
          <h1 className="text-3xl font-bold text-gray-800 my-4">
            Các chủ đề thường gặp
          </h1>
          {}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* card test*/}
            
            {/* card test 2 */}
            <div className="border-2 border-blue-300 p-6 rounded-lg shadow-lg">
              <div className="flex items-start justify-between gap-x-4 border-b border-white">
                <div className="flex items-center">
                  <img src={cntt} className="h-8 w-8 mt-6 text-black " />
                </div>
                <div className="flex flex-col items-start w-3/4">
                  <h3 className="text-left text-xl font-semibold text-gray-600 mb-2">
                    Công nghệ thông tin
                  </h3>
                  <p className="text-left text-sm text-gray-600 mb-4">
                    Tổng hợp các tài liệu liên quan chuyên ngành công nghệ TT
                  </p>
                  <p className="text-left text-cyan-300 font-semibold mb-4">
                34 tài liệu PDF / 6 Học phần
              </p>
                </div>
              </div>
              
              <ul className="text-left text-gray-700 space-y-2">
                <li className="flex  justify-between gap-x-4">
                  <img src={document} className="w-6 h-6 flex-shrink-0 " />
                  <p className="w-4/5">"Introduction to Algorithms" by Thomas H. Cormen, ....</p>
                </li>
                <li className="flex justify-between gap-x-4">
                  <img src={document} className="w-6 h-6 flex-shrink-0 " />
                  <p className="w-4/5">"Computer Networking: Principles, Protocols and Practice" by
                  Olivier Bonaventure</p>
                </li>
                <li className="flex  justify-between gap-x-4">
                  <img src={document} className="w-6 h-6 flex-shrink-0 " />
                  <p  className="w-4/5">"Software Engineering" by Ian Sommerville</p>
                </li>
                <li className="flex  justify-between gap-x-4">
                <img src={mutot} className="w-6 h-6 flex-shrink-0 " />
                  <p className="w-4/5">"Giải thuật và lập trình" - Lê Minh Hoàng</p>
                </li>
              </ul>
              <div className="flex justify-end">
              <Link
                to="/service"
                className="text-blue-600 font-semibold mt-4 flex items-center ml-auto"
              >
                Xem tất cả
                <svg
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path d="M288 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h50.7L169.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L384 141.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H288zM80 64C35.8 64 0 99.8 0 144v256c0 44.2 35.8 80 80 80h256c44.2 0 80-35.8 80-80v-80c0-17.7-14.3-32-32-32s-32 14.3-32 32v80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h80c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
              </Link>
              </div>
            </div>
            {/* Card 2 */}
            <div className="border-2 border-purple-300 p-6 rounded-lg shadow-lg">
            <div className="flex items-start justify-between gap-x-4 border-b border-white">
                <div className="flex items-center">
                  <img src={dohoa} className="h-8 w-8 mt-6 text-black " />
                </div>
                <div className="flex flex-col items-start w-3/4">
                  <h3 className="text-left text-xl font-semibold text-gray-600 mb-2">
                    Đồ họa
                  </h3>
                  <p className="text-left text-sm text-gray-600 mb-4">
                    Tổng hợp các tài liệu liên quan chuyên ngành công nghệ TT
                  </p>
                  <p className="text-left text-cyan-300 font-semibold mb-4">
                34 tài liệu PDF / 6 Học phần
              </p>
                </div>
              </div>
              
              <ul className="text-left text-gray-700 space-y-2">
                <li className="flex  justify-between gap-x-4">
                  <img src={document} className="w-6 h-6 flex-shrink-0 " />
                  <p className="w-4/5">"Introduction to Algorithms" by Thomas H. Cormen, ....</p>
                </li>
                <li className="flex justify-between gap-x-4">
                  <img src={document} className="w-6 h-6 flex-shrink-0 " />
                  <p className="w-4/5">"Computer Networking: Principles, Protocols and Practice" by
                  Olivier Bonaventure</p>
                </li>
                <li className="flex  justify-between gap-x-4">
                  <img src={document} className="w-6 h-6 flex-shrink-0 " />
                  <p  className="w-4/5">"Software Engineering" by Ian Sommerville</p>
                </li>
                <li className="flex  justify-between gap-x-4">
                <img src={mutot} className="w-6 h-6 flex-shrink-0 " />
                  <p className="w-4/5">"Giải thuật và lập trình" - Lê Minh Hoàng</p>
                </li>
              </ul>
              <div className="flex justify-end">
              <Link
                to="/service"
                className="text-purple-600 font-semibold mt-4 flex items-center ml-auto"
              >
                Xem tất cả
                <svg
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path d="M288 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h50.7L169.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L384 141.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H288zM80 64C35.8 64 0 99.8 0 144v256c0 44.2 35.8 80 80 80h256c44.2 0 80-35.8 80-80v-80c0-17.7-14.3-32-32-32s-32 14.3-32 32v80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h80c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
              </Link>
              </div>
            </div>
            {/* Card 3 */}
            <div className="border-2 border-green-300 p-6 rounded-lg shadow-lg">
            <div className="flex items-start justify-between gap-x-4 border-b border-white">
                <div className="flex items-center">
                  <img src={marketing} className="h-8 w-8 mt-6 text-black " />
                </div>
                <div className="flex flex-col items-start w-3/4">
                  <h3 className="text-left text-xl font-semibold text-gray-600 mb-2">
                    Marketing
                  </h3>
                  <p className="text-left text-sm text-gray-600 mb-4">
                    Tổng hợp các tài liệu liên quan chuyên ngành công nghệ TT
                  </p>
                  <p className="text-left text-cyan-300 font-semibold mb-4">
                34 tài liệu PDF / 6 Học phần
              </p>
                </div>
              </div>
              
              <ul className="text-left text-gray-700 space-y-2">
                <li className="flex  justify-between gap-x-4">
                  <img src={document} className="w-6 h-6 flex-shrink-0 " />
                  <p className="w-4/5">"Introduction to Algorithms" by Thomas H. Cormen, ....</p>
                </li>
                <li className="flex justify-between gap-x-4">
                  <img src={document} className="w-6 h-6 flex-shrink-0 " />
                  <p className="w-4/5">"Computer Networking: Principles, Protocols and Practice" by
                  Olivier Bonaventure</p>
                </li>
                <li className="flex  justify-between gap-x-4">
                  <img src={document} className="w-6 h-6 flex-shrink-0 " />
                  <p  className="w-4/5">"Software Engineering" by Ian Sommerville</p>
                </li>
                <li className="flex  justify-between gap-x-4">
                <img src={mutot} className="w-6 h-6 flex-shrink-0 " />
                  <p className="w-4/5">"Giải thuật và lập trình" - Lê Minh Hoàng</p>
                </li>
              </ul>
              <div className="flex justify-end">
              <Link
                to="/service"
                className="text-purple-600 font-semibold mt-4 flex items-center ml-auto"
              >
                Xem tất cả
                <svg
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path d="M288 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h50.7L169.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L384 141.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H288zM80 64C35.8 64 0 99.8 0 144v256c0 44.2 35.8 80 80 80h256c44.2 0 80-35.8 80-80v-80c0-17.7-14.3-32-32-32s-32 14.3-32 32v80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h80c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
              </Link>
              </div>
            </div>
             {/* Card 4 */}
             <div className="border-2 border-green-300 p-6 rounded-lg shadow-lg">
            <div className="flex items-start justify-between gap-x-4 border-b border-white">
                <div className="flex items-center">
                  <img src={ngonngu} className="h-8 w-8 mt-6 text-black " />
                </div>
                <div className="flex flex-col items-start w-3/4">
                  <h3 className="text-left text-xl font-semibold text-gray-600 mb-2">
                    Ngôn Ngữ
                  </h3>
                  <p className="text-left text-sm text-gray-600 mb-4">
                    Tổng hợp các tài liệu liên quan chuyên ngành công nghệ TT
                  </p>
                  <p className="text-left text-cyan-300 font-semibold mb-4">
                34 tài liệu PDF / 6 Học phần
              </p>
                </div>
              </div>
              
              <ul className="text-left text-gray-700 space-y-2">
                <li className="flex  justify-between gap-x-4">
                  <img src={document} className="w-6 h-6 flex-shrink-0 " />
                  <p className="w-4/5">"Introduction to Algorithms" by Thomas H. Cormen, ....</p>
                </li>
                <li className="flex justify-between gap-x-4">
                  <img src={document} className="w-6 h-6 flex-shrink-0 " />
                  <p className="w-4/5">"Computer Networking: Principles, Protocols and Practice" by
                  Olivier Bonaventure</p>
                </li>
                <li className="flex  justify-between gap-x-4">
                  <img src={document} className="w-6 h-6 flex-shrink-0 " />
                  <p  className="w-4/5">"Software Engineering" by Ian Sommerville</p>
                </li>
                <li className="flex  justify-between gap-x-4">
                <img src={mutot} className="w-6 h-6 flex-shrink-0 " />
                  <p className="w-4/5">"Giải thuật và lập trình" - Lê Minh Hoàng</p>
                </li>
              </ul>
              <div className="flex justify-end">
              <Link
                to="/service"
                className="text-purple-600 font-semibold mt-4 flex items-center ml-auto"
              >
                Xem tất cả
                <svg
                  viewBox="0 0 448 512"
                  fill="currentColor"
                  height="1em"
                  width="1em"
                >
                  <path d="M288 32c-17.7 0-32 14.3-32 32s14.3 32 32 32h50.7L169.4 265.4c-12.5 12.5-12.5 32.8 0 45.3s32.8 12.5 45.3 0L384 141.3V192c0 17.7 14.3 32 32 32s32-14.3 32-32V64c0-17.7-14.3-32-32-32H288zM80 64C35.8 64 0 99.8 0 144v256c0 44.2 35.8 80 80 80h256c44.2 0 80-35.8 80-80v-80c0-17.7-14.3-32-32-32s-32 14.3-32 32v80c0 8.8-7.2 16-16 16H80c-8.8 0-16-7.2-16-16V144c0-8.8 7.2-16 16-16h80c17.7 0 32-14.3 32-32s-14.3-32-32-32H80z" />
                </svg>
              </Link>
              </div>
            </div>
            {/* Add more cards as necessary */}
          </div>
        </section>
        {/* Đăng ký người bán tài liệu */}
        <section className="text-center  mt-16">
          <h2 className="text-xl font-semibold text-blue-600">Dễ dàng</h2>
          <h1 className="text-3xl font-bold text-gray-800 my-4">
            Trở thành một người bán tài liệu
          </h1>
          <div className="flex justify-center items-center space-x-6">
            <img
              src={lapLeft}
              alt="Laptop Image"
              className="w-1/2"
            />
            <ul className="text-left text-gray-700 space-y-4">
              <li className="flex items-start gap-4">
                <img src={rightArrow} className="w-10 h-10" />
                <p>Xây dựng thương hiệu cá nhân chuyên nghiệp tạo niềm tin đối
                  với người dùng</p>
              </li>
              <li className="flex items-start gap-4">
                <img src={rightArrow} className="w-10 h-10" />
                <p>Xây dựng thương hiệu cá nhân chuyên nghiệp tạo niềm tin đối
                  với người dùng</p>
              </li>
              <li className="flex items-start gap-4">
                <img src={rightArrow} className="w-10 h-10" />
                <p>Xây dựng thương hiệu cá nhân chuyên nghiệp tạo niềm tin đối
                  với người dùng</p>
              </li>
              <li className="flex items-start gap-4">
                <img src={rightArrow} className="w-10 h-10" />
                <p>Xây dựng thương hiệu cá nhân chuyên nghiệp tạo niềm tin đối
                  với người dùng</p>
              </li>
              
            </ul>
          </div>
        </section>
        
        
        {/*tại sao 2 */}
      <section className="bg-gradient-to-b from-blue-50 to-blue-100 py-16">
  <div className="container mx-auto px-8">
    <h2 className="text-2xl font-semibold text-center text-blue-600">Tại sao lại chọn <span className="text-purple-600">InDocs</span></h2>
    <div className="flex gap-8 mt-10 items-center px-4 py-6">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full ">
        
          <div className="bg-white rounded-lg shadow-lg w-full overflow-hidden">
            <div className="bg-blue-700 text-white py-2 px-4 h-1/3">
              <h2 className="text-xl font-bold">Tài liệu học thuật và thiết kế đa dạng</h2>
            </div>
            <div className="p-4 bg-blue-100 h-2/3">
              <p className="text-gray-800 ">
              Indocs tích hợp nhiều loại tài liệu, giúp người dùng tìm kiếm dễ dàng trên một nền tảng duy nhất.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg w-full overflow-hidden">
            <div className="bg-blue-700 text-white py-2 px-4 h-1/3">
              <h2 className="text-xl font-bold">Tối ưu tài liệu cá nhân</h2>
            </div>
            <div className="p-4 bg-white h-2/3">
              <p className="text-gray-800">
              Chia sẻ tài liệu dễ dàng, xây dựng nguồn tài nguyên học tập phong phú và bền vững.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg w-full overflow-hidden">
            <div className="bg-blue-700 text-white py-2 px-4 h-1/3">
              <h2 className="text-xl font-bold">ChatBot AI</h2>
            </div>
            <div className="p-4 bg-blue-100 h-2/3">
              <p className="text-gray-800">
                Chatbot AI luôn sẵn sàng giải đáp, tiếp cận thông tin nhanh chóng và chính xác.
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg w-full overflow-hidden">
            <div className="bg-blue-700 text-white py-2 px-4 h-1/3">
              <h2 className="text-xl font-bold">Quản lý tài liệu hiệu quả</h2>
            </div>
            <div className="p-4 bg-white h-2/3">
              <p className="text-gray-800">
              Tìm kiếm mạnh mẽ, kiểm soát quyền truy cập và theo dõi tài liệu giúp người dùng sử dụng tài nguyên dễ dàng và an toàn.              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg w-full overflow-hidden">
            <div className="bg-blue-700 text-white py-2 px-4 h-1/3">
              <h2 className="text-xl font-bold">Xây dựng thương hiệu cá nhân</h2>
            </div>
            <div className="p-4 bg-blue-100 h-2/3">
              <p className="text-gray-800 ">
              Giúp người dùng xây dựng được thương hiệu cá nhân uy tín, nâng cao danh tiếng
              </p>
            </div>
          </div>
          <div className="bg-white rounded-lg shadow-lg w-full overflow-hidden">
            <div className="bg-blue-700 text-white py-2 px-4 h-1/3" >
              <h2 className="text-xl font-bold">Thu nhập từ tài liệu</h2>
            </div>
            <div className="p-4 bg-white h-2/3">
              <p className="text-gray-800">
              Đem lại thu nhập cá nhân từ chính những tài liệu người dùng đăng tải.              </p>
            </div>
          </div>

        
      </div>
      <div className="flex justify-center mt-10 w-1/3">
        <img src={man} alt="Laptop Image" className="w-full  rounded-lg shadow-md" />
      </div>
    </div>
  </div>
</section>
{/*HỌ nói cđg đó */}
<section className="bg-gradient-to-b from-blue-50 to-blue-100 py-16">
  <div className="container mx-auto px-8 text-center">
    <h2 className="text-2xl font-semibold text-blue-600 mb-12">Họ nói gì về tài liệu của <span className="text-purple-600">InDocs</span></h2>
    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
      {/* Card 1 */}
      <div className="border border-blue-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex justify-center mb-4">
          <div className="bg-purple-600 p-4 rounded-full text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Nguyễn Gia Nguyên</h3>
        <p className="text-gray-600 mt-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...</p>
        <Link to="/news" className="text-blue-600 font-semibold mt-6 inline-block">Đi đến bài biết ↗</Link>
      </div>
      {/* Card 2 */}
      <div className="border border-blue-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex justify-center mb-4">
          <div className="bg-purple-600 p-4 rounded-full text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Nguyễn Gia Nguyên</h3>
        <p className="text-gray-600 mt-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...</p>
        <Link to="/news" className="text-blue-600 font-semibold mt-6 inline-block">Đi đến bài biết ↗</Link>
      </div>
      {/* Card 3 */}
      <div className="border border-blue-300 rounded-lg p-6 shadow-md hover:shadow-lg transition-shadow">
        <div className="flex justify-center mb-4">
          <div className="bg-purple-600 p-4 rounded-full text-white">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" viewBox="0 0 20 20" fill="currentColor">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z" clipRule="evenodd" />
            </svg>
          </div>
        </div>
        <h3 className="text-lg font-semibold text-gray-800">Nguyễn Gia Nguyên</h3>
        <p className="text-gray-600 mt-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...</p>
        <Link to="/news" className="text-blue-600 font-semibold mt-6 inline-block">Đi đến bài biết ↗</Link>
      </div>
    </div>
  </div>
</section>


{/*FAQ2 */}
<section className="bg-gradient-to-b from-blue-50 to-blue-100 py-16">
  <div className="container mx-auto w-3/4 px-8">
    <h2 className="text-2xl font-semibold text-center text-[21409A]">FAQ </h2>
    <p className="text-center text-gray-600 mb-12"> Các câu hỏi thường gặp</p>
    <div className="flex justify-center  gap-8">
      {/* FAQ Categories */}
      <div className="bg-white rounded-lg shadow-md p-6 w-1/3 flex flex-col">
        <ul className="space-y-4">
          <li className="flex items-center justify-between border-b-2 border-teal-600 pb-4">
            <div className="flex items-center justify-center gap-2">
              <img src={nuocxanh} className="h-6 w-6 text-teal-600 ml-auto" />
            <span className="text-teal-600 font-semibold">Tài liệu</span></div>
            
            <img src={arrowngangxanh}  />
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
                <img src={nuocxam} className="h-6 w-6  ml-auto" />
              <span className="text-slate-500 font-semibold">Tài liệu</span></div>
              
              <img src={arrowCheo}  />
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
                <img src={nuocxam} className="h-6 w-6  ml-auto" />
              <span className="text-slate-500 font-semibold">Tạo tài khoản</span></div>
              
              <img src={arrowCheo}  />
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
                <img src={nuocxam} className="h-6 w-6  ml-auto" />
              <span className="text-slate-500 font-semibold">top ranking</span></div>
              
              <img src={arrowCheo}  />
          </li>
          <li className="flex items-center justify-between">
            <div className="flex items-center justify-center gap-2">
                <img src={nuocxam} className="h-6 w-6  ml-auto" />
              <span className="text-slate-500 font-semibold">Dịch vụ</span></div>
              
              <img src={arrowCheo}  />
          </li>
        </ul>
      </div>
      {/* FAQ Content */}
      <div className="space-y-4 w-2/3">
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-teal-600 font-semibold">Làm sao để có thể tìm kiếm chính xác tài liệu mong muốn?</h3>
          <p className="text-gray-600 mt-2">Tìm chính xác từ khóa mà bạn mong muốn, hoặc ở phần đề xuất. Vào trang dịch vụ chọn các topic bạn đang muốn tìm kiếm tài liệu. Dùng thanh công cụ tìm kiếm...</p>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-gray-800 font-semibold">Làm sao để có thể tìm kiếm chính xác tài liệu mong muốn?</h3>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-gray-800 font-semibold">Làm sao để có thể tìm kiếm chính xác tài liệu mong muốn?</h3>
        </div>
        <div className="bg-white rounded-lg shadow-md p-4">
          <h3 className="text-gray-800 font-semibold">Làm sao để có thể tìm kiếm chính xác tài liệu mong muốn?</h3>
        </div>
      </div>
    </div>
  </div>
</section>

        
        {/*Contact form 2*/ }
  <section className="bg-teal-700 py-16">
  <div className="container mx-auto px-8">
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* Contact Information */}
      <div className="text-white">
        <h2 className="text-2xl font-semibold mb-4">Liên hệ với chúng tôi</h2>
        <p className="mb-4">Indocs luôn lắng nghe đóng góp của các bạn.</p>
        <p className="mb-4">Việc cung cấp thông tin liên hệ đầy đủ và rõ ràng sẽ giúp tăng cường sự tin tưởng và tạo điều kiện thuận lợi cho khách hàng khi cần liên hệ với INDOCS.</p>
      </div>
      {/* Contact Form */}
      <div className="bg-white rounded-lg shadow-md p-8">
        <form action="#">
          <div className="mb-4 flex gap-x-2  items-center">
            <input type="text" id="name" className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Họ và tên" />
          </div>
          <div className="mb-4 flex gap-x-2  items-center"><input type="email" id="email" className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Email" />
          </div>
          <div className="mb-4"><input type="text" id="phone" className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Số điện thoại" />
          </div>
          <div className="mb-4"><textarea id="message" rows={4} className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Nội dung liên hệ" defaultValue={""} />
          </div>
          <button type="submit" className="w-full bg-purple-600 text-white rounded-lg p-2 mt-4 hover:bg-purple-700 transition-colors">Cảm ơn vì tin tưởng</button>
        </form>
      </div>
    </div>
  </div>
</section>


        
        {/*============================ */}
        <section className="py-16">
  <div className="container mx-auto px-8">
    <h2 className="text-2xl font-semibold text-center text-blue-600 mb-12">Tin tức và sự kiện</h2>
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Main Event Image & Content */}
      <div className="lg:col-span-2">
        <img src={tintuc} alt="Main Event" className="w-full h-auto rounded-lg shadow-md" />
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h3>
          <p className="text-gray-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...</p>
        </div>
      </div>
      {/* Event List */}
      <div className="space-y-6">
        {/* Event Item 1 */}
        <div className="flex items-center space-x-4">
          <img src={tintuc} alt="Event 1" className="w-24 h-auto rounded-lg shadow-md" />
          <div>
            <h4 className="text-gray-800 font-semibold">Lorem Ipsum is simply dummy text</h4>
            <p className="text-gray-600 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
          </div>
        </div>
        {/* Event Item 2 */}
        <div className="flex items-center space-x-4">
          <img src={tintuc} alt="Event 2" className="w-24 h-auto rounded-lg shadow-md" />
          <div>
            <h4 className="text-gray-800 font-semibold">Lorem Ipsum is simply dummy text</h4>
            <p className="text-gray-600 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
          </div>
        </div>
        {/* Event Item 3 */}
        <div className="flex items-center space-x-4">
          <img src={tintuc} alt="Event 3" className="w-24 h-auto rounded-lg shadow-md" />
          <div>
            <h4 className="text-gray-800 font-semibold">Lorem Ipsum is simply dummy text</h4>
            <p className="text-gray-600 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
          </div>
        </div>
        {/* Event Item 4 */}
        <div className="flex items-center space-x-4">
          <img src={tintuc} alt="Event 4" className="w-24 h-auto rounded-lg shadow-md" />
          <div>
            <h4 className="text-gray-800 font-semibold">Lorem Ipsum is simply dummy text</h4>
            <p className="text-gray-600 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
          </div>
        </div>
        {/* Event Item 5 */}
        <div className="flex items-center space-x-4">
          <img src={tintuc} alt="Event 5" className="w-24 h-auto rounded-lg shadow-md" />
          <div>
            <h4 className="text-gray-800 font-semibold">Lorem Ipsum is simply dummy text</h4>
            <p className="text-gray-600 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</section>


      </main>

    </>
  );
};

export default MainContent;
