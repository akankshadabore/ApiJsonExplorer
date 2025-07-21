"use client";

export default function JsonViewer({ jsonData }) {
  if (!jsonData) return null;

  return (
    <div className="mt-4 backdrop-blur-xl border-0 shadow-2xl bg-white/10 rounded-md p-4 text-sm overflow-auto font-mono max-h-[400px]">
      <RenderJson data={jsonData} />
    </div>
  );
}

function RenderJson({ data, indent = 0 }) {
  if (data === null) {
    return <span className="text-[#cc8f77]">null</span>;
  }

  if (typeof data !== "object") {
    return <span className="text-[#cc8f77]">{JSON.stringify(data)}</span>;
  }

  const isArray = Array.isArray(data);
  const entries = Object.entries(data);
  const pad = (spaces) => "\u00A0".repeat(spaces); // non-breaking space

  return (
    <div>
      <span className="text-gray-200">{isArray ? "[" : "{"}</span>
      {entries.map(([key, value], index) => (
        <div key={index} style={{ marginLeft: indent }} className="flex flex-wrap">
          {!isArray && (
            <>
              <span className="text-[#9CDCFE]">"{key}"</span>
              <span className="text-gray-200">: </span>
            </>
          )}

          {typeof value === "object" && value !== null ? (
            <RenderJson data={value} indent={indent + 20} />
          ) : (
            <span className="text-[#cc8f77]">{JSON.stringify(value)}</span>
          )}

          {index < entries.length - 1 && <span className="text-gray-200">,</span>}
        </div>
      ))}
      <div style={{ marginLeft: indent }}>
        <span className="text-gray-200">{isArray ? "]" : "}"}</span>
      </div>
    </div>
  );
}









