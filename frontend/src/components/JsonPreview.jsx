export default function JsonPreview({ method, formData }) {
  const needsBody = ["POST", "PUT", "PATCH"].includes(method);

  const body = needsBody
    ? Object.fromEntries(Object.entries(formData).filter(([_, v]) => v !== ""))
    : null;

  return (
    <div className="border border-[#30363D] rounded-lg p-4 bg-[#161B22]">
      <p className="text-xs font-bold text-[#8B949E] uppercase tracking-widest mb-2">
        Request Body
      </p>
      {needsBody ? (
        <pre className="font-mono text-xs text-[#E6EDF3] leading-relaxed overflow-x-auto">
          {JSON.stringify(body, null, 2) || "{}"}
        </pre>
      ) : (
        <p className="text-xs text-[#8B949E] font-mono italic">
          No body for {method} requests
        </p>
      )}
    </div>
  );
}
