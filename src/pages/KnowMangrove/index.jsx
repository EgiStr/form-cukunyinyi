import { useEffect, useState, useRef, createContext, useContext } from "react";
import Webcam from "react-webcam";
// import {
//   IconRotate,
//   IconRepeat,
//   IconReload,
//   IconPhotoScan,
//   IconPhotoPlus,
//   IconCamera,
//   IconLoader2,
//   IconArrowLeft,
// } from "@tabler/icons-react";
import { ImageContext } from "./ImageContext";
import { useNavigate } from 'react-router-dom';
import FileInputButton from '@/components/ImageScanUpload';

const KnowMangrove = () => {
  const FACING_MODE_USER = "user";
  const FACING_MODE_ENVIRONMENT = "environment";
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [rotate, setRotate] = useState(false);
  const [isLoading, setLoading] = useState(false);
  const { setData } = useContext(ImageContext);
  const navigate = useNavigate();

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
    setData(imageSrc);
  };

  const toggleRotate = () => {
    setRotate(!rotate);
  };

  const processImage = () => {
    setLoading(true);
    setTimeout(()=>{
      navigate('/scan/hasil');
    },1000)
  };

  const resetImage = () => {
    setCapturedImage(null);
    setLoading(false);
  };

  const uploadFile = (binary) => {
    setCapturedImage(binary)
    setData(binary);
  };
  
  return (
    <div>
      <div className="w-full flex md:w-fit fixed md:left-1/2 md:transform md:-translate-x-1/2 mx-2 top-2">
        <button className="px-3 bg-white" onClick={()=>navigate("/")}><svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-arrow-left"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 12l14 0" /><path d="M5 12l6 6" /><path d="M5 12l6 -6" /></svg></button>
        <div className="flex items-center gap-3 bg-green-700 px-3 md:px-12 py-3 rounded-lg">
          <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="white"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-camera-selfie"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M5 7h1a2 2 0 0 0 2 -2a1 1 0 0 1 1 -1h6a1 1 0 0 1 1 1a2 2 0 0 0 2 2h1a2 2 0 0 1 2 2v9a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-9a2 2 0 0 1 2 -2" /><path d="M9.5 15a3.5 3.5 0 0 0 5 0" /><path d="M15 11l.01 0" /><path d="M9 11l.01 0" /></svg>
          <p className="text-sm text-white">Arahkan kamera ke daun mangrove</p>
        </div>
      </div>
      {capturedImage ? (
        <>
          <div className="flex items-center justify-center w-full h-screen">
            <img src={capturedImage} className="max-w-full h-auto border-2 border-green-400" />
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <button
              onClick={resetImage}
              className="w-20 h-20 flex justify-center items-center border-[6px] border-red-800 bg-red-200 text-red-800 font-semibold rounded-full"
            >
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-reload"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M19.933 13.041a8 8 0 1 1 -9.925 -8.788c3.899 -1 7.935 1.007 9.425 4.747" /><path d="M20 4v5h-5" /></svg>
            </button>
          </div>
          <div className="absolute bottom-2 right-0 transform -translate-x-2">
            <button
              className="w-20 h-10 flex items-center justify-center bg-green-700 text-white rounded-lg"
              onClick={processImage}
            >
              {!isLoading ? (
                "Lanjut"
              ) : (
                <span className="animate animate-spin">
                  <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-loader-2"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M12 3a9 9 0 1 0 9 9" /></svg>
                </span>
              )}
            </button>
          </div>
        </>
      ) : (
        <>
          <div className="flex items-center justify-center w-full h-screen">
            <Webcam
              audio={false}
              ref={webcamRef}
              videoConstraints={{
                facingMode: rotate ? FACING_MODE_USER : FACING_MODE_ENVIRONMENT,
              }}
              screenshotFormat="image/jpeg"
              className="rounded border-2 border-green-500"
            />
          </div>
          <div className="fixed bottom-2 left-2 md:left-1/3">
            <button
              onClick={toggleRotate}
              className="p-3 bg-gray-200 text-green-800 font-semibold rounded-full"
            >
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-repeat"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M4 12v-3a3 3 0 0 1 3 -3h13m-3 -3l3 3l-3 3" /><path d="M20 12v3a3 3 0 0 1 -3 3h-13m3 3l-3 -3l3 -3" /></svg>
            </button>
          </div>
          <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2">
            <button
              onClick={captureImage}
              className="w-24 h-24 flex items-center justify-center text-center border-[6px] border-green-800 bg-green-200 text-green-800 font-semibold rounded-full"
            >
              <svg  xmlns="http://www.w3.org/2000/svg"  width="24"  height="24"  viewBox="0 0 24 24"  fill="none"  stroke="currentColor"  stroke-width="2"  stroke-linecap="round"  stroke-linejoin="round"  class="icon icon-tabler icons-tabler-outline icon-tabler-photo-scan"><path stroke="none" d="M0 0h24v24H0z" fill="none"/><path d="M15 8h.01" /><path d="M6 13l2.644 -2.644a1.21 1.21 0 0 1 1.712 0l3.644 3.644" /><path d="M13 13l1.644 -1.644a1.21 1.21 0 0 1 1.712 0l1.644 1.644" /><path d="M4 8v-2a2 2 0 0 1 2 -2h2" /><path d="M4 16v2a2 2 0 0 0 2 2h2" /><path d="M16 4h2a2 2 0 0 1 2 2v2" /><path d="M16 20h2a2 2 0 0 0 2 -2v-2" /></svg>
            </button>
          </div>
          <div className="fixed bottom-2 right-2 md:right-1/3">
            <FileInputButton onUpload={uploadFile}/>
          </div>
        </>
      )}
    </div>
  );
};

// export default Hasil;
export default KnowMangrove;
