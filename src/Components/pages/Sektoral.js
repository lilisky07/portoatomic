import React, { useState, useEffect } from 'react';
import "../Styles/Sektoral.css";

const Sektoral = () => {
  const [opds, setDataOPD] = useState([]);
  const [urusans, setDataUrusan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOPD, setSelectedOPD] = useState("");
  const [selectedUrusan, setSelectedUrusan] = useState("");
  const [dariTahun, setDariTahun] = useState("");
  const [sampaiTahun, setSampaiTahun] = useState("");
  const [results, setResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [resultsPerPage] = useState(20);

  // Fetch data OPD
 

  useEffect(() => {
    fetchDataOPD();
  }, [currentPage]);
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

  const handleOPDChange = async (e) => {
    const opdId = e.target.value;
    setSelectedOPD(opdId);
    setSelectedUrusan("");
    setCurrentPage(1);
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

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const baseUrl = 'http://116.206.212.234:4000/data-sektoral';
      const params = new URLSearchParams({
        id_user_opd: selectedOPD,
        kode_urusan: selectedUrusan,
        dari_tahun: dariTahun,
        sampai_tahun: sampaiTahun,
        page: page.toString(),
        per_page: resultsPerPage,
      });

      const response = await fetch(`${baseUrl}?${params}`);
      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      console.log(`Page ${page} - Items received:`, data.length);  // Debugging line

      setResults(data);

      const totalItems = response.headers.get('x-pagination-total-count');
      console.log('Total Items (from header):', totalItems);  // Debugging line

      setTotalData(totalItems ? parseInt(totalItems, 10) : 0);
      setError(null);
    } catch (error) {
      setError("Terjadi kesalahan saat mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchData(1);
  };

  const handlePageChange = (newPage) => {
    console.log(`Navigating to page: ${newPage}`);  // Debugging line
    setCurrentPage(newPage);
    fetchData(newPage);
  };

  const totalPages = Math.ceil(totalData / resultsPerPage);
  

  return (
    <div className="sektoral-container">
      <div className="sektoral-box">
        <h2 className="sektoral-title">Data Sektoral</h2>
        <form className="sektoral-form" onSubmit={handleSearch}>
          <select className="sektoral-input" onChange={handleOPDChange} value={selectedOPD}>
            <option value="">Perangkat Daerah</option>
            {opds.map((OPD) => (
              <option key={OPD.id_opd} value={OPD.id_opd}>{OPD.nama_opd}</option>
            ))}
          </select>

          <select
            className="sektoral-input"
            onChange={(e) => setSelectedUrusan(e.target.value)}
            value={selectedUrusan}
            disabled={!selectedOPD}
          >
            <option value="">Urusan Bidang</option>
            {urusans.map((Urusan) => (
              <option key={Urusan.kode_urusan} value={Urusan.kode_urusan}>{Urusan.nama_urusan}</option>
            ))}
          </select>

          <input
            className="sektoral-input"
            type="number"
            placeholder="Dari Tahun"
            value={dariTahun}
            onChange={(e) => setDariTahun(e.target.value)}
            required
          />
          <input
            className="sektoral-input"
            type="number"
            placeholder="Sampai Tahun"
            value={sampaiTahun}
            onChange={(e) => setSampaiTahun(e.target.value)}
            required
          />

          <button className="sektoral-button" type="submit">Tampilkan Sekarang</button>

          <div className="search-info">
            <h6>Total Data: {totalData}</h6>
          </div>
        </form>
      </div>

      <div className="result-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : results.length === 0 ? (
          <p>Tidak ada data yang ditemukan.</p>
        ) : (
          <>
            <table className="result-table">
              <thead>
                <tr>
                  <th>No</th>
                  <th>Kode DSSD</th>
                  <th>Uraian DSSD</th>
                  <th>Satuan</th>
                  <th>Jenis</th>
                  <th>Kategori</th>
                </tr>
              </thead>
              <tbody>
                {results.map((result, index) => (
                  <tr key={index}>
                    <td>{(currentPage - 1) * 20 + index + 1}</td>
                    <td>{result.kode_dssd}</td>
                    <td>{result.uraian_dssd}</td>
                    <td>{result.satuan}</td>
                    <td>{result.jenis_string}</td>
                    <td>{result.kategori_string}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="pagination-controls">
              <button
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
              >
                Previous
              </button>
              <span>Page {currentPage} of {totalPages}</span>
              <button
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages}
              >
                Next
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Sektoral;
