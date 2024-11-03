import React, { useContext } from "react";
import { ImageContext } from "./ImageContext";
import { useNavigate } from "react-router-dom";

const Hasil = () => {
  const navigate = useNavigate();
  const { data, setData } = useContext(ImageContext);
  console.log(data);

  const resetImage = () => {
    navigate("/scan");
  };
  return (
    <div className="md:flex md:flex-col justify-center items-center">
      <div className="md:w-[50%] m-3">
        <div className="flex flex-col">
          <img src={data} className="h-52 w-full object-cover rounded-t-xl" />
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
          <button
            className="w-full bg-green-800 px-4 py-2 text-white rounded-lg"
            onClick={resetImage}
          >
            Deteksi Mangrove lain
          </button>
        </div>
      </div>
    </div>
  );
};

export default Hasil;
