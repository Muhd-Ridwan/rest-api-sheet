import { useState } from "react";
import DescriptionCard from "./components/DescriptionCard";
import StatusLegend from "./components/StatusLegend";
import InputPanel from "./components/InputPanel";
import UrlDisplay from "./components/UrlDisplay";
import JsonPreview from "./components/JsonPreview";
import ResultPanel from "./components/ResultPanel";

const BASE_URL = import.meta.env.VITE_API_URL;

const ENDPOINT_METHODS = {
  GET_ALL: "GET",
  GET_ID: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
};

const ID_ENDPOINTS = new Set(["GET_ID", "PUT", "PATCH", "DELETE"]);

export default function App() {
  const [selectedEndpoint, setSelectedEndpoint] = useState("GET_ALL");
  const [method, setMethod] = useState("GET");
  const [userId, setUserId] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    address: "",
    hobby: "",
    course: "",
  });
  const [response, setResponse] = useState(null);
  const [statusCode, setStatusCode] = useState(null);
  const [loading, setLoading] = useState(false);
  const [responseTime, setResponseTime] = useState(null);

  const handleEndpointChange = (endpoint) => {
    setSelectedEndpoint(endpoint);
    setMethod(ENDPOINT_METHODS[endpoint]);
    if (!ID_ENDPOINTS.has(endpoint)) setUserId("");
    setFormData({ name: "", age: "", address: "", hobby: "", course: "" });
    setResponse(null);
    setStatusCode(null);
    setResponseTime(null);
  };

  const handleClear = () => {
    setUserId("");
    setFormData({ name: "", age: "", address: "", hobby: "", course: "" });
    setResponse(null);
    setStatusCode(null);
    setResponseTime(null);
  };

  const handleSend = async () => {
    setLoading(true);
    setResponse(null);
    setStatusCode(null);
    const startTime = Date.now();

    const needsId = ID_ENDPOINTS.has(selectedEndpoint);

    if (needsId && !userId) {
      setStatusCode(400);
      setResponse({ detail: "user_id is required for this endpoint" });
      setResponseTime(Date.now() - startTime);
      setLoading(false);
      return;
    }

    const url = needsId ? `${BASE_URL}/users/${userId}` : `${BASE_URL}/users`;

    const needsBody = ["POST", "PUT", "PATCH"].includes(method);
    const body = needsBody
      ? JSON.stringify(
          Object.fromEntries(
            Object.entries(formData).filter(([_, v]) => v !== ""),
          ),
        )
      : undefined;

    try {
      const res = await fetch(url, {
        method,
        headers: needsBody ? { "Content-Type": "application/json" } : {},
        body,
      });
      const data = await res.json();
      setStatusCode(res.status);
      setResponse(data);
      setResponseTime(Date.now() - startTime);
    } catch (err) {
      setStatusCode(0);
      setResponse({ error: "Could not reach server" });
      setResponseTime(Date.now() - startTime);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#0D1117] text-[#E6EDF3] font-sans p-6">
      <div className="max-w-7xl mx-auto space-y-4">
        <div>
          <h1 className="text-xl font-bold text-[#E6EDF3]">REST API Demo</h1>
          <p className="text-sm text-[#8B949E]">Interactive CRUD explorer</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          <DescriptionCard selectedEndpoint={selectedEndpoint} />
          <StatusLegend />
        </div>
        <div className="grid grid-cols-[400px_1fr] gap-4">
          <InputPanel
            selectedEndpoint={selectedEndpoint}
            onEndpointChange={handleEndpointChange}
            userId={userId}
            setUserId={setUserId}
            formData={formData}
            setFormData={setFormData}
            onSend={handleSend}
            onClear={handleClear}
            loading={loading}
          />
          <div className="space-y-4">
            <UrlDisplay
              selectedEndpoint={selectedEndpoint}
              userId={userId}
              base_url={BASE_URL}
            />
            <div className="grid grid-cols-2 gap-4">
              <JsonPreview method={method} formData={formData} />
              <ResultPanel
                response={response}
                statusCode={statusCode}
                loading={loading}
                responseTime={responseTime}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
