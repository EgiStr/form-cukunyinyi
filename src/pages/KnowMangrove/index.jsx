import { useEffect, useState, useRef, createContext, useContext } from "react";
import Webcam from "react-webcam";
import {
  IconRotate,
  IconRepeat,
  IconReload,
  IconPhotoScan,
  IconPhotoPlus,
  IconCamera,
  IconLoader2,
  IconArrowLeft,
} from "@tabler/icons-react";
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
        <button className="px-3 bg-white" onClick={()=>navigate("/")}><IconArrowLeft/></button>
        <div className="flex items-center gap-3 bg-green-700 px-3 md:px-12 py-3 rounded-lg">
          <IconCamera className="text-white" />
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
              <IconReload size={30} />
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
                <IconLoader2 size={30} className="animate-spin" />
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
              <IconRepeat />
            </button>
          </div>
          <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2">
            <button
              onClick={captureImage}
              className="w-24 h-24 flex items-center justify-center text-center border-[6px] border-green-800 bg-green-200 text-green-800 font-semibold rounded-full"
            >
              <IconPhotoScan size={30} />
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
