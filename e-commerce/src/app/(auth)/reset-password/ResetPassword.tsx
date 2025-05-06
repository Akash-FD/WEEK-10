"use client";

import { resetPassword } from "@/lib/auth";
import { ResetPasswordTpyes } from "@/type";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useState } from "react";

export default function ResetPassword() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");
  console.log(token);

  const router = useRouter();
  const [password, setPassword] = useState("");
  const [Cpassword, setCpassword] = useState("");

  const passwordObj: ResetPasswordTpyes = {
    newPassword: password,
    confirmPassword: Cpassword,
  };
  console.log(passwordObj);

  useEffect(() => {
    if (token) {
      localStorage.setItem("token", token);
    }
  }, []);

  const handleSubmit = async () => {
    if (password !== Cpassword) {
      alert("Password and confirm password must be same");
      return;
    }
    const res = await resetPassword(passwordObj);

    if (res.status === 201) {
      alert("Password reset successful!");
      router.push("/login");
    } else {
      alert("Invalid or expired token.");
    }
  };

  return (
    <div className="bg-gradient-to-t from-white py-14 pb-48">
      <div className=" w-[430px] max-sm:w-[300px] max-sm:pt-3 m-auto px-8 my-10 bg-white py-6 shadow-lg shadow-neutral-500 rounded-xl">
        <h2 className="text-3xl py-5 text-blue-500">Set New Password</h2>
        <form action="" onSubmit={handleSubmit} className="flex flex-col gap-6">
          <input
            type="password"
            placeholder="Enter New Password"
            className="py-2 px-2 border border-gray-400 rounded"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Enter your password"
            className="py-2 px-2 border border-gray-400 rounded"
            value={Cpassword}
            onChange={(e) => setCpassword(e.target.value)}
          />
          <button className="bg-blue-600 text-white px-5 py-2 my-2 rounded-lg w-full m-auto hover:bg-blue-800">
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
