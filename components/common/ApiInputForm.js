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
      className="flex flex-col gap-4 mb-8 max-w-3xl mx-auto"
    >
      <input
        type="url"
        className="w-full px-4 py-3 border border-gray-300 focus:border-0 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
        placeholder="Enter API endpoint (e.g., https://api.example.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        required
      />

      <select
        className="px-4 py-3 border border-gray-300 focus:outline-none focus:border-0 rounded-md w-full focus:ring-2 focus:ring-blue-400"
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
          className="w-full px-4 py-3 border border-gray-300 rounded-md font-mono focus:ring-2 focus:ring-blue-400"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        />
      )}

      <button
        type="submit"
        className="bg-blue-600 text-white font-semibold py-3 rounded-md hover:bg-blue-700 transition disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Fetching..." : `${method} Request`}
      </button>
    </form>
  );
}