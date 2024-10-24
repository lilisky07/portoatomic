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

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`http://116.206.212.234:4000/dataset/detail/${id}`);
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



    // tombol downloaaad 
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
    
    



  // Data untuk grafik Line dan Bar
  const chartData = {
    labels: ['2023', '2024'],
    datasets: [
      {
        label: 'Dataset Line',
        data: [detail?.jumlah, detail?.jumlah - 500000], // Contoh data
        borderColor: 'rgba(75, 192, 192, 1)',
        fill: false,
      },
      {
        label: 'Dataset Bar',
        data: [detail?.jumlah, detail?.jumlah - 500000], // Contoh data
        backgroundColor: ['rgba(54, 162, 235, 0.6)', 'rgba(75, 192, 192, 0.6)'],
      },
    ],
  };

  //duaa kolooom
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
              <span>{detail?.nama_opd}</span>
            </div>
            <div className="metadata-item">
              <span className="metadata-icon">📅</span>
              <span>{new Date(detail?.modified).toLocaleDateString('id-ID',{
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
            <button className={`tab ${activeTab === 'Tabel' ? 'active' : ''}`} onClick={() => setActiveTab('Tabel')}>Tabel</button>
            <button className={`tab ${activeTab === 'Grafik' ? 'active' : ''}`} onClick={() => setActiveTab('Grafik')}>Grafik</button>
            <button className={`tab ${activeTab === 'Metadata' ? 'active' : ''}`} onClick={() => setActiveTab('Metadata')}>Metadata</button>
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
                <tr>
                </tr>
              </tbody>
            </table>
          )}

          {activeTab === 'Grafik' && (
            <div>
              <h3>Representasi Dalam Grafik Line</h3>
              <Line data={chartData} />
              <h3>Representasi Dalam Grafik Bar</h3>
              <Bar data={chartData} />
            </div>
          )}
          
          {activeTab === 'Metadata' && (
            <div className="metadata-content">
              <h3>Metadata Detail</h3>
              <p>Informasi lebih detail tentang metadata dataset.</p>
              {/* Isi Metadata */}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default DatasetDetail;
