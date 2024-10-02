// LoginPage.js
import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import '../Styles/LoginPage.css'; // Import custom CSS for LoginPage

const LoginPage = () => {
  const [nip, setNip] = useState(''); // Menggunakan nip sebagai input
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    setErrorMessage(''); // Reset pesan kesalahan

    try {
      const response = await fetch('http://116.206.212.234:4000/auth/login', { // Endpoint API
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ nip, password }), // Payload sesuai format yang diperlukan
      });

      if (response.ok) {
        const data = await response.json();
        // Menangani login yang berhasil, misalnya menyimpan token, mengalihkan pengguna
        console.log('Login berhasil:', data);
        localStorage.setItem('token', data.token); // Menyimpan token
        window.location.href = '/'; // Mengalihkan ke halaman utama atau halaman lain
      } else {
        // Menangani respons kesalahan
        const errorData = await response.json();
        console.error('Login gagal:', response.status, errorData.message);
        setErrorMessage('Login gagal: ' + errorData.message); // Tampilkan pesan kesalahan
      }
    } catch (error) {
      console.error('Kesalahan:', error);
      setErrorMessage('Terjadi kesalahan yang tidak terduga.'); // Menangani kesalahan yang tidak terduga
    }
  };

  return (
    <div className="container d-flex justify-content-center align-items-center min-vh-100">
      <div className="login-card p-4 shadow">
        <h2 className="text-center">Login</h2>
        {errorMessage && <p className="text-danger text-center">{errorMessage}</p>} {/* Tampilkan pesan kesalahan */}
        <form onSubmit={handleLogin} className="mt-4">
          <div className="mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="NIP" // Placeholder untuk input NIP
              value={nip} // Menggunakan state nip
              onChange={(e) => setNip(e.target.value)}
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              className="form-control"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn btn-primary w-100">Login</button> {/* Tombol Login */}
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
