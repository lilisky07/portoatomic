import React, { useState } from 'react';
import Button from '../atoms/Button.js';
import Text from '../atoms/Text.js';
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

const RegisterPage = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleRegister = async () => {
    if (password !== confirmPassword) {
      alert('Password dan Konfirmasi Password tidak cocok!');
      return;
    }

    const url = 'http://116.206.212.234:4000/api/register'; // Sesuaikan dengan endpoint register Anda

    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (response.ok) {
        alert('Registrasi berhasil! Silakan login.');
      } else {
        alert('Registrasi gagal! Coba lagi.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Terjadi kesalahan saat mencoba registrasi.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="text-center">
        <Text content="Create a New Account" size="24px" />
      </div>
      <form className="mt-4" onSubmit={(e) => { e.preventDefault(); handleRegister(); }}>
        <div className="mb-3">
          <input
            type="text"
            className="form-control"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
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
        <div className="mb-3">
          <input
            type="password"
            className="form-control"
            placeholder="Confirm Password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        <Button label="Register" onClick={handleRegister} />
      </form>
    </div>
  );
};

export default RegisterPage;
