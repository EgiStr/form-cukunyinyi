import { useEffect, useState } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { ORDERS_PATH } from "@/constant/apiPath";
import Layout from "@/components/Layout";
import logo from "@/assets/logo.png";

const OrderDetail = () => {
  const { id } = useParams();
  const [orderData, setOrderData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const rupiahFormat = (number) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
    })
      .format(number)
      .replace("Rp", "Rp");
  };

  useEffect(() => {
    const fetchOrderDetail = async () => {
      try {
        const response = await axios.get(`${ORDERS_PATH.POST_ORDER}/${id}`);
        setOrderData(response.data.data);
        console.log(response.data.data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrderDetail();
  }, [id]);

  if (loading)
    return (
      <div className="mt-[25%] flex flex-col items-center justify-center">
        Loading...
        <a href="/" className="mt-3 px-3 py-2 bg-green-500 rounded text-white">
          Halaman Utama
        </a>
      </div>
    );
  if (error)
    return (
      <div className="mt-[25%] flex flex-col items-center justify-center">
        Terjadi Kesalahan!
        <a href="/" className="mt-3 px-3 py-2 bg-green-500 rounded text-white">
          Halaman Utama
        </a>
      </div>
    );
  if (!orderData)
    return (
      <div className="mt-[25%]flex flex-col items-center justify-center">
        Tiket tidak ditemukan
        <a href="/" className="mt-3 px-3 py-2 bg-green-500 rounded text-white">
          Halaman Utama
        </a>
      </div>
    );

  return (
    <Layout>
      <div
        className="flex justify-center items-center min-h-screen bg-fixed bg-cover bg-center pt-10 pb-10"
        style={{ backgroundImage: "url('../src/assets/bgForm.png')" }}
      >
        <div
          className="bg-white container p-5 w-fit rounded-lg space-y-3"
          id="printArea"
        >
          <h1 className="text-2xl font-semibold">Tiket Ekowisata Cukunyinyi</h1>
          <p className="text-gray-600 text-sm">No Tiket #{id}</p>
          <div className="bg-green-500 text-white rounded px-5 py-3" id="badge">
            <p>
              Pendaftaran Sukses, Informasi tiket lengkap dikirimkan ke email{" "}
              {orderData.email}
            </p>
          </div>
          <h1 className="text-lg font-medium">Informasi Pendaftar</h1>
          <button
            className="bg-green-700 px-4 py-2 rounded-lg text-white print-hidden"
            onClick={() => window.print()}
          >
            Download Tiket
          </button>
          <div className="p-4 border rounded-lg space-y-4 w-full">
            <div className="flex flex-col md:flex-row justify-between w-full">
              <p className="font-semibold">Email</p>
              <p>{orderData.email}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between w-full">
              <p className="font-semibold">Tanggal</p>
              <p>{new Date(orderData.date).toLocaleDateString()}</p>
            </div>
            <div className="flex flex-col md:flex-row justify-between w-full">
              <p className="font-semibold">Metode Pembayaran</p>
              <p>{orderData.paymentType}</p>
            </div>
            {orderData.paymentProof != "pembayaran Tunai" && (
            <div className="md:space-y-4 print-hidden flex md:flex-row flex-col md:items-center justify-between">
              <p className="font-semibold mb-4">Bukti Pembayaran</p>
                <a
                  className="border px-3 py-2 rounded-lg text-green-700 border-green-700"
                  href={orderData.paymentProof}
                  target="__blank"
                >
                  Download Bukti Pembayaran
                </a>
            </div>
            )}
            <div className="flex flex-col md:flex-row justify-between w-full">
              <p className="font-semibold">Kritik & Saran</p>
              <p>{orderData.userInformation}</p>
            </div>
          </div>
          <div className="max-w-[50em] space-y-4">
            <h1 className="font-medium">Informasi Pembayaran</h1>
            <div className="overflow-x-auto">
              <table className="table-fixed w-full border rounded-lg">
                <thead className="bg-green-700 text-white">
                  <tr>
                    <th className="p-3">Item</th>
                    <th className="p-3">Jumlah</th>
                    <th className="p-3">Harga</th>
                    <th className="p-3">Total</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="text-center">
                    <td className="p-2">
                      {orderData.purpose} ({orderData.touristGroupType})
                    </td>
                    <td className="p-2">{orderData.touristCount}</td>
                    <td className="p-2">Rp50.000</td>
                    <td className="p-2 text-lg font-bold">
                      {rupiahFormat(orderData.totalPrice)}
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default OrderDetail;
