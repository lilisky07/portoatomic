import React, { useState, useEffect } from 'react';
import "../Styles/BukuDigital.css"; // Pastikan Anda memiliki file CSS tambahan
import 'bootstrap/dist/css/bootstrap.min.css'; // Import CSS Bootstrap
import { Document, Page, pdfjs } from 'react-pdf';

// Set workerSrc untuk PDF.js ke worker yang diinstal secara lokal
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;

const BukuDigital = () => {
  const [bukuList, setBukuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null); // Buku yang dipilih
  const [numPages, setNumPages] = useState(null); // Jumlah halaman PDF

  // Fetch data ketika komponen mount
  useEffect(() => {
    const fetchBukuDigital = async () => {
      try {
        const response = await fetch("http://116.206.212.234:4000/buku-digital");
        if (!response.ok) throw new Error('Gagal mengambil data buku digital');
        const data = await response.json();
        setBukuList(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBukuDigital();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => setNumPages(numPages);

  const openPDF = (filePath) => {
    const fullUrl = `http://116.206.212.234:4000${filePath.replace("handler/http", "")}`;
    window.open(fullUrl, "_blank");
  };

  return (
    <div className="container py-5">
      <h2 className="text-center mb-4">📚 Buku Digital</h2>

      {loading ? (
        <div className="d-flex justify-content-center align-items-center" style={{ minHeight: "50vh" }}>
          <div className="spinner-border text-primary" role="status">
            <span className="visually-hidden">Loading...</span>
          </div>
        </div>
      ) : error ? (
        <div className="alert alert-danger text-center" role="alert">
          Error: {error}
        </div>
      ) : (
        <div className="table-responsive shadow-sm">
          <table className="table table-hover table-bordered">
            <thead className="table-dark">
              <tr>
                <th>No</th>
                <th>Judul Buku</th>
                <th>Tahun</th>
                <th>OPD</th>
                <th>File</th>
              </tr>
            </thead>
            <tbody>
              {bukuList.map((buku, index) => (
                <tr key={`${buku.id_buku_digital}-${index}`}>
                  <td>{index + 1}</td>
                  <td>{buku.buku}</td>
                  <td>{buku.tahun}</td>
                  <td>{buku.nama_opd}</td>
                  <td>
                    <button 
                      onClick={() => openPDF(buku.file)} 
                      className="btn btn-outline-primary btn-sm"
                    >
                      Lihat PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* Modal untuk pratinjau PDF */}
      {selectedBook && (
        <div className="modal show d-block" tabIndex="-1" role="dialog">
          <div className="modal-dialog modal-lg" role="document">
            <div className="modal-content">
              <div className="modal-header">
                <h5 className="modal-title">Pratinjau Buku</h5>
                <button type="button" className="btn-close" onClick={() => setSelectedBook(null)}></button>
              </div>
              <div className="modal-body">
                <Document
                  file={selectedBook}
                  onLoadSuccess={onDocumentLoadSuccess}
                  onLoadError={(error) => {
                    console.error("Gagal memuat dokumen:", error);
                    setError("Gagal memuat dokumen.");
                  }}
                >
                  {Array.from(new Array(numPages), (el, index) => (
                    <Page key={`page_${index + 1}`} pageNumber={index + 1} />
                  ))}
                </Document>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BukuDigital;
