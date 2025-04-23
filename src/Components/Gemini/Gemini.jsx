import React, { useState, useEffect } from "react";
import './Gemini.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useCity } from '/src/Components/hook/useCity';

export function Gemini() {
    const apiKey = process.env.NEXT_PUBLIC_GEMINI_API_KEY;

    if (!apiKey) {
        console.error("Gemini API Key not found in environment variables!");
        return <div>Error: Gemini API Key not configured. Please ensure NEXT_PUBLIC_GEMINI_API_KEY is set in your environment variables.</div>;
    }

    const genAI = new GoogleGenerativeAI(apiKey);

    const model = genAI.getGenerativeModel({
        model: "gemini-1.5-flash",
    });

    const generationConfig = {
        temperature: 1,
        topP: 0.95,
        topK: 64,
        maxOutputTokens: 8192,
        responseMimeType: "text/plain",
    };

    const { city, details, position } = useCity();
    const [responseData, setResponseData] = useState(null);
    const [isLoading, setIsLoading] = useState(false); // Add loading state

    async function run(prompt) {
        setIsLoading(true); // Set loading to true when starting the API call
        try {
            const chatSession = model.startChat({
                generationConfig,
                history: [],
            });

            const result = await chatSession.sendMessage(prompt);
            const response = result.response;
            console.log("Gemini Response:", response.text());
            setResponseData(formatData(response.text()));
        } catch (error) {
            console.error("Error fetching data from Gemini:", error);
            setResponseData(<div className="error-message">Error fetching information. Please try again later.</div>); // Display an error message to the user
        } finally {
            setIsLoading(false); // Set loading to false after the API call completes (success or error)
        }
    }

    function formatData(data) {
        let formattedData = data.replace(/^# (.*)$/gm, '<h1>$1</h1>');
        formattedData = formattedData.replace(/^## (.*)$/gm, '<h4>$1</h4>');
        formattedData = formattedData.replace(/^### (.*)$/gm, '<h5>$1</h5>');
        formattedData = formattedData.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');
        formattedData = formattedData.replace(/\*(.*?)\*/g, '<em>$1</em>');
        formattedData = formattedData.replace(/_(.*?)_/g, '<em>$1</em>');
        formattedData = formattedData.replace(/^\* (.*)$/gm, '<ul><li>$1</li></ul>');
        formattedData = formattedData.replace(/^\d+\.\s(.*)$/gm, '<ol><li>$1</li></ol>');
        formattedData = formattedData.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');
        formattedData = formattedData.replace(/\n/g, '<br />');

        return <div dangerouslySetInnerHTML={{ __html: formattedData }} />;
    }

    useEffect(() => {
        if (city && apiKey) {
            setResponseData(null);
            const prompt = `Provide detailed information about the real estate market in ${city}, Atlantic City, New Jersey. Include insights on current property values, recent sales trends, investment opportunities, key commercial sectors (e.g., hospitality, retail, development), local economic factors influencing the market, and notable real estate developments or projects. Return the output in English.`;
            run(prompt);
        }
    }, [city, details, apiKey]);

    return (
        <>
            {!city ? (
                <div>
                    <p className="click">👋 Click on the map to learn more</p>
                </div>
            ) : (
                <div className="gemini-container">
                    <h2>Real Estate Insights for {city}</h2>
                    {isLoading ? (
                        <img src="/assets/loading.gif" alt="Loading..." />
                    ) : responseData ? (
                        responseData
                    ) : (
                        <p>Fetching real estate information...</p>
                    )}
                </div>
            )}
        </>
    );
}