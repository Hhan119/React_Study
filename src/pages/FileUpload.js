import React, { useState } from 'react';
import axios from 'axios';

const FileUpload = () => {
  const [file, setFile] = useState(null);
  const [uploadUrl, setUploadUrl] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleFileUpload = async () => {
    if (!file) {
      alert('파일을 선택하세요.');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const response = await axios.post('/api/files/upload', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setUploadUrl(response.data); // 서버에서 반환된 파일 URL
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('파일 업로드에 실패했습니다: ' + error.message);
    }
  };

  const handleFileDelete = async () => {
    if (!uploadUrl) {
      alert('삭제할 파일이 없습니다.');
      return;
    }

    try {
      await axios.delete('/api/files/delete', {
        params: { fileUrl: uploadUrl },
      });

      setUploadUrl('');  // 파일 삭제 후 URL 초기화
      setErrorMessage('');
    } catch (error) {
      setErrorMessage('파일 삭제에 실패했습니다: ' + error.message);
    }
  };

  const ImageComponent = ({ imageUrl }) => {
  }
  return (
    <div>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleFileUpload}>Upload</button>
      <button onClick={handleFileDelete} disabled={!uploadUrl}>
        Delete
      </button>

      {uploadUrl && (
        <div>
          <p>File uploaded successfully! <a href={uploadUrl} target="_blank" rel="noopener noreferrer">Uploaded File</a></p>
        <ImageComponent imageUrl={uploadUrl} />
        </div>
      )}

      {errorMessage && (
        <div>
          <p style={{ color: 'red' }}>{errorMessage}</p>
        </div>
      )}
    </div>
  );
};

export default FileUpload;
