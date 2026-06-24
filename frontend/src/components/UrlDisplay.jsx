const ID_ENDPOINTS = new Set(["GET_ID", "PUT", "PATCH", "DELETE"]);

export default function UrlDisplay({ selectedEndpoint, userId, base_url }) {
  const needsId = ID_ENDPOINTS.has(selectedEndpoint);

  return (
    <div className="border border-[#30363D] rounded-lg p-4 bg-[#161B22]">
      <p className="text-xs font-bold text-[#8B949E] uppercase tracking-widest mb-2">
        Request URL
      </p>
      <p className="font-mono text-sm break-all">
        <span className="text-[#E6EDF3]">{base_url}/users</span>
        {needsId && (
          <span style={{ color: userId ? "#E6EDF3" : "#8B949E" }}>
            /{userId || "{id}"}
          </span>
        )}
      </p>
    </div>
  );
}
