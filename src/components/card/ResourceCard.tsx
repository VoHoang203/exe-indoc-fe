// ResourceCard.tsx
import React from "react";
import { Link } from "react-router-dom";

interface Document {
  imgSrc: string;
  title: string;
}

interface ResourceCardProps {
  title: string;
  description: string;
  details: string;
  imgSrc: string;
  documents: Document[];
  linkColor: string; // Hoặc bạn có thể định nghĩa kiểu cụ thể cho màu sắc
}

const ResourceCard: React.FC<ResourceCardProps> = ({
  title,
  description,
  details,
  imgSrc,
  documents,
  linkColor,
}) => (
  <div className="bg-gradient-to-r from-[#1ab3bc] to-[#7953af] p-[2px] rounded-lg">
    <div className={`bg-white p-6 rounded-[6px] shadow-lg`}>
      <div className="flex items-start justify-between gap-x-4 border-b border-[#d7d7d7]">
        <div className="flex items-center">
          <img src={imgSrc} className="h-10 w-10 mt-6 text-black" />
        </div>
        <div className="flex flex-col items-start w-3/4">
          <h3 className="text-left text-xl font-semibold text-gray-600 mb-4">
            {title}
          </h3>
          <p className="text-left text-sm text-gray-600 mb-4">{description}</p>
          <p className="text-left text-[#23ABBB] font-semibold mb-4">
            {details}
          </p>
        </div>
      </div>
      <ul className="text-left text-gray-700 space-y-4 mt-6">
        {documents.map((doc, index) => (
          <li key={index} className="flex justify-between gap-x-4 items-center">
            <img
              src={doc.imgSrc}
              className="w-8 h-8 flex-shrink-0 text-black"
            />
            <p className="w-4/5">{doc.title}</p>
          </li>
        ))}
      </ul>
      <div className="flex justify-end">
        <Link
          to="/service"
          className={`text-[#7954AF] font-semibold mt-7 flex items-center ml-auto gap-3`}
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
  </div>
);

export default ResourceCard;
