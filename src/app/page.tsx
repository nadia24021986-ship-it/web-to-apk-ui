"use client";

import React, { useState, useEffect } from "react";

export default function WebToApkConverter() {
  // State Engine untuk interaktivitas komponen
  const [url, setUrl] = useState("https://example.com");
  const [buildId, setBuildId] = useState("b4d1ef92-8c8a-444a-933b-3f9b8c72a11");
  const [copied, setCopied] = useState(false);
  const [isBuilding, setIsBuilding] = useState(false);
  const [progress, setProgress] = useState(65); // Default 65% seperti pada mockup gambar
  const [currentStep, setCurrentStep] = useState(2); // Step 1: Triggering, Step 2: Compiling, Step 3: Packaging, Step 4: Ready
  const [activeTab, setActiveTab] = useState("home");

  // Simulasi Clipboard Copy yang aman untuk Iframe Sandbox Vercel/Gemini
  const handleCopyId = () => {
    try {
      const textField = document.createElement("textarea");
      textField.innerText = buildId;
      document.body.appendChild(textField);
      textField.select();
      document.execCommand("copy");
      textField.remove();
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Gagal menyalin teks: ", err);
    }
  };

  // Simulasi Prosedur Pipa Build Otomatis saat Tombol "Generate APK" diklik
  const startBuildSimulation = () => {
    if (isBuilding) return;
    setIsBuilding(true);
    setProgress(0);
    setCurrentStep(1);
    
    // Generate acak Build ID baru
    const randomHex = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    setBuildId(`build-${randomHex()}-${randomHex()}-${randomHex()}`);

    // Siklus simulasi linier progress bar dan pembaruan stepper otomatis
    const interval = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsBuilding(false);
          setCurrentStep(4);
          return 100;
        }
        
        const nextProgress = prev + 1;
        if (nextProgress === 15) setCurrentStep(2);
        if (nextProgress === 85) setCurrentStep(3);
        
        return nextProgress;
      });
    }, 100);
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0a0f1d] via-[#070a14] to-[#04060c] text-slate-200 font-sans antialiased flex justify-center pb-24">
      {/* MOBILE COMPONENT SHELL: Membatasi layar persis seperti mockup smartphone */}
      <div className="w-full max-w-md px-5 pt-6 flex flex-col gap-5 relative select-none">
        
        {/* TOP HEADER NAVIGATION */}
        <div className="flex justify-between items-center">
          <button className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-900/40">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
            </svg>
          </button>
          <button className="text-slate-400 hover:text-white transition-colors p-1 rounded-lg hover:bg-slate-900/40">
            <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.879 7.519c1.171-1.025 3.071-1.025 4.242 0 1.172 1.025 1.172 2.687 0 3.712-.203.179-.43.326-.67.442-.745.361-1.45.999-1.45 1.827v.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Zm-9 5.25h.008v.008H12v-.008Z" />
            </svg>
          </button>
        </div>

        {/* HERO MASCOT & BRANDING */}
        <div className="flex flex-col items-center text-center mt-1">
          <div className="relative mb-3 group">
            {/* Efek Glow Neon di Belakang Android Mascot */}
            <div className="absolute inset-0 bg-[#22c55e] opacity-25 blur-2xl rounded-full scale-95 transition-all group-hover:opacity-35"></div>
            <svg className="w-24 h-24 relative z-10 drop-shadow-[0_0_15px_rgba(34,197,94,0.3)] animate-float" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M30 46C30 34.954 38.954 26 50 26C61.046 26 70 34.954 70 46V51H30V46Z" fill="#22c55e" />
              <rect x="30" y="54" width="40" height="23" rx="6" fill="#22c55e" />
              <circle cx="42" cy="38" r="2.5" fill="#070a14" />
              <circle cx="58" cy="38" r="2.5" fill="#070a14" />
              <path d="M37 22L33 15" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
              <path d="M63 22L67 15" stroke="#22c55e" strokeWidth="2.5" strokeLinecap="round" />
              <rect x="36" y="60" width="28" height="11" rx="4" fill="#ffffff" />
              <text x="50" y="68" fill="#15803d" fontSize="8" fontWeight="900" textAnchor="middle" letterSpacing="0.5">APK</text>
            </svg>
          </div>
          <h1 className="text-3xl font-black text-white tracking-tight">
            Web to <span className="bg-gradient-to-r from-[#22c55e] to-[#4ade80] bg-clip-text text-transparent">APK</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1 font-medium tracking-wide">Convert any website into Android APK</p>
        </div>

        {/* CARD 1 - WEBSITE URL INPUT & TRIGGER */}
        <div className="bg-[#0f1626]/80 border border-slate-800/60 rounded-2xl p-4 shadow-xl backdrop-blur-md">
          <div className="mb-3.5">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">1. Website URL</h2>
            <p className="text-[11px] text-slate-400 mt-0.5">Enter the URL of the website you want to convert</p>
          </div>

          {/* Wrapper Kotak Input */}
          <div className="relative flex items-center mb-4">
            <div className="absolute left-3.5 text-slate-500">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 0 0 8.716-6.747M12 21a9.004 9.004 0 0 1-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 0 1 7.843 4.582M12 3a8.997 8.997 0 0 0-7.843 4.582m15.686 0A11.953 11.953 0 0 1 12 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0 1 21 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0 1 12 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 0 1 3 12c0-.778.099-1.533.284-2.253m0 0A17.919 17.919 0 0 0 12 10.5c2.998 0 5.74 1.1 7.843 2.918M9.344 15.155M14.656 15.155" />
              </svg>
            </div>
            <input
              type="url"
              value={url}
              onChange={(e) => setUrl(e.target.value)}
              disabled={isBuilding}
              className="w-full bg-[#070a14] border border-slate-800/80 focus:border-[#22c55e] text-xs text-slate-200 rounded-xl pl-10 pr-10 py-3.5 outline-none transition-all font-mono tracking-wide disabled:opacity-50"
            />
            <div className="absolute right-3.5 text-[#22c55e]">
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 18a8 8 0 1 00-16 8 8 0 0 00 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          {/* Tombol Pembuat APK dengan Efek Gradasi */}
          <button
            onClick={startBuildSimulation}
            disabled={isBuilding}
            className="w-full bg-gradient-to-r from-[#22c55e] to-[#06b6d4] hover:from-[#16a34a] hover:to-[#0891b2] text-white text-xs font-bold py-3.5 px-4 rounded-xl shadow-lg shadow-emerald-950/20 flex items-center justify-center gap-2 transition-all active:scale-[0.98] disabled:opacity-60 disabled:cursor-not-allowed uppercase tracking-wider"
          >
            <svg className={`w-4 h-4 text-white ${isBuilding ? "animate-bounce" : ""}`} fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.894 2.553a1 1 0 00-1.788 0l-7 14a1 1 0 001.169 1.409l5-1.429A1 1 0 009 15.571V11a1 1 0 112 0v4.571a1 1 0 00.725.962l5 1.428a1 1 0 001.17-1.408l-7-14z" />
            </svg>
            {isBuilding ? "Compiling Project..." : "Generate APK"}
          </button>

          {/* Subteks Kepatuhan Privasi */}
          <div className="flex items-center justify-center gap-1.5 mt-3 text-[10px] text-slate-500 font-medium">
            <svg className="w-3.5 h-3.5 text-slate-500" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.249-8.25-3.286Z" />
            </svg>
            We do not store or host any of your content.
          </div>
        </div>

        {/* CARD 2 - INTERACTIVE BUILD PROGRESS TIMELINE */}
        <div className="bg-[#0f1626]/80 border border-slate-800/60 rounded-2xl p-4 shadow-xl backdrop-blur-md">
          <div className="flex justify-between items-center mb-5">
            <h2 className="text-xs font-bold text-white uppercase tracking-wider">2. Build Progress</h2>
            <div className="flex items-center gap-1.5 bg-[#070a14] border border-slate-800 rounded-lg px-2.5 py-1">
              <span className="text-[9px] text-slate-500 font-bold uppercase">Build ID</span>
              <span className="text-[9px] text-slate-400 font-mono max-w-[80px] truncate">{buildId}</span>
              <button onClick={handleCopyId} className="text-slate-500 hover:text-slate-300 transition-colors p-0.5">
                {copied ? (
                  <span className="text-[8px] text-[#22c55e] font-sans font-bold">Copied!</span>
                ) : (
                  <svg className="w-3 h-3" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15.75 17.25v3.375c0 .621-.504 1.125-1.125 1.125h-9.75a1.125 1.125 0 0 1-1.125-1.125V7.875c0-.621.504-1.125 1.125-1.125H6.75a9.06 9.06 0 0 1 1.5.124m7.5 10.376A8.965 8.965 0 0 0 12 12.75c-.497 0-.982.04-1.455.12l-.104.022m.784-5.655a9.059 9.059 0 0 1 1.5-.124h3.375c.621 0 1.125.504 1.125 1.125v9.375c0 .621-.504 1.125-1.125 1.125H15.75m-1.5-14H10.5a1.5 1.5 0 0 0-1.5 1.5v1.499m1.5-1.5h1.5a1.5 1.5 0 0 1 1.5 1.5v1.5M9 15.75h.008v.008H9v-.008Z" />
                  </svg>
                )}
              </button>
            </div>
          </div>

          {/* Struktur Stepper Garis Vertikal */}
          <div className="flex flex-col relative pl-8 gap-5">
            
            {/* LANGKAH 1: TRIGGERING BUILD */}
            <div className="relative">
              {/* Batang Track Penghubung */}
              <div className={`absolute -left-[21px] top-6 w-[2px] h-8 transition-colors duration-300 ${currentStep > 1 ? "bg-[#22c55e]" : "bg-slate-800"}`}></div>
              
              {/* Indikator Status Simpul */}
              <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-white transition-all shadow-md ${
                currentStep > 1 
                  ? "bg-[#22c55e] shadow-emerald-950/60" 
                  : currentStep === 1 ? "bg-blue-600 border border-blue-400 animate-pulse" : "bg-[#070a14] border border-slate-800"
              }`}>
                {currentStep > 1 ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                ) : (
                  <span className="text-[10px] font-bold font-mono">1</span>
                )}
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`text-xs font-bold transition-colors ${currentStep >= 1 ? "text-white" : "text-slate-500"}`}>1. Triggering Build</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Sending build request to GitHub Actions...</p>
                </div>
                <div className="text-right flex flex-col items-end">
                  <span className={`text-[9px] font-extrabold px-1.5 py-0.5 rounded-md border ${
                    currentStep > 1 
                      ? "bg-emerald-950/40 text-[#22c55e] border-emerald-900/60" 
                      : "bg-slate-900/80 text-slate-500 border-slate-800/40"
                  }`}>{currentStep > 1 ? "Completed" : "Active"}</span>
                  <span className="text-[9px] text-slate-500 font-mono mt-1">10:24:15</span>
                </div>
              </div>
            </div>

            {/* LANGKAH 2: COMPILING ANDROID APP */}
            <div className="relative">
              <div className={`absolute -left-[21px] top-6 w-[2px] h-12 transition-colors duration-300 ${currentStep > 2 ? "bg-[#22c55e]" : "bg-slate-800"}`}></div>
              <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-white transition-all shadow-md ${
                currentStep > 2 
                  ? "bg-[#22c55e] shadow-emerald-950/60" 
                  : currentStep === 2 ? "bg-blue-600 border border-blue-400 shadow-blue-950/60" : "bg-[#070a14] border border-slate-800"
              }`}>
                {currentStep > 2 ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                ) : currentStep === 2 ? (
                  <div className="w-3 h-3 border-2 border-t-transparent border-white rounded-full animate-spin"></div>
                ) : (
                  <span className="text-[10px] font-bold font-mono">2</span>
                )}
              </div>
              <div className="flex justify-between items-start mb-2">
                <div>
                  <h3 className={`text-xs font-bold transition-colors ${currentStep >= 2 ? "text-white" : "text-slate-500"}`}>2. Compiling Android App</h3>
                  <p className="text-[10px] text-slate-400 mt-0.5">Building your Android application...</p>
                </div>
                <div className="text-right">
                  <span className={`text-xs font-black font-mono ${currentStep === 2 ? "text-blue-400" : currentStep > 2 ? "text-[#22c55e]" : "text-slate-600"}`}>{currentStep === 2 ? `${progress}%` : currentStep > 2 ? "100%" : "0%"}</span>
                  <p className="text-[9px] text-slate-500 font-mono mt-1">10:24:25</p>
                </div>
              </div>
              
              {/* Horizontal Progress Bar Component */}
              <div className="w-full bg-[#070a14] h-1.5 rounded-full overflow-hidden border border-slate-900">
                <div 
                  className={`h-full rounded-full transition-all duration-100 ${currentStep > 2 ? "bg-[#22c55e]" : "bg-blue-500 shadow-[0_0_10px_rgba(59,130,246,0.5)]"}`}
                  style={{ width: `${currentStep < 2 ? 0 : currentStep > 2 ? 100 : progress}%` }}
                ></div>
              </div>
            </div>

            {/* LANGKAH 3: PACKAGING ZIP */}
            <div className="relative">
              <div className={`absolute -left-[21px] top-6 w-[2px] h-8 transition-colors duration-300 ${currentStep > 3 ? "bg-[#22c55e]" : "bg-slate-800"}`}></div>
              <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-white transition-all shadow-md ${
                currentStep > 3 
                  ? "bg-[#22c55e] shadow-emerald-950/60" 
                  : currentStep === 3 ? "bg-blue-600 border border-blue-400 shadow-blue-950/60 animate-pulse" : "bg-[#070a14] border border-slate-800"
              }`}>
                {currentStep > 3 ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                ) : (
                  <span className="text-[10px] font-bold font-mono">3</span>
                )}
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`text-xs font-bold transition-colors ${currentStep >= 3 ? "text-white" : "text-slate-500"}`}>3. Packaging ZIP</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Preparing APK and creating ZIP file...</p>
                </div>
                <div className="text-right">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${
                    currentStep === 3 ? "bg-blue-950/40 text-blue-400 border-blue-900/60" : currentStep > 3 ? "bg-emerald-950/40 text-[#22c55e] border-emerald-900/60" : "bg-slate-900/60 text-slate-500 border-slate-800/40"
                  }`}>{currentStep === 3 ? "Active" : currentStep > 3 ? "Completed" : "Pending"}</span>
                  <span className="text-[9px] text-slate-600 font-mono mt-1">--:--:--</span>
                </div>
              </div>
            </div>

            {/* LANGKAH 4: READY FOR DOWNLOAD */}
            <div className="relative">
              <div className={`absolute -left-[31px] top-0 w-6 h-6 rounded-full flex items-center justify-center text-white transition-all shadow-md ${
                currentStep === 4 ? "bg-[#22c55e] shadow-emerald-950/60" : "bg-[#070a14] border border-slate-800"
              }`}>
                {currentStep === 4 ? (
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth="3" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" /></svg>
                ) : (
                  <span className="text-[10px] font-bold font-mono">4</span>
                )}
              </div>
              <div className="flex justify-between items-start">
                <div>
                  <h3 className={`text-xs font-bold transition-colors ${currentStep === 4 ? "text-white" : "text-slate-500"}`}>4. Ready for Download</h3>
                  <p className="text-[10px] text-slate-500 mt-0.5">Your APK ZIP will be ready to download.</p>
                </div>
                <div className="text-right">
                  <span className={`text-[9px] font-bold px-1.5 py-0.5 rounded-md border ${
                    currentStep === 4 ? "bg-emerald-950/40 text-[#22c55e] border-emerald-900/60 animate-bounce" : "bg-slate-900/60 text-slate-500 border-slate-800/40"
                  }`}>{currentStep === 4 ? "Ready" : "Pending"}</span>
                  <span className="text-[9px] text-slate-600 font-mono mt-1">--:--:--</span>
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* CARD 3 - TIME ESTIMATION BANNER */}
        <div className="bg-[#0f1626]/80 border border-slate-800/60 rounded-2xl p-4 shadow-xl backdrop-blur-md flex justify-between items-center overflow-hidden">
          <div className="flex gap-3 items-center">
            <div className="text-blue-400">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
              </svg>
            </div>
            <div>
              <h4 className="text-[11px] font-bold text-slate-400 uppercase tracking-wide">Estimated time remaining</h4>
              <p className="text-lg font-black text-blue-400 tracking-wide mt-0.5">2 – 4 minutes</p>
              <p className="text-[9px] text-slate-500 font-medium mt-0.5">This may vary depending on build queue and load.</p>
            </div>
          </div>
          
          {/* Ilustrasi Komputasi Awan (Cloud Server Stack) */}
          <div className="relative opacity-90 scale-105">
            <svg className="w-14 h-14" viewBox="0 0 64 64" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="10" y="28" width="44" height="13" rx="3.5" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
              <rect x="10" y="45" width="44" height="13" rx="3.5" fill="#1e293b" stroke="#3b82f6" strokeWidth="1.5" />
              <circle cx="16" cy="34.5" r="2" fill="#22c55e" className="animate-ping" />
              <circle cx="16" cy="34.5" r="1.5" fill="#22c55e" />
              <circle cx="16" cy="51.5" r="1.5" fill="#22c55e" />
              <line x1="24" y1="34.5" x2="44" y2="34.5" stroke="#3b82f6" strokeWidth="2" strokeLinecap="round" />
              <line x1="24" y1="51.5" x2="44" y2="51.5" stroke="#475569" strokeWidth="2" strokeLinecap="round" />
              <path d="M44 23C44 18.3 39.7 14.5 34.5 14.5C30.1 14.5 26.4 17.5 25.3 21.5C24.9 21.2 24.4 21 23.9 21C22.4 21 21.2 22.2 21.2 23.7C21.2 24 21.2 24.2 21.3 24.5C19.1 25.1 17.5 27.1 17.5 29.5C17.5 32.3 19.8 34.5 22.7 34.5H25V32.5H22.7C20.9 32.5 19.5 31.1 19.5 29.5C19.5 27.9 20.7 26.5 22.3 26.2L23.2 26L23.1 25C23.1 24.3 23.4 23.6 24 23.1C24.6 22.6 25.3 22.5 26 22.7L26.9 22.9L27.3 22.1C28.3 19.9 30.4 18.5 34.5 18.5C39.2 18.5 42 21.3 42 26V28H44C47.1 28 49.5 30.4 49.5 33.5C49.5 36.6 47.1 39.0 44 39.0H41V41.0H44C48.2 41.0 51.5 37.6 51.5 33.5C51.5 29.6 48.6 26.4 44.7 26.0C44.7 25.5 44.8 25 44.8 24.5C44.8 24 44.5 23.5 44 23Z" fill="#818cf8" opacity="0.3" />
            </svg>
          </div>
        </div>

        {/* SECTION 4 - RECENT BUILDS LEDGER */}
        <div className="flex flex-col gap-2">
          <div className="flex justify-between items-center px-1">
            <h3 className="text-xs font-bold text-white uppercase tracking-wider">Recent Builds</h3>
            <button className="text-xs font-bold text-[#22c55e] hover:text-[#4ade80] transition-colors">View All</button>
          </div>
          
          {/* Komponen Baris Riwayat Selesai */}
          <div className="bg-[#0f1626]/50 border border-slate-800/40 rounded-xl p-3 flex justify-between items-center shadow-md">
            <div className="flex items-center gap-3">
              <div className="text-[#22c55e] bg-emerald-950/20 border border-emerald-900/30 p-2 rounded-xl">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2.5" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="m4.5 12.75 6 6 9-13.5" />
                </svg>
              </div>
              <div>
                <h4 className="text-xs font-bold text-white font-mono tracking-wide">build-7f3a2b1c</h4>
                <p className="text-[11px] text-slate-500 font-medium mt-0.5">example.com</p>
              </div>
            </div>
            <div className="text-right flex items-center gap-3.5">
              <div>
                <span className="text-[11px] font-extrabold text-[#22c55e] bg-emerald-950/30 px-1.5 py-0.5 rounded border border-emerald-900/50">Ready</span>
                <p className="text-[9px] text-slate-500 font-medium font-mono mt-1">Jun 26, 2026 10:15 AM</p>
              </div>
              <button 
                onClick={() => alert("Mengunduh Paket file ZIP...")}
                className="bg-[#070a14] border border-slate-800 hover:border-slate-700 p-2.5 rounded-xl text-slate-300 hover:text-white transition-all shadow active:scale-95"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75V16.5M16.5 12 12 16.5m0 0L7.5 12m4.5 4.5V3" />
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* FIXED BOTTOM NAVIGATION DOCK */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#070a14]/90 border-t border-slate-900 backdrop-blur-xl py-3 flex justify-around items-center z-50 max-w-md mx-auto shadow-2xl">
          <button onClick={() => setActiveTab("home")} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "home" ? "text-[#22c55e]" : "text-slate-500 hover:text-slate-400"}`}>
            <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
              <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
            </svg>
            <span className="text-[10px] font-bold tracking-wide">Home</span>
          </button>
          
          <button onClick={() => setActiveTab("history")} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "history" ? "text-[#22c55e]" : "text-slate-500 hover:text-slate-400"}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" />
            </svg>
            <span className="text-[10px] font-bold tracking-wide">History</span>
          </button>
          
          <button onClick={() => setActiveTab("guide")} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "guide" ? "text-[#22c55e]" : "text-slate-500 hover:text-slate-400"}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 0 0-3.375-3.375h-1.5A1.125 1.125 0 0 1 13.5 7.125v-1.5a3.375 3.375 0 0 0-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 0 0-9-9Z" />
            </svg>
            <span className="text-[10px] font-bold tracking-wide">Guide</span>
          </button>
          
          <button onClick={() => setActiveTab("settings")} className={`flex flex-col items-center gap-1 transition-colors ${activeTab === "settings" ? "text-[#22c55e]" : "text-slate-500 hover:text-slate-400"}`}>
            <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 0 1 1.37.49l1.296 2.247a1.125 1.125 0 0 1-.26 1.43l-1.003.767a1.123 1.123 0 0 0-.417 1.03c.004.074.006.148.006.222 0 .074-.002.148-.006.222a1.123 1.123 0 0 0 .417 1.03l1.003.767a1.125 1.125 0 0 1 .26 1.43l-1.296 2.247a1.125 1.125 0 0 1-1.37.49l-1.216-.456a1.125 1.125 0 0 0-1.075.124c-.073.044-.146.087-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281a1.125 1.125 0 0 0-.646-.87c-.074-.04-.147-.083-.22-.127a1.124 1.124 0 0 0-1.074-.124l-1.217.456a1.125 1.125 0 0 1-1.37-.49l-1.296-2.247a1.125 1.125 0 0 1 .26-1.43l1.002-.767a1.122 1.122 0 0 0 .418-1.03c-.004-.074-.006-.148-.006-.222 0-.074.002-.148.006-.222a1.122 1.122 0 0 0-.418-1.03l-1.002-.767a1.125 1.125 0 0 1-.26-1.43l1.296-2.247a1.125 1.125 0 0 1 1.37-.49l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.218-.128.332-.183.582-.495.645-.869l.214-1.28Z" />
              <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z" />
            </svg>
            <span className="text-[10px] font-bold tracking-wide">Settings</span>
          </button>
        </div>

      </div>
    </div>
  );
}
