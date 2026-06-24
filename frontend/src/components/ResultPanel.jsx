const STATUS_COLORS = {
  200: "#3FB950",
  201: "#58A6FF",
  400: "#D29922",
  403: "#F85149",
  404: "#D29922",
  409: "#BC8CFF",
  422: "#BC8CFF",
  500: "#F85149",
  0: "#F85149",
};

const USER_FIELDS = ["id", "name", "age", "address", "hobby", "course"];

function statusColor(code) {
  return STATUS_COLORS[code] ?? "#8B949E";
}

export default function ResultPanel({
  response,
  statusCode,
  loading,
  responseTime,
}) {
  const isSuccess = statusCode >= 200 && statusCode < 300;
  const isArray = isSuccess && Array.isArray(response);
  const isUser = isSuccess && !Array.isArray(response) && response?.id != null;

  return (
    <div className="border border-[#30363D] rounded-lg p-4 bg-[#161B22]">
      <div className="flex items-center justify-between mb-3">
        <p className="text-xs font-bold text-[#8B949E] uppercase tracking-widest">
          Response
        </p>
        <div className="flex items-center gap-2">
          {responseTime !== null && (
            <span className="text-xs text-[#8B949E] font-mono">
              {responseTime}ms
            </span>
          )}
          {statusCode !== null && (
            <span
              className="font-mono font-bold text-sm px-2 py-0.5 rounded"
              style={{
                color: statusColor(statusCode),
                backgroundColor: `${statusColor(statusCode)}20`,
              }}
            >
              {statusCode === 0 ? "ERR" : statusCode}
            </span>
          )}
        </div>
      </div>

      {loading && (
        <div className="space-y-2 animate-pulse">
          <div className="h-3 bg-[#30363D] rounded w-3/4"></div>
          <div className="h-3 bg-[#30363D] rounded w-1/2"></div>
          <div className="h-3 bg-[#30363D] rounded w-5/6"></div>
        </div>
      )}

      {!loading && !response && (
        <p className="text-xs text-[#8B949E] font-mono italic">
          No response yet
        </p>
      )}

      {isArray && (
        <div className="overflow-x-auto">
          <table className="w-full text-xs font-mono">
            <thead>
              <tr>
                {USER_FIELDS.map((f) => (
                  <th
                    key={f}
                    className="text-left text-[#8B949E] pb-1 pr-3 font-semibold"
                  >
                    {f}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody>
              {response.map((user) => (
                <tr key={user.id} className="border-t border-[#30363D]">
                  {USER_FIELDS.map((f) => (
                    <td key={f} className="py-1 pr-3 text-[#E6EDF3]">
                      {user[f]}
                    </td>
                  ))}
                </tr>
              ))}
            </tbody>
          </table>
          {response.length === 0 && (
            <p className="text-xs text-[#8B949E] italic mt-2">
              Empty — no users yet
            </p>
          )}
        </div>
      )}

      {isUser && (
        <table className="w-full text-xs font-mono">
          <tbody>
            {USER_FIELDS.map((f) => (
              <tr
                key={f}
                className="border-t border-[#30363D] first:border-t-0"
              >
                <td className="py-1 pr-4 text-[#8B949E] font-semibold w-20">
                  {f}
                </td>
                <td className="py-1 text-[#E6EDF3]">{response[f]}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

      {!isSuccess && response && (
        <pre className="font-mono text-xs text-[#F85149] leading-relaxed overflow-x-auto">
          {JSON.stringify(response, null, 2)}
        </pre>
      )}
    </div>
  );
}
