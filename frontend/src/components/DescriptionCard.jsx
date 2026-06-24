// Testing cloudflare pipeline
const METHOD_COLOR = {
  GET: "#58A6FF",
  POST: "#3FB950",
  PUT: "#D29922",
  PATCH: "#BC8CFF",
  DELETE: "#F85149",
};

const ENDPOINT_INFO = {
  GET_ALL: {
    method: "GET",
    path: "/users",
    description: "Fetches all users from database. No body or ID required",
  },
  GET_ID: {
    method: "GET",
    path: "/users/{id}",
    description:
      "Fetches a single user by their ID. Provide ID as input & returns 1 user object or 404 if not found",
  },

  POST: {
    method: "POST",
    path: "/users",
    description:
      "Creates a new user. Send a JSON body with name, age, address, hobby and course. Returns the created user with 201.",
  },
  PUT: {
    method: "PUT",
    path: "/users/{id}",
    description:
      "Fully replace an existing user. All fields are required. If missing 1 field, it will cause 422. Returns the updated users",
  },
  PATCH: {
    method: "PATCH",
    path: "/users/{id}",
    description:
      "Partially updates a user. Only fields you provided are changed. Everything else stays the same.",
  },
  DELETE: {
    method: "DELETE",
    path: "/users/{id}",
    description:
      "Removes a user from the database permanently. Only ID is needed. Returns the deleted user with 200.",
  },
};

export default function DescriptionCard({ selectedEndpoint }) {
  const info = ENDPOINT_INFO[selectedEndpoint] ?? ENDPOINT_INFO.GET_ALL;
  const color = METHOD_COLOR[info.method];

  return (
    <div
      className="border rounded-lg p-4 bg-[#161B22]"
      style={{ borderColor: color }}
    >
      <div className="flex items-center gap-2 mb-2">
        <span
          className="font-mono font-bold text-sm px-2 py-0.5 rounded"
          style={{ color, backgroundColor: `${color}20` }}
        >
          {info.method}
        </span>
        <span className="font-mono text-sm text-[#8B949E]">{info.path}</span>
      </div>
      <p className="text-sm text-[#E6EDF3]">{info.description}</p>
    </div>
  );
}
