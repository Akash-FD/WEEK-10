"use client";

import { EmailVerify } from "@/lib/auth";
import { emailObjType } from "@/type";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function VerifyEmail() {

  const [email, setEmail] = useState<string>('');

  const router = useRouter();

 
  const handleSubmit = async () => {
    const emailObj: emailObjType = {
        email: email,
      }
    try {
      const res = await EmailVerify(emailObj);
      alert("email verify")
      router.push("/setnewpassword")
      
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="bg-gradient-to-t from-white py-14 pb-48">
      <div className=" w-[430px] max-sm:w-[300px] max-sm:pt-3 m-auto px-8 my-10 bg-white py-6 shadow-lg shadow-neutral-500 rounded-xl">
        <h2 className="text-3xl py-5 text-blue-500 text-center">
          Verify Your Email
        </h2>
        <form action="" className="flex flex-col gap-6">
          <input
            type="email"
            name="password"
            placeholder="Enter your email"
            value={email}
            className="py-2 px-2 border border-gray-400 rounded"
            onChange={(e) => setEmail(e.target.value)}
          />
          <button
            className="bg-blue-600 text-white px-5 py-2 my-2 rounded-lg w-full m-auto hover:bg-blue-800"
            onClick={handleSubmit}
          >
            Next
          </button>
        </form>
      </div>
    </div>
  );
}
