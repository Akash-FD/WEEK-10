"use client"

import { useParams,useRouter } from 'next/navigation';
import { useState } from 'react';

export default function ResetPassword() {
  const router = useRouter();
  const {token} = useParams()
  const [password, setPassword] = useState('');
 
  

 

  const handleSubmit = async () => {
    const res = await fetch('http://localhost:8000/reset-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ token, newPassword: password }),
    });

    if (res.ok) {
      alert('Password reset successful!');
      router.push('/login');
    } else {
      alert('Invalid or expired token.');
    }
  };

  return (
    <div>
      <h2>Reset Password</h2>
      <input
        type="password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        placeholder="Enter new password"
      />
      <button onClick={handleSubmit}>Reset Password</button>
    </div>
  );
}