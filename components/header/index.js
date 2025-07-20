"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const checkLogin = () => {
      setIsLoggedIn(localStorage.getItem("isLoggedIn") === "true");
    };

    checkLogin();
    window.addEventListener("storage", checkLogin); // to sync in tabs

    return () => window.removeEventListener("storage", checkLogin);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("isLoggedIn");
    router.push("/login");
  };

  return (
    <header className="flex justify-between items-center px-6 py-4 shadow bg-gray-900">
      <h1
        className="text-xl font-bold text-gray-300 cursor-pointer"
        onClick={() => router.push("/")}
      >
        JSON Formatter
      </h1>

      <div className="space-x-3">
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => router.push("/signup")}
              className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
            >
              Sign Up
            </button>
            <button
              onClick={() => router.push("/login")}
              className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600 transition"
            >
              Login
            </button>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600 transition"
          >
            Logout
          </button>
        )}
      </div>
    </header>
  );
}