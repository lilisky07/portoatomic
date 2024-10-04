import React, { useState, useEffect } from 'react';
import "../Styles/Sektoral.css"; // Pastikan Anda memiliki file CSS untuk styling

const Sektoral = () => {
  const [opds, setDataOPD] = useState([]);
  const [urusans, setDataUrusan] = useState([]);
  const [loading, setLoading] = useState(true); // State untuk loading status
  const [error, setError] = useState(null);
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
    e.preventDefault();
    setLoading(true);
    try {
      const response = await fetch("http://116.206.212.234:4000/data-sektoral/beranda"); // Mengambil data dari API
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      const data = await response.json();
      setResults(data); // Set data dari response untuk ditampilkan di tabel
    } catch (error) {
      setError(error); // Set error jika terjadi kesalahan
    } finally {
      setLoading(false); // Hentikan loading
    }
  };

  return (
    <div className="sektoral-container">
      <div className="sektoral-box">
        <h2 className="sektoral-title">Data Sektoral</h2>
        <form className="sektoral-form" onSubmit={handleSearch}>
             {/* Elemen select untuk menampilkan data dari API */}
          <select className="sektoral-input">
            <option value="">Pilih OPD</option>
            {opds.map((OPD) => (
              <option key={OPD.id_OPD} value={OPD.id_OPD}>
                {OPD.nama_opd}
              </option>
            ))}
          </select>
          <select className="sektoral-input">
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
                <th>Tahun</th>
                <th>OPD</th>
                <th>Urusan</th>
              </tr>
            </thead>
            <tbody>
              {results.map((result, index) => (
                <tr key={index}>
                  <td>{index + 1}</td>
                  <td>{result.tahun}</td>
                  <td>{result.nama_opd}</td>
                  <td>{result.nama_urusan}</td>
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
