import React from 'react';
import { Link } from 'react-router-dom';

interface Crumb {
  label: string;
  path?: string;
}

interface BreadcrumbsProps {
  crumbs: Crumb[];
}

const ChevronRightIcon = () => (
    <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z" clipRule="evenodd"></path></svg>
);


const Breadcrumbs: React.FC<BreadcrumbsProps> = ({ crumbs }) => {
  return (
    <nav className="flex mb-6" aria-label="Breadcrumb">
      <ol className="inline-flex items-center space-x-1 md:space-x-2">
        {crumbs.map((crumb, index) => (
          <li key={index} className="inline-flex items-center">
             {index > 0 && (
                <div className="flex items-center">
                    <ChevronRightIcon />
                </div>
            )}
            {crumb.path ? (
              <Link to={crumb.path} className="ml-1 text-sm font-medium text-text-secondary hover:text-primary md:ml-2">
                {crumb.label}
              </Link>
            ) : (
              <span className="ml-1 text-sm font-medium text-text-primary md:ml-2">
                {crumb.label}
              </span>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumbs;