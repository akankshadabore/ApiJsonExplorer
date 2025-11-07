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
  const [responseInfo, setResponseInfo] = useState(null);
  const router = useRouter();


  const handleFetchJson = async ({ url, method, body, headers }) => {
    setLoading(true);
    setError("");
    setResponseInfo(null);
    
    const startTime = Date.now();
    
    try {
      const parsedHeaders = {
        "Content-Type": "application/json",
        ...headers
      };

      const options = {
        method,
        headers: parsedHeaders,
      };

      if (method !== "GET" && body.trim()) {
        try {
          const parsedBody = JSON.parse(body);
          options.body = JSON.stringify(parsedBody);
        } catch (jsonError) {
          throw new Error(`Invalid JSON in request body: ${jsonError.message}`);
        }
      }

      const res = await fetch(url, options);
      const endTime = Date.now();
      const responseTime = endTime - startTime;

      const contentType = res.headers.get("content-type");
      const contentLength = res.headers.get("content-length");
      
      setResponseInfo({
        status: res.status,
        statusText: res.statusText,
        responseTime,
        contentType,
        contentLength,
        headers: Object.fromEntries(res.headers.entries())
      });

      if (!res.ok) {
        throw new Error(`HTTP ${res.status}: ${res.statusText}`);
      }

      let data;
      if (contentType && contentType.includes("application/json")) {
        data = await res.json();
      } else {
        data = await res.text();
      }

      setJsonData(data);
    } catch (err) {
      setError(err.message);
      setJsonData(null);
      setResponseInfo(null);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-6xl p-6 mt-6 mx-auto">
      <h1 className="flex items-center justify-center gap-3 text-4xl md:text-5xl font-extrabold text-center mt-2 tracking-tight bg-clip-text text-white">
        <span className="p-3 rounded-xl bg-gradient-to-br from-gray-800 to-gray-900 shadow-lg">
          <FiZap className="text-white text-2xl" />
        </span>{" "}
        Universal JSON Formatter
      </h1>
      <p className="text-gray-400 text-center mt-2">
        Professional API testing and JSON formatting tool with headers support
      </p>

      <ApiInputForm onSubmit={handleFetchJson} loading={loading} />

      {error && (
        <div className="mt-6 p-4 text-red-500 text-center bg-red-900/20 border border-red-500/30 rounded-md backdrop-blur-sm">
          <strong>Error:</strong> {error}
        </div>
      )}

      {responseInfo && (
        <div className="mt-6 p-4 bg-white/10 backdrop-blur-sm border border-gray-400/30 rounded-md">
          <h3 className="text-white font-semibold mb-2">Response Info</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <span className="text-gray-400">Status:</span>
              <span className={`ml-2 font-semibold ${
                responseInfo.status >= 200 && responseInfo.status < 300 
                  ? 'text-green-400' 
                  : responseInfo.status >= 400 
                    ? 'text-red-400' 
                    : 'text-yellow-400'
              }`}>
                {responseInfo.status} {responseInfo.statusText}
              </span>
            </div>
            <div>
              <span className="text-gray-400">Time:</span>
              <span className="text-white ml-2">{responseInfo.responseTime}ms</span>
            </div>
            <div>
              <span className="text-gray-400">Type:</span>
              <span className="text-white ml-2">{responseInfo.contentType || 'Unknown'}</span>
            </div>
            <div>
              <span className="text-gray-400">Size:</span>
              <span className="text-white ml-2">{responseInfo.contentLength || 'Unknown'}</span>
            </div>
          </div>
        </div>
      )}

      <JsonViewer jsonData={jsonData} loading={loading} />
    </div>
  );
}
