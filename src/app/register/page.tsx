"use client";

import React, { useState } from "react";
import { useMutation } from "convex/react";
import { api } from "../../../convex/_generated/api";


const Page = () => {
  const [account, setAccount] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const registerMutation = useMutation(api.user.register);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAccount({ ...account, [e.target.name]: e.target.value });
  };

  const register = async (e: React.FormEvent) => {
    e.preventDefault();

    if (account.password !== account.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    await registerMutation({
        name: account.name,
        email: account.email,
        passwordHash: account.password,
    });

    alert("Registration successful!");
    setAccount({ name: "", email: "", password: "", confirmPassword: "" });
    
  };

  return (
    <section className="bg-gray-50 dark:bg-gray-900">
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
        <div className="w-full bg-white rounded-lg shadow dark:border sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 sm:p-8">
            <h1 className="text-xl font-bold tracking-tight text-gray-900 dark:text-white">
              Create an account
            </h1>
            <form className="space-y-4" onSubmit={register}>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Name
                </label>
                <input
                  type="text"
                  name="name"
                  value={account.name}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  value={account.email}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  value={account.password}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-900 dark:text-white">
                  Confirm Password
                </label>
                <input
                  type="password"
                  name="confirmPassword"
                  value={account.confirmPassword}
                  onChange={handleChange}
                  className="w-full p-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>
              <button
                type="submit"
                className="w-full text-white bg-blue-600 hover:bg-blue-700 font-medium rounded-lg px-5 py-2.5"
              >
                Create an account
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Page;
