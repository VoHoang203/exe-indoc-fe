import logo_indocs from '../../assets/logo_indocs.png'
const Footer = () => {
  return (
    <footer className="bg-neutral-100 shadow w-full">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center px-6">
        <div className="flex flex-col items-center md:items-start text-center md:text-left mb-8 md:mb-0">
        <img
                src={logo_indocs} // Đường dẫn đến file ảnh logo của bạn
                alt="Logo"
                className=" w-32 h-auto" // Giữ nguyên các class CSS để đảm bảo kích thước phù hợp
              />
          <p className="text-gray-600 max-w-xs">
            Lorem ipsum dolor sit amet consectetur adipiscing, mauris integer
            quam dolor nunc that any semper.
          </p>
        </div>
        <div className="flex flex-wrap justify-center md:justify-start space-x-8 mb-8 md:mb-0">
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-gray-800 mb-2">Về InDocs</h3>
            <ul className="text-gray-600 space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Về chúng tôi
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Chính sách
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-gray-800 mb-2">Dịch vụ</h3>
            <ul className="text-gray-600 space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  Tài liệu học thuật
                </a>
              </li>
              <li>
                <a href="#" className="hover:underline">
                  Hình ảnh
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-gray-800 mb-2">Hỗ Trợ</h3>
            <ul className="text-gray-600 space-y-1">
              <li>
                <a href="#" className="hover:underline">
                  FAQ
                </a>
              </li>
            </ul>
          </div>
          <div className="flex flex-col items-center md:items-start">
            <h3 className="font-semibold text-gray-800 mb-2">Liên hệ</h3>
            <ul className="text-gray-600 space-y-1">
              <li>SĐT: 0987865166</li>
              <li>Email: abc@gmail.com</li>
              <li>Hotline: 065464949</li>
            </ul>
          </div>
        </div>
        {/* Copyright */}
      </div>
      <div className="text-center text-gray-500 text-sm mt-6">
        © 2024. Nguyen Gia Nguyen/Nguyen Thai Hieu
      </div>
    </footer>
  );
};

export default Footer;
