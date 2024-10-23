import React, { useEffect, useState } from 'react';
import '../Styles/Dataset.css';

// Main Dataset Component
const Dataset = () => {
  const [datasets, setDatasets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState('');
  const [categories, setCategories] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [selectedDataset, setSelectedDataset] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const datasetsPerPage = 10;

// Modal Component
const DetailModal = ({ dataset, onClose }) => {
  const [detail, setDetail] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDetail = async () => {
      try {
        const response = await fetch(`http://116.206.212.234:4000/dataset/detail/${dataset.id}`);
        const data = await response.json();
        setDetail(data);
      } catch (error) {
        console.error('Error fetching detail:', error);
      } finally {
        setLoading(false);
      }
    };

    if (dataset) {
      fetchDetail();
    }
  }, [dataset]);

  if (!dataset) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={e => e.stopPropagation()}>
        {loading ? (
          <div className="modal-loader">Loading...</div>
        ) : (
          <>
            <button className="modal-close" onClick={onClose}>×</button>
            <h2 className="modal-title">{dataset.uraian_dssd}</h2>
            <div className="modal-body">
              <div className="detail-group">
                <label>OPD</label>
                <p>{dataset.nama_opd}</p>
              </div>
              <div className="detail-group">
                <label>Deskripsi</label>
                <p>{dataset.description}</p>
              </div>
              <div className="detail-group">
                <label>Format Data</label>
                <p>{detail?.format || 'N/A'}</p>
              </div>
              <div className="detail-group">
                <label>Terakhir Diperbarui</label>
                <p>{new Date(dataset.modified).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}</p>
              </div>
              {/* <div className="detail-group">
                <label>Jumlah Views</label>
                <p>{dataset.jumlah} kali</p>
              </div> */}
              {detail?.url && (
                <a 
                  href={detail.url}
                  className="download-btn"
                  target="_blank"
                  rel="noopener noreferrer" 
                  style={{ display: 'block', color: 'blue' }} 
                >
                  Download Dataset
                </a>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};



  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch('http://116.206.212.234:4000/dataset');
        const data = await response.json();
        const formattedCategories = data.reduce((acc, item) => {
          if (!acc.find(cat => cat.name === item.nama_opd)) {
            acc.push({
              name: item.nama_opd,
              count: 1
            });
          } else {
            const index = acc.findIndex(cat => cat.name === item.nama_opd);
            acc[index].count += 1;
          }
          return acc;
        }, []);
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
        const response = await fetch('http://116.206.212.234:4000/dataset');
        const data = await response.json();
        setDatasets(data);
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
    setCurrentPage(1);
  };

  const handleCategoryClick = (categoryName) => {
    setSelectedCategory(selectedCategory === categoryName ? null : categoryName);
    setCurrentPage(1);
  };

  const handleDetailClick = (dataset) => {
    setSelectedDataset(dataset);
    // Increment view count
    fetch(`http://116.206.212.234:4000/dataset/increment-view/${dataset.id}`, {
      method: 'POST'
    }).catch(error => console.error('Error incrementing view:', error));
  };

  const filteredDatasets = datasets.filter(dataset => {
    const matchesSearch = dataset.uraian_dssd.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         dataset.nama_opd.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory ? dataset.nama_opd === selectedCategory : true;
    return matchesSearch && matchesCategory;
  });

  // Pagination
  const indexOfLastDataset = currentPage * datasetsPerPage;
  const indexOfFirstDataset = indexOfLastDataset - datasetsPerPage;
  const currentDatasets = filteredDatasets.slice(indexOfFirstDataset, indexOfLastDataset);
  const totalPages = Math.ceil(filteredDatasets.length / datasetsPerPage);

  if (loading) return (
    <div className="loader-container">
      <div className="loader"></div>
      <p>Memuat data...</p>
    </div>
  );

  return (
    <div className="app-container">
      {/* Sidebar */}
      <div className="sidebar">
        <input
          type="text"
          placeholder="Cari Dataset..."
          value={searchTerm}
          onChange={handleSearch}
        />

        <ul className="category-list">
          {categories.map((category, index) => (
            <li 
              key={index} 
              className={`category-item ${selectedCategory === category.name ? 'active' : ''}`}
              onClick={() => handleCategoryClick(category.name)}
            >
              {category.name}
              <span className="category-count">{category.count} Data</span>
            </li>
          ))}
        </ul>
      </div>

      {/* Dataset List */}
      <div className="dataset-list">
        <div className="dataset-header">
          {filteredDatasets.length} Datasets Berhasil Ditampilkan
        </div>
        
        {currentDatasets.map((dataset, index) => (
          <div key={index} className="dataset-card">
            <div className="dataset-opd">{dataset.nama_opd}</div>
            <div className="dataset-title">{dataset.uraian_dssd}</div>
            <div className="dataset-description">
              {dataset.description}
            </div>
            <div className="dataset-footer">
              <div className="dataset-date">
                {new Date(dataset.modified).toLocaleDateString('id-ID', {
                  year: 'numeric',
                  month: 'long',
                  day: 'numeric'
                })}
              </div>
              <div className="dataset-viewed">Telah dilihat {dataset.jumlah} kali</div>
              <button 
                className="dataset-detail-btn"
                onClick={() => handleDetailClick(dataset)}
              >
                Lihat Detail →
              </button>
            </div>
          </div>
        ))}

        {/* Pagination */}
        {totalPages > 1 && (
          <div className="pagination">
            <button 
              className="pagination-btn"
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(prev => prev - 1)}
            >
              ←
            </button>
            <span className="pagination-info">
              Halaman {currentPage} dari {totalPages}
            </span>
            <button 
              className="pagination-btn"
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(prev => prev + 1)}
            >
              →
            </button>
          </div>
        )}
      </div>

      {/* Detail Modal */}
      {selectedDataset && (
        <DetailModal 
          dataset={selectedDataset} 
          onClose={() => setSelectedDataset(null)}
        />
      )}
    </div>
  );
};

export default Dataset;