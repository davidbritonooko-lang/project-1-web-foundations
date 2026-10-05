# Quick Notes Web App

A lightweight, progressive web application (PWA) designed for fast, simple, and reliable note-taking directly in your browser.

## Features

- **Progressive Web App (PWA):** Installable on desktop and mobile devices with offline capabilities using service workers.
- **Fast & Responsive:** Clean HTML, CSS, and vanilla JavaScript for minimal load times and smooth performance across screen sizes.
- **Multi-page Navigation:** Dedicated **About** section to present app information and details seamlessly.
- **Custom App Icon:** Features a vector app icon for a native app feel when installed.

## Tech Stack

- **HTML5:** Semantic layout and structure (`index.html`, `about.html`)
- **CSS3:** Modern styling and responsive design (`style.css`)
- **JavaScript (ES6+):** Client-side interactivity and PWA management (`script.js`, `pwa.js`, `about.js`)
- **Service Workers & Web Manifest:** Enables offline caching and app installation (`service-worker.js`, `manifest.webmanifest`)

## Project Structure

```text
 project-1-web-foundations/
├── index.html           # Main application interface
├── about.html           # About page
├── style.css            # Global styles and responsive layout
├── script.js           # Core application logic
├── pwa.js              # PWA installation prompt handling
├── service-worker.js    # Service worker for offline caching
├── about.js             # Scripting for the About page
├── manifest.webmanifest # Web app manifest metadata
└── app-icon.svg         # Application icon vector
