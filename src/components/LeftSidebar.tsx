import React from 'react';

const LeftSidebar: React.FC = () => {
  return (
    <div className="sticky top-14 mt-4 h-[92vh] w-48 bg-gray-200 overflow-y-auto rounded-tr-md">
      <ul>
        <li className="py-2 px-4 cursor-pointer hover:bg-gray-300 hover:rounded-r-full">Menu Item 1</li>
        <li className="py-2 px-4 cursor-pointer hover:bg-gray-300 hover:rounded-r-full">Menu Item 2</li>
        <li className="py-2 px-4 cursor-pointer hover:bg-gray-300 hover:rounded-r-full">Menu Item 3</li>
      </ul>
    </div>
  );
}

export default LeftSidebar;
