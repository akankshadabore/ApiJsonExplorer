"use client";
export default function JsonViewer({ jsonData, loading }) {
  return (
    <div className="mt-4 backdrop-blur-xl border-0 shadow-2xl bg-white/10 rounded-md p-6 text-sm overflow-auto font-mono max-h-[400px] min-h-[200px]">
      {loading ? (
        <div className="flex flex-col  gap-3">
          {/* Spinner and text */}
          <div className="text-white text-center animate-pulse flex items-center gap-2">
            <span className="animate-spin h-4 w-4 rounded-full border-2 border-white border-t-transparent"></span>
            Generating json formatter..
          </div>
          {/* Shimmer lines (skeleton UI) */}
          <div className="mt-4 space-y-2">
            {[60, 40, 50, 80, 35, 70, 90].map((w, i) => (
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
      ) : jsonData ?(
        <RenderJson data={jsonData} />
      ): null}
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
          ) :( <span className="text-[#cc8f77]">{JSON.stringify(value)}</span>  )}
        </div>
      ))}
      <div style={{ marginLeft: indent }}>
        <span className="text-gray-200">{isArray ? "]":"}"}</span>
      </div>
    </div>
  );
}




