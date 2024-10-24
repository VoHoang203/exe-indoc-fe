
import man from "../../assets/man.png";
import lapLeft from "../../assets/lapLeft.png";
import rightArrow from "../../assets/bxs_up-arrow.png";
import docHocThuat from "../../assets/doc_hoc_thuat.png";
import faq from "../../assets/Faq1.png";
import community from "../../assets/cong_dong.png";
import picture from "../../assets/hinh_anh.png";
import cntt from "../../assets/icon-park_code-computer.png";
import imageLogo from "../../assets/image-logo.png";
import groupLogo from "../../assets/group-logo.png";
import faqLogo from "../../assets/information-logo.png";
// import dohoa from "../../assets/ic_outline-draw.png";
// import marketing from "../../assets/nimbus_marketing.png";
import aboutImage from "../../assets/about-image.png";
import lineBackground from "../../assets/line-background.png";
import lineBackground2 from "../../assets/line-background-2.png";
import textBackground from "../../assets/Indocs-text-background.png";
import ngonngu from "../../assets/ic_baseline-language.png";
import mutot from "../../assets/material-symbols-light_school-outline-rounded.png";
import document from "../../assets/solar_document-text-linear.png";
import arrowngangxanh from "../../assets/arrowngangxanh.png";
import arrowCheo from "../../assets/arrowCheo.png";
import nuocxanh from "../../assets/nuocxanh.png";
import nuocxam from "../../assets/nuocxam.png";
import tintuc from "../../assets/tintuc.jpg";
import { Link } from "react-router-dom";
import ResourceCard from "../../components/card/ResourceCard";
import { useAuth } from "../../context/app.context"
import http from "../../utils/http"
import { useState } from "react"
import { toast } from "react-toastify"

interface FeedbackData {
  fullName: string;
  email: string;
  phoneNumber: string;
  feedback: string;
}
    const cardData = [
  {
    title: "Công nghệ thông tin",
    description: "Tổng hợp các tài liệu liên quan chuyên ngành công nghệ TT",
    details: "34 tài liệu PDF / 6 Học phần",
    imgSrc: cntt,
    documents: [
      {
        title: '"Introduction to Algorithms" by Thomas H. Cormen',
        imgSrc: document,
      },
      {
        title:
          '"Computer Networking: Principles, Protocols and Practice" by Olivier Bonaventure',
        imgSrc: document,
      },
      { title: '"Software Engineering" by Ian Sommerville', imgSrc: document },
      { title: '"Giải thuật và lập trình" - Lê Minh Hoàng', imgSrc: mutot },
    ],
    linkColor: "blue",
  },
  {
    title: "Đồ họa",
    description: "Tổng hợp các tài liệu liên quan chuyên ngành công nghệ TT",
    details: "34 tài liệu PDF / 6 Học phần",
    imgSrc: cntt,
    documents: [
      {
        title: '"Introduction to Algorithms" by Thomas H. Cormen',
        imgSrc: document,
      },
      {
        title:
          '"Computer Networking: Principles, Protocols and Practice" by Olivier Bonaventure',
        imgSrc: document,
      },
      { title: '"Software Engineering" by Ian Sommerville', imgSrc: document },
      { title: '"Giải thuật và lập trình" - Lê Minh Hoàng', imgSrc: mutot },
    ],
    linkColor: "blue",
  },
  {
    title: "Marketing",
    description: "Tổng hợp các tài liệu liên quan chuyên ngành công nghệ TT",
    details: "34 tài liệu PDF / 6 Học phần",
    imgSrc: cntt,
    documents: [
      {
        title: '"Introduction to Algorithms" by Thomas H. Cormen',
        imgSrc: document,
      },
      {
        title:
          '"Computer Networking: Principles, Protocols and Practice" by Olivier Bonaventure',
        imgSrc: document,
      },
      { title: '"Software Engineering" by Ian Sommerville', imgSrc: document },
      { title: '"Giải thuật và lập trình" - Lê Minh Hoàng', imgSrc: mutot },
    ],
    linkColor: "blue",
  },
  {
    imgSrc: ngonngu,
    title: "Ngôn Ngữ",
    description: "Tổng hợp các tài liệu liên quan chuyên ngành công nghệ TT",
    details: "34 tài liệu PDF / 6 Học phần",
    documents: [
      {
        imgSrc: document,
        title: '"Introduction to Algorithms" by Thomas H. Cormen, ....',
      },
      {
        imgSrc: document,
        title:
          '"Computer Networking: Principles, Protocols and Practice" by Olivier Bonaventure',
      },
      {
        imgSrc: document,
        title: '"Software Engineering" by Ian Sommerville',
      },
      {
        imgSrc: mutot,
        title: '"Giải thuật và lập trình" - Lê Minh Hoàng',
      },
    ],
    linkColor: "purple",
  },
];
const MainContent = () => {
  const {user} = useAuth()
  console.log(user)
  console.log(localStorage.getItem("userInfo"))
  const [fullName, setFullName] = useState<string>('');
  const [email, setEmail] = useState<string>('');
  const [phoneNumber, setPhoneNumber] = useState<string>('');
  const [feedback, setFeedback] = useState<string>('');

  const handleSubmit = async (e:  React.FormEvent<HTMLFormElement>) : Promise<void>=> {
    e.preventDefault();
      const loading = toast.loading('Loading...');
    const feedbackData: FeedbackData = {
      fullName : fullName,
      email : email,
      phoneNumber : phoneNumber,
      feedback : feedback,
    };
    console.log(feedbackData)

    try {
      const response = await http.post('/feedback/create', feedbackData);
      if (response.status === 201) {
        toast.success('Feedback submitted successfully!');
        // Reset form fields
        setFullName('');
        setEmail('');
        setPhoneNumber('');
        setFeedback('');
      }
    } catch (error: any) {
      toast.error(error.response?.data?.message || 'An error occurred while submitting feedback.');
    }
    toast.dismiss(loading);
  };

  return (
    <>
      {/* Main Section */}
      <main className="w-full mx-auto text-center py-16">
        <div className="circle-background w-[375px] h-[375px] bg-[#23ABBB4D] rounded-full absolute top-[80px] left-[-10px] blur-[40px]"></div>
        <div className="circle-background w-[522px] h-[522px] bg-[#23ABBB4D] rounded-full absolute top-[80px] left-[1270px] blur-[40px]"></div>
        <div className="mx-[5%] container h-[85vh]">
          <h1 className="text-4xl font-bold text-gray-800">
            Xin chào, <span className="text-gradient">InDocs</span> có thể giúp
            gì cho bạn?
          </h1>
          <p className="mt-2 text-lg text-gray-600">
            Tìm kiếm tất cả tài liệu và hình ảnh nhanh chóng và tiện lợi
          </p>
          {/* SearchBar */}

          {/*search bar -2 */}
          <div className="rounded-full bg-gradient-to-r from-[#1ab3bc] to-[#7953af] p-1 mt-14 mt-lg-4 w-3/5 mx-auto">
            <div className=" bg-[#474747] shadow-lg rounded-full px-5 py-2 w-full">
              <form className="flex flex-wrap gap-3 items-center" action="">
                <div className="flex-grow ">
                  <input
                    type="text"
                    className="w-full form-control border-0 font-light text-[#9C9C9C] bg-transparent focus:ring-0"
                    placeholder="Bạn đang tìm kiếm tài liệu gì?"
                  />
                </div>
                <div className="flex-grow  border-l border-gray-300 text-[#9C9C9C]">
                  <select className="p-4 border-gray-300 border-0 font-light bg-transparent focus:ring-0">
                    <option value="articles" className="">
                      Bài viết
                    </option>
                    {/* Add more options here */}
                  </select>
                  {/* <input
                type="text"
                className=" w-full form-control border-0 font-light text-gray-800 bg-transparent focus:ring-0"
                placeholder="Location"
              /> */}
                </div>
                <div className="flex-shrink-0  border-l border-gray-300 text-center">
                  <button className="w-10 h-10 mx-3 rounded-tl-none rounded-full bg-gradient-to-r from-[#1ab3bc] to-[#7953af] text-white flex items-center justify-center hover:bg-blue-800 transition duration-300 ease-in-out">
                    <svg
                      viewBox="0 0 1024 1024"
                      fill="currentColor"
                      height="1.5em"
                      width="1.5em"
                    >
                      <path d="M909.6 854.5L649.9 594.8C690.2 542.7 712 479 712 412c0-80.2-31.3-155.4-87.9-212.1-56.6-56.7-132-87.9-212.1-87.9s-155.5 31.3-212.1 87.9C143.2 256.5 112 331.8 112 412c0 80.1 31.3 155.5 87.9 212.1C256.5 680.8 331.8 712 412 712c67 0 130.6-21.8 182.7-62l259.7 259.6a8.2 8.2 0 0011.6 0l43.6-43.5a8.2 8.2 0 000-11.6zM570.4 570.4C528 612.7 471.8 636 412 636s-116-23.3-158.4-65.6C211.3 528 188 471.8 188 412s23.3-116.1 65.6-158.4C296 211.3 352.2 188 412 188s116.1 23.2 158.4 65.6S636 352.2 636 412s-23.3 116.1-65.6 158.4z" />
                    </svg>
                  </button>
                </div>
              </form>
            </div>
          </div>
          <p className="mt-4 text-gray-600 w-[56%] text-left text-sm mx-auto">
            <span className="font-bold">Từ khóa:</span> Học thuật, Công nghệ,
            ...
          </p>

          {/* Link section */}
          <div className="my-12 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 bg-gray-100 ">
            <div
              className="  text-black rounded-lg py-2 px-6 gap-1 flex justify-between items-center"
              style={{
                backgroundImage: `url(${docHocThuat})`,
                backgroundSize: "cover",
              }}
            >
              <svg
                fill="none"
                viewBox="0 0 24 24"
                height="30px"
                width="30px"
                className="text-2xl block"
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
              <div className="text-left text-black">
                <p className=" text-xl font-bold">Tài liệu học thuật</p>
                <p className="text-base mt-2">34 tài liệu PDF / 6 Học phần</p>
              </div>
            </div>
            <div
              className="text-black rounded-lg py-2 px-6 gap-4 flex items-center"
              style={{
                backgroundImage: `url(${picture})`,
                backgroundSize: "cover",
              }}
            >
              <img
                src={imageLogo}
                alt="Logo"
                width={`40px`}
                height={`40px`}
                className="text-2xl block"
              />
              <div className="text-left text-black">
                <p className="text-xl font-bold">Hình ảnh</p>
                <p className="text-base mt-2">900+</p>
              </div>
            </div>
            <div
              className="text-white rounded-lg py-2 px-6 gap-4 flex items-center"
              style={{
                backgroundImage: `url(${community})`,
                backgroundSize: "cover",
              }}
            >
              <img
                src={groupLogo}
                alt="Group-Logo"
                width={`40px`}
                height={`40px`}
                className="text-2xl block"
              />
              <div className="text-left text-white">
                <p className="text-xl font-bold">Cộng đồng</p>
                <p className="text-base mt-2">163 bài viết / 600 đánh giá</p>
              </div>
            </div>
            <div
              className="text-white rounded-lg py-2 px-6 gap-4 flex items-center"
              style={{
                backgroundImage: `url(${faq})`,
                backgroundSize: "cover",
              }}
            >
              <img
                src={faqLogo}
                alt="faq-Logo"
                width={`40px`}
                height={`40px`}
                className="text-2xl block"
              />
              <div className="text-left text-black">
                <p className="text-xl font-bold">FAQ</p>
                <p className="text-base mt-2">6 câu hỏi thường gặp</p>
              </div>
            </div>
          </div>
        </div>

        {/*---------------------------------------------------------------------------------------------------------------------------------*/}

        {/* Các chủ đề thường gặp */}
        <section className="text-center bg-white w-full px-[10%] py-[5%]">
          <img
            src={textBackground}
            alt="text-background"
            className="w-[70%] mx-auto absolute z-[0]"
          />
          <img
            src={lineBackground}
            alt="line-background"
            className="w-[100%] mx-auto absolute z-[1] mt-[200px] left-0"
          />
          <div className="circle-background w-[522px] h-[522px] bg-[#23ABBB4D] rounded-full absolute top-[800px] left-[-200px] blur-[40px]"></div>
          <div className="circle-background w-[522px] h-[522px] bg-[#23ABBB4D] rounded-full absolute top-[1400px] left-[1200px] blur-[40px]"></div>
          <h2 className="text-xl font-bold text-[#1BB3BC]">Giới thiệu</h2>
          <h1 className="text-3xl font-semibold text-gray-800 my-4">
            Các chủ đề thường gặp
          </h1>
          {}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mt-6">
            {cardData.map((card, index) => (
              <ResourceCard
                key={index}
                title={card.title}
                description={card.description}
                details={card.details}
                imgSrc={card.imgSrc}
                documents={card.documents}
                linkColor={card.linkColor}
              />
            ))}
          </div>
        </section>
        {/* website Indocs la gi*/}
        <section className="text-center bg-[#BDE6EB] w-full px-[10%] pt-[5%] relative overflow-hidden">
          <img
            src={lineBackground2}
            alt="line-background-2"
            width={1900}
            className="absolute scale-125 left-0 -rotate-6 z-0"
          />
          <p className="text-3xl font-extrabold text-center relative z-10">
            Website InDocs là gì?
          </p>
          <p className="text-xl font-medium mt-2 relative z-10">
            “InDocs” là sự kết hợp của Innovation & Insight Documents.
          </p>
          <p className="w-[80%] mx-auto  mt-2 mb-18 text-base text-justify relative z-10">
            Website InDocs là website tích hợp đa dạng loại hình tài liệu, từ
            các văn bản học thuật cho tới hình ảnh, tài nguyên thiết kế, giúp
            người dùng dễ dàng truy cập, tra cứu, lưu trữ và đăng tải tài liệu.
            Website InDocs đem lại những tài liệu phù hợp với nhu cầu, mục đích
            của người dùng, giúp công việc và quá trình học tập của người dùng
            đạt được hiệu quả tốt hơn.
          </p>
          <img
            src={aboutImage}
            alt="about-img"
            className="w-[80%] mx-auto relative z-10"
          />
        </section>

        {/* Đăng ký người bán tài liệu */}
        <section className="text-center  px-[10%] pt-[5%] overflow-hidden">
          <img
            src={textBackground}
            alt="text-background"
            className="w-[70%] mx-auto absolute z-[0]"
          />
          <img
            src={lineBackground}
            alt="line-background"
            className="w-[100%] mx-auto absolute mt-[200px] left-0 -z-[3]"
          />
          <div className="circle-background w-[300px] h-[300px] bg-[#23ABBB4D] rounded-full absolute mt-[300px] left-0 z-0 blur-[40px]"></div>

          <h2 className="text-xl font-bold text-[#1BB3BC]">Dễ dàng</h2>
          <h1 className="text-3xl font-semibold text-gray-800 my-4">
            Trở thành một người bán tài liệu
          </h1>
          <div className="flex justify-center items-center space-x-6">
            <img src={lapLeft} alt="Laptop Image" className="w-1/2 z-10" />
            <ul className="text-left text-gray-700 space-y-4">
              <li className="flex items-start gap-4">
                <img src={rightArrow} className="w-10 h-10" />
                <p>
                  Xây dựng thương hiệu cá nhân chuyên nghiệp tạo niềm tin đối
                  với người dùng
                </p>
              </li>
              <li className="flex items-start gap-4">
                <img src={rightArrow} className="w-10 h-10" />
                <p>
                  Xây dựng thương hiệu cá nhân chuyên nghiệp tạo niềm tin đối
                  với người dùng
                </p>
              </li>
              <li className="flex items-start gap-4">
                <img src={rightArrow} className="w-10 h-10" />
                <p>
                  Xây dựng thương hiệu cá nhân chuyên nghiệp tạo niềm tin đối
                  với người dùng
                </p>
              </li>
              <li className="flex items-start gap-4">
                <img src={rightArrow} className="w-10 h-10" />
                <p>
                  Xây dựng thương hiệu cá nhân chuyên nghiệp tạo niềm tin đối
                  với người dùng
                </p>
              </li>
            </ul>
          </div>
        </section>

        {/*tại sao 2 */}
        <section className="bg-white py-16">
          <div className="circle-background w-[302px] h-[302px] bg-[#23ABBB4D] rounded-full absolute blur-[40px] right-0 z-0"></div>
          <div className="circle-background w-[302px] h-[302px] bg-[#23ABBB4D] rounded-full absolute mt-[400px] right-0 blur-[40px]"></div>
          <div className="circle-background w-[302px] h-[302px] bg-[#23ABBB4D] rounded-full absolute mt-[230px]  blur-[40px]"></div>
          <img
            src={lineBackground}
            alt="line-background"
            className="w-[100%] mx-auto absolute mt-[200px] left-0 z-0"
          />
          <div className="container mx-auto px-8">
            <h2 className="text-4xl font-medium text-center text-[#21409A]">
              Tại sao lại chọn <span className="text-gradient">InDocs</span>
            </h2>
            <div className="flex gap-8 mt-10 items-center px-4 py-6 z-10 relative">
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 w-full ">
                <div className="bg-white rounded-lg shadow-lg w-full overflow-hidden">
                  <div className="bg-blue-700 text-white py-2 px-4 h-1/3">
                    <h2 className="text-xl font-bold">
                      Tài liệu học thuật và thiết kế đa dạng
                    </h2>
                  </div>
                  <div className="p-4 bg-blue-100 h-2/3">
                    <p className="text-gray-800 ">
                      Indocs tích hợp nhiều loại tài liệu, giúp người dùng tìm
                      kiếm dễ dàng trên một nền tảng duy nhất.
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg w-full overflow-hidden">
                  <div className="bg-blue-700 text-white py-2 px-4 h-1/3">
                    <h2 className="text-xl font-bold">
                      Tối ưu tài liệu cá nhân
                    </h2>
                  </div>
                  <div className="p-4 bg-white h-2/3">
                    <p className="text-gray-800">
                      Chia sẻ tài liệu dễ dàng, xây dựng nguồn tài nguyên học
                      tập phong phú và bền vững.
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg w-full overflow-hidden">
                  <div className="bg-blue-700 text-white py-2 px-4 h-1/3">
                    <h2 className="text-xl font-bold">ChatBot AI</h2>
                  </div>
                  <div className="p-4 bg-blue-100 h-2/3">
                    <p className="text-gray-800">
                      Chatbot AI luôn sẵn sàng giải đáp, tiếp cận thông tin
                      nhanh chóng và chính xác.
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg w-full overflow-hidden">
                  <div className="bg-blue-700 text-white py-2 px-4 h-1/3">
                    <h2 className="text-xl font-bold">
                      Quản lý tài liệu hiệu quả
                    </h2>
                  </div>
                  <div className="p-4 bg-white h-2/3">
                    <p className="text-gray-800">
                      Tìm kiếm mạnh mẽ, kiểm soát quyền truy cập và theo dõi tài
                      liệu giúp người dùng sử dụng tài nguyên dễ dàng và an
                      toàn.{" "}
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg w-full overflow-hidden">
                  <div className="bg-blue-700 text-white py-2 px-4 h-1/3">
                    <h2 className="text-xl font-bold">
                      Xây dựng thương hiệu cá nhân
                    </h2>
                  </div>
                  <div className="p-4 bg-blue-100 h-2/3">
                    <p className="text-gray-800 ">
                      Giúp người dùng xây dựng được thương hiệu cá nhân uy tín,
                      nâng cao danh tiếng
                    </p>
                  </div>
                </div>
                <div className="bg-white rounded-lg shadow-lg w-full overflow-hidden">
                  <div className="bg-blue-700 text-white py-2 px-4 h-1/3">
                    <h2 className="text-xl font-bold">Thu nhập từ tài liệu</h2>
                  </div>
                  <div className="p-4 bg-white h-2/3">
                    <p className="text-gray-800">
                      Đem lại thu nhập cá nhân từ chính những tài liệu người
                      dùng đăng tải.{" "}
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex justify-center mt-10 w-1/3">
                <img
                  src={man}
                  alt="Laptop Image"
                  className="w-full  rounded-lg "
                />
              </div>
            </div>
          </div>
        </section>
        {/*HỌ nói cđg đó */}
        <section className="bg-gradient-to-b from-[#def4ff] to-[#fff] py-16">
          <div className="circle-background w-[302px] h-[302px] bg-[#23ABBB4D] rounded-full absolute blur-[40px] right-0 z-0"></div>
          <div className="circle-background w-[302px] h-[302px] bg-[#23ABBB4D] rounded-full absolute mt-[300px] right-0 blur-[40px]"></div>
          <div className="circle-background w-[302px] h-[302px] bg-[#23ABBB4D] rounded-full absolute mt-[100px]  blur-[40px]"></div>
          <div className="container mx-auto px-8 text-center">
            <img
              src={textBackground}
              alt="text-background"
              className="w-[80%] mx-auto absolute"
            />
            <h2 className="text-4xl font-medium text-center text-[#21409A]">
              Họ nói gì về tài liệu của{" "}
              <span className="text-gradient">InDocs</span>
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-14">
              {/* Card 1 */}
              <div className="bg-gradient-to-r from-[#1ab3bc] to-[#7953af] p-[2px] rounded-lg h-fit">
                <div className="rounded-[6px] p-6 shadow-md hover:shadow-lg bg-white transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="bg-[#5701AD] p-2 rounded-tl-none rounded-full text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Nguyễn Gia Nguyên
                  </h3>
                  <p className="text-gray-600 mt-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text...
                  </p>
                  <Link
                    to="/news"
                    className="text-blue-600 font-semibold mt-6 inline-block"
                  >
                    Đi đến bài biết ↗
                  </Link>
                </div>
              </div>

              {/* Card 2 */}
              <div className="bg-gradient-to-r from-[#1ab3bc] to-[#7953af] p-[2px] rounded-lg h-fit">
                <div className="rounded-[6px] p-6 shadow-md hover:shadow-l bg-white transition-shadow h-[300px]">
                  <div className="flex justify-center mb-4">
                    <div className="bg-[#5701AD] p-2 rounded-tl-none rounded-full text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Nguyễn Gia Nguyên
                  </h3>
                  <p className="text-gray-600 mt-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text...
                  </p>
                  <Link
                    to="/news"
                    className="text-blue-600 font-semibold mt-6 inline-block"
                  >
                    Đi đến bài biết ↗
                  </Link>
                </div>
              </div>
              {/* Card 3 */}
              <div className="bg-gradient-to-r from-[#1ab3bc] to-[#7953af] p-[2px] rounded-lg h-fit">
                <div className="rounded-[6px] p-6 shadow-md hover:shadow-l bg-white transition-shadow">
                  <div className="flex justify-center mb-4">
                    <div className="bg-[#5701AD] p-2 rounded-tl-none rounded-full text-white">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-8 w-8"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-11.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l5-5z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800">
                    Nguyễn Gia Nguyên
                  </h3>
                  <p className="text-gray-600 mt-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text...
                  </p>
                  <Link
                    to="/news"
                    className="text-blue-600 font-semibold mt-6 inline-block"
                  >
                    Đi đến bài biết ↗
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*FAQ2 */}
        <section className="bg-gradient-to-b from-blue-50 to-blue-100 py-16">
          <div className="container mx-auto w-3/4 px-8">
            <h2 className="text-2xl font-semibold text-center text-[21409A]">
              FAQ{" "}
            </h2>
            <p className="text-center text-gray-600 mb-12">
              {" "}
              Các câu hỏi thường gặp
            </p>
            <div className="flex justify-center  gap-8">
              {/* FAQ Categories */}
              <div className="bg-white rounded-lg shadow-md p-6 w-1/3 flex flex-col">
                <ul className="space-y-4">
                  <li className="flex items-center justify-between border-b-2 border-teal-600 pb-4">
                    <div className="flex items-center justify-center gap-2">
                      <img
                        src={nuocxanh}
                        className="h-6 w-6 text-teal-600 ml-auto"
                      />
                      <span className="text-teal-600 font-semibold">
                        Tài liệu
                      </span>
                    </div>

                    <img src={arrowngangxanh} />
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-2">
                      <img src={nuocxam} className="h-6 w-6  ml-auto" />
                      <span className="text-slate-500 font-semibold">
                        Tài liệu
                      </span>
                    </div>

                    <img src={arrowCheo} />
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-2">
                      <img src={nuocxam} className="h-6 w-6  ml-auto" />
                      <span className="text-slate-500 font-semibold">
                        Tạo tài khoản
                      </span>
                    </div>


                    <img src={arrowCheo} />
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-2">
                      <img src={nuocxam} className="h-6 w-6  ml-auto" />
                      <span className="text-slate-500 font-semibold">
                        top ranking
                      </span>
                    </div>

                    <img src={arrowCheo} />
                  </li>
                  <li className="flex items-center justify-between">
                    <div className="flex items-center justify-center gap-2">
                      <img src={nuocxam} className="h-6 w-6  ml-auto" />
                      <span className="text-slate-500 font-semibold">
                        Dịch vụ
                      </span>
                    </div>

                    <img src={arrowCheo} />
                  </li>
                </ul>
              </div>
              {/* FAQ Content */}
              <div className="space-y-4 w-2/3">
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="text-teal-600 font-semibold">
                    Làm sao để có thể tìm kiếm chính xác tài liệu mong muốn?
                  </h3>
                  <p className="text-gray-600 mt-2">
                    Tìm chính xác từ khóa mà bạn mong muốn, hoặc ở phần đề xuất.
                    Vào trang dịch vụ chọn các topic bạn đang muốn tìm kiếm tài
                    liệu. Dùng thanh công cụ tìm kiếm...
                  </p>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="text-gray-800 font-semibold">
                    Làm sao để có thể tìm kiếm chính xác tài liệu mong muốn?
                  </h3>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="text-gray-800 font-semibold">
                    Làm sao để có thể tìm kiếm chính xác tài liệu mong muốn?
                  </h3>
                </div>
                <div className="bg-white rounded-lg shadow-md p-4">
                  <h3 className="text-gray-800 font-semibold">
                    Làm sao để có thể tìm kiếm chính xác tài liệu mong muốn?
                  </h3>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/*Contact form 2*/}
        <section className="bg-teal-700 py-16">
          <div className="container mx-auto px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Contact Information */}
              <div className="text-white">
                <h2 className="text-2xl font-semibold mb-4">
                  Liên hệ với chúng tôi
                </h2>
                <p className="mb-4">
                  Indocs luôn lắng nghe đóng góp của các bạn.
                </p>
                <p className="mb-4">
                  Việc cung cấp thông tin liên hệ đầy đủ và rõ ràng sẽ giúp tăng
                  cường sự tin tưởng và tạo điều kiện thuận lợi cho khách hàng
                  khi cần liên hệ với INDOCS.
                </p>
              </div>
              {/* Contact Form */}
              <div className="bg-white rounded-lg shadow-md p-8">
                <form  onSubmit={(e)=>handleSubmit(e)}>
                  <div className="mb-4 flex gap-x-2  items-center">
                    <input
                      type="text"
                      id="name"
                      className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Họ và tên"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                    />
                  </div>
                  <div className="mb-4 flex gap-x-2  items-center">
                    <input
                      type="email"
                      id="email"
                      className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <input
                      type="text"
                      id="phone"
                      className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Số điện thoại"
                      value={phoneNumber}
                      onChange={(e) => setPhoneNumber(e.target.value)}
                    />
                  </div>
                  <div className="mb-4">
                    <textarea
                      id="message"
                      rows={4}
                      className="w-full border border-gray-300 rounded-lg p-2 mt-1 focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="Nội dung liên hệ"
                      value={feedback}
                      onChange={(e) => setFeedback(e.target.value)}
                    />
                  </div>
                  <button
                    type="submit"
                    className="w-full bg-purple-600 text-white rounded-lg p-2 mt-4 hover:bg-purple-700 transition-colors"
                  >
                    Cảm ơn vì tin tưởng
                  </button>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/*============================ */}
        <section className="py-16">
          <div className="container mx-auto px-8">
            <h2 className="text-2xl font-semibold text-center text-blue-600 mb-12">
              Tin tức và sự kiện
            </h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {/* Main Event Image & Content */}
              <div className="lg:col-span-2">
                <img
                  src={tintuc}
                  alt="Main Event"
                  className="w-full h-auto rounded-lg shadow-md"
                />
                <div className="mt-6">
                  <h3 className="text-xl font-semibold text-gray-800 mb-4">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry.
                  </h3>
                  <p className="text-gray-600">
                    Lorem Ipsum is simply dummy text of the printing and
                    typesetting industry. Lorem Ipsum has been the industry's
                    standard dummy text...
                  </p>
                </div>
              </div>
              {/* Event List */}
              <div className="space-y-6">
                {/* Event Item 1 */}
                <div className="flex items-center space-x-4">
                  <img
                    src={tintuc}
                    alt="Event 1"
                    className="w-24 h-auto rounded-lg shadow-md"
                  />
                  <div>
                    <h4 className="text-gray-800 font-semibold">
                      Lorem Ipsum is simply dummy text
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry...
                    </p>
                  </div>
                </div>
                {/* Event Item 2 */}
                <div className="flex items-center space-x-4">
                  <img
                    src={tintuc}
                    alt="Event 2"
                    className="w-24 h-auto rounded-lg shadow-md"
                  />
                  <div>
                    <h4 className="text-gray-800 font-semibold">
                      Lorem Ipsum is simply dummy text
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry...
                    </p>
                  </div>
                </div>
                {/* Event Item 3 */}
                <div className="flex items-center space-x-4">
                  <img
                    src={tintuc}
                    alt="Event 3"
                    className="w-24 h-auto rounded-lg shadow-md"
                  />
                  <div>
                    <h4 className="text-gray-800 font-semibold">
                      Lorem Ipsum is simply dummy text
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry...
                    </p>
                  </div>
                </div>
                {/* Event Item 4 */}
                <div className="flex items-center space-x-4">
                  <img
                    src={tintuc}
                    alt="Event 4"
                    className="w-24 h-auto rounded-lg shadow-md"
                  />
                  <div>
                    <h4 className="text-gray-800 font-semibold">
                      Lorem Ipsum is simply dummy text
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry...
                    </p>
                  </div>
                </div>
                {/* Event Item 5 */}
                <div className="flex items-center space-x-4">
                  <img
                    src={tintuc}
                    alt="Event 5"
                    className="w-24 h-auto rounded-lg shadow-md"
                  />
                  <div>
                    <h4 className="text-gray-800 font-semibold">
                      Lorem Ipsum is simply dummy text
                    </h4>
                    <p className="text-gray-600 text-sm">
                      Lorem Ipsum is simply dummy text of the printing and
                      typesetting industry...
                    </p>
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
