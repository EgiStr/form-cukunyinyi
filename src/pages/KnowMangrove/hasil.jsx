import React, { useContext, useEffect } from "react";
import { ImageContext } from "@/pages/KnowMangrove/ImageContext";
import { useNavigate } from "react-router-dom";
import Layout from "@/components/Layout";
const Hasil = () => {
  const navigate = useNavigate();
  const { data, setData } = useContext(ImageContext);
  useEffect(() => {
    if(!data.img) resetImage()
  }, [data.img]);

  const resetImage = () => {
    navigate("/scan");
  };
  return (
    <Layout>
      {!!data.response && (
        <div className="md:flex md:flex-col justify-center items-center">
          <div className="md:w-[50%] my-24 m-3">
            <div className="flex flex-col">
              <img
                src={data.img}
                className="h-72 w-full object-contain rounded-t-xl"
              />
              <div className="p-5 bg-green-600 text-center space-y-5">
                <div className="text-white">
                  <p>Jenis Mangrove</p>
                  <h1 className="font-bold">{data.response.data.class_name}</h1>
                </div>
                <div className="text-white">
                  <p>Persentase Kemiripan</p>
                  <h1 className="font-bold">
                    {(data.response.data.confidence * 100).toFixed(2)}%
                  </h1>
                </div>
              </div>
            </div>
            <div className="bg-green-200 p-3 space-y-4 rounded">
              <p>Install KnowMangrove di Handphone Anda</p>
              <button className="bg-green-800 px-4 py-2 text-white rounded-lg">
                Download Aplikasi
              </button>
            </div>

            <div className="flex flex-row gap-3 mt-5">
              <button
                className="w-full text-green-800 border border-green-800 px-4 py-2 rounded-lg"
                onClick={() => navigate("/")}
              >
                Selesai
              </button>
              <button
                className="w-full bg-green-800 px-4 py-2 text-white rounded-lg"
                onClick={resetImage}
              >
                Mangrove Lain
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Hasil;
