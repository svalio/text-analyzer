import React, { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [input, setInputText] = useState<string>("");
  const [resultsText, setResultsText] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  useEffect(() => {
    setError(null);
  }, [input]);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsLoading(true);

    try {
      // Insert endpoint URL here from sls deploy command output
      const response = await fetch("<Insert URL here>", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ input }),
      });

      if (response.ok) {
        const data = await response.json();

        let parsedData = "";

        for (const [key, value] of Object.entries(data.result)) {
          parsedData += `${key}: ${value}\n`;
        }

        setResultsText(parsedData);
      } else {
        setError("Server Error: " + response.statusText);
      }
    } catch (error) {
      setError("Network Error: " + (error as Error).message);
    }

    setIsLoading(false);
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div className="block-container block-container__input">
          <label className="block-container__label" htmlFor="input">
            Input Text:
          </label>
          <textarea
            className="block-container__textarea"
            id="input"
            value={input}
            readOnly={isLoading}
            required
            onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
              setInputText(e.target.value);
            }}
            rows={5}
          />
        </div>
        <div className="block-container block-container__results">
          <label className="block-container__label">Result:</label>
          <textarea
            className="block-container__textarea block-container__textarea__noscroll"
            value={resultsText}
            readOnly
            rows={10}
          />
        </div>
        <div className="block-container block-container__button">
          <button type="submit" disabled={isLoading}>
            {isLoading ? "Submitting..." : "Submit"}
          </button>
          {error && <div className="block-container__error">{error}</div>}
        </div>
      </form>
    </div>
  );
}

export default App;
