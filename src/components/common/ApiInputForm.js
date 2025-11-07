"use client";

import { useState } from "react";
import { FiPlus, FiTrash2, FiChevronDown, FiChevronRight } from "react-icons/fi";

export default function ApiInputForm({ onSubmit, loading }) {
  const [url, setUrl] = useState("");
  const [method, setMethod] = useState("GET");
  const [body, setBody] = useState("");
  const [headers, setHeaders] = useState([{ key: "", value: "" }]);
  const [showHeaders, setShowHeaders] = useState(false);
  const [showBody, setShowBody] = useState(false);

  const commonHeaders = [
    { name: "Authorization", value: "Bearer " },
    { name: "Content-Type", value: "application/json" },
    { name: "Accept", value: "application/json" },
    { name: "User-Agent", value: "Universal-JSON-Formatter/1.0" },
    { name: "X-API-Key", value: "" },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (url.trim()) {
      const headersObj = {};
      headers.forEach(({ key, value }) => {
        if (key.trim() && value.trim()) {
          headersObj[key.trim()] = value.trim();
        }
      });
      
      onSubmit({ url, method, body, headers: headersObj });
    }
  };

  const addHeader = () => {
    setHeaders([...headers, { key: "", value: "" }]);
  };

  const removeHeader = (index) => {
    if (headers.length > 1) {
      setHeaders(headers.filter((_, i) => i !== index));
    }
  };

  const updateHeader = (index, field, value) => {
    const newHeaders = [...headers];
    newHeaders[index][field] = value;
    setHeaders(newHeaders);
  };

  const addCommonHeader = (headerName, headerValue) => {
    const newHeaders = [...headers];
    const emptyIndex = newHeaders.findIndex(h => !h.key && !h.value);
    
    if (emptyIndex !== -1) {
      newHeaders[emptyIndex] = { key: headerName, value: headerValue };
    } else {
      newHeaders.push({ key: headerName, value: headerValue });
    }
    
    setHeaders(newHeaders);
  };

  const formatJson = () => {
    try {
      const parsed = JSON.parse(body);
      setBody(JSON.stringify(parsed, null, 2));
    } catch (error) {
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col gap-4 mt-[42px] max-w-4xl mx-auto"
    >
      <div className="flex gap-2">
        <select
          className="px-4 py-3 rounded-md backdrop-blur-sm focus:outline-none shadow-lg bg-white/10 text-white border-2 border-transparent hover:border-gray-400/50 min-w-[120px]"
          value={method}
          onChange={(e) => {
            setMethod(e.target.value);
            setShowBody(e.target.value !== "GET");
          }}
        >
          <option value="GET">GET</option>
          <option value="POST">POST</option>
          <option value="PUT">PUT</option>
          <option value="PATCH">PATCH</option>
          <option value="DELETE">DELETE</option>
          <option value="HEAD">HEAD</option>
          <option value="OPTIONS">OPTIONS</option>
        </select>

        <input
          type="url"
          className="flex-1 px-4 py-3 rounded-md backdrop-blur-sm focus:outline-none shadow-lg bg-white/10 text-white border-2 border-transparent hover:border-gray-400/50  placeholder:text-gray-400"
          placeholder="Enter API endpoint (e.g., https://api.example.com/data)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          required
        />
      </div>

      <div className="bg-white/10 rounded-md p-4 border border-gray-400/20 hover:border-gray-400/70">
        <button
          type="button"
          onClick={() => setShowHeaders(!showHeaders)}
          className="flex items-center gap-2 text-white font-semibold mb-3 hover:text-gray-300 transition-colors"
        >
          {showHeaders ? <FiChevronDown /> : <FiChevronRight />}
          Headers ({headers.filter(h => h.key && h.value).length})
        </button>

        {showHeaders && (
          <div className="space-y-3">
            <div className="mb-4">
              <p className="text-gray-400 text-sm mb-2">Quick Add:</p>
              <div className="flex flex-wrap gap-2">
                {commonHeaders.map((header) => (
                  <button
                    key={header.name}
                    type="button"
                    onClick={() => addCommonHeader(header.name, header.value)}
                    className="px-3 py-1 text-xs bg-gray-700 hover:bg-gray-600 text-white rounded-full transition-colors"
                  >
                    {header.name}
                  </button>
                ))}
              </div>
            </div>

            {headers.map((header, index) => (
              <div key={index} className="flex gap-2 items-center">
                <input
                  type="text"
                  placeholder="Header name (e.g., Authorization)"
                  className="flex-1 px-3 py-2 rounded-md bg-white/10 text-white border border-gray-400/30 focus:border-blue-400/50 focus:outline-none placeholder:text-gray-500"
                  value={header.key}
                  onChange={(e) => updateHeader(index, "key", e.target.value)}
                />
                <input
                  type="text"
                  placeholder="Header value (e.g., Bearer token123)"
                  className="flex-1 px-3 py-2 rounded-md bg-white/10 text-white border border-gray-400/30 focus:border-blue-400/50 focus:outline-none placeholder:text-gray-500"
                  value={header.value}
                  onChange={(e) => updateHeader(index, "value", e.target.value)}
                />
                <button
                  type="button"
                  onClick={() => removeHeader(index)}
                  className="p-2 text-red-400 hover:text-red-300 transition-colors"
                  disabled={headers.length === 1}
                >
                  <FiTrash2 />
                </button>
              </div>
            ))}

            <button
              type="button"
              onClick={addHeader}
              className="flex items-center gap-2 px-3 py-2 text-blue-400 hover:text-blue-300 transition-colors"
            >
              <FiPlus /> Add Header
            </button>
          </div>
        )}
      </div>

      {(method !== "GET" && method !== "HEAD") && (
        <div className="bg-white/5 rounded-md p-4 border border-gray-400/20">
          <button
            type="button"
            onClick={() => setShowBody(!showBody)}
            className="flex items-center gap-2 text-white font-semibold mb-3 hover:text-gray-300 transition-colors"
          >
            {showBody ? <FiChevronDown /> : <FiChevronRight />}
            Request Body
          </button>

          {showBody && (
            <div className="space-y-3">
              <div className="flex justify-between items-center">
                <p className="text-gray-400 text-sm">Enter JSON data for the request body:</p>
                <button
                  type="button"
                  onClick={formatJson}
                  className="px-3 py-1 text-xs bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
                >
                  Format JSON
                </button>
              </div>
              <textarea
                rows={8}
                placeholder={`{\n  "key": "value",\n  "array": [1, 2, 3],\n  "nested": {\n    "property": "example"\n  }\n}`}
                className="w-full px-4 py-3 rounded-md bg-white/10 text-white border border-gray-400/30 focus:border-blue-400/50 focus:outline-none font-mono text-sm placeholder:text-gray-500"
                value={body}
                onChange={(e) => setBody(e.target.value)}
              />
            </div>
          )}
        </div>
      )}

\      <button
        type="submit"
        className="w-full h-12 text-lg font-semibold transition-all duration-300
            bg-gradient-to-r from-blue-600 to-blue-800 hover:from-blue-500 hover:to-blue-700
            shadow-lg hover:shadow-xl hover:shadow-blue-500/25
            border-2 border-transparent hover:border-blue-400/50
            text-white relative overflow-hidden rounded-md
            disabled:opacity-50 disabled:cursor-not-allowed"
        disabled={loading}
      >
        {loading ? (
          <div className="flex items-center justify-center gap-2">
            <span className="animate-spin h-4 w-4 rounded-full border-2 border-white border-t-transparent"></span>
            Sending Request...
          </div>
        ) : (
          `Send ${method} Request`
        )}
      </button>
    </form>
  );
}
