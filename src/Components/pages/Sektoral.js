import React, { useState, useEffect } from 'react';
import "../Styles/Sektoral.css"; // Pastikan Anda memiliki file CSS untuk styling

const Sektoral = () => {
  const [opds, setDataOPD] = useState([]);
  const [urusans, setDataUrusan] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk loading status
  const [error, setError] = useState(null);
  const [selectedOPD, setSelectedOPD] = useState(null);
  const [selectedUrusan, setselectedUrusan] = useState(null);
  const [DariTahun, setDariTahun] = useState(null);
  const [SampaiTahun, setSampaiTahun] = useState(null);
  const [results, setResults] = useState([]); // State untuk menyimpan hasil pencarian

  useEffect(() => {
    // Fungsi untuk fetch data menggunakan fetch API
    const fetchDataOPD = async () => {
      try {
        const response = await fetch("http://116.206.212.234:4000/list-opd"); // Mengambil data dari API
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDataOPD(data); // Set data dari response
      } catch (error) {
        setError(error); // Set error jika terjadi kesalahan
      } finally {
        setLoading(false); // Hentikan loading
      }
    };

    fetchDataOPD();

    const fetchDataUrusan = async () => {
      try {
        const response = await fetch("http://116.206.212.234:4000/list-opd/urusan"); // Mengambil data dari API
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setDataUrusan(data); // Set data dari response
      } catch (error) {
        setError(error); // Set error jika terjadi kesalahan
      } finally {
        setLoading(false); // Hentikan loading
      }
    };

    fetchDataUrusan();
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault(); // Mencegah reload halaman saat form disubmit
    setLoading(true); // Set loading saat fetching data

    try {
        const baseUrl = 'http://116.206.212.234:4000/data-sektoral';
        const params = {
            id_user_opd: selectedOPD, // Parameter OPD yang dipilih
            kode_urusan: selectedUrusan, // Parameter urusan yang dipilih
            dari_tahun: DariTahun, // Parameter dari tahun
            sampai_tahun: SampaiTahun, // Parameter sampai tahun
        };
    
        const response = await fetch(`${baseUrl}?${new URLSearchParams(params)}`);
        if (!response.ok) throw new Error('Failed to fetch data');
    
        const data = await response.json();
        setResults(data); // Set fetched data to results
        setError(null); // Clear any previous errors
      } catch (error) {
        setError("Terjadi kesalahan saat mengambil data."); // Set error message
        // Optionally show alert
        // Swal.fire("Error", "Terjadi kesalahan saat mengambil data", "error");
      } finally {
        setLoading(false); // Stop loading after fetch completes
      }
    }

  return (
    <div className="sektoral-container">
      <div className="sektoral-box">
        <h2 className="sektoral-title">Data Sektoral</h2>
        <form className="sektoral-form" onSubmit={handleSearch}>
          {/* Elemen select untuk menampilkan data dari API */}
          <select className="sektoral-input" onChange={(e) => setSelectedOPD(e.target.value)}>
            <option value="">Pilih OPD</option>
            {opds.map((OPD) => (
              <option key={OPD.id_opd} value={OPD.id_opd}>
                {OPD.nama_opd}
              </option>
            ))}
          </select>
          <select className="sektoral-input" onChange={(e) => setselectedUrusan(e.target.value)}>
            <option value="">Pilih Urusan</option>
            {urusans.map((Urusan) => (
              <option key={Urusan.kode_urusan} value={Urusan.kode_urusan}>
                {Urusan.nama_urusan}
              </option>
            ))}
          </select>
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

      {/* Tabel hasil pencarian */}
      <div className="result-container">
        {loading ? (
          <p>Loading...</p>
        ) : error ? (
          <p>Error: {error.message}</p>
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
  );
};

export default Sektoral;
