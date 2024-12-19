"use client";

import { useState } from "react";

export default function YouTubeDownloader() {
    const [url, setUrl] = useState("");
    const [quality, setQuality] = useState("720p");
    const [format, setFormat] = useState("video");

    const handleDownload = async () => {
        if (!url) {
            alert("Please enter a valid YouTube URL");
            return;
        }

        try {
            const response = await fetch("/api/download", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ url, quality, format }),
            });

            if (!response.ok) {
                const errorText = await response.text();
                console.error("Error Response:", errorText);
                alert(`Error: ${response.statusText}`);
                return;
            }

            const data = await response.json();
            if (data.success) {
                window.open(data.downloadLink, "_blank");
            } else {
                alert(data.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Failed to start download. Please try again.");
        }
    };

    return (
        <div className="max-w-lg mx-auto p-6 bg-white shadow rounded-lg">
            <h2 className="text-xl font-bold mb-4">YouTube Downloader</h2>
            <div className="mb-4">
                <label className="block font-medium mb-2">YouTube URL:</label>
                <input
                    type="text"
                    value={url}
                    onChange={(e) => setUrl(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                    placeholder="Enter YouTube video link"
                />
            </div>
            <div className="mb-4">
                <label className="block font-medium mb-2">Quality:</label>
                <select
                    value={quality}
                    onChange={(e) => setQuality(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                >
                    <option value="1080p">1080p</option>
                    <option value="720p">720p</option>
                    <option value="480p">480p</option>
                    <option value="360p">360p</option>
                </select>
            </div>
            <div className="mb-4">
                <label className="block font-medium mb-2">Format:</label>
                <select
                    value={format}
                    onChange={(e) => setFormat(e.target.value)}
                    className="w-full px-4 py-2 border rounded"
                >
                    <option value="video">Video</option>
                    <option value="audio">Audio Only</option>
                </select>
            </div>
            <button
                onClick={handleDownload}
                className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600"
            >
                Download
            </button>
        </div>
    );
}
