import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";
import { ORDERS_PATH } from "../constant/apiPath";
import { postOrder } from "../service/api.service";

import welcome from '@/assets/welcome.jpg';

const RegistrationForm = () => {
  const navigate = useNavigate();
  const [visitorCount, setVisitorCount] = useState(1);
  const [participationType, setParticipationType] = useState("individu");
  const [groupTypesLainnya, setGroupTypesLainnya] = useState(null);
  const [groupTypes, setGroupTypes] = useState({
    TK: false,
    SD: false,
    SMP: false,
    SMA: false,
    Universitas: false,
    Instansi: false,
    Keluarga: false,
    Lainnya: false,
  });
  const [paymentType, setPaymentType] = useState("tunai");
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    date: "",
    purpose: "Wisata",
    userInformation: "",
  });
  const [paymentFile, setPaymentFile] = useState(null);
  const [showAccountNumber, setShowAccountNumber] = useState(true);
  const NO_REKENING = [
    {
      tipe: "mandiri",
      norek: "111 111 111",
      nama: "CONTOH",
    },
    {
      tipe: "bca",
      norek: "111 111 111",
      nama: "CONTOH",
    },
  ];
  
  const PRICE_PER_VISITOR = 50000;
  const calculateTotalPrice = () => {
    // if (participationType === "individu") {
    return visitorCount * PRICE_PER_VISITOR;
    // }
    // else {
    //   const selectedGroupCount =
    //     Object.values(groupTypes).filter(Boolean).length;
    //   return selectedGroupCount * PRICE_PER_VISITOR;
    // }
  };

  const formatPrice = (price) => {
    return new Intl.NumberFormat("id-ID", {
      style: "currency",
      currency: "IDR",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleParticipationTypeChange = (type) => {
    setParticipationType(type);
    if (type === "individu") {
      setVisitorCount(1);
    } else {
      setGroupTypes({
        TK: false,
        SD: false,
        SMP: false,
        SMA: false,
        Universitas: false,
        Instansi: false,
        Keluarga: false,
        Lainnya: false,
      });
    }
  };

  const handleGroupTypeChange = (e) => {
    const { name, checked } = e.target;
    setGroupTypes((prev) => ({
      ...prev,
      [name]: checked,
    }));
  };

  const handlePaymentTypeChange = (type) => {
    setPaymentType(type);
    if (type === "tunai") {
      setPaymentFile(null);
    }
  };

  const decreaseCount = () => {
    setVisitorCount((prev) => Math.max(1, prev - 1));
  };

  const increaseCount = () => {
    setVisitorCount((prev) => prev + 1);
  };

  const uploadImage = async (file) => {
    try {
      const formData = new FormData();
      formData.append("image", file);

      const response = await axios.post(ORDERS_PATH.UPLOAD_IMAGE, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      if (response.data && response.data.data && response.data.data.path) {
        return response.data.data.path;
      } else {
        console.error("Unexpected server response:", response.data);
        throw new Error("Format response server tidak sesuai");
      }
    } catch (error) {
      console.error("Error detail:", error.response || error);
      throw new Error(
        error.response?.data?.message ||
          error.message ||
          "Terjadi kesalahan saat mengupload gambar"
      );
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (!file.type.match(/^image\/(jpeg|png|jpg)$/)) {
        Swal.fire("Error", "Mohon upload file gambar (JPEG, PNG)", "error");
        e.target.value = null;
        return;
      }
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        Swal.fire("Error", "Ukuran file harus kurang dari 5MB", "error");
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
      let paymentProofUrl = "";

      if (paymentType === "non-tunai" && paymentFile) {
        try {
          paymentProofUrl = await uploadImage(paymentFile);
          console.log("Upload berhasil:", paymentProofUrl);
        } catch (uploadError) {
          console.error("Error upload:", uploadError);
          Swal.fire(
            "Error",
            "Error saat upload bukti pembayaran: " + uploadError.message,
            "error"
          );
          setLoading(false);
          return;
        }
      } else if (paymentType === "non-tunai" && !paymentFile) {
        Swal.fire(
          "Error",
          "Mohon upload bukti pembayaran untuk metode pembayaran non-tunai.",
          "error"
        );
        setLoading(false);
        return;
      } else if (paymentType === "tunai") {
        paymentProofUrl = "pembayaran Tunai";
      }

      let groupTypesClone = Object.assign({}, groupTypes);
      delete groupTypesClone.Lainnya;
      if (!!groupTypesLainnya) {
        groupTypesClone[groupTypesLainnya] = true;
      }
      console.log(groupTypesClone);
      const selectedGroupTypes = Object.entries(groupTypes)
        .filter(([, isSelected]) => isSelected)
        .map(([type]) => type);
      let touristGroup = Object.keys(groupTypesClone)
      .filter((key) => groupTypesClone[key])
      .join(",")
      const finalFormData = {
        email: formData.email,
        date: formData.date,
        purpose: formData.purpose,
        touristType: participationType === "individu" ? "individual" : "group",
        touristGroupType: touristGroup?touristGroup:"individu",
        touristCount:
          participationType === "individu"
            ? visitorCount
            : selectedGroupTypes.length,
        paymentType,
        paymentProof: paymentProofUrl,
        totalPrice: calculateTotalPrice(),
        userInformation: formData.userInformation,
      };

      console.log(finalFormData);
      const apiResponse = await postOrder(finalFormData);
      console.log("Pendaftaran berhasil:", apiResponse);
      Swal.fire("Sukses", "Pendaftaran berhasil!", "success");

      const orderId = apiResponse?.data?.id;
      if (orderId) {
        navigate(`/tiket/${orderId}`);
      }

      setFormData({
        email: "",
        date: "",
        purpose: "Wisata",
        userInformation: "",
      });
      setPaymentFile(null);
      setVisitorCount(1);
      setParticipationType("individu");
      setPaymentType("tunai");

      const fileInput = document.querySelector('input[type="file"]');
      if (fileInput) {
        fileInput.value = "";
      }
    } catch (error) {
      console.error("Error submit form:", error);
      Swal.fire(
        "Error",
        "Terjadi kesalahan: " +
          (error.response?.data?.message || error.message),
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  const handleShowAccountNumber = () => {
    setShowAccountNumber(!showAccountNumber);
  };

  const copyText = (text) => {
    navigator.clipboard.writeText(text)
      .then(() => {
        alert("No rekening telah tersalin!");
      })
  }
  return (
    <div
      className="min-h-screen bg-fixed bg-cover bg-center md:pt-20 pt-[100px] pb-5"
      style={{ backgroundImage: `url(${welcome})` }}
    >
      <div className="bg-white bg-opacity-90 backdrop-blur-md w-full lg:w-6/12 md:w-9/12 mx-auto p-8 rounded-lg shadow-lg">
        <h1 className="font-semibold mb-2 text-xl md:text-2xl">
          Form Pendaftaran Ekowisata Mangrove Cukunyinyi
        </h1>
        <p className="mb-4 text-gray-800">Masukkan data dengan benar</p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="flex gap-1 my-2 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="currentColor"
                class="icon icon-tabler icons-tabler-filled icon-tabler-mail"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M22 7.535v9.465a3 3 0 0 1 -2.824 2.995l-.176 .005h-14a3 3 0 0 1 -2.995 -2.824l-.005 -.176v-9.465l9.445 6.297l.116 .066a1 1 0 0 0 .878 0l.116 -.066l9.445 -6.297z" />
                <path d="M19 4c1.08 0 2.027 .57 2.555 1.427l-9.555 6.37l-9.555 -6.37a2.999 2.999 0 0 1 2.354 -1.42l.201 -.007h14z" />
              </svg>
              Email Anda
            </label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
              placeholder="Email"
              required
            />
          </div>

          <div>
            <label className="flex gap-1 my-2 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-calendar-event"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M4 5m0 2a2 2 0 0 1 2 -2h12a2 2 0 0 1 2 2v12a2 2 0 0 1 -2 2h-12a2 2 0 0 1 -2 -2z" />
                <path d="M16 3l0 4" />
                <path d="M8 3l0 4" />
                <path d="M4 11l16 0" />
                <path d="M8 15h2v2h-2z" />
              </svg>
              Tanggal
            </label>
            <input
              type="date"
              name="date"
              value={formData.date}
              onChange={handleInputChange}
              className="w-full border rounded-lg px-4 py-2"
              required
            />
          </div>

          <div>
            <label className="flex gap-1 my-2 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-luggage"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M6 6m0 2a2 2 0 0 1 2 -2h8a2 2 0 0 1 2 2v10a2 2 0 0 1 -2 2h-8a2 2 0 0 1 -2 -2z" />
                <path d="M9 6v-1a2 2 0 0 1 2 -2h2a2 2 0 0 1 2 2v1" />
                <path d="M6 10h12" />
                <path d="M6 16h12" />
                <path d="M9 20v1" />
                <path d="M15 20v1" />
              </svg>
              Tujuan
            </label>
            <select
              name="purpose"
              value={formData.purpose}
              onChange={handleInputChange}
              className="w-full border rounded-lg bg-white px-4 py-2"
            >
              <option value="Wisata">Wisata</option>
              <option value="Penelitian">Penelitian</option>
            </select>
          </div>

          <div className="p-4 bg-white rounded-lg space-y-3 border">
            <label className="flex gap-1 my-2 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-trekking"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M12 4m-1 0a1 1 0 1 0 2 0a1 1 0 1 0 -2 0" />
                <path d="M7 21l2 -4" />
                <path d="M13 21v-4l-3 -3l1 -6l3 4l3 2" />
                <path d="M10 14l-1.827 -1.218a2 2 0 0 1 -.831 -2.15l.28 -1.117a2 2 0 0 1 1.939 -1.515h1.439l4 1l3 -2" />
                <path d="M17 12v9" />
                <path d="M16 20h2" />
              </svg>
              Bepergian Secara?
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="participation"
                  value="individu"
                  checked={participationType === "individu"}
                  onChange={() => handleParticipationTypeChange("individu")}
                  className="form-radio h-5 w-5"
                />
                Individu
              </label>
              <label className="flex items-center gap-2 cursor-pointer">
                <input
                  type="radio"
                  name="participation"
                  value="grup"
                  checked={participationType === "grup"}
                  onChange={() => handleParticipationTypeChange("grup")}
                  className="form-radio h-5 w-5"
                />
                Grup Besar
              </label>
            </div>
            {participationType !== "individu" && (
              <div className="space-y-2">
                <p className="font-semibold">Pilih Jenis Grup:</p>
                {Object.keys(groupTypes).map((groupType) => (
                  <label
                    key={groupType}
                    className="flex items-center gap-2 cursor-pointer"
                  >
                    <input
                      type="checkbox"
                      name={groupType}
                      checked={groupTypes[groupType]}
                      onChange={handleGroupTypeChange}
                      className="form-radio h-5 w-5"
                    />
                    {groupType}
                  </label>
                ))}
                {groupTypes.Lainnya && (
                  <input
                    type="text"
                    onChange={(e) => setGroupTypesLainnya(e.target.value)}
                    className="w-full border rounded-lg px-4 py-2"
                    placeholder="Nama Grup"
                    required
                  />
                )}
              </div>
            )}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="block font-semibold">Jumlah Pengunjung</label>
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded"
                  onClick={decreaseCount}
                >
                  -
                </button>
                <span>{visitorCount}</span>
                <button
                  type="button"
                  className="bg-gray-300 hover:bg-gray-400 text-gray-700 px-3 py-1 rounded"
                  onClick={increaseCount}
                >
                  +
                </button>
              </div>
            </div>
          </div>

          <div className="bg-white p-3 rounded-lg border">
            <label className="flex gap-1 my-2 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-wallet"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M17 8v-3a1 1 0 0 0 -1 -1h-10a2 2 0 0 0 0 4h12a1 1 0 0 1 1 1v3m0 4v3a1 1 0 0 1 -1 1h-12a2 2 0 0 1 -2 -2v-12" />
                <path d="M20 12v4h-4a2 2 0 0 1 0 -4h4" />
              </svg>
              Tipe Pembayaran
            </label>
            <div className="flex items-center space-x-4">
              <label className="flex items-center gap-2 p-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentType"
                  value="tunai"
                  checked={paymentType === "tunai"}
                  onChange={() => handlePaymentTypeChange("tunai")}
                  className="form-radio h-5 w-5"
                />
                Tunai
              </label>
              <label className="flex items-center gap-2 p-3 cursor-pointer">
                <input
                  type="radio"
                  name="paymentType"
                  value="non-tunai"
                  checked={paymentType === "non-tunai"}
                  onChange={() => handlePaymentTypeChange("non-tunai")}
                  className="form-radio h-5 w-5"
                />
                <span className="text-gray-700 font-medium">Non-Tunai</span>
              </label>
            </div>
            {paymentType === "non-tunai" && (
              <div>
                {/* <button
                type="button"
                className="bg-blue-500 text-white text-sm p-2 rounded"
                onClick={handleShowAccountNumber}
              >
                Lihat Nomor Rekening
              </button> */}
                {
                  NO_REKENING.map((rek, index) => (
                    <div key={index} className="p-2">
                      <div className="flex items-center gap-4">
                        <img
                          src={`../src/assets/${rek.tipe}.png`}
                          className="w-10"
                        />
                        <div className="space-x-3">
                          <span>{rek.tipe.toUpperCase()}</span>
                          <span className="font-bold" onClick={(e)=>{
                            copyText(e.target.innerText)
                          }}>{rek.norek}</span>
                          <span>({rek.nama})</span>
                        </div>
                      </div>
                    </div>
                  ))}
              </div>
            )}

            {paymentType === "non-tunai" && (
              <div>
                <label className="block my-2 font-semibold">
                  Unggah Bukti Pembayaran
                </label>
                <input
                  type="file"
                  onChange={handleFileChange}
                  className="w-full border rounded bg-white px-4 py-2"
                  accept="image/*"
                />
              </div>
            )}
          </div>

          <div>
            <label className="flex gap-1 my-2 font-semibold">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                stroke-width="2"
                stroke-linecap="round"
                stroke-linejoin="round"
                class="icon icon-tabler icons-tabler-outline icon-tabler-note"
              >
                <path stroke="none" d="M0 0h24v24H0z" fill="none" />
                <path d="M13 20l7 -7" />
                <path d="M13 20v-6a1 1 0 0 1 1 -1h6v-7a2 2 0 0 0 -2 -2h-12a2 2 0 0 0 -2 2v12a2 2 0 0 0 2 2h7" />
              </svg>
              Kritik & Saran
            </label>
            <textarea
              name="userInformation"
              value={formData.userInformation}
              onChange={handleInputChange}
              className="w-full border rounded px-4 py-2"
              rows="4"
              placeholder="Kritik & Saran"
            />
          </div>
          <div className="bg-green-50 p-4 rounded-lg">
            <p className="text-green-800 font-semibold text-lg">
              Total Harga: {formatPrice(calculateTotalPrice())}
            </p>
            <p className="text-sm text-green-600">
              ({visitorCount} pengunjung × {formatPrice(PRICE_PER_VISITOR)})
            </p>
          </div>
          <button
            type="submit"
            className={`w-full bg-green-600 text-white px-4 py-2 rounded ${
              loading ? "opacity-50 cursor-not-allowed" : ""
            }`}
            disabled={loading}
          >
            {loading ? "Mengirim..." : "Daftar Sekarang"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default RegistrationForm;
