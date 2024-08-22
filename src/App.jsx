import { useState, useEffect } from "react";
import "./IPChecker.scss";

const IPChecker = () => {
  const [ipData, setIpData] = useState({ ipv4: "", ipv6: "", user_agent: "" });

  useEffect(() => {
    const fetchIPv4 = async () => {
      try {
        const ipv4Response = await fetch("http://ipv4.ip.sekor.eu.org");
        const ipv4Data = await ipv4Response.json();
        setIpData((prevData) => ({
          ...prevData,
          ipv4: ipv4Data.ip || "Nie można pobrać adresu IP",
          user_agent:
            ipv4Data.user_agent ||
            prevData.user_agent ||
            "Nie można pobrać User-Agent",
        }));
      } catch (error) {
        console.error("Error fetching IPv4 data:", error);
        setIpData((prevData) => ({
          ...prevData,
          ipv4: "Nie można pobrać adresu IP",
        }));
      }
    };

    const fetchIPv6 = async () => {
      try {
        const ipv6Response = await fetch("http://ipv6.ip.sekor.eu.org");
        const ipv6Data = await ipv6Response.json();
        setIpData((prevData) => ({
          ...prevData,
          ipv6: ipv6Data.ip || "Nie można pobrać adresu IP",
          user_agent:
            ipv6Data.user_agent ||
            prevData.user_agent ||
            "Nie można pobrać User-Agent",
        }));
      } catch (error) {
        console.error("Error fetching IPv6 data:", error);
        setIpData((prevData) => ({
          ...prevData,
          ipv6: "Nie można pobrać adresu IP",
        }));
      }
    };

    fetchIPv4();
    fetchIPv6();
  }, []);

  return (
    <div className="ip-checker">
      <h1>Twoje informacje sieciowe</h1>
      <div className="info-container">
        <div className="ip-info">
          <h2>Adresy IP</h2>
          <p>
            <strong>IPv4:</strong>{" "}
            {<a href={`http://${ipData.ipv4}`}>{ipData.ipv4}</a> || (
              <span className="loading">Ładowanie...</span>
            )}
          </p>
          <p>
            <strong>IPv6:</strong>{" "}
            {<a href={`http://[${ipData.ipv6}]`}>{ipData.ipv6}</a> || (
              <span className="loading">Ładowanie...</span>
            )}
          </p>
        </div>
        <div className="user-agent-info">
          <h2>User Agent</h2>
          <p>
            {ipData.user_agent || <span className="loading">Ładowanie...</span>}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IPChecker;
