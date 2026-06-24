const ENDPOINTS = [
  {
    key: "GET_ALL",
    method: "GET",
    path: "/users",
    hasId: false,
    hasBody: false,
  },
  {
    key: "GET_ID",
    method: "GET",
    path: "/users/{id}",
    hasId: true,
    hasBody: false,
  },
  { key: "POST", method: "POST", path: "/users", hasId: false, hasBody: true },
  {
    key: "PUT",
    method: "PUT",
    path: "/users/{id}",
    hasId: true,
    hasBody: true,
  },
  {
    key: "PATCH",
    method: "PATCH",
    path: "/users/{id}",
    hasId: true,
    hasBody: true,
  },
  {
    key: "DELETE",
    method: "DELETE",
    path: "/users/{id}",
    hasId: true,
    hasBody: false,
  },
];

const METHOD_COLOR = {
  GET: "#58A6FF",
  POST: "#3FB950",
  PUT: "#D29922",
  PATCH: "#BC8CFF",
  DELETE: "#F85149",
};

const FIELDS = [
  { key: "name", label: "name", type: "text", placeholder: "e.g. Alice" },
  { key: "age", label: "age", type: "number", placeholder: "e.g. 25" },
  {
    key: "address",
    label: "address",
    type: "text",
    placeholder: "e.g. 123 Main St",
  },
  { key: "hobby", label: "hobby", type: "text", placeholder: "e.g. Reading" },
  { key: "course", label: "course", type: "text", placeholder: "e.g. CS101" },
];

export default function InputPanel({
  selectedEndpoint,
  onEndpointChange,
  userId,
  setUserId,
  formData,
  setFormData,
  onSend,
  onClear,
  loading,
}) {
  const endpoint = ENDPOINTS.find((e) => e.key === selectedEndpoint);
  const color = METHOD_COLOR[endpoint.method];

  const inputClass =
    "w-full bg-[#0D1117] border border-[#30363D] rounded px-3 py-2 text-sm text-[#E6EDF3] font-mono placeholder:text-[#30363D] focus:outline-none focus:border-[#8B949E]";

  return (
    <div className="border border-[#30363D] rounded-lg p-4 bg-[#161B22] flex flex-col gap-4">
      {/* Endpoint selector */}
      <div>
        <p className="text-xs font-bold text-[#8B949E] uppercase tracking-widest mb-2">
          Endpoint
        </p>
        <div className="space-y-0.5">
          {ENDPOINTS.map((ep) => {
            const c = METHOD_COLOR[ep.method];
            const active = selectedEndpoint === ep.key;
            return (
              <button
                key={ep.key}
                onClick={() => onEndpointChange(ep.key)}
                className="w-full text-left px-3 py-2 rounded text-sm font-mono flex items-center gap-2
  transition-colors hover:bg-white/5"
                style={active ? { backgroundColor: `${c}15` } : {}}
              >
                <span
                  className="font-bold w-16 shrink-0 text-xs"
                  style={{ color: c }}
                >
                  {ep.method}
                </span>
                <span style={{ color: active ? "#E6EDF3" : "#8B949E" }}>
                  {ep.path}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Fields */}
      <div className="flex flex-col gap-2 flex-1">
        {endpoint.hasId && (
          <div>
            <label className="text-xs text-[#8B949E] font-mono mb-1 block">
              user_id <span style={{ color }}>*</span>
            </label>
            <input
              type="number"
              value={userId}
              onChange={(e) => setUserId(e.target.value)}
              placeholder="e.g. 1"
              className={inputClass}
            />
          </div>
        )}

        {endpoint.hasBody &&
          FIELDS.map((field) => (
            <div key={field.key}>
              <label className="text-xs text-[#8B949E] font-mono mb-1 block">
                {field.label}{" "}
                {selectedEndpoint === "PATCH" ? (
                  <span className="text-[#8B949E]">(optional)</span>
                ) : (
                  <span style={{ color }}>*</span>
                )}
              </label>
              <input
                type={field.type}
                value={formData[field.key]}
                onChange={(e) =>
                  setFormData((prev) => ({
                    ...prev,
                    [field.key]: e.target.value,
                  }))
                }
                placeholder={field.placeholder}
                className={inputClass}
              />
            </div>
          ))}

        {!endpoint.hasId && !endpoint.hasBody && (
          <p className="text-xs text-[#8B949E] font-mono italic">
            No parameters required
          </p>
        )}
      </div>

      {/* Buttons */}
      <div className="flex gap-2">
        <button
          onClick={onClear}
          className="px-4 py-2 rounded font-bold text-sm font-mono border border-[#30363D] text-[#8B949E] hover:text-[#E6EDF3] hover:border-[#8B949E] transition-colors cursor-pointer"
        >
          Clear
        </button>
        <button
          onClick={onSend}
          disabled={loading}
          className="flex-1 py-2 rounded font-bold text-sm font-mono transition-opacity disabled:opacity-50 cursor-pointer"
          style={{ backgroundColor: color, color: "#0D1117" }}
        >
          {loading ? "Sending..." : `Send ${endpoint.method} ${endpoint.path}`}
        </button>
      </div>
    </div>
  );
}
