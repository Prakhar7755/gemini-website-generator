# WebBuilder - AI Website Generator

WebBuilder is a modern, AI-powered application that allows users to generate fully functional website code using natural language prompts. Built with React, Tailwind CSS, and Google's Gemini 2.5 Flash model, it provides an instant live preview and a code editor for seamless development.
Live Deployment : 

## 🚀 Features

- **AI-Powered Generation**: Transform text descriptions into HTML/Tailwind CSS code using Google Gemini AI.
- **Live Preview**: Instantly view the generated website in a secure sandbox.
- **Code Editor**: Integrated Monaco Editor to view and modify the generated code in real-time.
- **Responsive Testing**: Full-screen preview mode with toggleable viewports for Desktop, Tablet, and Mobile.
- **Dark Mode UI**: A sleek, developer-focused interface designed with Tailwind CSS.
- **Download Code**: Export your generated project as a single HTML file.

## 🛠️ Tech Stack

- **Frontend**: React (Vite)
- **Styling**: Tailwind CSS
- **AI Model**: Google Gemini 2.5 Flash (`@google/genai`)
- **Editor**: Monaco Editor (`@monaco-editor/react`)
- **Icons**: React Icons
- **Notifications**: React Toastify

## 📦 Installation & Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Prakhar7755/gemini-website-generator.git
   cd ai-website-builder
   ```

2. **Install dependencies**

   ```bash
   npm install
   ```

3. **Configure Environment Variables**
   Create a `.env` file in the root directory and add your Google Gemini API key:

   ```env
   VITE_GEMINI_API_KEY=your_api_key_here
   ```

   > You can get an API key from Google AI Studio.

4. **Run the development server**
   ```bash
   npm run dev
   ```

## 💡 Usage

1. Open the application in your browser.
2. In the text area, describe the website you want to build (e.g., "A landing page for a coffee shop with a hero section, menu grid, and contact form").
3. Click **Generate Website**.
4. Watch the AI generate the code and render the preview.
5. Use the **Show Code** toggle to inspect or edit the HTML.
6. Click the **New Tab** icon to test responsiveness on different device sizes.
