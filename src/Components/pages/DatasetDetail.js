import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import '../Styles/DatasetDetail.css'; // Pastikan ada file CSS untuk styling
import { Line, Bar } from 'react-chartjs-2'; // Tambahkan library ini
import { Chart, CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend } from 'chart.js';
Chart.register(CategoryScale, LinearScale, PointElement, LineElement, BarElement, Title, Tooltip, Legend);

const DatasetDetail = () => {
  const { id } = useParams();
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState('Tabel'); // State untuk menentukan tab yang aktif

  //detail
  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`http://116.206.212.234:4000/dataset/detail/${id}`); //detail
        const data = await response.json();
        setDetail(data);
      } catch (error) {
        console.error('Error fetching detail:', error);
      } finally {
        setLoading(false);
      }
    };
    fetchDetail();
  }, [id]);

  if (loading) return <div className="loading">Loading...</div>;



  // Tombol download 
  const handleDownload = () => {
    if (detail?.download_url) {
      const downloadUrl = `http://${detail.download_url}`; // Pastikan untuk menambahkan 'http://' ke URL
      const a = document.createElement('a');
      a.href = downloadUrl;
      a.download = `${detail?.uraian_dssd}.xlsx`; // Nama file berdasarkan detail dataset
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
    } else {
      console.error('Download URL tidak tersedia');
    }
  };



  // Data grafik Line dan Bar
  const inputData = detail?.input || [];
  
  // Mengurutkan data berdasarkan tahun secara ascending
  const sortedData = inputData.sort((a, b) => a.tahun - b.tahun);

  const labels = sortedData.map(item => item.tahun); // Ambil tahun dari input yang sudah diurutkan
  const dataValues = sortedData.map(item => item.jumlah); // Ambil jumlah dari input yang sudah diurutkan

  const barChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset Bar',
        data: dataValues,
        backgroundColor: 'rgba(211, 47, 47, 1)',
      },
    ],
  };
  
  const lineChartData = {
    labels: labels,
    datasets: [
      {
        label: 'Dataset Line',
        data: dataValues,
        borderColor: 'rgba(211, 47, 47, 1)',
        fill: false,
      },
    ],
  };

  // Dua kolom
  return (
    <div className="dataset-container">
      <div className="content-wrapper">
        {/* Kolom Kiri: Informasi Dataset */}
        <div className="left-column">
          <div className="info-header">
            <h2> Detail Datasets </h2>
          </div>
          <h1 className="dataset-title">{detail?.uraian_dssd}</h1>

          <div className="metadata">
            <div className="metadata-item">
              <span className="metadata-icon">🏢</span>
              <span className="metadata-text">{detail?.nama_opd}</span> 
            </div>
            <div className="metadata-item">
              <span className="metadata-icon">📅</span>
              <span className="metadata-text">{new Date(detail?.modified).toLocaleDateString('id-ID',{
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
                </span>
            </div>
          </div>

          <div className="description">
            <h3>Deskripsi Datasets</h3>
            <p>{detail?.description}</p>
          </div>
        </div>

        {/* Kolom Kanan: Tabel dan Ekspor */}
        <div className="right-column">
          <div className="action-tabs">
            <button className={`export-btn ${activeTab === 'Tabel' ? 'active' : ''}`} onClick={() => setActiveTab('Tabel')}>Tabel</button>
            <button className={`export-btn ${activeTab === 'Grafik' ? 'active' : ''}`} onClick={() => setActiveTab('Grafik')}>Grafik</button>
            <button className={`export-btn ${activeTab === 'Metadata' ? 'active' : ''}`} onClick={() => setActiveTab('Metadata')}>Jumlah Data Sektoral & Api </button>
          </div>

          <div className="export-buttons">
            <button className="export-btn" onClick={handleDownload}>Download Data</button>
          </div>

          {activeTab === 'Tabel' && (
            <table className="data-table">
              <thead>
                <tr>
                  <th>Informasi</th>
                  <th>Detail</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>Nama OPD</td>
                  <td>{detail?.nama_opd || '-'}</td>
                </tr>
                <tr>
                  <td>Judul</td>
                  <td>{detail?.title || '-'}</td>
                </tr>
                <tr>
                  <td>Jenis Data</td>
                  <td>{detail?.jenis_string || '-'}</td>
                </tr>
                <tr>
                  <td>Kategori Data</td>
                  <td>{detail?.kategori_string || '-'}</td>
                </tr>
                <tr>
                  <td>Kode DSSD</td>
                  <td>{detail?.kode_dssd || '-'}</td>
                </tr>
                <tr>
                  <td>Uraian DSSD</td>
                  <td>{detail?.uraian_dssd || '-'}</td>
                </tr>
                <tr>
                  <td>Satuan</td>
                  <td>{detail?.satuan || '-'}</td>
                </tr>
              </tbody>
            </table>
          )}


          {/* grafik */}
          {activeTab === 'Grafik' && (
            <div>
              <h3>Representasi Dalam Grafik Bar</h3>
              <Bar data={barChartData} />
              <h3>Representasi Dalam Grafik Line</h3>
              <Line data={lineChartData} />
            </div>
          )}
          
          {/* tabel */}
          {activeTab === 'Metadata' && (
           <div className="data-container">
           {/* Tabel Jumlah Data Sektoral */}
           <table className="data-table">
             <thead>
               <tr>
                 <th>Tahun</th>
                 <th>Jumlah</th>
               </tr>
             </thead>
             <tbody>
               {detail?.input?.map((item, index) => (
                 <tr key={index}>
                   <td>{item.tahun}</td> {/* Tampilkan tahun dari input */}
                   <td>{item.jumlah}</td> {/* Tampilkan jumlah dari input */}
                 </tr>
               ))}
             </tbody>
           </table>
         
           {/* Tabel API Interoperabilitas */}
           <table className="data-table">
             <thead>
               <tr>
                 <th>Method</th>
                 <th>API</th>
               </tr>
             </thead>
             <tbody>
               <tr>
                 <td>GET</td> {/* Tampilkan method (statis) */}
                 <td>
                   <a
                     href={`http://116.206.212.234:4000/dataset/detail/${id}`}
                     target="_blank"
                     rel="noopener noreferrer"
                   >
                     <button className="export-btn">Open API</button>
                   </a>
                 </td>
               </tr>
             </tbody>
           </table>
         </div>
         
       
          )}
        </div>
      </div>
    </div>
  );
};

export default DatasetDetail;
