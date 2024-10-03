import React, { useEffect, useMemo, useState } from 'react';
import { FaHeart, FaReply, FaSearch, FaShare, FaThumbsUp } from 'react-icons/fa';
import { LazyLoadImage } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Layout from '../../components/Layout';
import image_116 from "../../assets/image 116.png"
import { useQuery } from '@tanstack/react-query';
import http from "../../utils/http"
export interface Document {
  id: string;
  title: string;
  description: string;
  price: string;
  previewPath: string;
  downloads: number;
  date: string;
  author: string;}
const categories = [
  {
      id: "bc65da8f-036b-4f04-9661-ababa9d75f61",
      name: "KINH TẾ",
      subcategories: [
          { id: "5ad030a0-ddc5-4c90-84a5-217f367b8fc1", name: "Truyền thông đa phương tiện" },
          { id: "feaa5236-df12-4184-8b4f-c02dea2915ae", name: "Digital Marketing" },
          { id: "85883e4d-9939-43a0-9be9-cb3d46d0757d", name: "Kinh doanh quốc tế" },
          { id: "3924cc67-64d1-4ae1-a4e7-b86846f73e7a", name: "Tài chính" },
          { id: "0fd22189-1265-426b-aac5-1463732bc6ed", name: "Quản trị khách sạn" }
      ]
  },
  {
      id: "906bf6b2-1085-45e9-ac00-176427393b37",
      name: "CÔNG NGHỆ THÔNG TIN",
      subcategories: [
          { id: "29457e46-d44e-457b-b961-667bf8c3234b", name: "Kĩ thuật phần mềm" },
          { id: "3569edb7-32e5-45d9-a67f-a38906245606", name: "Hệ thống thông tin" },
          { id: "7c56df76-5930-4ea2-87cd-b3a361fcf64d", name: "An toàn thông tin" },
          { id: "e7b7b530-b209-4001-a034-1fb947739351", name: "Trí tuệ nhân tạo" },
          { id: "6dc5bfe1-5c0a-414f-9e13-617411f913b0", name: "Thiết kế mĩ thuật số" }
      ]
  },
  {
      id: "f6c90cad-8d8c-400b-8199-9aba7e5b8757",
      name: "NGÔN NGỮ",
      subcategories: [
          { id: "abbd09ea-9d24-4b8a-b67c-bded17077d64", name: "Ngôn ngữ Anh" },
          { id: "9287e4a5-a183-49fe-b364-15c94e37a326", name: "Ngôn ngữ Nhật" },
          { id: "bb66a421-1d26-486b-90ca-efb3ae88f9e9", name: "Ngôn ngữ Hàn Quốc" }
      ]
  }
];


interface ListItemProps {
  id: string;
  title: string;
  description: string;
  previewPath: string;
  price: string;
  onViewDetail: (id: string) => void;
}

export const DocumentItem = ({id, title, description ,onViewDetail}: ListItemProps) => (
  <div className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-300 hover:-translate-y-1 hover:shadow-lg">
    <div className="h-48 overflow-hidden ">
    <LazyLoadImage
      alt={title}
      src={image_116}
      effect="blur"
      className="h-full w-full object-cover"
    />
    </div>
    <div className="p-4 flex flex-col flex-grow">
      <h3 className="text-lg font-semibold mb-2 flex-shrink-0 line-clamp-1" style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical"}}>{title}</h3>
      <p className="text-gray-600 mb-2 flex-grow line-clamp-2 "style={{ display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{description}</p>
      <div className="mt-auto">
        <button onClick={() => onViewDetail(id)}
         className="w-full bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition duration-300">
          Xem chi tiết
        </button>
      </div>
    </div>
  </div>
);




export default function ListItems() {
  const [searchQuery, setSearchQuery] = useState('');
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const query = searchParams.get('q') || '';
  const [selectedCategory, setSelectedCategory] = useState<string | null>("29457e46-d44e-457b-b961-667bf8c3234b");
  const [selectedDocument, setSelectedDocument] = useState<Document | null>(null);
  const {data:documentsList, refetch ,isLoading} = useQuery<Document[]>({
    queryKey:  ["document list" , {selectedCategory}],
    queryFn:  async () => {const response = await http.post("https://indocs.click/api/document/category",{
          "categoryId": selectedCategory 
      })
      return response.data.data
    },
    enabled: !!selectedCategory
  })
  console.log(documentsList)
  const handleViewDetail = (id: string) => {
    const document = documentsList?.find(doc => doc.id === id);
    if (document) {
      setSelectedDocument(document);
    }
  };

  
  useEffect(() => {
    if (query) {
      setSearchQuery(query);
    }
  }, [query]);

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
  };

  const handleCategoryChange = (categoryId: string) => {
    setSelectedCategory(prevCategory => prevCategory === categoryId ? null : categoryId);
    refetch(); // Refetch documents when category changes
  };
 
console.log(selectedCategory)
const filteredDocuments = useMemo(() => {
  return documentsList?.filter(doc =>
    doc.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
    doc.description.toLowerCase().includes(searchQuery.toLowerCase())
  );
}, [documentsList, searchQuery]);
useEffect(() => {
  console.log('filteredDocuments changed:', filteredDocuments);
}, [filteredDocuments]);
 console.log(filteredDocuments)

 const transformedCategories = categories.map(category => ({
  ...category,
  subCategories: category.subcategories.map(sub => sub.name)
}));

   return (

    <Layout onCategoryChange={handleCategoryChange}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      handleSearch={handleSearch}
      categories={transformedCategories }
      commentsSidebar={selectedDocument ? <CommentsSidebar /> : undefined}>
        {selectedDocument ? (
        <ProductDetail document={selectedDocument} onBack={() => setSelectedDocument(null)} />
      ) : (
        <>
        
      <form onSubmit={handleSearch} className="mb-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Tìm kiếm tài liệu..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full py-3 px-4 pr-12 rounded-full border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <button
            type="submit"
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-blue-500"
          >
            <FaSearch className="w-5 h-5" />
          </button>
        </div>
      </form>

      <h2 className="text-2xl font-bold mb-6">Các tài liệu bán chạy nhất</h2>
      {isLoading ? (
            <div className="flex justify-center items-center">
              <div className="loader">Loading...</div> {/* Add your spinner component or CSS here */}
            </div>
          ) : filteredDocuments && filteredDocuments.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
              {filteredDocuments?.map((doc, index) => (
                <DocumentItem
                  key={index}
                  id={doc.id}
                  title={doc.title}
                  description={doc.description}
                  previewPath={doc.previewPath}
                  price={doc.price}
                  onViewDetail={handleViewDetail}
                />
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500">Không có tài liệu</p>
          )}
      </>
      )}
    </Layout>
  );
}



interface Comment {
  id: string;
  user: string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
  replies: Reply[];
}

interface Reply {
  id: string;
  user: string |string;
  avatar: string;
  text: string;
  timestamp: string;
  likes: number;
}
const CommentsSidebar: React.FC = () => {
  const [comments, setComments] = useState<Comment[]>([
    {
      id: '1',
      user: 'John Doe',
      avatar: 'https://example.com/avatar1.jpg',
      text: 'This is a great document! Very informative.',
      timestamp: '2 hours ago',
      likes: 5,
      replies: [
        {
          id: '1-1',
          user: 'Jane Smith',
          avatar: 'https://example.com/avatar2.jpg',
          text: "I agree, it's very well written.",
          timestamp: '1 hour ago',
          likes: 2,
        },
      ],
    },
    {
      id: '2',
      user: 'Alice Johnson',
      avatar: 'https://example.com/avatar3.jpg',
      text: 'I have a question about section 3. Can anyone clarify?',
      timestamp: '1 day ago',
      likes: 3,
      replies: [],
    },
  ]);

  const [newComment, setNewComment] = useState('');
  const [newReply, setNewReply] = useState('');
  const [replyingTo, setReplyingTo] = useState<string | number | null>(null);

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim() === '') return;

    const newCommentObj: Comment = {
      id: Date.now().toString(),
      user: 'Current User',
      avatar: 'https://example.com/current-user-avatar.jpg',
      text: newComment,
      timestamp: 'Just now',
      likes: 0,
      replies: [],
    };

    setComments(prevComments => [newCommentObj, ...prevComments]);
    setNewComment('');
  };

  const handleReplySubmit = (e: React.FormEvent, commentId: string) => {
    e.preventDefault();
    if (newReply.trim() === '') return;

    const newReplyObj: Reply = {
      id: `${commentId}-${Date.now()}`,
      user: 'Current User',
      avatar: 'https://example.com/current-user-avatar.jpg',
      text: newReply,
      timestamp: 'Just now',
      likes: 0,
    };

    setComments(prevComments => 
      prevComments.map(comment => 
        comment.id === commentId
          ? { ...comment, replies: [newReplyObj, ...comment.replies] }
          : comment
      )
    );

    setNewReply('');
    setReplyingTo(null);
  };

  const handleLikeComment = (commentId: string) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId
          ? { ...comment, likes: comment.likes + 1 }
          : comment
      )
    );
  };

  const handleLikeReply = (commentId: string, replyId: string) => {
    setComments(prevComments =>
      prevComments.map(comment =>
        comment.id === commentId
          ? {
              ...comment,
              replies: comment.replies.map(reply =>
                reply.id === replyId
                  ? { ...reply, likes: reply.likes + 1 }
                  : reply
              ),
            }
          : comment
      )
    );
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-6">Comments</h2>
      <form onSubmit={handleCommentSubmit} className="mb-6">
        <textarea
          value={newComment}
          onChange={(e) => setNewComment(e.target.value)}
          placeholder="Write a comment..."
          className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
          rows={3}
          required
        ></textarea>
        <button
          type="submit"
          className="mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
        >
          Post Comment
        </button>
      </form>
      <div className="space-y-6">
        {comments.map((comment) => (
          <div key={comment.id} className="bg-white p-4 rounded-lg shadow">
            <div className="flex items-start space-x-3">
              <img
                src={comment.avatar}
                alt={comment.user}
                className="w-10 h-10 rounded-full"
              />
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">{comment.user}</h3>
                  <span className="text-sm text-gray-500">{comment.timestamp}</span>
                </div>
                <p className="mt-1 text-gray-800">{comment.text}</p>
                <div className="mt-2 flex items-center space-x-2">
                  <button 
                    className="text-gray-500 hover:text-blue-500 transition-colors duration-300"
                    onClick={() => handleLikeComment(comment.id)}
                  >
                    <FaThumbsUp />
                  </button>
                  <span className="text-sm text-gray-500">{comment.likes} likes</span>
                  <button 
                    className="text-gray-500 hover:text-blue-500 transition-colors duration-300"
                    onClick={() => setReplyingTo(comment.id)}
                  >
                    <FaReply />
                  </button>
                  <span className="text-sm text-gray-500">Reply</span>
                </div>
              </div>
            </div>
            {replyingTo === comment.id && (
              <form onSubmit={(e) => handleReplySubmit(e, comment.id)} className="mt-4 ml-12">
                <textarea
                  value={newReply}
                  onChange={(e) => setNewReply(e.target.value)}
                  placeholder="Write a reply..."
                  className="w-full px-3 py-2 text-gray-700 border rounded-lg focus:outline-none focus:border-blue-500"
                  rows={2}
                  required
                ></textarea>
                <div className="mt-2 flex justify-end space-x-2">
                  <button
                    type="button"
                    onClick={() => setReplyingTo(null)}
                    className="px-3 py-1 text-gray-600 rounded-lg hover:bg-gray-100 transition-colors duration-300"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-3 py-1 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors duration-300"
                  >
                    Reply
                  </button>
                </div>
              </form>
            )}
            {comment.replies && comment.replies.length > 0 && (
              <div className="mt-4 ml-12 space-y-4">
                {comment.replies.map((reply) => (
                  <div key={reply.id} className="bg-gray-50 p-3 rounded-lg">
                    <div className="flex items-start space-x-3">
                      <img
                        src={reply.avatar}
                        alt={reply.user}
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h4 className="font-semibold">{reply.user}</h4>
                          <span className="text-xs text-gray-500">{reply.timestamp}</span>
                        </div>
                        <p className="mt-1 text-sm text-gray-800">{reply.text}</p>
                        <div className="mt-2 flex items-center space-x-2">
                          <button 
                            className="text-gray-500 hover:text-blue-500 transition-colors duration-300"
                            onClick={() => handleLikeReply(comment.id, reply.id)}
                          >
                            <FaThumbsUp />
                          </button>
                          <span className="text-xs text-gray-500">{reply.likes} likes</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

const ProductDetail: React.FC <{ document: Document; onBack: () => void }> = ({ document, onBack }) => {
  const [liked, setLiked] = useState(false);
  const navigate = useNavigate();
  const handleLike = () => {
    setLiked(!liked);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: "Premium Document",
        text: "Check out this amazing document!",
        url: window.location.href,
      })
      .then(() => console.log("Successful share"))
      .catch((error) => console.log("Error sharing", error));
    } else {
      alert("Web Share API is not supported in your browser. The link has been copied to your clipboard.");
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleBuyNow = () => {
    navigate('/payment', { state: { document } });
  };

  
  console.log(document.previewPath)
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <button onClick={onBack} className="mb-4 text-blue-500 hover:text-blue-700">
        &larr; Back to list
      </button>
      <div className=" ">
        <div className=" w-full h-[1000px]">
          <iframe
            src={`https://docs.google.com/viewer?url=${encodeURIComponent(document.previewPath)}&embedded=true`}
            className="w-full h-[1000px] rounded-lg shadow-lg"
            title="Document Preview"
          ></iframe>
        </div>
        <div className="">
          <h1 className="text-3xl font-bold mb-4">{document.title}</h1>
          <p className="text-xl font-semibold mb-2">{document.price}</p>
          <p className="text-gray-600 mb-4">{document.description}</p>
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={handleLike}
              className={`flex items-center space-x-2 px-4 py-2 rounded-full ${liked ? "bg-red-500 text-white" : "bg-gray-200 text-gray-800"} transition-colors duration-300`}
              aria-label="Like product"
            >
              <FaHeart />
              <span>{liked ? "Liked" : "Like"}</span>
            </button>
            <button
              onClick={handleShare}
              className="flex items-center space-x-2 px-4 py-2 rounded-full bg-blue-500 text-white transition-colors duration-300 hover:bg-blue-600"
              aria-label="Share product"
            >
              <FaShare />
              <span>Share</span>
            </button>
            <button
            onClick={handleBuyNow}
            className="flex items-center space-x-2 px-4 py-2 rounded-full bg-green-500 text-white transition-colors duration-300 hover:bg-green-600"
            aria-label="Buy now"
          >
            <span>Mua ngay</span>
          </button>
          </div>
        </div>
      </div>
    </div>
  );
};

