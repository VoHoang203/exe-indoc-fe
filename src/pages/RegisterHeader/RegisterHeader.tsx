import { Link } from 'react-router-dom';
import logo_indocs from '../../assets/logo_indocs.png'
const RegisterHeader = () => {
  const current = window.location.pathname
  console.log(current)
  return (
    <header className="bg-white shadow sticky top-0 z-50">
      <div className="container bg-white  mx-auto flex justify-between items-center py-4 px-6">
        <nav className="flex items-center">
          <Link to="/login">
        <img
                src={logo_indocs} // Đường dẫn đến file ảnh logo của bạn
                alt="Logo"
                className=" w-32 h-auto" // Giữ nguyên các class CSS để đảm bảo kích thước phù hợp
              />
              </Link>
          <div className="ml-5 text-xl lg:text-2xl text-blue-500 ">
            {current === "/login" ? "Đăng nhập": "Đăng ký"}
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
