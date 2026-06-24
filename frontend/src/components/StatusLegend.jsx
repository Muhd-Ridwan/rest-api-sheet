const statuses = [
  {
    code: 200,
    label: "OK",
    desc: "Request succeeded, data returned. Get data only",
  },
  {
    code: 201,
    label: "Created",
    desc: "User created successfully. 201 is for creating something",
  },
  {
    code: 400,
    label: "Bad Request",
    desc: "Malformed or invalid request body. E.g. It expected int but received string",
  },
  {
    code: 403,
    label: "Forbidden",
    desc: "Does not have access/permission to do something or access something",
  },
  {
    code: 404,
    label: "Not Found",
    desc: "User with given ID does not exist. What you search is not exist",
  },
  {
    code: 409,
    label: "Conflict",
    desc: "Duplicate entry already exists. E.g. User clicked button twice.",
  },
  {
    code: 422,
    label: "Unprocessable",
    desc: "Invalid or missing field in request body",
  },
  {
    code: 500,
    label: "Server Error",
    desc: "Something wrong on server side that host the service",
  },
];

const codeColors = {
  200: "text-[#3FB950] border-[#3FB950]",
  201: "text-[#58A6FF] border-[#58A6FF]",
  400: "text-[#D29922] border-[#D29922]",
  403: "text-[#F85149] border-[#F85149]",
  404: "text-[#D29922] border-[#D29922]",
  409: "text-[#BC8CFF] border-[#BC8CFF]",
  422: "text-[#BC8CFF] border-[#BC8CFF]",
  500: "text-[#F85149] border-[#F85149]",
};

export default function StatusLegend() {
  return (
    <div className="border border-[#30363D] rounded-lg p-4 bg-[#161B22]">
      <h2 className="text-sm font-bold font-mono text-[#8B949E] uppercase tracking-widest mb-3">
        Status Codes
      </h2>
      <div className="flex flex-wrap gap-2">
        {statuses.map(({ code, label, desc }) => (
          <div
            key={code}
            className={`border rounded px-2 py-1 flex items-center gap-2 ${codeColors[code]}`}
            title={desc}
          >
            <span className="font-mono font-bold text-sm">{code}</span>
            <span className="text-[#8B949E] text-xs">{label}</span>
          </div>
        ))}
      </div>
    </div>
  );
}
