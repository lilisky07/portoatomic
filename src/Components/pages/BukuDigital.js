import React, { useState, useEffect } from 'react';
import "../Styles/BukuDigital.css"; // Ensure you have a CSS file for additional styling
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import Navbar from '../organisms/Navbar';
import { Document, Page, pdfjs } from 'react-pdf';

// Set the workerSrc for PDF.js to the locally installed worker
pdfjs.GlobalWorkerOptions.workerSrc = `https://cdnjs.cloudflare.com/ajax/libs/pdf.js/2.16.105/pdf.worker.min.js`;


const BukuDigital = () => {
  const [bukuList, setBukuList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null); // State for the selected book
  const [numPages, setNumPages] = useState(null); // Track the number of pages in the PDF

  // Fetch data when the component mounts
  useEffect(() => {
    const fetchBukuDigital = async () => {
      try {
        const response = await fetch("http://116.206.212.234:4000/buku-digital"); // Fetch data from the API
        if (!response.ok) {
          throw new Error('Failed to fetch buku digital data');
        }
        const data = await response.json();
        setBukuList(data); // Set fetched data to state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchBukuDigital();
  }, []);

  const onDocumentLoadSuccess = ({ numPages }) => {
    setNumPages(numPages); // Set the number of pages when the PDF loads successfully
  };

  const openPDF = (filePath) => {
    const fullUrl = `http://116.206.212.234:4000${filePath.replace("handler/http", "")}`;
    window.open(fullUrl, "_blank"); // Open PDF in a new tab
  };

 
  return (
    <div>
        <Navbar/>


    <div className="container mt-5">
      <h2 className="text-center mb-4">Buku Digital</h2>

      {loading ? (
        <div className="text-center">Loading...</div>
      ) : error ? (
        <div className="alert alert-danger" role="alert">Error: {error}</div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-bordered">
            <thead className="thead-dark">
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
                    <button onClick={() => openPDF(buku.file)} className="btn btn-primary">
                      PDF
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* PDF Preview Section */}
      {selectedBook && (
        <div className="pdf-preview">
          <h3>Pratinjau Buku</h3>
          <button className="btn btn-secondary mb-3" onClick={() => setSelectedBook(null)}>Tutup</button>
          <Document
            file={selectedBook} // Use the constructed URL for the PDF
            onLoadSuccess={onDocumentLoadSuccess}
            onLoadError={(error) => {
              console.error("Error loading document:", error);
              setError("Gagal memuat dokumen.");
            }}
          >
            {Array.from(new Array(numPages), (el, index) => (
              <Page key={`page_${index + 1}`} pageNumber={index + 1} />
            ))}
          </Document>
        </div>
      )}
    </div>
    </div>
  );
};

export default BukuDigital;
