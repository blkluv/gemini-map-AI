# GeminiMap

**GeminiMap** is an interactive web application that brings together mapping technology and AI insights. With Gemini AI's capabilities, users can explore various locations on the map and receive detailed geographic, cultural, and economic information in real-time.

## Features

- **Interactive Map**: Powered by [Leaflet](https://leafletjs.com/) and [OpenStreetMap](https://www.openstreetmap.org/), allowing users to click on locations and get insights.
- **AI-Powered Insights**: Uses [Gemini AI](https://developers.google.com/ai) to generate detailed information about cities, including geographic, cultural, and economic data.
- **Geolocation Services**: Integrates with [LocationIQ](https://locationiq.com/) for accurate geolocation and mapping functionality.
- **User-Friendly Interface**: A simple and intuitive design that adapts to different screen sizes with a responsive layout.

## Tech Stack

- **Frontend**: React.js, Leaflet.js, CSS
- **AI Integration**: Gemini AI API
- **Mapping**: Leaflet.js, OpenStreetMap
- **Geolocation**: LocationIQ API
- **Build Tool**: Vite.js

## Installation

To run GeminiMap locally:

1. Clone the repository:
   ```bash
   git clone https://github.com/kohryan/gemini-map-ai.git

2. Install dependencies:
   ```bash
   cd gemini-map-ai
   npm install

3. Start the development server:
   ```bash
   npm run dev

# How It Works
Users can interact with the map, selecting locations to receive real-time insights.
Upon selecting a location, the app fetches data from the Gemini AI API, providing detailed information about the selected city.
The information includes geographic details, culture, economy, and more, presented in a clear and accessible format.

# Contributing
We welcome contributions! If you would like to contribute, please follow these steps:

1. Fork the repository.
2. Create a new branch (`git checkout -b feature-name`).
3. Make your changes and commit (`git commit -am 'Add new feature'`).
4. Push to your forked repository (`git push origin feature-name`).
5. Create a new pull request.
