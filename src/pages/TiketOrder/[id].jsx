import { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import { ORDERS_PATH } from '../../constant/apiPath';

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
    <div className="container mx-auto p-4">
      <h1 className="text-xl font-semibold">Detail Tiket Order</h1>
      <div className="mt-4">
        <p>Email: {orderData.email}</p>
        <p>Tanggal: {new Date(orderData.date).toLocaleDateString()}</p>
        <p>Tujuan Wisata: {orderData.purpose}</p>
        <p>Jumlah Pengunjung: {orderData.touristCount}</p>
        <p>Metode Pembayaran: {orderData.paymentType}</p>
        <p>Bukti Pembayaran: <img src={orderData.paymentProof} alt="Pembayaran Melalui Tunai" /></p>
        <p>Informasi Pengunjung: {orderData.userInformation}</p>
      </div>
    </div>
  );
};

export default OrderDetail;