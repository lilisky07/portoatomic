import React, { useEffect, useState } from 'react';
import '../Styles/Dataset.css';

const Dataset = () => {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]); // Ubah jadi dinamis

  useEffect(() => {
    // Fetch data dari API sektoral untuk OPD
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://116.206.212.234:4000/list-opd'); // Ganti dengan URL API sektoral yang sesuai
        const data = await response.json();
        
        // Strukturkan ulang data jika perlu sesuai format categories
        const formattedCategories = data.map(item => ({
          name: item.nama_opd,
          count: item.count // Asumsi ada `count` dalam data, sesuaikan jika perlu
        }));

        setCategories(formattedCategories);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    };

    fetchCategories();
  }, []);

  useEffect(() => {
    const fetchDatasets = async () => {
      try {
        const datasetIds = [1,2 ,3 ,4 ,5,6]; // ID dataset yang ingin diambil
        const datasetPromises = datasetIds.map(id =>
          fetch(`http://116.206.212.234:4000/dataset/detail/${id}`).then(response => response.json())
        );
        const datasets = await Promise.all(datasetPromises);
        setDatasets(datasets); // Menyimpan semua dataset dalam array
      } catch (error) {
        console.error('Error fetching datasets:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchDatasets();
  }, []);

  const handleSearch = (e) => {
    setSearchTerm(e.target.value);
  };

  if (loading) return <div className="loader">Loading...</div>;

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <input
          type="text"
          placeholder="Cari Kategori..."
          value={searchTerm}
          onChange={handleSearch}
        />
        <button className="search-button">Cari</button>

        <ul className="category-list">
          {categories.map((category, index) => (
            <li key={index}>
              {category.name}
              <span className="category-count">{category.count} Data</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Dataset List in Table Format */}
      <div className="dataset-table-container">
        <table className="dataset-table">
          <thead>
            <tr>
              <th>Nama OPD</th>
              <th>Uraian DSSD</th>
              <th>Satuan</th>
              <th>Dimensi</th>
              <th>Jenis</th>
              <th>Kategori</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {datasets
              .filter((dataset) =>
                dataset.nama_opd.toLowerCase().includes(searchTerm.toLowerCase())
              )
              .map((dataset, index) => (
                <tr key={index}>
                  <td>{dataset.nama_opd}</td>
                  <td>{dataset.uraian_dssd}</td>
                  <td>{dataset.satuan}</td>
                  <td>{dataset.dimensi}</td>
                  <td>{dataset.jenis_string}</td>
                  <td>{dataset.kategori_string}</td>
                  <td>
                    <a href={dataset.download_url} target="_blank" rel="noopener noreferrer">
                      Lihat Detail
                    </a>
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Dataset;
