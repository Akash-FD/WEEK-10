"use client"

import { ResetPasswordTpyes } from '@/type';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function ResetPassword() {

const searchParams = useSearchParams()
const token = searchParams.get('token')
console.log(token);

  
  const router = useRouter()
  const [password, setPassword] = useState('');
  const [Cpassword, setCpassword] = useState('');

  const passwordObj:any = {
    password:password,
    confirmpassword:Cpassword,
  }
  console.log(passwordObj);
  
useEffect(() => {
    if (token) { 
        localStorage.setItem("token",token)
    }
}, [])

  const handleSubmit = async () => {
    if(password !== Cpassword){
      alert("Password and confirm password must be same")
      return;
    }
 
    // const res = await ResetPassword(passwordObj)
      

    // if (res.ok) {
    //   alert('Password reset successful!');
    //   router.push('/login');
    // } else {
    //   alert('Invalid or expired token.');
    // }
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
       <input
        type="password"
        value={Cpassword}
        onChange={(e) => setCpassword(e.target.value)}
        placeholder="Enter new password"
      />
      <button onClick={handleSubmit}>Reset Password</button>
    </div>
  );
}