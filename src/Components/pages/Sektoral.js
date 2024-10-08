import React, { useState, useEffect } from 'react';
import Navbar from '../organisms/Navbar';
import "../Styles/Sektoral.css"; // Ensure your CSS is included

const Sektoral = () => {
  const [opds, setDataOPD] = useState([]);  // Data for OPD
  const [urusans, setDataUrusan] = useState([]);  // Data for Urusan
  const [loading, setLoading] = useState(true);  // Loading state
  const [error, setError] = useState(null);  // Error state
  const [selectedOPD, setSelectedOPD] = useState(null);  // Selected OPD
  const [selectedUrusan, setSelectedUrusan] = useState(null);  // Selected Urusan
  const [DariTahun, setDariTahun] = useState("");  // Year range start
  const [SampaiTahun, setSampaiTahun] = useState("");  // Year range end
  const [results, setResults] = useState([]);  // Search results

  // Fetch OPD data on component mount
  useEffect(() => {
    const fetchDataOPD = async () => {
      try {
        const response = await fetch("http://116.206.212.234:4000/list-opd");
        if (!response.ok) {
          throw new Error('Failed to fetch OPD data');
        }
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

  // Function to fetch Urusan based on selected OPD
  const handleOPDChange = async (e) => {
    const opdId = e.target.value;  // Get selected OPD id
    setSelectedOPD(opdId);  // Set selected OPD
    setSelectedUrusan("");  // Reset Urusan
    setLoading(true);

    if (opdId) {
      try {
        const response = await fetch(
          `http://116.206.212.234:4000/data-sektoral/list-urusan-by-id-opd?id_user_opd=${opdId}`
        );
        if (!response.ok) {
          throw new Error('Failed to fetch urusan');
        }
        const data = await response.json();
        setDataUrusan(data);  // Update Urusan dropdown based on selected OPD
        setError(null);
      } catch (error) {
        setError("Gagal mengambil data urusan.");
      } finally {
        setLoading(false);
      }
    } else {
      setDataUrusan([]);  // Clear Urusan if no OPD is selected
      setLoading(false);
    }
  };

  // Handle the search submission
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
      setResults(data);  // Set the results from the API
      setError(null);
    } catch (error) {
      setError("Terjadi kesalahan saat mengambil data."); 
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Navbar di bagian atas */}
     <Navbar />
    <div className="sektoral-container">
      <div className="sektoral-box">
        <h2 className="sektoral-title">Data Sektoral</h2>
        <form className="sektoral-form" onSubmit={handleSearch}>
          {/* Dropdown for OPD */}
          <select
            className="sektoral-input"
            onChange={handleOPDChange}  // Fetch Urusan based on OPD
            value={selectedOPD || ""}
          >
            <option value="">Pilih OPD</option>
            {opds.map((OPD) => (
              <option key={OPD.id_opd} value={OPD.id_opd}>
                {OPD.nama_opd}
              </option>
            ))}
          </select>

          {/* Dropdown for Urusan */}
          <select
            className="sektoral-input"
            onChange={(e) => setSelectedUrusan(e.target.value)}  // Set selected Urusan
            value={selectedUrusan || ""}
            disabled={!selectedOPD}  // Disable Urusan if no OPD selected
          >
            <option value="">Pilih Urusan</option>
            {urusans.map((Urusan) => (
              <option key={Urusan.kode_urusan} value={Urusan.kode_urusan}>
                {Urusan.nama_urusan}
              </option>
            ))}
          </select>

          {/* Input fields for year range */}
          <input
            className="sektoral-input"
            type="number"
            placeholder="Dari Tahun"
            value={DariTahun}
            onChange={(e) => setDariTahun(e.target.value)}
            required
          />
          <input
            className="sektoral-input"
            type="number"
            placeholder="Sampai Tahun"
            value={SampaiTahun}
            onChange={(e) => setSampaiTahun(e.target.value)}
            required
          />
          <button className="sektoral-button" type="submit">
            Cari
          </button>
        </form>
      </div>
      

      {/* Results table */}
      <div className="result-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error}</p>
        ) : (
          <table className="result-table">
            <thead>
              <tr>
                <th>No</th>
                <th>Uraian DSSD</th>
                <th>Satuan</th>
                <th>Kategori</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{result.uraian_dssd}</td>
                  <td>{result.satuan}</td>
                  <td>{result.kategori_string}</td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>
    </div>
    </div> 
  );
};

export default Sektoral;
