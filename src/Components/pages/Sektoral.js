import React, { useState, useEffect } from 'react';
import "../Styles/Sektoral.css"; // Ensure your CSS is included

const Sektoral = () => {
  const [opds, setDataOPD] = useState([]);
  const [urusans, setDataUrusan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOPD, setSelectedOPD] = useState(null);
  const [selectedUrusan, setSelectedUrusan] = useState(null);
  const [DariTahun, setDariTahun] = useState("");
  const [SampaiTahun, setSampaiTahun] = useState("");
  const [results, setResults] = useState([]);

  // New states for pagination
  const [currentPage, setCurrentPage] = useState(1);
  const resultsPerPage = 20;

  useEffect(() => {
    const fetchDataOPD = async () => {
      try {
        const response = await fetch("http://116.206.212.234:4000/list-opd");
        if (!response.ok) throw new Error('Failed to fetch OPD data');
        const data = await response.json();
        setDataOPD(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };
    fetchDataOPD();
  }, []);

  const handleOPDChange = async (e) => {
    const opdId = e.target.value;
    setSelectedOPD(opdId);
    setSelectedUrusan("");
    setLoading(true);

    if (opdId) {
      try {
        const response = await fetch(`http://116.206.212.234:4000/data-sektoral/list-urusan-by-id-opd?id_user_opd=${opdId}`);
        if (!response.ok) throw new Error('Failed to fetch urusan');
        const data = await response.json();
        setDataUrusan(data);
        setError(null);
      } catch (error) {
        setError("Gagal mengambil data urusan.");
      } finally {
        setLoading(false);
      }
    } else {
      setDataUrusan([]);
      setLoading(false);
    }
  };

  const handleSearch = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const baseUrl = 'http://116.206.212.234:4000/data-sektoral';
      const params = {
        id_user_opd: selectedOPD,
        kode_urusan: selectedUrusan,
        dari_tahun: DariTahun,
        sampai_tahun: SampaiTahun,
      };
      const response = await fetch(`${baseUrl}?${new URLSearchParams(params)}`);
      if (!response.ok) throw new Error('Failed to fetch data');
      const data = await response.json();
      setResults(data);
      setError(null);
      setCurrentPage(1);  // Reset to page 1 after new search
    } catch (error) {
      setError("Terjadi kesalahan saat mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  // Logic for displaying current page results
  const indexOfLastResult = currentPage * resultsPerPage;
  const indexOfFirstResult = indexOfLastResult - resultsPerPage;
  const currentResults = results.slice(indexOfFirstResult, indexOfLastResult);

  // Logic for page numbers
  const totalPages = Math.ceil(results.length / resultsPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePreviousPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="sektoral-container">
    <div className="sektoral-box">
      <h2 className="sektoral-title">Data Sektoral</h2>
      <form className="sektoral-form" onSubmit={handleSearch}>
        <select className="sektoral-input" onChange={handleOPDChange} value={selectedOPD || ""}>
          <option value="">Perangkat Daerah</option>
          {opds.map((OPD) => (
            <option key={OPD.id_opd} value={OPD.id_opd}>
              {OPD.nama_opd}
            </option>
          ))}
        </select>
        
        <select className="sektoral-input" onChange={(e) => setSelectedUrusan(e.target.value)} value={selectedUrusan || ""} disabled={!selectedOPD}>
          <option value="">Urusan Bidang</option>
          {urusans.map((Urusan) => (
            <option key={Urusan.kode_urusan} value={Urusan.kode_urusan}>
              {Urusan.nama_urusan}
            </option>
          ))}
        </select>
        
        <input className="sektoral-input" type="number" placeholder="Dari Tahun" value={DariTahun} onChange={(e) => setDariTahun(e.target.value)} required />
        <input className="sektoral-input" type="number" placeholder="Sampai Tahun" value={SampaiTahun} onChange={(e) => setSampaiTahun(e.target.value)} required />
        
        <button className="sektoral-button" type="submit">Tampilkan Sekarang</button>
      </form>
    </div>
  
    <div className="result-container">
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>Error: {error}</p>
      ) : (
        <>
          <table className="result-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Kode DSSD</th>
                <th>Uraian DSSD</th>
                <th>Satuan</th>
                <th>2022</th>
              </tr>
            </thead>
            <tbody>
              {currentResults.map((result, index) => (
                <tr key={index}>
                  <td>{indexOfFirstResult + index + 1}</td>
                  <td>{result.kode_dssd}</td>
                  <td>{result.uraian_dssd}</td>
                  <td>{result.satuan}</td>
                  <td>{result.data_tahun_2022}</td>
                </tr>
              ))}
            </tbody>
          </table>
  
          {/* Pagination Controls */}
          <div className="pagination-controls">
            <button onClick={handlePreviousPage} disabled={currentPage === 1}>Previous</button>
            <span>Page {currentPage} of {totalPages}</span>
            <button onClick={handleNextPage} disabled={currentPage === totalPages}>Next</button>
          </div>
        </>
      )}
    </div>
  </div>
  
  );
};

export default Sektoral;
