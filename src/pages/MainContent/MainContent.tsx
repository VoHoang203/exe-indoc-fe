
const MainContent = () => {
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
        <div className="mt-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          <div className="bg-purple-600 text-white rounded-lg py-2 px-12 gap-4 flex justify-between items-center">
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
          <div className="bg-blue-500 text-white rounded-lg p-6">
            <p className="text-2xl font-bold">Hình ảnh</p>
            <p className="mt-2">900+</p>
          </div>
          <div className="bg-green-500 text-white rounded-lg p-6">
            <p className="text-2xl font-bold">Cộng đồng</p>
            <p className="mt-2">163 bài viết / 600 đánh giá</p>
          </div>
          <div className="bg-yellow-500 text-white rounded-lg p-6">
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
            <div className="border-2 border-blue-300 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                Công nghệ thông tin
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Tổng hợp các tài liệu liên quan chuyên ngành công nghệ TT
              </p>
              <p className="text-blue-600 font-semibold mb-4">
                34 tài liệu PDF / 6 Học phần
              </p>
              <ul className="text-left text-gray-700 space-y-2">
                <li className="flex items-center justify-between">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-12 h-12 mr-2 text-blue-600"
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
                  "Introduction to Algorithms" by Thomas H. Cormen, ....
                </li>
                <li className="flex items-center justify-between">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-12 h-12 mr-2 text-blue-600"
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
                  "Computer Networking: Principles, Protocols and Practice" by
                  Olivier Bonaventure
                </li>
                <li className="flex items-center justify-between">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-12 h-12 mr-2 text-blue-600"
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
                  </svg>{" "}
                  "Software Engineering" by Ian Sommerville
                </li>
                <li className="flex items-center justify-between">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="w-12 h-12 mr-2 text-blue-600"
                  >
                    <path d="M8.211 2.047a.5.5 0 00-.422 0l-7.5 3.5a.5.5 0 00.025.917l7.5 3a.5.5 0 00.372 0L14 7.14V13a1 1 0 00-1 1v2h3v-2a1 1 0 00-1-1V6.739l.686-.275a.5.5 0 00.025-.917l-7.5-3.5z" />
                    <path d="M4.176 9.032a.5.5 0 00-.656.327l-.5 1.7a.5.5 0 00.294.605l4.5 1.8a.5.5 0 00.372 0l4.5-1.8a.5.5 0 00.294-.605l-.5-1.7a.5.5 0 00-.656-.327L8 10.466 4.176 9.032z" />
                  </svg>{" "}
                  "Giải thuật và lập trình" - Lê Minh Hoàng
                </li>
              </ul>
              <a
                href="#"
                className="text-blue-600 font-semibold mt-4 flex items-center"
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
              </a>
            </div>
            {/* card test 2 */}
            <div className="border-2 border-blue-300 p-6 rounded-lg shadow-lg">
              <div className="flex items-start justify-between gap-x-4 border-b border-gray-300">
                <div className="">
                  <svg
                    viewBox="0 0 1024 1024"
                    fill="currentColor"
                    className="h-8 w-8 mx-3 text-black "
                  >
                    <path d="M928 140H96c-17.7 0-32 14.3-32 32v496c0 17.7 14.3 32 32 32h380v112H304c-8.8 0-16 7.2-16 16v48c0 4.4 3.6 8 8 8h432c4.4 0 8-3.6 8-8v-48c0-8.8-7.2-16-16-16H548V700h380c17.7 0 32-14.3 32-32V172c0-17.7-14.3-32-32-32zm-40 488H136V212h752v416z" />
                  </svg>
                </div>
                <div className="">
                  <h3 className="text-left text-xl font-semibold text-blue-700 mb-2">
                    Công nghệ thông tin
                  </h3>
                  <p className="text-left text-sm text-gray-600 mb-4">
                    Tổng hợp các tài liệu liên quan chuyên ngành công nghệ TT
                  </p>
                  <p className="text-left text-blue-600 font-semibold mb-4">
                34 tài liệu PDF / 6 Học phần
              </p>
                </div>
              </div>
              
              <ul className="text-left text-gray-700 space-y-2">
                <li className="flex  justify-between gap-x-4">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-12 h-12 text-blue-600 flex-shrink-0"
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
                  <p>"Introduction to Algorithms" by Thomas H. Cormen, ....</p>
                </li>
                <li className="flex justify-between gap-x-4">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-12 h-12 text-blue-600 flex-shrink-0"
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
                  <p>"Computer Networking: Principles, Protocols and Practice" by
                  Olivier Bonaventure</p>
                </li>
                <li className="flex  justify-between gap-x-4">
                  <svg
                    fill="none"
                    viewBox="0 0 24 24"
                    className="w-12 h-12 text-blue-600 flex-shrink-0"
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
                  </svg>{" "}
                  <p>"Software Engineering" by Ian Sommerville</p>
                </li>
                <li className="flex  justify-between gap-x-4">
                  <svg
                    fill="currentColor"
                    viewBox="0 0 16 16"
                    className="w-12 h-12 mr-2 text-blue-600 "
                  >
                    <path d="M8.211 2.047a.5.5 0 00-.422 0l-7.5 3.5a.5.5 0 00.025.917l7.5 3a.5.5 0 00.372 0L14 7.14V13a1 1 0 00-1 1v2h3v-2a1 1 0 00-1-1V6.739l.686-.275a.5.5 0 00.025-.917l-7.5-3.5z" />
                    <path d="M4.176 9.032a.5.5 0 00-.656.327l-.5 1.7a.5.5 0 00.294.605l4.5 1.8a.5.5 0 00.372 0l4.5-1.8a.5.5 0 00.294-.605l-.5-1.7a.5.5 0 00-.656-.327L8 10.466 4.176 9.032z" />
                  </svg>{" "}
                  <p>"Giải thuật và lập trình" - Lê Minh Hoàng</p>
                </li>
              </ul>
              <a
                href="#"
                className="text-blue-600 font-semibold mt-4 flex items-center"
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
              </a>
            </div>
            {/* Card 1 */}
            <div className="border-2 border-blue-300 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-blue-700 mb-2">
                Công nghệ thông tin
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Tổng hợp các tài liệu liên quan chuyên ngành CNTT
              </p>
              <p className="text-blue-600 font-semibold mb-4">
                34 tài liệu PDF / 6 Học phần
              </p>
              <ul className="text-left text-gray-700 space-y-2">
                <li>• "Introduction to Algorithms" by Thomas H. Cormen</li>
                <li>
                  • "Computer Networking: Principles, Protocols and Practice" by
                  Olivier Bonaventure
                </li>
                <li>• "Software Engineering" by Ian Sommerville</li>
                <li>• "Giải thuật và lập trình" - Lê Minh Hoàng</li>
              </ul>
              <a
                href="#"
                className="text-blue-600 font-semibold mt-4 inline-block"
              >
                Xem tất cả →
              </a>
            </div>
            {/* Card 2 */}
            <div className="border-2 border-purple-300 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-purple-700 mb-2">
                Đồ họa
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Tổng hợp các tài liệu liên quan chuyên ngành đồ họa
              </p>
              <p className="text-purple-600 font-semibold mb-4">
                34 tài liệu PDF / 6 Học phần
              </p>
              <ul className="text-left text-gray-700 space-y-2">
                <li>• "Introduction to Algorithms" by Thomas H. Cormen</li>
                <li>
                  • "Computer Networking: Principles, Protocols and Practice" by
                  Olivier Bonaventure
                </li>
                <li>• "Software Engineering" by Ian Sommerville</li>
                <li>• "Giải thuật và lập trình" - Lê Minh Hoàng</li>
              </ul>
              <a
                href="#"
                className="text-purple-600 font-semibold mt-4 inline-block"
              >
                Xem tất cả →
              </a>
            </div>
            {/* Card 3 */}
            <div className="border-2 border-green-300 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Marketing
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Tổng hợp các tài liệu liên quan chuyên ngành marketing
              </p>
              <p className="text-green-600 font-semibold mb-4">
                34 tài liệu PDF / 6 Học phần
              </p>
              <ul className="text-left text-gray-700 space-y-2">
                <li>• "Introduction to Algorithms" by Thomas H. Cormen</li>
                <li>
                  • "Computer Networking: Principles, Protocols and Practice" by
                  Olivier Bonaventure
                </li>
                <li>• "Software Engineering" by Ian Sommerville</li>
                <li>• "Giải thuật và lập trình" - Lê Minh Hoàng</li>
              </ul>
              <a
                href="#"
                className="text-green-600 font-semibold mt-4 inline-block"
              >
                Xem tất cả →
              </a>
            </div>
            {/* Card 3 */}
            <div className="border-2 border-green-300 p-6 rounded-lg shadow-lg">
              <h3 className="text-xl font-semibold text-green-700 mb-2">
                Marketing
              </h3>
              <p className="text-sm text-gray-600 mb-4">
                Tổng hợp các tài liệu liên quan chuyên ngành marketing
              </p>
              <p className="text-green-600 font-semibold mb-4">
                34 tài liệu PDF / 6 Học phần
              </p>
              <ul className="text-left text-gray-700 space-y-2">
                <li>• "Introduction to Algorithms" by Thomas H. Cormen</li>
                <li>
                  • "Computer Networking: Principles, Protocols and Practice" by
                  Olivier Bonaventure
                </li>
                <li>• "Software Engineering" by Ian Sommerville</li>
                <li>• "Giải thuật và lập trình" - Lê Minh Hoàng</li>
              </ul>
              <a
                href="#"
                className="text-green-600 font-semibold mt-4 inline-block"
              >
                Xem tất cả →
              </a>
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
              src="https://m.media-amazon.com/images/I/71+2H96GHZL._AC_SL1500_.jpg"
              alt="Laptop Image"
              className="w-1/3"
            />
            <ul className="text-left text-gray-700 space-y-4">
              <li className="flex items-start">
              <div className="w-0 h-0 mr-3 mt-1.5 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-blue-600"></div> 
              <p>Xây dựng thương hiệu cá nhân chuyên nghiệp tạo niềm tin đối
                với người dùng</p>
              </li>
              <li className="flex items-start">
              <div className="w-0 h-0 mr-3 mt-1.5 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-blue-600"></div> 
              <p>Xây dựng thương hiệu cá nhân chuyên nghiệp tạo niềm tin đối
                với người dùng</p>
              </li>
              <li className="flex items-start">
              <div className="w-0 h-0 mr-3 mt-1.5 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-blue-600"></div> 
              <p>Xây dựng thương hiệu cá nhân chuyên nghiệp tạo niềm tin đối
                với người dùng</p>
              </li>
              <li className="flex items-start">
              <div className="w-0 h-0 mr-3 mt-1.5 border-t-8 border-t-transparent border-b-8 border-b-transparent border-l-8 border-l-blue-600"></div> 
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
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mt-10 items-center">
      <div className=" grid grid-cols-2 gap-8 mt-10">
        {/* Box 1 */}
        <div className="bg-purple-100 rounded-lg p-6 shadow-md flex flex-col items-center text-center">
          <div className="bg-purple-600 text-white rounded-full p-4 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 7v10a4 4 0 004 4h10a4 4 0 004-4V7M7 7a4 4 0 014-4h2a4 4 0 014 4" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Tối ưu Website</h3>
          <p className="text-gray-600">Mọi thông tin cá nhân sẽ được bảo mật tuyệt đối. Tạo trải nghiệm sử dụng ổn định nhất cho người dùng</p>
        </div>
        {/* Box 2 */}
        <div className="bg-teal-100 rounded-lg p-6 shadow-md flex flex-col items-center text-center">
          <div className="bg-teal-600 text-white rounded-full p-4 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Tài liệu Online</h3>
          <p className="text-gray-600">Mọi thông tin cá nhân sẽ được bảo mật tuyệt đối. Tạo trải nghiệm sử dụng ổn định nhất cho người dùng</p>
        </div>
        {/* Box 3 */}
        <div className="bg-green-100 rounded-lg p-6 shadow-md flex flex-col items-center text-center">
          <div className="bg-green-600 text-white rounded-full p-4 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2l4-4m1 4h2a2 2 0 002-2V7a2 2 0 00-2-2H7a2 2 0 00-2 2v2a2 2 0 002 2h3m0 4H7a2 2 0 00-2 2v2a2 2 0 002 2h6a2 2 0 002-2v-2a2 2 0 00-2-2h-3" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">BoxChat</h3>
          <p className="text-gray-600">Mọi thông tin cá nhân sẽ được bảo mật tuyệt đối. Tạo trải nghiệm sử dụng ổn định nhất cho người dùng</p>
        </div>
        {/* Box 4 */}
        <div className="bg-yellow-100 rounded-lg p-6 shadow-md flex flex-col items-center text-center">
          <div className="bg-yellow-600 text-white rounded-full p-4 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4H7v4H6v-5a1 1 0 011-1h6a1 1 0 011 1v5z" />
            </svg>
          </div>
          <h3 className="text-lg font-semibold text-gray-800 mb-2">Hỗ trợ 24/7</h3>
          <p className="text-gray-600">Mọi thông tin cá nhân sẽ được bảo mật tuyệt đối. Tạo trải nghiệm sử dụng ổn định nhất cho người dùng</p>
        </div>
      </div>
      <div className="flex justify-center mt-10">
        <img src="https://www.shutterstock.com/image-photo/man-business-looks-into-laptop-260nw-2208830725.jpg" alt="Laptop Image" className="w-full  rounded-lg shadow-md" />
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
        <a href="#" className="text-blue-600 font-semibold mt-6 inline-block">Đi đến bài biết ↗</a>
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
        <a href="#" className="text-blue-600 font-semibold mt-6 inline-block">Đi đến bài biết ↗</a>
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
        <a href="#" className="text-blue-600 font-semibold mt-6 inline-block">Đi đến bài biết ↗</a>
      </div>
    </div>
  </div>
</section>


{/*FAQ2 */}
<section className="bg-gradient-to-b from-blue-50 to-blue-100 py-16">
  <div className="container mx-auto px-8">
    <h2 className="text-2xl font-semibold text-center text-blue-600 mb-12">FAQ - Các câu hỏi thường gặp</h2>
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
      {/* FAQ Categories */}
      <div className="bg-white rounded-lg shadow-md p-6">
        <ul className="space-y-4">
          <li className="flex items-center">
            <span className="text-teal-600 font-semibold">Tài liệu</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-teal-600 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M9 5l7 7-7 7" />
            </svg>
          </li>
          <li className="flex items-center">
            <span>Hình ảnh</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M9 5l7 7-7 7"  />
            </svg>
          </li>
          <li className="flex items-center">
            <span>Tạo tài khoản</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M9 5l7 7-7 7"  />
            </svg>
          </li>
          <li className="flex items-center">
            <span>Đua top RANKING</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M9 5l7 7-7 7"  />
            </svg>
          </li>
          <li className="flex items-center">
            <span>Dịch vụ</span>
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400 ml-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="{2}" d="M9 5l7 7-7 7"  />
            </svg>
          </li>
        </ul>
      </div>
      {/* FAQ Content */}
      <div className="space-y-4">
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

        {/* Contact Form */}
        <section className="mt-16 bg-teal-500 py-12">
          <div className="container mx-auto text-center text-white">
            <h2 className="text-2xl font-semibold mb-4">
              Liên hệ với chúng tôi
            </h2>
            <p className="mb-8">Indocs luôn lắng nghe đóng góp của các bạn</p>
            <form action="#" className="max-w-lg mx-auto">
              <div className="grid grid-cols-1 gap-4 mb-4">
                <input
                  type="text"
                  placeholder="Họ và tên"
                  className="p-4 rounded-lg text-gray-800"
                />
                <input
                  type="email"
                  placeholder="Email"
                  className="p-4 rounded-lg text-gray-800"
                />
                <input
                  type="tel"
                  placeholder="SĐT"
                  className="p-4 rounded-lg text-gray-800"
                />
                <textarea
                  placeholder="1 vài điều InDocs cần biết?"
                  className="p-4 rounded-lg text-gray-800"
                  defaultValue={""}
                />
              </div>
              <button type="submit" className="bg-purple-600 p-4 rounded-lg">
                Cảm ơn vì tin tưởng
              </button>
            </form>
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
          <div className="mb-4">
            <label htmlFor="name" className="block text-gray-700 font-semibold">Họ và tên</label>
            <input type="text" id="name" className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Họ và tên" />
          </div>
          <div className="mb-4">
            <label htmlFor="email" className="block text-gray-700 font-semibold">Email</label>
            <input type="email" id="email" className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Email" />
          </div>
          <div className="mb-4">
            <label htmlFor="phone" className="block text-gray-700 font-semibold">SDT</label>
            <input type="text" id="phone" className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Số điện thoại" />
          </div>
          <div className="mb-4">
            <label htmlFor="message" className="block text-gray-700 font-semibold">1 vài điều InDocs cần biết ?</label>
            <textarea id="message" rows={4} className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500" placeholder="Nội dung liên hệ" defaultValue={""} />
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
        <img src="https://via.placeholder.com/600x400" alt="Main Event" className="w-full h-auto rounded-lg shadow-md" />
        <div className="mt-6">
          <h3 className="text-xl font-semibold text-gray-800 mb-4">Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h3>
          <p className="text-gray-600">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text...</p>
        </div>
      </div>
      {/* Event List */}
      <div className="space-y-6">
        {/* Event Item 1 */}
        <div className="flex items-center space-x-4">
          <img src="https://via.placeholder.com/100x60" alt="Event 1" className="w-24 h-auto rounded-lg shadow-md" />
          <div>
            <h4 className="text-gray-800 font-semibold">Lorem Ipsum is simply dummy text</h4>
            <p className="text-gray-600 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
          </div>
        </div>
        {/* Event Item 2 */}
        <div className="flex items-center space-x-4">
          <img src="https://via.placeholder.com/100x60" alt="Event 2" className="w-24 h-auto rounded-lg shadow-md" />
          <div>
            <h4 className="text-gray-800 font-semibold">Lorem Ipsum is simply dummy text</h4>
            <p className="text-gray-600 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
          </div>
        </div>
        {/* Event Item 3 */}
        <div className="flex items-center space-x-4">
          <img src="https://via.placeholder.com/100x60" alt="Event 3" className="w-24 h-auto rounded-lg shadow-md" />
          <div>
            <h4 className="text-gray-800 font-semibold">Lorem Ipsum is simply dummy text</h4>
            <p className="text-gray-600 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
          </div>
        </div>
        {/* Event Item 4 */}
        <div className="flex items-center space-x-4">
          <img src="https://via.placeholder.com/100x60" alt="Event 4" className="w-24 h-auto rounded-lg shadow-md" />
          <div>
            <h4 className="text-gray-800 font-semibold">Lorem Ipsum is simply dummy text</h4>
            <p className="text-gray-600 text-sm">Lorem Ipsum is simply dummy text of the printing and typesetting industry...</p>
          </div>
        </div>
        {/* Event Item 5 */}
        <div className="flex items-center space-x-4">
          <img src="https://via.placeholder.com/100x60" alt="Event 5" className="w-24 h-auto rounded-lg shadow-md" />
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
