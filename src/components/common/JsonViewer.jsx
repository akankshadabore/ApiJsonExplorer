"use client";

import { useState } from "react";
import { FiCopy, FiEye, FiEyeOff } from "react-icons/fi";

export default function JsonViewer({ jsonData, loading }) {
  const [copyStatus, setCopyStatus] = useState("");
  const [expandedPaths, setExpandedPaths] = useState(new Set());
  const [viewMode, setViewMode] = useState("formatted"); 

  const copyToClipboard = async () => {
    try {
      const textToCopy =
        typeof jsonData === "string"
          ? jsonData
          : JSON.stringify(jsonData, null, 2);
      await navigator.clipboard.writeText(textToCopy);
      setCopyStatus("Copied!");
      setTimeout(() => setCopyStatus(""), 2000);
    } catch (err) {
      setCopyStatus("Failed to copy");
      setTimeout(() => setCopyStatus(""), 2000);
    }
  };

  const togglePath = (path) => {
    const newExpanded = new Set(expandedPaths);
    if (newExpanded.has(path)) {
      newExpanded.delete(path);
    } else {
      newExpanded.add(path);
    }
    setExpandedPaths(newExpanded);
  };

  return (
    <div className="mt-6 backdrop-blur-xl border border-gray-400/20 shadow-2xl bg-white/10 rounded-md overflow-hidden">
      <div className="flex items-center justify-between p-4 bg-white/5 border-b border-gray-400/20">
        <h3 className="text-white font-semibold">Response</h3>
        {jsonData && (
          <div className="flex items-center gap-2">
            <button
              onClick={() =>
                setViewMode(viewMode === "formatted" ? "raw" : "formatted")
              }
              className="flex items-center gap-1 px-3 py-1 text-sm bg-gray-700 hover:bg-gray-600 text-white rounded transition-colors"
            >
              {viewMode === "formatted" ? <FiEyeOff /> : <FiEye />}
              {viewMode === "formatted" ? "Raw" : "Formatted"}
            </button>
            <button
              onClick={copyToClipboard}
              className="flex items-center gap-1 px-3 py-1 text-sm bg-blue-600 hover:bg-blue-500 text-white rounded transition-colors"
            >
              <FiCopy />
              {copyStatus || "Copy"}
            </button>
          </div>
        )}
      </div>

      <div className="p-6 text-sm overflow-auto font-mono max-h-[500px] min-h-[200px]">
        {loading ? (
          <div className="flex flex-col gap-3">
            <div className="text-white text-center animate-pulse flex items-center justify-center gap-2">
              <span className="animate-spin h-4 w-4 rounded-full border-2 border-white border-t-transparent"></span>
              Fetching data...
            </div>
            <div className="mt-4 space-y-2">
              {[60, 40, 50, 80, 35, 70, 90, 45, 65].map((w, i) => (
                <div key={i} className="flex items-center space-x-2">
                  <div className="h-3 w-3 rounded-full bg-white/20" />
                  <div
                    className="h-3 rounded-md bg-white/20 animate-pulse"
                    style={{ width: `${w}%` }}
                  />
                </div>
              ))}
            </div>
          </div>
        ) : jsonData ? (
          viewMode === "raw" ? (
            <pre className="text-gray-300 whitespace-pre-wrap">
              {typeof jsonData === "string"
                ? jsonData
                : JSON.stringify(jsonData, null, 2)}
            </pre>
          ) : (
            <RenderJson
              data={jsonData}
              expandedPaths={expandedPaths}
              onTogglePath={togglePath}
              path=""
            />
          )
        ) : (
          <div className="text-gray-400 text-center py-8">
            No data to display. Send a request to see the response here.
          </div>
        )}
      </div>
    </div>
  );
}

function RenderJson({ data, indent = 0, expandedPaths, onTogglePath, path = "" }) {
  if (data === null) {
    return <span className="text-[#cc8f77]">null</span>;
  }

  if (typeof data === "boolean") {
    return <span className="text-blue-300">{data.toString()}</span>;
  }

  if (typeof data === "number") {
    return <span className="text-[#cc8f77]">{data}</span>;
  }

  if (typeof data === "string") {
    return <span className="text-[#cc8f77]">"{data}"</span>;
  }

  if (typeof data !== "object") {
    return <span className="text-[#cc8f77]">{JSON.stringify(data)}</span>;
  }

  const isArray = Array.isArray(data);
  const entries = Object.entries(data);
  const isExpanded = expandedPaths.has(path);
  const hasChildren = entries.length > 0;

  if (!hasChildren) {
    return <span className="text-gray-200">{isArray ? "[]" : "{}"}</span>;
  }

  return (
    <div>
      <span
        className={`text-gray-200 ${hasChildren ? "cursor-pointer hover:text-white" : ""}`}
        onClick={() => hasChildren && onTogglePath(path)}
      >
        {isArray ? "[" : "{"}
        {!isExpanded && (
          <span className="text-gray-200 ml-1">
            {entries.length} {isArray ? "items" : "keys"}...
          </span>
        )}
      </span>

      {isExpanded &&
        entries.map(([key, value], index) => (
          <div
            key={index}
            style={{ marginLeft: `${indent + 20}px` }}
            className="flex flex-wrap"
          >
            {!isArray && (
              <>
                <span className="text-[#9CDCFE]">"{key}"</span>
                <span className="text-gray-200">: </span>
              </>
            )}
            {typeof value === "object" && value !== null ? (
              <RenderJson
                data={value}
                indent={indent + 20}
                expandedPaths={expandedPaths}
                onTogglePath={onTogglePath}
                path={`${path}.${key}`}
              />
            ) : (
              <RenderJson
                data={value}
                expandedPaths={expandedPaths}
                onTogglePath={onTogglePath}
                path={`${path}.${key}`}
              />
            )}
            {index < entries.length - 1 && (
              <span className="text-gray-200">,</span>
            )}
          </div>
        ))}

      {isExpanded && (
        <div style={{ marginLeft: `${indent}px` }}>
          <span className="text-gray-200">{isArray ? "]" : "}"}</span>
        </div>
      )}
    </div>
  );
}



