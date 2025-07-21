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
  if (data === null) return <div style={{ marginLeft: indent }}>null</div>;

  if (typeof data !== "object") {
    return (
      <div style={{ marginLeft: indent }}>
        <span className="text-[#cc8f77]">{JSON.stringify(data)}</span>
      </div>
    );
  }

  const isArray = Array.isArray(data);
  const entries = Object.entries(data);

  return (
    <div style={{ marginLeft: indent }}>
      <span className="text-gray-200">{isArray ? "[" : "{"}</span>
      {entries.map(([key, value], index) => (
        <div key={index} className="ml-4">
          {!isArray && (
            <span className="text-[#9CDCFE]">"{key}"</span>
          )}
          {!isArray && <span className="text-gray-200">: </span>}
          <RenderJson data={value} indent={indent + 20} />
          {index < entries.length - 1 ? <span className="text-gray-200">,</span> : null}
        </div>
      ))}
      <div>
        <span className="text-gray-200">{isArray ? "]" : "}"}</span>
      </div>
    </div>
  );
}