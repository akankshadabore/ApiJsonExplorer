"use client";

export default function JsonViewer({ jsonData }) {
  if (!jsonData) return null;

  return (
    <div className="mt-4 bg-gray-900 rounded-md p-4 text-sm overflow-auto font-mono max-h-[400px] border border-gray-300">
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
      <span>{isArray ? "[" : "{"}</span>
      {entries.map(([key, value], index) => (
        <div key={index} className="ml-4">
          {!isArray && (
            <span className="text-[#9CDCFE]">"{key}"</span>
          )}
          {!isArray && <span>: </span>}
          <RenderJson data={value} indent={indent + 20} />
          {index < entries.length - 1 ? <span>,</span> : null}
        </div>
      ))}
      <div>
        <span>{isArray ? "]" : "}"}</span>
      </div>
    </div>
  );
}