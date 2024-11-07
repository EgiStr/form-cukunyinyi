import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ORDERS_PATH } from "@/constant/apiPath";
import Layout from "@/components/Layout";

const OrderDetail = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(`${ORDERS_PATH.POST_ORDER}/${id}`);
        setOrderData(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error}</p>;
  if (!orderData) return <p>No order found.</p>;

  return (
    <Layout>
      <div className="flex justify-center items-center min-h-screen bg-fixed bg-cover bg-center pt-10 pb-10" style={{ backgroundImage: "url('../src/assets/bgForm.png')" }}>
        <div className="bg-white container p-5 w-fit rounded-lg space-y-3">
        <h1 className="text-2xl font-semibold">Tiket Ekowisata Cukunyinyi</h1>
        <p className="text-gray-600 text-sm">No Tiket #{id}</p>
        <div className="bg-green-500 text-white rounded px-5 py-3" id="badge">
          <p>Pendaftaran Sukses, Informasi tiket lengkap dikirimkan ke email {orderData.email}</p>
        </div>
        <h1 className="text-lg font-medium">Informasi Pendaftar</h1>
        <button className="bg-green-700 px-4 py-2 rounded-lg text-white">Download Tiket</button>
        <div className="p-4 border rounded-lg space-y-4">
          <div>
            <p className="font-semibold">Email</p>
            <p>{orderData.email}</p>
          </div>
          <div>
            <p className="font-semibold">Tanggal</p>
            <p>{new Date(orderData.date).toLocaleDateString()}</p>
          </div>
          <div>
            <p className="font-semibold">Tujuan Wisata</p>
            <p>{orderData.purpose}</p>
          </div>
          <div>
            <p className="font-semibold">Jumlah Pengunjung</p>
            <p>{orderData.touristCount}</p>
          </div>
          <div>
            <p className="font-semibold">Total Harga</p>
            <p>{orderData.totalPrice}</p>
          </div> 
          <div>
            <p className="font-semibold">Metode Pembayaran</p>
            <p>{orderData.paymentType}</p>
          </div>
          <div className="space-y-2">
            <p className="font-semibold">Bukti Pembayaran</p>
            <button className="border px-3 py-2 rounded-lg text-green-700 border-green-700">Download Bukti Pembayaran</button>
            {/* <img src={orderData.paymentProof} alt="Bukti Pembayaran" /> */}
          </div>
          <div>
            <p className="font-semibold">Kritik & Saran</p>
            <p>{orderData.userInformation}</p>
          </div>
        </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;
