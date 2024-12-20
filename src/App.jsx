import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import copy from "copy-to-clipboard";
import "./IPChecker.scss";

const IPChecker = () => {
  const { t, i18n } = useTranslation();
  const [ipData, setIpData] = useState({
    ipv4: "",
    ipv6: "",
    user_agent: "",
  });
  // const [selectedLanguage, setSelectedLanguage] = useState(i18n.language);

  // const changeLanguage = (lng) => {
  //   i18n.changeLanguage(lng);
  //   setSelectedLanguage(lng);
  // };

  useEffect(() => {
    const fetchIPv4 = async () => {
      try {
        const ipv4Response = await fetch("http://ipv4.ip.sekor.eu.org");
        const ipv4Data = await ipv4Response.json();
        setIpData((prevData) => ({
          ...prevData,
          ipv4: ipv4Data.ip || t("ipFetchError"),
          user_agent:
            ipv4Data.user_agent || prevData.user_agent || t("ipFetchError"),
        }));
      } catch (error) {
        console.error("Error fetching IPv4 data:", error);
        setIpData((prevData) => ({
          ...prevData,
          ipv4: t("ipFetchError"),
        }));
      }
    };

    const fetchIPv6 = async () => {
      try {
        const ipv6Response = await fetch("http://ipv6.ip.sekor.eu.org");
        const ipv6Data = await ipv6Response.json();
        setIpData((prevData) => ({
          ...prevData,
          ipv6: ipv6Data.ip || t("ipFetchError"),
          user_agent:
            ipv6Data.user_agent || prevData.user_agent || t("ipFetchError"),
        }));
      } catch (error) {
        console.error("Error fetching IPv6 data:", error);
        setIpData((prevData) => ({
          ...prevData,
          ipv6: t("ipFetchError"),
        }));
      }
    };

    fetchIPv4();
    fetchIPv6();
  }, [t]);

  return (
    <div className="ip-checker">
      {/* <div className="language-switcher">
        <button
          type="button"
          onClick={() => changeLanguage("pl")}
          className={selectedLanguage === "pl" ? "active" : ""}
        >
          Polski
        </button>
        <button
          type="button"
          onClick={() => changeLanguage("en")}
          className={selectedLanguage === "en" ? "active" : ""}
        >
          English
        </button>
        <button
          type="button"
          onClick={() => changeLanguage("es")}
          className={selectedLanguage === "es" ? "active" : ""}
        >
          Español
        </button>
        <button
          type="button"
          onClick={() => changeLanguage("de")}
          className={selectedLanguage === "de" ? "active" : ""}
        >
          Deutsch
        </button>
      </div> */}

      <h1>{t("networkInfo")}</h1>
      <div className="info-container">
        <div className="ip-info">
          <h2>{t("ipAddresses")}</h2>
          <p>
            <strong>IPv4:</strong>
            {ipData.ipv4 ? (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <span onClick={() => copy(ipData.ipv4)}>{ipData.ipv4}</span>
            ) : (
              <span className="loading">{t("loading")}</span>
            )}
          </p>
          <p>
            <strong>IPv6:</strong>
            {ipData.ipv6 ? (
              // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
              <span onClick={() => copy(ipData.ipv6)}>{ipData.ipv6}</span>
            ) : (
              <span className="loading">{t("loading")}</span>
            )}
          </p>
        </div>
        <div className="user-agent-info">
          <h2>{t("userAgent")}</h2>
          <p>
            {ipData.user_agent || (
              <span className="loading">{t("loading")}</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default IPChecker;
