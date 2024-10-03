import React, { useState } from 'react';
import search_normal from "../../assets/search-normal.png"
import packet from  "../../assets/packet.png"
import phone from "../../assets/phoneicon.png"
import facebook from "../../assets/facebookicon.png"
import zalo from "../../assets/zaloicon.png"
import eye from "../../assets/seeicon.png"
import calendar from "../../assets/dateicon.png"
interface NewsItem {
    id: number;
    title: string;
    date: string;
    content: string;
    image: string;
    author: {
      name: string;
      description: string;
      image: string;
    };
    views: number;
  }

const NewsPage: React.FC = () => {
  const [newsItems] = useState<NewsItem[]>([
  {
    id: 1,
    title: "Các trường đại học tích cực tìm kiếm các trang web tài liệu để giúp đỡ sinh viên",
    date: "25/08/2023",
    content: "Nhiều trường đại học trên cả nước đang tích cực tìm kiếm và hợp tác với các trang web cung cấp tài liệu học tập nhằm hỗ trợ sinh viên trong quá trình học tập. Điều này không chỉ giúp sinh viên tiếp cận được nguồn tài liệu phong phú mà còn giúp họ tiết kiệm thời gian và chi phí trong việc tìm kiếm tài liệu.",
    image: "https://kenh14cdn.com/2019/9/8/15royimantaka695756721647585880128965861961527105763103n-1567938316567151816331.jpg",
    author: {
      name: "Nguyễn Văn A",
      description: "Chuyên gia giáo dục với hơn 15 năm kinh nghiệm trong lĩnh vực đào tạo đại học",
      image: "https://th.bing.com/th?id=OIP.kQyrx9VbuWXWxCVxoreXOgHaHN&w=253&h=246&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2"
    },
    views: 1500
  },
  {
    id: 2,
    title: "Xu hướng học trực tuyến ngày càng phát triển trong giới trẻ",
    date: "20/08/2023",
    content: "Học trực tuyến đang trở thành xu hướng phổ biến trong giới trẻ, đặc biệt là sau đại dịch COVID-19. Nhiều nền tảng học trực tuyến đã ra đời, cung cấp các khóa học đa dạng từ kỹ năng mềm đến kiến thức chuyên ngành, đáp ứng nhu cầu học tập linh hoạt của người trẻ.",
    image: "https://kenh14cdn.com/2019/9/8/15royimantaka695756721647585880128965861961527105763103n-1567938316567151816331.jpg",
    author: {
      name: "Trần Thị B",
      description: "Nhà sáng lập startup về giáo dục trực tuyến",
      image: "https://th.bing.com/th?id=OIP.kQyrx9VbuWXWxCVxoreXOgHaHN&w=253&h=246&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2"
    },
    views: 2300
  },
  {
    id: 3,
    title: "Sự quan trọng của kỹ năng mềm trong thời đại công nghệ 4.0",
    date: "15/08/2023",
    content: "Trong thời đại công nghệ 4.0, kỹ năng mềm đang ngày càng được coi trọng bên cạnh kiến thức chuyên môn. Các nhà tuyển dụng không chỉ tìm kiếm ứng viên có kiến thức vững vàng mà còn cần những người có khả năng giao tiếp tốt, làm việc nhóm hiệu quả và có tư duy sáng tạo.",
    image: "https://kenh14cdn.com/2019/9/8/15royimantaka695756721647585880128965861961527105763103n-1567938316567151816331.jpg",
    author: {
      name: "Lê Văn C",
      description: "Chuyên gia tư vấn nhân sự cấp cao",
      image: "https://th.bing.com/th?id=OIP.kQyrx9VbuWXWxCVxoreXOgHaHN&w=253&h=246&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2"
    },
    views: 1800
  },
  {
    id: 4,
    title: "Các trường đại học đẩy mạnh hợp tác quốc tế trong nghiên cứu khoa học",
    date: "10/08/2023",
    content: "Nhiều trường đại học Việt Nam đang tích cực mở rộng hợp tác quốc tế trong lĩnh vực nghiên cứu khoa học. Điều này không chỉ nâng cao chất lượng nghiên cứu mà còn tạo cơ hội cho sinh viên và giảng viên tiếp cận với tri thức và công nghệ tiên tiến trên thế giới.",
    image: "https://kenh14cdn.com/2019/9/8/15royimantaka695756721647585880128965861961527105763103n-1567938316567151816331.jpg",
    author: {
      name: "Phạm Thị D",
      description: "Giáo sư, Tiến sĩ chuyên ngành Quan hệ Quốc tế",
      image: "https://th.bing.com/th?id=OIP.kQyrx9VbuWXWxCVxoreXOgHaHN&w=253&h=246&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2"
    },
    views: 1200
  },
  {
    id: 5,
    title: "Ứng dụng trí tuệ nhân tạo trong giáo dục: Cơ hội và thách thức",
    date: "05/08/2023",
    content: "Trí tuệ nhân tạo (AI) đang dần được ứng dụng rộng rãi trong lĩnh vực giáo dục, mang lại nhiều cơ hội như cá nhân hóa việc học, hỗ trợ giáo viên trong đánh giá học sinh. Tuy nhiên, việc áp dụng AI cũng đặt ra nhiều thách thức về đạo đức và quyền riêng tư cần được giải quyết.",
    image: "https://kenh14cdn.com/2019/9/8/15royimantaka695756721647585880128965861961527105763103n-1567938316567151816331.jpg",
    author: {
      name: "Hoàng Văn E",
      description: "Chuyên gia về AI trong giáo dục",
      image: "https://th.bing.com/th?id=OIP.kQyrx9VbuWXWxCVxoreXOgHaHN&w=253&h=246&c=8&rs=1&qlt=90&r=0&o=6&dpr=1.3&pid=3.1&rm=2"
    },
    views: 2000
  }
]);
  const [selectedNews, setSelectedNews] = useState<NewsItem | null>(null);

  const handleViewDetail = (id: number) => {
    const news = newsItems.find(item => item.id === id);
    if (news) {
      setSelectedNews(news);
    }
  };
  return (
    <div className="bg-white">
      

      <div className="container mx-auto px-5 py-10">
      <div className="flex justify-between gap-10">
          <div className="w-3/4">
            {selectedNews ? (
              <NewsDetailComponent news={selectedNews} onClose={() => setSelectedNews(null)} />
            ) : (
              <>
                <div className="border border-[#1AB3BC] rounded-xl flex items-center overflow-hidden mb-8 h-[43px]">
                  <input type="text" placeholder="Tìm kiếm ...." className="w-full p-2 outline-none text-gray-600 text-base" />
                  <img src={search_normal} alt="" className="w-10 p-2 cursor-pointer" />
                </div>
                {newsItems.map((item) => (
                  <NewsItem key={item.id} item={item} onViewDetail={handleViewDetail} />
                ))}
              </>
            )}
          </div>
          <Sidebar />
        </div>
        {!selectedNews && <Pagination />}
      </div>
    </div>
  );
};

const NewsItem: React.FC<{ item: NewsItem; onViewDetail: (id: number) => void }> = ({ item, onViewDetail }) =>(
  <div className="flex w-full mb-5 bg-white rounded-lg shadow-md overflow-hidden border border-[#B9E1E8]">
    <img src={item.image} alt={item.title} className="w-[300px] h-[340px] object-cover" />
    <div className="p-6 border-b border-gray-300">
      <div className="flex items-center gap-2 mb-5">
        <img src={packet} alt="" className="w-5 h-5" />
        <p>{item.date}</p>
      </div>
      <h2 className="text-xl font-bold text-black mb-5">{item.title}</h2>
      <p className="text-sm text-gray-700 mb-10">{item.content}</p>
      {/* <Link to={`/news/${item.id}`} className="text-[#0096c7] font-bold">Đọc thêm</Link> */}
      <button onClick={() => onViewDetail(item.id)} className="text-[#0096c7] font-bold">Đọc thêm</button>
    </div>
  </div>
);

const Sidebar: React.FC = () => (
  <div className="w-1/4 mt-[60px] animate-fadeIn">
    <h2 className="text-lg text-[#1AB3BC] mb-2">| TIN TỨC NỔI BẬT</h2>
    <ul>
      {[1, 2, 3].map((i) => (
        <li key={i} className="flex gap-2 items-center justify-between py-2 mb-2 border-b border-gray-300">
          <img className="w-[93px] h-[60px] object-cover" src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/6d079f37-8af2-4244-b3d4-52b4d067fe86/width=1200/6d079f37-8af2-4244-b3d4-52b4d067fe86.jpeg" alt="" />
          <a href="#" className="text-black">Lợi ích của việc phẩu thuật thẩm mỹ tại Web</a>
        </li>
      ))}
    </ul>

    <h2 className="text-lg text-[#1AB3BC] mb-2 mt-8">| TIN TỨC XEM NHIỀU</h2>
    <ul>
      {[1, 2].map((i) => (
        <li key={i} className="flex gap-2 items-center justify-between py-2 mb-2 border-b border-gray-300">
          <img className="w-[93px] h-[60px] object-cover" src="https://image.civitai.com/xG1nkqKTMzGDvpLrqFT7WA/6d079f37-8af2-4244-b3d4-52b4d067fe86/width=1200/6d079f37-8af2-4244-b3d4-52b4d067fe86.jpeg" alt="" />
          <a href="#" className="text-black">Lợi ích của việc phẩu thuật thẩm mỹ tại Web</a>
        </li>
      ))}
    </ul>
  </div>
);

const Pagination: React.FC = () => (
  <div className="text-center mt-8">
    {[1, 2, 3, '>'].map((page, index) => (
      <button key={index} className={`px-5 py-2 mx-1 border border-[#1AB3BC] rounded text-[#1AB3BC] font-bold text-xl hover:bg-[#1AB3BC] hover:text-white ${index === 0 ? 'bg-[#1AB3BC] text-white' : ''}`}>
        {page}
      </button>
    ))}
  </div>
);
const NewsDetailComponent: React.FC<{ news: NewsItem; onClose: () => void }> = ({ news, onClose }) => (
    <div className="bg-white rounded-lg shadow-md overflow-hidden border border-[#B9E1E8] p-6">
      <button onClick={onClose} className="mb-4 text-blue-500">← Quay lại</button>
      <div className="infonew flex justify-between items-center mb-8">
        <h2 className="text-2xl font-bold">{news.title}</h2>
        <div className="see flex gap-5">
          <div className="s1 flex items-center gap-1">
            <img src={calendar} alt="" className="w-5 h-5" />
            <p>{news.date}</p>
          </div>
          <div className="s2 flex items-center gap-1">
            <img src={eye} alt="" className="w-5 h-5" />
            <p>{news.views} lượt xem</p>
          </div>
        </div>
      </div>
  
      <div className="maincontentnew">
        <p className="text-xl font-semibold mb-4">{news.content}</p>
      </div>
  
      <div className="author mt-10 p-8 flex gap-4 border border-gray-300">
        <img src={news.author.image} alt={news.author.name} className="w-60 h-60 object-cover" />
        <div className="infoauthor">
          <h3 className="text-xl font-bold mb-4">Tác giả</h3>
          <p className="nameauthor text-xl font-bold text-[#B9E1E8]">{news.author.name}</p>
          <p className="desauthor mt-4 text-base">{news.author.description}</p>
          <div className="authorcontact flex gap-5 mt-5">
            <a href="#"><img src={phone} alt="" className="w-8 h-8" /></a>
            <a href="#"><img src={zalo} alt="" className="w-8 h-8" /></a>
            <a href="#"><img src={facebook} alt="" className="w-8 h-8" /></a>
          </div>
        </div>
      </div>
  
      <CommentSection />
    </div>
  );
  
  const CommentSection: React.FC = () => (
    <div className="containerComment mt-8">
      <div className="listcommnent">
        {/* Hiển thị các bình luận ở đây */}
      </div>
  
      <div className="cm mt-8">
        <textarea placeholder="Để lại bình luận của bạn tại đây" className="w-full h-64 border border-gray-300 p-4 text-gray-600 text-base outline-none"></textarea>
        <div className="cmsend flex justify-between items-center mt-8">
          <div className="sex flex gap-2">
            <input type="radio" id="option1" name="sex" value="Option1" />
            <label htmlFor="option1">Anh</label>
            <input type="radio" id="option2" name="sex" value="Option2" />
            <label htmlFor="option2">Chị</label>
          </div>
          <div className="inputdataa flex-grow mx-4">
            <input type="text" placeholder="Họ và tên" className="w-[45%] p-3 border border-gray-400 mr-2" />
            <input type="text" placeholder="Email" className="w-[45%] p-3 border border-gray-400" />
          </div>
          <button className="bg-[#1AB3BC] text-white px-4 py-3">Gửi thông tin</button>
        </div>
      </div>
    </div>
  );
export default NewsPage;