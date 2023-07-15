"use client";
import { signInWithPopup } from "firebase/auth";
import { auth, googleProvider, usersCollectionRef } from "@/configs/firebase";
import React, { FormEvent, useState } from "react";
import LabledDivider from "../LabledDivider";
import { FcGoogle } from "react-icons/fc";
import { addDoc } from "firebase/firestore";
import { useAuth } from "@/context/authContext";
type Props = {};

function RegisterationModel({}: Props) {
  const authContext = useAuth();
  const [signUpFields, setSignUpFields] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  function fillSignUpFields(e: React.SyntheticEvent) {
    const target = e.target as HTMLInputElement;
    setSignUpFields({ ...signUpFields, [target.id]: target.value });
  }

  async function signUpWithGoogle() {
    try {
      await signInWithPopup(auth, googleProvider);
    } catch (err) {
      console.log(err);
    }
  }

  function signUp(e: FormEvent) {
    e.preventDefault();
  }

  return (
    <section className="w-full h-screen flex flex-col items-center justify-center mx-auto my-auto">
      {/* registeration headings */}
      <div className="mb-6">
        <h1 className="text-[6rem] text-center font-bold">Its happening now</h1>
        <h2 className="text-[4rem] text-center font-semibold">
          Create an account
        </h2>
      </div>
      <div className="flex flex-col items-center justify-center">
        {/* continue with google */}
        <div
          onClick={signUpWithGoogle}
          className="w-full px-4 py-4 mb-8 rounded-[2rem] flex my-4 hover:bg-tweater-blue-dim cursor-pointer items-center gap-4 justify-center border border-gray-300"
        >
          <FcGoogle size={25} />{" "}
          <p className="text-[1.8rem]">Continue with google</p>
        </div>
        <LabledDivider label="OR" />
        {/* singup with email and password */}
        <form
          onSubmit={signUp}
          className="flex flex-col p-8 border rounded-[2rem] my-8 border-tweater-gray-dark shadow-xl items-start min-w-[35rem]"
        >
          <label
            className="my-4 flex flex-col w-full text-[1.8rem] gap-2 text-black"
            htmlFor=""
          >
            Email
            <input
              required={true}
              onChange={fillSignUpFields}
              type="text"
              className="border text-[1.4rem] w-full border-tweater-gray-dark rounded-[2rem] px-4 py-4"
              placeholder="Email"
            />
          </label>
          <label
            className="my-4 flex flex-col w-full text-[1.8rem] gap-2 text-black"
            htmlFor=""
          >
            Password
            <input
              required={true}
              onChange={fillSignUpFields}
              type="password"
              className="border text-[1.4rem] w-full border-tweater-gray-dark rounded-[2rem] px-4 py-4"
              placeholder="* * * * * *"
            />
          </label>
          <label
            className="my-4 flex flex-col w-full text-[1.8rem] gap-2 text-black"
            htmlFor=""
          >
            Confirm Password
            <input
              required={true}
              onChange={fillSignUpFields}
              type="password"
              className="border text-[1.4rem] w-full border-tweater-gray-dark rounded-[2rem] px-4 py-4"
              placeholder="* * * * * *"
            />
          </label>
          <button className="rounded-[2rem] bg-black text-white py-4 w-full font-semibold text-[1.4rem] hover:bg-gray-700">
            Sign Up
          </button>
        </form>
      </div>
    </section>
  );
}

export default RegisterationModel;
