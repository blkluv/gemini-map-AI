import React, { useState, useEffect } from "react";
import './Gemini.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useCity } from '/src/Components/hook/useCity'; 

function Gemini() {
    const apiKey = 'AIzaSyBTu7ARZXqOBmMxRTYmUZooXHnLWoYEGdM'; // Replace with your Gemini API Key
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

    async function run(prompt) {
        const chatSession = model.startChat({
            generationConfig,
            history: [],
        });

        const result = await chatSession.sendMessage(prompt);
        const response = result.response;
        console.log(response.text());
        setResponseData(formatData(response.text()));
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
        if (city) {
            setResponseData(null);
            const prompt = `Get the complete detail of ${city} (${details.address}), located in ${details.state}, ${details.country}. Provide additional geographic, cultural, and economic commercial real estate information.`;
            run(prompt);
        }
    }, [city, details]);

    return (
        <>
            {!city ? (
                <div>
                    <p className="click">🤖👋 Click on the map to learn more.</p>
                </div>
            ) : (
                <div className="gemini-container">
                    <h2>{city}</h2>
                    {responseData ? (
                        responseData
                    ) : (
                        <img src="/assets/loading.gif" alt="Loading..." />
                    )}
                </div>
            )}
        </>
    );
}

export default Gemini;
