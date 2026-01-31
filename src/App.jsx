/* cSpell:disable */
import { useState } from "react";
import Navbar from "./components/Navbar";
import { MdOutlineArrowUpward } from "react-icons/md";
import { ImNewTab } from "react-icons/im";
import { IoMdDownload } from "react-icons/io";
import { BiSolidShow } from "react-icons/bi";
import { FaEyeSlash } from "react-icons/fa";
import Editor from "@monaco-editor/react";
import { RiComputerLine } from "react-icons/ri";
import { FaTabletAlt } from "react-icons/fa";
import { ImMobile2 } from "react-icons/im";
import { IoMdClose } from "react-icons/io";
import { toast } from "react-toastify";
import { FadeLoader } from "react-spinners";
import { ai } from "./lib/gemini.js";
import { extractCode, downloadCode, textPrompt } from "./lib/helper.js";

const App = () => {
  const [prompt, setPrompt] = useState("");
  const [isShowCode, setIsShowCode] = useState(false);
  const [isInNewTab, setIsInNewTab] = useState(false);
  const [loading, setLoading] = useState(false);
  const [previewWidth, setPreviewWidth] = useState("100%");
  const [code, setCode] = useState(
    `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Document</title>
  <script src="https://cdn.jsdelivr.net/npm/@tailwindcss/browser@4"></script>
</head>
<body class="p-2.5">
  <h1 class="text-[30px] font-bold">Welcome to WebBuilder</h1>
</body>
</html>
    `,
  );

  const getResponse = async () => {
    if (prompt === "") {
      toast.error("Please enter a prompt!");
      return;
    }
    setLoading(true);
    try {
      const text_prompt = textPrompt + prompt;

      const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: text_prompt,
      });
      setCode(extractCode(response.text));
      console.log(response.text);
    } catch (error) {
      console.error(error);
      toast.error(
        error.message || "Failed to generate website. Please try again.",
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 font-sans selection:bg-purple-500/30">
      <Navbar />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4">
            Build Beautiful Websites with{" "}
            <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-pink-600">
              AI
            </span>
          </h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">
            Describe your dream website in detail, and let our AI generate
            production-ready code for you instantly.
          </p>
        </div>

        {/* Input Area */}
        <div className="max-w-4xl mx-auto mb-16">
          <div className="relative group">
            <div className="absolute -inset-1 bg-linear-to-r from-purple-600 to-pink-600 rounded-2xl blur opacity-25 group-hover:opacity-50 transition duration-200"></div>
            <div className="relative bg-slate-900 rounded-2xl p-2 ring-1 ring-slate-800">
              <textarea
                onChange={(e) => setPrompt(e.target.value)}
                value={prompt}
                placeholder="Describe your website (e.g., 'A modern portfolio for a photographer with a dark theme, image gallery, and contact form')..."
                className="w-full bg-transparent text-slate-200 placeholder-slate-500 p-4 min-h-30 outline-none resize-none text-lg rounded-xl"
              />
              <div className="flex justify-end px-2 pb-2">
                <button
                  onClick={getResponse}
                  disabled={loading}
                  className="flex items-center gap-2 bg-purple-600 hover:bg-purple-500 text-white px-6 py-2.5 rounded-xl font-medium transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-purple-500/20"
                >
                  {loading ? "Generating..." : "Generate Website"}
                  {!loading && <MdOutlineArrowUpward className="text-xl" />}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Preview Section */}
        <div className="bg-slate-900 rounded-xl border border-slate-800 overflow-hidden shadow-2xl ring-1 ring-black/5">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 border-b border-slate-800 bg-slate-900/50">
            <div className="flex items-center gap-2">
              <div className="flex gap-1.5">
                <div className="w-3 h-3 rounded-full bg-red-500/20 border border-red-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-yellow-500/20 border border-yellow-500/50"></div>
                <div className="w-3 h-3 rounded-full bg-green-500/20 border border-green-500/50"></div>
              </div>
              <span className="ml-4 text-sm font-medium text-slate-400">
                Live Preview
              </span>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={() => setIsInNewTab(true)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Open in new tab"
              >
                <ImNewTab size={18} />
              </button>
              <button
                onClick={() => downloadCode(code)}
                className="p-2 text-slate-400 hover:text-white hover:bg-slate-800 rounded-lg transition-colors"
                title="Download Code"
              >
                <IoMdDownload size={20} />
              </button>
              <button
                onClick={() => setIsShowCode(!isShowCode)}
                className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${isShowCode ? "bg-purple-500/10 text-purple-400" : "text-slate-400 hover:text-white hover:bg-slate-800"}`}
              >
                {isShowCode ? <FaEyeSlash /> : <BiSolidShow />}
                {isShowCode ? "Hide Code" : "Show Code"}
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="relative h-150 w-full bg-slate-950">
            {isShowCode ? (
              <Editor
                onChange={(code) => setCode(code)}
                height="100%"
                theme="vs-dark"
                defaultLanguage="html"
                value={code}
                options={{
                  minimap: { enabled: false },
                  fontSize: 14,
                  padding: { top: 16 },
                }}
              />
            ) : (
              <>
                {loading ? (
                  <div className="absolute inset-0 flex flex-col items-center justify-center bg-slate-900/50 backdrop-blur-sm">
                    <FadeLoader color="#9333ea" />
                    <h3 className="mt-4 text-xl font-medium text-slate-300 animate-pulse">
                      Generating your website...
                    </h3>
                  </div>
                ) : (
                  <iframe
                    srcDoc={code}
                    className="w-full h-full bg-white"
                    title="Preview"
                    sandbox="allow-scripts "
                  ></iframe>
                )}
              </>
            )}
          </div>
        </div>
      </div>

      {/* Full Screen Modal */}
      {isInNewTab && (
        <div className="fixed inset-0 z-50 flex flex-col bg-slate-950 animate-in fade-in duration-200">
          <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800 bg-slate-900">
            <h3 className="text-lg font-bold text-white">
              Full Screen Preview
            </h3>

            <div className="flex items-center gap-4 bg-slate-800 p-1 rounded-lg">
              <div
                onClick={() => setPreviewWidth("100%")}
                className={`p-2 cursor-pointer rounded-md transition-colors ${previewWidth === "100%" ? "text-white bg-slate-700" : "text-slate-400 hover:text-white"}`}
              >
                <RiComputerLine size={20} />
              </div>
              <div
                onClick={() => setPreviewWidth("768px")}
                className={`p-2 cursor-pointer rounded-md transition-colors ${previewWidth === "768px" ? "text-white bg-slate-700" : "text-slate-400 hover:text-white"}`}
              >
                <FaTabletAlt size={18} />
              </div>
              <div
                onClick={() => setPreviewWidth("375px")}
                className={`p-2 cursor-pointer rounded-md transition-colors ${previewWidth === "375px" ? "text-white bg-slate-700" : "text-slate-400 hover:text-white"}`}
              >
                <ImMobile2 size={16} />
              </div>
            </div>

            <button
              onClick={() => setIsInNewTab(false)}
              className="p-2 text-slate-400 hover:text-white hover:bg-red-500/20 rounded-lg transition-colors"
            >
              <IoMdClose size={24} />
            </button>
          </div>
          <div className="flex-1 bg-slate-900 p-4 md:p-8 overflow-hidden flex justify-center">
            <iframe
              srcDoc={code}
              className="h-full bg-white rounded-lg shadow-2xl border border-slate-800 transition-all duration-300 ease-in-out"
              style={{ width: previewWidth }}
              title="Full Preview"
            ></iframe>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
