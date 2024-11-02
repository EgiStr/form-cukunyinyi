import { useEffect, useState, useRef } from "react";
import Webcam from "react-webcam";
import gambar from "@/assets/bgForm.png";
import {IconRotate} from "@tabler/icons-react";

const KnowMangrove = () => {
  const FACING_MODE_USER = "user";
  const FACING_MODE_ENVIRONMENT = "environment";
  const webcamRef = useRef(null);
  const [capturedImage, setCapturedImage] = useState(null);
  const [rotate,setRotate] = useState(false);

  const captureImage = () => {
    const imageSrc = webcamRef.current.getScreenshot();
    setCapturedImage(imageSrc);
  };

  const toggleRotate = () => {
    setRotate(!rotate)
  }
  return (
    <div>
      <div className="w-full md:w-fit fixed left-1/2 transform -translate-x-1/2 top-2">
        <div className="bg-green-200 px-2 mx-2 md:px-12 py-3 rounded-lg">
          {/* <h1>KnowMangrove</h1> */}
          <p className="text-sm">Arahkan kamera ke daun mangrove</p>
        </div>
      </div>
      {capturedImage ? (
        <>
          <div className="flex items-center justify-center w-full h-screen">
            {/* <div className="w-full h-[240px] md:h-screen"> */}
            <img src={capturedImage} className="max-w-full h-auto" />
            {/* </div> */}
          </div>
          <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2">
            <button
              onClick={() => setCapturedImage(null)}
              className="w-20 h-20 border-[6px] border-red-800 bg-red-200 text-red-800 font-semibold rounded-full"
            >
              Ulangi
            </button>
          </div>
          <div className="absolute bottom-2 right-0 transform -translate-x-2">
            <button className="w-20 h-10 bg-green-700 text-white rounded-lg">
              Lanjut
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
                facingMode: rotate?FACING_MODE_USER:FACING_MODE_ENVIRONMENT,
              }}
              screenshotFormat="image/jpeg"
              className="rounded"
            />
          </div>
          <div className="fixed bottom-2 left-0">
            <button
              onClick={toggleRotate}
              className="p-5 border-green-800 bg-green-200 text-green-800 font-semibold rounded-full"
            >
              <IconRotate/>
            </button>
          </div>
          <div className="fixed bottom-2 left-1/2 transform -translate-x-1/2">
            <button
              onClick={captureImage}
              className="w-28 h-28 border-[6px] border-green-800 bg-green-200 text-green-800 font-semibold rounded-full"
            >
              Foto
            </button>
          </div>
          <div className="fixed bottom-2 right-0 transform -translate-x-2">
            <button className="py-2 px-4 border border-green-700 text-green-700 rounded-lg">
              Buka Galeri
            </button>
          </div>
        </>
      )}
    </div>
  );
};

const Hasil = () => {
  return (
    <div className="m-3">
      <div className="flex flex-col">
        <img src={gambar} className="h-52 w-full object-cover rounded-t-xl" />
        <div className="p-5 bg-green-700 text-center rounded-b-xl space-y-5">
          <div className="text-white">
            <p>Jenis Mangrove</p>
            <h1 className="font-bold">Sonneratia Alba</h1>
          </div>
          <div className="text-white">
            <p>Persentase Kemiripan</p>
            <h1 className="font-bold">Sonneratia Alba</h1>
          </div>
        </div>
      </div>
      <div className="bg-green-200 mt-5 p-4 space-y-4 rounded border">
        <p>Install di Handphone Anda</p>
        <button className="bg-green-800 px-4 py-2 text-white rounded-lg">
          Download Aplikasi
        </button>
      </div>

      <div className="flex flex-col gap-3 mt-5">
        <button className="w-full bg-green-800 px-4 py-2 text-white rounded-lg">
          Foto mangrove lagi
        </button>
        <button className="w-full text-green-800 border border-green-800 px-4 py-2 rounded-lg">
          Ambil dari galeri
        </button>
      </div>
    </div>
  );
};
// export default Hasil;
export default KnowMangrove;
