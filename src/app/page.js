"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ApiInputForm from "@/components/common/ApiInputForm";
import JsonViewer from "@/components/common/JsonViewer";
import { FiZap } from "react-icons/fi";

export default function HomePage() {
  const [jsonData, setJsonData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();

  useEffect(() => {
    const isLoggedIn = localStorage.getItem("isLoggedIn");
    if (isLoggedIn !== "true") router.push("/login");
  }, []);

  const handleFetchJson = async ({ url, method, body }) => {
    setLoading(true);
    setError("");
    try {
      const options = {
        method,
        headers: { "Content-Type": "application/json" },
      };
      if (method !== "GET" && body) {
        options.body = JSON.stringify(JSON.parse(body));
      }

      const res = await fetch(url, options);
      const contentType = res.headers.get("content-type");
      if (!res.ok) throw new Error(`Error: ${res.status}`);
      const data = contentType.includes("application/json")
        ? await res.json()
        : await res.text();

      setJsonData(data);
    } catch (err) {
      setError(err.message);
      setJsonData(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl p-6 mt-6 mx-auto">
      <h1 className="flex items-center justify-center gap-3 text-4xl md:text-5xl font-extrabold text-center mt-2 tracking-tight bg-clip-text text-gray-100">
        <span className="p-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg mt-1">
          <FiZap className="text-white text-2xl" />
        </span>{" "}
        Universal JSON Formatter
      </h1>
      <p className="text-gray-400 text-center mt-2 text-lg">
        Professional API testing and JSON formatting tool
      </p>

      <ApiInputForm onSubmit={handleFetchJson} loading={loading} />

      {error && (
        <div className="mt-6 p-4 text-red-500 text-center bg-red-50 border border-red-300 rounded-md">
          Error: {error}
        </div>
      )}

      <JsonViewer jsonData={jsonData} loading={loading} />
    </div>
  );
}





