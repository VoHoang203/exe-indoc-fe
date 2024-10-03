import React from 'react';
import { Link, useLocation } from 'react-router-dom';

const Breadcrumbs: React.FC = () => {
  const location = useLocation();
  const pathnames = location.pathname.split('/').filter((x) => x);

  return (
    <div className="bg-[#B9E1E8] text-center h-[150px] flex items-center justify-center animate-fadeOut">
      <div>
        <h1 className="text-black font-bold text-3xl">
          {pathnames.length > 0 ? pathnames[pathnames.length - 1].charAt(0).toUpperCase() + pathnames[pathnames.length - 1].slice(1) : 'Trang chủ'}
        </h1>
        <p>
          <Link to="/" className="hover:underline">Trang chủ</Link>
          {pathnames.map((name, index) => {
            const routeTo = `/${pathnames.slice(0, index + 1).join('/')}`;
            const isLast = index === pathnames.length - 1;
            return isLast ? (
              <span key={name} className="text-[#9B9B9B]"> / {name}</span>
            ) : (
              <span key={name}> / <Link to={routeTo} className="hover:underline">{name}</Link></span>
            );
          })}
        </p>
      </div>
    </div>
  );
};

export default Breadcrumbs;