import React, { useState, useEffect } from 'react';
import Select from 'react-select'; // Import React-Select
import "../Styles/Sektoral.css";

const Sektoral = () => {
  const [opds, setDataOPD] = useState([]);
  const [urusans, setDataUrusan] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedOPD, setSelectedOPD] = useState(null);
  const [selectedUrusan, setSelectedUrusan] = useState(null);
  const [dariTahun, setDariTahun] = useState("");
  const [sampaiTahun, setSampaiTahun] = useState("");
  const [results, setResults] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);
  const [totalData, setTotalData] = useState(0);
  const [resultsPerPage] = useState(20);

  useEffect(() => {
    fetchDataOPD();
  }, []);

  const fetchDataOPD = async () => {
    try {
      const response = await fetch("http://116.206.212.234:4000/list-opd");
      if (!response.ok) throw new Error('Failed to fetch OPD data');
      const data = await response.json();
      setDataOPD(data.map(opd => ({ value: opd.id_opd, label: opd.nama_opd })));
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleOPDChange = async (selected) => {
    setSelectedOPD(selected);
    setSelectedUrusan(null);
    setLoading(true);

    if (selected) {
      try {
        const response = await fetch(
          `http://116.206.212.234:4000/data-sektoral/list-urusan-by-id-opd?id_user_opd=${selected.value}`
        );
        if (!response.ok) throw new Error('Failed to fetch urusan');
        const data = await response.json();
        setDataUrusan(data.map(urusan => ({ value: urusan.kode_urusan, label: urusan.nama_urusan })));
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

  const handleSearch = (e) => {
    e.preventDefault();
    setCurrentPage(1);
    fetchData(1);
  };

  const fetchData = async (page = 1) => {
    setLoading(true);
    try {
      const baseUrl = 'http://116.206.212.234:4000/data-sektoral';
      const params = new URLSearchParams({
        id_user_opd: selectedOPD?.value || '',
        kode_urusan: selectedUrusan?.value || '',
        dari_tahun: dariTahun,
        sampai_tahun: sampaiTahun,
        page: page.toString(),
        per_page: resultsPerPage,
      });

      const response = await fetch(`${baseUrl}?${params}`);
      if (!response.ok) throw new Error('Failed to fetch data');

      const data = await response.json();
      setResults(data);

      const totalItems = response.headers.get('x-pagination-total-count');
      setTotalData(totalItems ? parseInt(totalItems, 10) : 0);
    } catch (error) {
      setError("Terjadi kesalahan saat mengambil data.");
    } finally {
      setLoading(false);
    }
  };

  const totalPages = Math.ceil(totalData / resultsPerPage);

const handlePageChange = (newPage) => {
  if (newPage > 0 && newPage <= totalPages) {
    setCurrentPage(newPage);
    fetchData(newPage);
  }
};


  return (
    <div className="sektoral-container">
      <div className="sektoral-box">
        <h2 className="sektoral-title">Data Sektoral</h2>
        <form className="sektoral-form" onSubmit={handleSearch}>
          <Select
            options={opds}
            onChange={handleOPDChange}
            value={selectedOPD}
            placeholder="Pilih Perangkat Daerah"
            isClearable
          />

          <Select
            options={urusans}
            onChange={(selected) => setSelectedUrusan(selected)}
            value={selectedUrusan}
            placeholder="Pilih Urusan Bidang"
            isClearable
            isDisabled={!selectedOPD}
          />

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
