// Import global styles
import "./styles/global.css";

// Any additional global scripts can be added here
// Check if we're in a browser environment before using document
if (typeof document !== "undefined") {
    document.addEventListener("DOMContentLoaded", () => {
        console.log("Nextla - Free to be heard. Site loaded successfully.");
    });
}
