import "./style.css";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import ScratchCard from "./components/scratchCard/scratchCard";

export const Play = () => {
  const navigate = useNavigate();
  const [scratchCard, setScratchCard] = useState<
    (0 | 10 | 100 | 1000)[] | undefined
  >();

  useEffect(() => {
    const currentUrl = window.location.href;
    const isLocal = /(localhost|192)/.test(currentUrl);
    let valuesUrl: string;
    
    if (isLocal) {
      valuesUrl = "http://localhost:4000/values";
    } else {
      valuesUrl = "https://scratch-bonanza.onrender.com/values";
    }

    const fetchScratchCard = async () => {
      try {
        const requestOptions = {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        };
        const response = await fetch(valuesUrl, requestOptions);
        if (response.ok) {
          const data = await response.json();
          console.log("Response data:", data);
          setScratchCard(data);
        } else {
          console.error("Failed to fetch scratch card:", response.status);
        }
      } catch (error) {
        console.error("Error while fetching scratch card:", error);
      }
    };

    fetchScratchCard();
  }, []);

  return (
    <div className="play-page">
      {!scratchCard ? (
        <div className="loading">LOADING...</div>
      ) : (
        <>
          <ScratchCard card={scratchCard} />
          <div onClick={() => navigate("/")} className="button-main">
            BACK
          </div>
        </>
      )}
    </div>
  );
};
