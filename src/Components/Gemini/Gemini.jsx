import React, { useState, useEffect } from "react";
import './Gemini.css';
import { GoogleGenerativeAI } from "@google/generative-ai";
import { useCity } from '/src/Components/hook/useCity'; 

export function Gemini() {
    const apiKey = 'AIzaSyCbsb6fZ78zhNjWwfrZ5m9hAcvu-QF4MxI'; // Isi dengan Gemini API Key Anda
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

    const { city, details, position } = useCity()
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
        // Header level 1 (#) menjadi <h1></h1>
        let formattedData = data.replace(/^# (.*)$/gm, '<h1>$1</h1>');

        // Header level 2 (##) menjadi <h2></h2>
        formattedData = formattedData.replace(/^## (.*)$/gm, '<h4>$1</h4>');

        // Header level 3 (###) menjadi <h3></h3>
        formattedData = formattedData.replace(/^### (.*)$/gm, '<h5>$1</h5>');

        // Bold (**text**) menjadi <strong></strong>
        formattedData = formattedData.replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>');

        // Italic (*text* or _text_) menjadi <em></em>
        formattedData = formattedData.replace(/\*(.*?)\*/g, '<em>$1</em>');
        formattedData = formattedData.replace(/_(.*?)_/g, '<em>$1</em>');

        // Bullet points (* item) menjadi <ul><li></li></ul>
        formattedData = formattedData.replace(/^\* (.*)$/gm, '<ul><li>$1</li></ul>');

        // Numbered lists (1. item) menjadi <ol><li></li></ol>
        formattedData = formattedData.replace(/^\d+\.\s(.*)$/gm, '<ol><li>$1</li></ol>');

        // Links ([text](url)) menjadi <a href="url"></a>
        formattedData = formattedData.replace(/\[([^\]]+)\]\(([^)]+)\)/g, '<a href="$2">$1</a>');

         // Tambahkan <br> setiap kali ada baris baru
        formattedData = formattedData.replace(/\n/g, '<br />');

        return <div dangerouslySetInnerHTML={{ __html: formattedData }} />;
    }

    useEffect(() => {
        if (city) {
            setResponseData(null);
            const prompt = `Get the complete detail of ${city} (${details.address}), located in ${details.state}, ${details.country}. Provide additional geographic, cultural, and economic information. Return the output in Bahasa Indonesia.`;
            run(prompt);
        }
    }, [city, details]);

    return (
        <>
            {!city ? (
                <div>
                    <p className="click">👋 Find the nearest dispensary near you.</p>
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