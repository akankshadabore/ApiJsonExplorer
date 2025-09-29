"use client";

import { useState } from "react";

export default function ApiInputForm({ onSubmit, loading }) {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      onSubmit({ url, method, body });
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mt-[42px] max-w-3xl mx-auto"
    >
      <input
        type="url"
        className="w-full px-4 py-3 rounded-md backdrop-blur-sm focus:outline-none shadow-lg bg-white/10 text-white border-2 border-transparent hover:border-gray-400/50 placeholder:text-gray-400"
        placeholder="Enter API endpoint (e.g., https://api.example.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />

      <select
        className="w-full px-4 py-3 rounded-md backdrop-blur-sm focus:outline-none shadow-lg bg-white/10 text-white border-2 border-transparent hover:border-gray-400/50"
        value={method}
        onChange={(e) => setMethod(e.target.value)}
      >
        <option value="GET">GET</option>
        <option value="POST">POST</option>
        <option value="PUT">PUT</option>
        <option value="PATCH">PATCH</option>
        <option value="DELETE">DELETE</option>
      </select>

      {method !== "GET" && (
        <textarea
          rows={4}
          placeholder="Enter JSON body..."
          className="w-full px-4 py-3 border border-gray-300 rounded-md font-mono focus:ring-2 focus:ring-blue-400 text-gray-400"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      )}

      <button
        type="submit"
        className="w-full h-12 text-lg font-semibold transition-all duration-300
            bg-gradient-to-r from-gray-700 to-gray-900 hover:from-gray-600 hover:to-gray-800
            shadow-lg hover:shadow-xl hover:shadow-gray-500/25
            border-2 border-transparent hover:border-gray-400/50
            text-white relative overflow-hidden"
        disabled={loading}
      >
        {loading ? "Fetching..." : `${method} Request`}
      </button>
    </form>
  );
}



