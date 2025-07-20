"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import ApiInputForm from "@/components/common/ApiInputForm";
import JsonViewer from "@/components/common/JsonViewer";

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
      <h1 className="text-4xl md:text-5xl font-extrabold text-center mb-8 tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 to-blue-500">
       <span className="text-white"> 🌐 </span> Universal JSON Formatter
      </h1>

      <ApiInputForm onSubmit={handleFetchJson} loading={loading} />

      {error && (
        <div className="mt-6 p-4 text-red-500 text-center bg-red-50 border border-red-300 rounded-md">
          Error: {error}
        </div>
      )}

      <JsonViewer jsonData={jsonData} />
    </div>
  );
}
