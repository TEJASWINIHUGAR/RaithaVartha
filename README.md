# Raitha-Varta (Agriculture)

## Problem Statement
Agricultural experts (Krishi Vigyana Kendra) release "Crop Advisories" every week, but these are long PDF files or text messages that farmers find boring. Farmers need "Short, Actionable Tips" specific to their district's soil and weather.

## Detailed Description (The Vision)
Raitha-Varta is a "Flash-Card Advisor" for farmers. It turns complex research into "Daily 1-Minute Tips." Each card contains one "Action": "Spray this for this pest" or "Best time to weed." It’s like "Instagram for Farming," but with scientifically verified information.

## Impact Goals
- **Precision Farming:** Bringing expert knowledge to the smallest fields.
- **Yield Improvement:** Reducing losses due to pests and incorrect fertilization.
- **Digital Inclusion:** Making scientific data "Digestible" for everyone.

## Features
- **Daily Tip:** A swipeable card with an image and a 2-sentence instruction.
- **Crop Category:** Filter tips by [Paddy] [Areca nut] [Coconut] [Tomato].
- **Success Story:** A card showing a local farmer who used the tip and got results.
- **Expert Ask:** (Simulated) A button to send a photo of a diseased leaf.

## Prerequisites

Before running this project, ensure you have the following installed:
- Node.js (v18 or later)
- npm

## Getting Started

1. **Clone the repository:**
   ```bash
   git clone [YOUR_REPOSITORY_URL]
   cd [YOUR_PROJECT_DIRECTORY]
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Configure Environment Variables:**
   Create a `.env` file in the root directory:
   ```env
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   ```
   > **Security Warning:** To keep the application secure, you must use your own Gemini API key. Never commit your `.env` file or any files containing your API keys to version control.

4. **Run the application:**
   ```bash
   npm run dev
   ```

## Development

- To build for production, run:
  ```bash
  npm run build
  ```

## Security

Please keep your API keys secure. Ensure `firebase-applet-config.json` and `.env` files are never exposed in public repositories. It is critical to use individual API keys to maintain security.
