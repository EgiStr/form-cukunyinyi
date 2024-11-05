import React, { useRef } from 'react';
import { IconPhotoPlus } from "@tabler/icons-react";
const FileInputButton = ({ onUpload,content=<IconPhotoPlus/> }) => {
  const fileInputRef = useRef(null);

  const handleButtonClick = () => {
    fileInputRef.current.click();
  };

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const base64String = reader.result;
        onUpload(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <button className="py-2 px-4 border border-green-700 text-green-700 rounded-lg" onClick={handleButtonClick}>
        {content}
      </button>
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        style={{ display: 'none' }}
        onChange={handleFileChange}
      />
    </div>
  );
};

export default FileInputButton;
