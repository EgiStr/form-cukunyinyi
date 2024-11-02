import { useState } from 'react';
import axios from 'axios';
import { ORDERS_PATH } from '../constant/apiPath'; 
import { postOrder } from '../service/api.service';

const RegistrationForm = () => {
  const [visitorCount, setVisitorCount] = useState(1);
  const [participationType, setParticipationType] = useState("individu");
  const [groupTypes, setGroupTypes] = useState({
    SD: false,
    SMP: false,
    SMA: false,
  });
  const [paymentType, setPaymentType] = useState("tunai");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    date: '',
    purpose: 'Wisata',
    userInformation: ''
  });
  const [paymentFile, setPaymentFile] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleParticipationTypeChange = (type) => {
    setParticipationType(type);
    if (type === 'individu') {
      setVisitorCount(1);
    } else {
      setGroupTypes({
        SD: false,
        SMP: false,
        SMA: false,
      });
    }
  };

  const handleGroupTypeChange = (e) => {
    const { name, checked } = e.target;
    setGroupTypes(prev => ({
      ...prev,
      [name]: checked
    }));
  };

  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
    if (type === 'tunai') {
      setPaymentFile(null);
    }
  };

  const decreaseCount = () => {
    setVisitorCount(prev => Math.max(1, prev - 1));
  };

  const increaseCount = () => {
    setVisitorCount(prev => prev + 1);
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append('image', file);

      const response = await axios.post(ORDERS_PATH.UPLOAD_IMAGE, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.data && response.data.data && response.data.data.path) {
        return response.data.data.path;
      } else {
        console.error('Unexpected server response:', response.data);
        throw new Error('Format response server tidak sesuai');
      }
    } catch (error) {
      console.error('Error detail:', error.response || error);
      throw new Error(
        error.response?.data?.message || 
        error.message || 
        'Terjadi kesalahan saat mengupload gambar'
      );
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match(/^image\/(jpeg|png|gif|jpg)$/)) {
        alert('Mohon upload file gambar (JPEG, PNG, atau GIF)');
        e.target.value = null;
        return;
      }
      if (file.size > 5 * 1024 * 1024) { // 5MB limit
        alert('Ukuran file harus kurang dari 5MB');
        e.target.value = null;
        return;
      }
      setPaymentFile(file);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    try {
      let paymentProofUrl = '';
      
      if (paymentType === 'non-tunai' && paymentFile) {
        try {
          paymentProofUrl = await uploadImage(paymentFile);
          console.log('Upload berhasil:', paymentProofUrl);
        } catch (uploadError) {
          console.error('Error upload:', uploadError);
          alert('Error saat upload bukti pembayaran: ' + uploadError.message);
          setLoading(false);
          return;
        }
      }

      const selectedGroupTypes = Object.entries(groupTypes)
        .filter(([, isSelected]) => isSelected)
        .map(([type]) => type);

      const finalFormData = {
        email: formData.email,
        date: formData.date,
        purpose: formData.purpose,
        touristType: participationType === 'individu' ? 'individual' : 'group',
        touristGroupType: participationType,
        touristCount: participationType === 'individu' ? visitorCount : selectedGroupTypes.length,
        paymentType,
        paymentProof: paymentProofUrl,
        userInformation: formData.userInformation
      };

      const apiResponse = await postOrder(finalFormData);
      
      console.log('Pendaftaran berhasil:', apiResponse);
      alert('Pendaftaran berhasil!');
      
      // Reset form state
      setFormData({
        email: '',
        date: '',
        purpose: 'Wisata',
        userInformation: ''
      });
      setPaymentFile(null);
      setVisitorCount(1);
      setParticipationType('individu');
      setPaymentType('tunai');
      
      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = '';
      }

    } catch (error) {
      console.error('Error submit form:', error);
      alert('Terjadi kesalahan: ' + (error.response?.data?.message || error.message));
    } finally {
      setLoading(false);
    }
  };


  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center pt-10 pb-10"
      style={{ backgroundImage: "url('../src/assets/bgForm.png')" }}>
      <div className="bg-white bg-opacity-90 max-w-lg mx-auto p-8 rounded-lg shadow-lg">
        <h1 className="font-semibold mb-2">Form Pendaftaran Ekowisata Mangrove Cukunyinyi</h1>
        <p className="mb-4 text-gray-500">Masuki data dengan benar!</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block mb-1">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Tanggal</label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="block mb-1">Tujuan Wisata</label>
            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              className="w-full border rounded bg-white px-4 py-2"
            >
              <option value="Wisata">Wisata</option>
              <option value="Penelitian">Penelitian</option>
            </select>
          </div>

          <div>
            <label className="block mb-1">Ayo Ikut serta!</label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  name="participation"
                  value="individu"
                  checked={participationType === "individu"}
                  onChange={() => handleParticipationTypeChange("individu")}
                  className="mr-2"
                />
                Individu
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  name="participation"
                  value="grup"
                  checked={participationType === "grup"}
                  onChange={() => handleParticipationTypeChange("grup")}
                  className="mr-2"
                />
                Grup
              </label>
            </div>
          </div>

          {participationType === "individu" ? (
            <div>
              <label className="block mb-1">Jumlah Pengunjung</label>
              <div className="flex items-center">
                <button
                  type="button"
                  onClick={decreaseCount}
                  className="w-8 h-8 bg-red-500 text-white rounded"
                >
                  -
                </button>
                <span className="mx-4">{visitorCount}</span>
                <button
                  type="button"
                  onClick={increaseCount}
                  className="w-8 h-8 bg-green-500 text-white rounded"
                >
                  +
                </button>
              </div>
            </div>
          ) : (
            <div>
              <label className="block mb-1">Tipe Grup</label>
              <div className="flex space-x-4">
                {Object.keys(groupTypes).map(type => (
                  <label key={type} className="flex items-center">
                    <input
                      type="checkbox"
                      name={type}
                      checked={groupTypes[type]}
                      onChange={handleGroupTypeChange}
                      className="mr-2"
                    />
                    {type}
                  </label>
                ))}
              </div>
            </div>
          )}

          <div>
            <label className="block mb-1">Metode Pembayaran</label>
            <select
              name="paymentType"
              value={paymentType}
              onChange={(e) => handlePaymentTypeChange(e.target.value)}
              className="w-full border rounded bg-white px-4 py-2"
            >
              <option value="tunai">Tunai</option>
              <option value="non-tunai">Non Tunai</option>
            </select>
          </div>

          {paymentType === 'non-tunai' && (
            <div>
              <label className="block mb-1">Bukti Pembayaran (gambar)</label>
              <input
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="w-full border rounded px-4 py-2"
                required
              />
              {loading && <p className="text-sm text-gray-500 mt-1">Mengupload gambar...</p>}
            </div>
          )}

          <div>
            <label className="block mb-1">Informasi Pengunjung</label>
            <textarea
              name="userInformation"
              value={formData.userInformation}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              rows="4"
              placeholder="Informasi tambahan (jika ada)"
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            className={`w-full py-2 rounded ${loading ? 'bg-gray-500' : 'bg-blue-500 hover:bg-blue-700'} text-white`}
          >
            {loading ? 'Mengirim...' : 'Daftar'}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;