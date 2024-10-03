import logo_indocs from '../../assets/logo_indocs.png'
const RegisterHeader = () => {
  return (
    <header className="py-5 shadow">
      <div className="container bg-white  mx-auto flex justify-between items-center py-4 px-6">
        <nav className="flex items-center">
        <img
                src={logo_indocs} // Đường dẫn đến file ảnh logo của bạn
                alt="Logo"
                className=" w-32 h-auto" // Giữ nguyên các class CSS để đảm bảo kích thước phù hợp
              />
          <div className="ml-5 text-xl lg:text-2xl text-blue-500 ">
            Đăng nhập
          </div>
        </nav>
        <div>
          <a href="#" className="text-blue-500 hover:underline">
            Bạn cần giúp đỡ gì ạ?
          </a>
        </div>
      </div>
    </header>
  );
};

export default RegisterHeader;
