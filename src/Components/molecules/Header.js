import React from 'react';
import '../Styles/HeaderCss.css'; // Pastikan file CSS ada

const Branding = () => {
  return (
    <div className="branding-header text-center py-5">
      <h1 className="welcome-title">
        Selamat Datang di Satu Data Kota <br />
        <span className="city-name">Bandar Lampung</span>
      </h1>
      <p className="description-text mt-3">
        "Platform yang menyajikan informasi data statistik sektoral yang pemanfaatannya ditujukan untuk memenuhi kebutuhan instansi pemerintah tertentu dalam rangka penyelenggaraan tugas-tugas pemerintah dan tugas
        pembangunan yang merupakan tugas pokok instansi pemerintah yang bersangkutan."
      </p>
      <div className="button-container mt-4">
        <button className="btn btn-danger custom-button">
          Cari Semua Datasets →
        </button>
      </div>
    </div>
  );
};

export default Branding;
