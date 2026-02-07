
import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Check, Code, Layout, Database, Layers, Clock, Zap, Send, Instagram, Youtube, Linkedin, Map, Brain, Sparkles, Cpu } from 'lucide-react';
import confetti from 'canvas-confetti';

const questions = [
  // --- Thinking Style (4 Questions) ---
  {
    id: 1,
    question: "When solving a problem, what's your first instinct?",
    options: [
      { text: "Draw the solution", cluster: "Frontend", icon: <Layout className="w-6 h-6" /> },
      { text: "Plan the steps", cluster: "Backend", icon: <Code className="w-6 h-6" /> },
      { text: "Find patterns", cluster: "Data", icon: <Database className="w-6 h-6" /> },
      { text: "Check for risks", cluster: "Security", icon: <Layers className="w-6 h-6" /> }
    ]
  },
  {
    id: 2,
    question: "Which type of project sounds most exciting?",
    options: [
      { text: "Design a Mobile App", cluster: "Frontend", icon: <Layout className="w-6 h-6" /> },
      { text: "Create High-Speed Apps", cluster: "Backend", icon: <Zap className="w-6 h-6" /> },
      { text: "Make a 3D Game", cluster: "GameDev", icon: <Cpu className="w-6 h-6" /> },
      { text: "Train an AI", cluster: "Data", icon: <Brain className="w-6 h-6" /> }
    ]
  },
  {
    id: 3,
    question: "If you were building a house, what would you focus on?",
    options: [
      { text: "The Design & Looks", cluster: "Frontend", icon: <Layout className="w-6 h-6" /> },
      { text: "The Foundation", cluster: "Backend", icon: <Layers className="w-6 h-6" /> },
      { text: "Security & Locks", cluster: "Security", icon: <Check className="w-6 h-6" /> },
      { text: "Smart Gadgets", cluster: "GameDev", icon: <Zap className="w-6 h-6" /> }
    ]
  },
  {
    id: 4,
    question: "What annoys you most in technology?",
    options: [
      { text: "Ugly or Confusing Apps", cluster: "Frontend", icon: <Layout className="w-6 h-6" /> },
      { text: "Slow Speed & Crashing", cluster: "Backend", icon: <Clock className="w-6 h-6" /> },
      { text: "Wrong Information", cluster: "Data", icon: <Database className="w-6 h-6" /> },
      { text: "Getting Hacked", cluster: "Security", icon: <Layers className="w-6 h-6" /> }
    ]
  },

  // --- Interest Signals (3 Questions) ---
  {
    id: 5,
    question: "Which news headline grabs your attention?",
    options: [
      { text: "Newest Design Styles", cluster: "Frontend", icon: <Sparkles className="w-6 h-6" /> },
      { text: "AI Solves Hard Problem", cluster: "Data", icon: <Brain className="w-6 h-6" /> },
      { text: "Bank Gets Hacked", cluster: "Security", icon: <Layers className="w-6 h-6" /> },
      { text: "New Video Game Tech", cluster: "GameDev", icon: <Cpu className="w-6 h-6" /> }
    ]
  },
  {
    id: 6,
    question: "You have a free weekend. What do you do?",
    options: [
      { text: "Design a Website", cluster: "Frontend", icon: <Layout className="w-6 h-6" /> },
      { text: "Create Tools to Save Time", cluster: "Backend", icon: <Code className="w-6 h-6" /> },
      { text: "Predict Future Trends", cluster: "Data", icon: <Database className="w-6 h-6" /> },
      { text: "Play Video Games", cluster: "GameDev", icon: <Cpu className="w-6 h-6" /> }
    ]
  },
  {
    id: 7,
    question: "What's the coolest tech superpower?",
    options: [
      { text: "Create Visual Art", cluster: "GameDev", icon: <Sparkles className="w-6 h-6" /> },
      { text: "Predict the Future", cluster: "Data", icon: <Brain className="w-6 h-6" /> },
      { text: "Be Invisible Online", cluster: "Security", icon: <Layers className="w-6 h-6" /> },
      { text: "Build Huge Systems", cluster: "Backend", icon: <Zap className="w-6 h-6" /> }
    ]
  },

  // --- Reality Check (2 Questions) ---
  {
    id: 8,
    question: "At the end of the day, what feels like a real achievement?",
    options: [
      { text: "Making it Beautiful", cluster: "Frontend", icon: <Layout className="w-6 h-6" /> },
      { text: "Making it Work Perfectly", cluster: "Backend", icon: <Code className="w-6 h-6" /> },
      { text: "Finding Hidden Secrets", cluster: "Data", icon: <Database className="w-6 h-6" /> },
      { text: "Stopping Hackers", cluster: "Security", icon: <Layers className="w-6 h-6" /> }
    ]
  },
  {
    id: 9,
    question: "Which work environment sounds best?",
    options: [
      { text: "Creative & Visual", cluster: "Frontend", icon: <Sparkles className="w-6 h-6" /> },
      { text: "Logical & Organized", cluster: "Backend", icon: <Code className="w-6 h-6" /> },
      { text: "Serious & Protective", cluster: "Security", icon: <Check className="w-6 h-6" /> },
      { text: "Fun & Playful", cluster: "GameDev", icon: <Cpu className="w-6 h-6" /> }
    ]
  }
];

export default function App() {
  const [step, setStep] = useState('hero'); // hero, assessment, lead-magnet, success
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState({});
  const [userData, setUserData] = useState({ name: '', whatsapp: '' });
  const [showRoadmapPopup, setShowRoadmapPopup] = useState(false);
  const [result, setResult] = useState(null);
  const [analyzingText, setAnalyzingText] = useState('Initializing AI Model...');
  const [isScrolled, setIsScrolled] = useState(false);
  const [timeLeft, setTimeLeft] = useState(12);


  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Timer Effect
  useEffect(() => {
    if (step === 'assessment' && timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    }
  }, [timeLeft, step]);


  const startAssessment = () => {
    setStep('assessment');
    setCurrentQuestionIndex(0);
    setAnswers({});
    setResult(null);
    setTimeLeft(12);
    // smooth scroll if needed, but we are replacing the view or staying in place
  };

  const handleAnswer = (optionText) => {
    const newAnswers = { ...answers, [currentQuestionIndex]: optionText };
    setAnswers(newAnswers);

    if (currentQuestionIndex < questions.length - 1) {
      setTimeout(() => {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
        setTimeLeft(12); // Reset timer for next question
      }, 300);
    } else {
      setTimeout(() => calculateAndAdvance(newAnswers), 300);
    }
  };

  const calculateAndAdvance = (finalAnswers) => {
    // Scoring
    const scores = {
      'Frontend': 0,
      'Backend': 0,
      'Data': 0,
      'Security': 0,
      'GameDev': 0
    };

    // Calculate scores based on the 'cluster' property of the selected answer
    Object.keys(finalAnswers).forEach(qIndex => {
      const selectedOption = questions[qIndex].options.find(opt => opt.text === finalAnswers[qIndex]);
      if (selectedOption && selectedOption.cluster) {
        scores[selectedOption.cluster]++;
      }
    });

    // Find the winner
    let maxScore = -1;
    let winner = 'Frontend'; // Default

    Object.entries(scores).forEach(([cluster, score]) => {
      if (score > maxScore) {
        maxScore = score;
        winner = cluster;
      } else if (score === maxScore) {
        // Tie-breaker logic can be enhanced here if needed
        // For now, prioritize: Backend > Data > Security > GameDev > Frontend
        // (Simple precedence or leave as is)
      }
    });

    // Map internal cluster keys to Display Names
    const clusterToDisplayName = {
      'Frontend': 'Frontend Developer',
      'Backend': 'Full Stack Developer', // Mapping "Application Builders" to Full Stack as requested
      'Data': 'Data Scientist',
      'Security': 'Cybersecurity Specialist',
      'GameDev': 'Game Developer'
    };

    setResult(clusterToDisplayName[winner] || 'Full Stack Developer');
    setStep('analyzing');
    // Start directly with the first real stage
    setAnalyzingText('Analysing your thinking style...');

    setTimeout(() => setAnalyzingText('Finding suitable IT careers...'), 2200);
    setTimeout(() => setAnalyzingText('Creating your personal roadmap...'), 4400);

    setTimeout(() => {
      setStep('lead-magnet');
    }, 6600);
  };

  const handleLeadSubmit = (e) => {
    e.preventDefault();
    if (!userData.name || !userData.whatsapp) return;

    // Payload
    const payload = {
      user_name: userData.name,
      phone_number: userData.whatsapp,
      assigned_path: result,
      language_preference: "Malayalam/English mix" // Static for now as per requirements
    };

    console.log("Sending payload:", payload);
    // Simulate API call
    setTimeout(() => {
      setStep('success');
      // Trigger Confetti
      confetti({
        particleCount: 150,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#FF0000', '#FFD700', '#0000FF']
      });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-white text-slate-800 font-sans selection:bg-blue-200 relative overflow-x-hidden">

      {/* Decorative Left-Side Gradient Blob */}
      {/* Optimized Background using CSS Radial Gradients (No heavy blurs) */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(186,230,253,0.4)_0%,transparent_70%)] blur-3xl"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-[radial-gradient(circle,rgba(186,230,253,0.4)_0%,transparent_70%)] blur-3xl"></div>
      </div>

      {/* Header/Nav */}
      <nav className={`w-full fixed top-0 z-50 transition-all duration-300 ${isScrolled ? 'bg-white shadow-sm border-b border-slate-100' : 'bg-transparent border-b border-transparent'}`}>
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-3 md:py-4 flex justify-between items-center">
          <div className="flex items-center cursor-pointer" onClick={() => window.location.reload()}>
            <img src="/logo.png" alt="Brototype" className="h-10 md:h-12 w-auto" />
          </div>
          <button
            onClick={startAssessment}
            disabled={step !== 'hero'}
            className={`px-8 py-3 font-bold rounded-xl shadow-lg transition-all text-base bg-gradient-to-r from-blue-600 to-sky-500 text-white ${step !== 'hero'
              ? 'opacity-80 cursor-not-allowed'
              : 'hover:shadow-xl hover:scale-105'
              }`}
          >
            Get Started
          </button>
        </div>
      </nav>

      <main className="max-w-[1600px] mx-auto px-4 pt-12 md:pt-20 pb-8 md:pb-12 flex flex-col items-center justify-center min-h-screen">
        <AnimatePresence mode="wait">

          {step === 'hero' && (
            <motion.div
              key="hero"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="text-center space-y-6 md:space-y-8"
            >
              <div className="space-y-5">
                <h1 className="text-[1.6rem] sm:text-2xl md:text-6xl font-black text-slate-900 leading-tight tracking-tighter pb-1">
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">AI</span> ഉപയോഗിച്ച് നിങ്ങൾക്ക് പറ്റിയ <br />
                  <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">IT Career</span> തിരഞ്ഞെടുക്കാം, <br />
                  വെറും <span className="bg-clip-text text-transparent bg-gradient-to-r from-sky-500 to-blue-600">2</span> മിനിറ്റിൽ...
                </h1>
                <p className="text-xl md:text-2xl text-slate-600 font-medium leading-relaxed">
                  Find your perfect IT career path <br className="md:hidden" />
                  using AI in just 2 minutes!
                </p>
              </div>

              <div className="relative w-[95%] md:w-auto inline-block mt-6 md:mt-0">
                <div className="absolute inset-0 bg-blue-500 rounded-2xl blur-lg opacity-50 animate-pulse"></div>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  onClick={startAssessment}
                  className="group relative z-10 w-full md:w-auto justify-center inline-flex items-center gap-2 md:gap-3 px-4 py-3.5 md:px-8 md:py-4 bg-gradient-to-r from-sky-400 to-blue-600 text-white rounded-2xl text-lg md:text-xl font-bold shadow-xl shadow-blue-400/50 hover:shadow-2xl hover:brightness-105 transition-all ring-4 ring-blue-500/20 overflow-hidden whitespace-nowrap"
                >
                  {/* Moving Shimmer Effect */}
                  <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none rounded-2xl">
                    <motion.div
                      initial={{ x: '-100%' }}
                      animate={{ x: '400%' }}
                      transition={{
                        repeat: Infinity,
                        repeatType: "loop",
                        duration: 3,
                        ease: "linear",
                        repeatDelay: 2
                      }}
                      className="absolute top-0 left-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/40 to-transparent skew-x-[-20deg]"
                    />
                  </div>

                  <span className="relative z-10">Start My Assessment</span>
                  <ArrowRight className="relative z-10 w-5 h-5 md:w-6 md:h-6 group-hover:translate-x-1 transition-transform" />
                </motion.button>
              </div>

              <div className="pt-4 md:pt-12 flex gap-4 md:gap-8 justify-center text-slate-400 text-sm md:text-base">
                <div className="flex items-center gap-1.5 md:gap-2"><Clock className="w-4 h-4 md:w-5 md:h-5" /> 2 Mins</div>
                <div className="flex items-center gap-1.5 md:gap-2"><Zap className="w-4 h-4 md:w-5 md:h-5" /> AI Powered</div>
              </div>
            </motion.div>
          )}

          {step === 'assessment' && (
            <motion.div
              key="assessment"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full max-w-xl md:max-w-4xl"
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl p-6 md:p-12 border border-white/50 relative overflow-hidden">
                {/* Enhanced Progress Stepper */}
                <div className="mb-10 relative px-2">
                  {/* Background Line */}
                  <div className="absolute top-1/2 left-0 w-full h-1.5 bg-slate-100 -translate-y-1/2 rounded-full z-0"></div>

                  {/* Active Progress Line */}
                  <motion.div
                    className="absolute top-1/2 left-0 h-1.5 bg-green-500 -translate-y-1/2 rounded-full z-0 origin-left"
                    initial={{ width: "0%" }}
                    animate={{ width: `${(currentQuestionIndex / (questions.length - 1)) * 100}%` }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                  />

                  {/* Steps */}
                  <div className="flex justify-between relative z-10 w-full">
                    {questions.map((q, idx) => {
                      const isCompleted = idx < currentQuestionIndex;
                      const isCurrent = idx === currentQuestionIndex;

                      return (
                        <div key={q.id} className="relative flex flex-col items-center">
                          <motion.div
                            initial={false}
                            animate={{
                              backgroundColor: isCompleted ? "#22c55e" : isCurrent ? "#2563eb" : "#ffffff",
                              borderColor: isCompleted ? "#22c55e" : isCurrent ? "#2563eb" : "#e2e8f0",
                              scale: isCurrent ? 1.2 : 1
                            }}
                            className={`flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-full border-2 md:border-4 transition-all duration-300 shadow-md ${isCompleted || isCurrent ? 'shadow-lg' : ''}`}
                          >
                            {isCompleted ? (
                              <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 260, damping: 20 }}
                              >
                                <Check className="w-5 h-5 md:w-6 md:h-6 text-white stroke-[3]" />
                              </motion.div>
                            ) : isCurrent ? (
                              <div className="w-2.5 h-2.5 md:w-3 md:h-3 bg-white rounded-full animate-ping" />
                            ) : (
                              <span className="text-xs md:text-sm text-slate-400 font-bold">{idx + 1}</span>
                            )}
                          </motion.div>

                          {/* Step Label (Optional, for current only maybe?) */}
                          {isCurrent && (
                            <motion.span
                              initial={{ opacity: 0, y: -10 }}
                              animate={{ opacity: 1, y: 5 }}
                              className="absolute top-full mt-1 text-[10px] font-bold text-blue-600 uppercase tracking-widest min-w-max hidden md:block"
                            >
                              Step {idx + 1}
                            </motion.span>
                          )}
                        </div>
                      )
                    })}
                  </div>
                </div>

                <AnimatePresence mode="wait">
                  <motion.div
                    key={currentQuestionIndex}
                    initial={{ x: 20, opacity: 0 }}
                    animate={{ x: 0, opacity: 1 }}
                    exit={{ x: -20, opacity: 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <div className="mt-4 mb-8">
                      <span className="text-blue-600 font-bold uppercase tracking-wider text-sm">
                        Question {currentQuestionIndex + 1} of {questions.length}
                      </span>
                      <h2 className="text-xl md:text-3xl font-bold text-slate-900 mt-2 leading-snug">
                        {questions[currentQuestionIndex].question}
                      </h2>
                    </div>

                    {/* Timer Progress Bar */}
                    <div className="flex items-center gap-3 mb-6">
                      <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full transition-colors duration-300 ${timeLeft < 5 ? 'bg-red-500' : timeLeft < 9 ? 'bg-amber-500' : 'bg-green-500'}`}
                          initial={{ width: "100%" }}
                          animate={{ width: `${(timeLeft / 12) * 100}%` }}
                          transition={{ duration: 1, ease: "linear" }}
                        />
                      </div>
                      <div className={`text-xs font-bold whitespace-nowrap ${timeLeft < 5 ? 'text-red-500' : 'text-slate-400'}`}>
                        {timeLeft}s left
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {questions[currentQuestionIndex].options.map((opt, idx) => (
                          <button
                            key={idx}
                            onClick={() => handleAnswer(opt.text)}
                            className="p-4 md:p-5 rounded-2xl border-2 border-slate-100 hover:border-blue-500 hover:bg-blue-50/50 transition-all text-left group flex items-center gap-3 md:gap-4 w-full shadow-sm hover:shadow-md bg-white"
                          >
                            <div className="p-2.5 md:p-3 bg-blue-100/50 text-blue-600 rounded-xl shrink-0 group-hover:scale-110 transition-transform">
                              {opt.icon}
                            </div>
                            <span className="font-semibold text-sm md:text-lg text-slate-700 group-hover:text-slate-900 leading-snug">
                              {opt.text}
                            </span>
                          </button>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                </AnimatePresence>
              </div>
            </motion.div>
          )}

          {step === 'analyzing' && (
            <motion.div
              key="analyzing"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 1.05 }}
              className="w-full max-w-lg bg-white/90 backdrop-blur-2xl p-12 rounded-3xl shadow-2xl border border-white/60 text-center relative overflow-hidden"
            >
              {/* Complex Background Tech Effect */}
              <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
                <div className="absolute top-0 left-0 w-full h-full bg-[linear-gradient(rgba(59,130,246,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(59,130,246,0.1)_1px,transparent_1px)] bg-[size:40px_40px]"></div>
                <motion.div
                  initial={{ y: '-100%' }}
                  animate={{ y: '100%' }}
                  transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
                  className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-blue-400/20 to-transparent"
                />
              </div>

              <div className="relative z-10 flex flex-col items-center">
                <div className="w-32 h-32 mb-10 relative flex items-center justify-center">
                  {/* Outer Pulsing Ring */}
                  <motion.div
                    animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.6, 0.3] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="absolute inset-0 rounded-full bg-blue-100 blur-xl"
                  />

                  {/* Rotating Dashed Rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 rounded-full border border-dashed border-blue-200"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-2 rounded-full border border-dotted border-indigo-300"
                  />

                  {/* Active Segment Rings */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-0 rounded-full border-t-4 border-r-4 border-transparent border-t-blue-500 border-r-blue-500 rounded-full"
                  />
                  <motion.div
                    animate={{ rotate: -360 }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute inset-4 rounded-full border-b-2 border-l-2 border-transparent border-b-sky-500 border-l-sky-500 rounded-full"
                  />

                  {/* Central Brain Icon with Pulse */}
                  <motion.div
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 1, repeat: Infinity }}
                    className="bg-white p-5 rounded-2xl shadow-xl shadow-blue-200/50 relative z-10"
                  >
                    {analyzingText === 'Analysing your thinking style...' && <Cpu className="w-12 h-12 text-purple-600" />}
                    {analyzingText === 'Finding suitable IT careers...' && <Database className="w-12 h-12 text-amber-500" />}
                    {analyzingText === 'Creating your personal roadmap...' && <Map className="w-12 h-12 text-green-500" />}
                    {analyzingText === 'Initializing AI Model...' && <Brain className="w-12 h-12 text-blue-600" />}
                  </motion.div>
                </div>

                <motion.h2
                  key={analyzingText} // key change triggers animation
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="text-2xl md:text-3xl font-bold text-slate-900 mb-4 h-16 flex items-center justify-center"
                >
                  {analyzingText}
                </motion.h2>

                <p className="text-slate-500 font-medium animate-pulse">
                  AI is calibrating your personalized roadmap...
                </p>

                {/* Advanced Loading Bar */}
                <div className="w-full max-w-xs h-3 bg-slate-100 rounded-full mt-8 overflow-hidden relative shadow-inner">
                  <motion.div
                    className="h-full bg-gradient-to-r from-blue-600 via-sky-400 to-blue-600 background-animate"
                    initial={{ x: "-100%" }}
                    animate={{ x: "100%" }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                    style={{ backgroundSize: '200% 100%' }}
                  />
                  {/* Processing blips */}
                  <motion.div
                    animate={{ opacity: [0, 1, 0] }}
                    transition={{ duration: 0.5, repeat: Infinity, repeatDelay: 0.2 }}
                    className="absolute top-0 right-0 h-full w-2 bg-white/50 blur-[2px]"
                  />
                </div>


              </div>
            </motion.div>
          )}

          {step === 'lead-magnet' && (
            <motion.div
              key="lead-magnet"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              className="w-full max-w-md bg-white/90 backdrop-blur-xl p-8 rounded-3xl shadow-2xl border border-white/50"
            >
              <div className="text-center mb-8">
                <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg shadow-green-200 animate-bounce">
                  <Check className="w-8 h-8 text-white stroke-[3]" />
                </div>
                <h2 className="text-2xl font-bold text-slate-900">Your Career Result is Ready!</h2>
                <p className="text-slate-600 mt-2">Enter your WhatsApp number <br /> to know your career result</p>
              </div>

              <form onSubmit={handleLeadSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Full Name</label>
                  <input
                    type="text"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter your Name"
                    value={userData.name}
                    onChange={e => setUserData({ ...userData, name: e.target.value })}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">WhatsApp Number</label>
                  <input
                    type="tel"
                    required
                    className="w-full px-4 py-3 rounded-xl border border-slate-200 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all"
                    placeholder="Enter your WhatsApp Number"
                    value={userData.whatsapp}
                    onChange={e => setUserData({ ...userData, whatsapp: e.target.value })}
                  />
                </div>
                <button
                  type="submit"
                  className="w-full py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-xl font-bold text-lg hover:from-green-600 hover:to-emerald-700 shadow-2xl shadow-green-500/40 border-t border-white/30 ring-1 ring-white/20 transform hover:scale-[1.02] active:scale-[0.98] transition-all flex items-center justify-center gap-2 relative overflow-hidden"
                >
                  <div className="absolute top-0 left-0 w-full h-1/2 bg-gradient-to-b from-white/20 to-transparent pointer-events-none"></div>
                  <span className="relative z-10 flex items-center gap-2">
                    Get My Roadmap <svg viewBox="0 0 24 24" className="w-5 h-5 fill-current" xmlns="http://www.w3.org/2000/svg"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.008-.57-.008-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                  </span>
                </button>
              </form>
            </motion.div>
          )}

          {step === 'success' && (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              className="w-full px-4 md:px-0 md:max-w-[85%] lg:max-w-[80%] xl:max-w-[75%]"
            >
              <div className="bg-white/80 backdrop-blur-2xl rounded-[2rem] shadow-2xl border border-white/50 overflow-hidden">
                <div className="grid grid-cols-1 md:grid-cols-12 md:min-h-[500px]">

                  {/* Left Side: Visuals & Headline */}
                  {/* Left Side: Visuals */}
                  <div className="md:col-span-5 bg-gradient-to-br from-blue-50/50 to-indigo-50/20 p-5 md:p-8 flex flex-col items-center justify-center text-center relative border-b md:border-b-0 md:border-r border-white/60">
                    {/* Decorative blobs */}
                    <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                      <div className="absolute -top-10 -left-10 w-40 h-40 bg-blue-100 rounded-full blur-3xl opacity-40"></div>
                      <div className="absolute bottom-0 right-0 w-40 h-40 bg-indigo-100 rounded-full blur-3xl opacity-40"></div>
                    </div>

                    <img
                      src={
                        result === 'Frontend Developer' ? '/frontend_char.png' :
                          result === 'Full Stack Developer' ? '/fullstack_char.png' :
                            result === 'Data Scientist' ? '/data_char.png' :
                              result === 'Cybersecurity Specialist' ? '/security_char.png' :
                                result === 'Game Developer' ? '/gamedev_char.png' :
                                  '/fullstack_char.png' // Default
                      }
                      alt={result}
                      className="w-32 h-32 md:w-72 md:h-72 object-contain relative z-10 drop-shadow-2xl hover:scale-105 transition-transform duration-500"
                    />
                  </div>

                  {/* Right Side: Content & CTA */}
                  <div className="md:col-span-7 p-4 md:p-6 flex flex-col justify-center text-left bg-white/40">

                    <div className="mb-4">
                      <span className="inline-block px-3 py-1 md:px-4 md:py-1.5 bg-blue-100 text-blue-700 text-xs md:text-sm font-bold uppercase tracking-wider mb-2 rounded-full">
                        Congratulations, {userData.name}!
                      </span>
                      <h2 className="text-xl md:text-3xl font-bold text-slate-900 leading-tight">
                        {result === 'Frontend Developer' && <>You’re built to be a <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-500">Frontend Developer</span>.</>}
                        {result === 'Full Stack Developer' && <>You’re built to be a <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-sky-500">Full Stack Developer</span>.</>}
                        {result === 'Data Scientist' && <>You’re built to be a <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-600 to-pink-500">Data Scientist</span>.</>}
                        {result === 'Cybersecurity Specialist' && <>You’re built to be a <span className="bg-clip-text text-transparent bg-gradient-to-r from-slate-700 to-red-500">Cybersecurity Specialist</span>.</>}
                        {result === 'Game Developer' && <>You’re built to be a <span className="bg-clip-text text-transparent bg-gradient-to-r from-orange-500 to-yellow-500">Game Developer</span>.</>}
                      </h2>
                    </div>

                    <div className="prose prose-slate text-slate-600 leading-relaxed mb-4 text-sm md:text-base">
                      <p className="mb-0">
                        {result === 'Frontend Developer' && "You care about how things look and feel. You enjoy making ideas simple, clean, and easy for people to use."}
                        {result === 'Full Stack Developer' && "You enjoy understanding how things work behind the scenes. You like solving problems and building strong systems."}
                        {result === 'Data Scientist' && "You see the world in patterns and numbers. You love teaching computers to predict the future and finding truth in data."}
                        {result === 'Cybersecurity Specialist' && "You have a protective instinct and a detective's mind. You love finding vulnerabilities before the bad guys do."}
                        {result === 'Game Developer' && "You blend creativity with logic to build immersive worlds. You love interactive experiences and pushing boundaries."}
                      </p>
                    </div>

                    <div className="bg-green-50/80 border border-green-100 rounded-2xl p-6 md:p-8 mb-6 text-center relative overflow-hidden">
                      <div className="absolute top-0 right-0 w-20 h-20 bg-green-100 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2 opacity-60"></div>

                      <div className="relative z-10 flex flex-col items-center">
                        <div className="inline-flex items-center justify-center gap-2 mb-3 px-3 py-1">

                          <h3 className="text-lg md:text-xl font-bold text-slate-900">
                            Your Career Blueprint is Ready!
                          </h3>
                        </div>

                        <p className="text-slate-600 mb-4 text-base md:text-lg leading-relaxed max-w-lg mx-auto">
                          We’ve just sent a Step-by-Step <span className="text-green-600 font-bold whitespace-nowrap">{result} Roadmap</span> to your WhatsApp.
                        </p>

                        <div className="bg-white/80 py-2 px-4 rounded-xl border border-green-100 shadow-sm inline-block">
                          <p className="text-xs md:text-sm text-slate-600 font-medium">
                            It covers everything from your <span className="font-semibold text-slate-800">first line of code</span> to your <span className="font-bold text-slate-800">first ₹40k+ job</span>.
                          </p>
                        </div>
                      </div>
                    </div>

                    <div className="flex flex-col">
                      <span className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Want to start right now?</span>
                      <a
                        href="https://www.youtube.com/@BrototypeMalayalam"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full py-3 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-bold text-base shadow-lg hover:shadow-xl hover:-translate-y-0.5 transition-all flex items-center justify-center gap-2 group"
                      >
                        <svg className="w-6 h-6" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                          <path fill="#FF0000" d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816z" />
                          <path fill="#FFFFFF" d="M9.615 8.816l8 3.993-8 4.007z" />
                        </svg>
                        Start Learning for Free
                        <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform text-blue-300" />
                      </a>

                    </div>

                  </div>

                </div>
              </div>
            </motion.div>
          )}




        </AnimatePresence>
      </main>
      <footer className="w-full bg-white border-t border-slate-100 py-8 md:py-16 mt-auto">
        <div className="max-w-7xl mx-auto px-4 md:px-8 flex flex-col md:flex-row justify-between items-center gap-6 md:gap-8">

          {/* Left: Logo */}
          <div className="flex-1 flex justify-center md:justify-start">
            <img src="/logo.png" alt="Brototype" className="h-10 md:h-12 w-auto grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all" />
          </div>

          {/* Center: Links & Contact */}
          <div className="flex-[2] flex flex-col items-center gap-3 text-slate-400 text-base font-medium text-center">
            <div className="flex flex-col md:flex-row gap-2 md:gap-8 items-center">
              <a href="https://learningclub.brototype.com/privacy-policy" target="_blank" rel="noopener noreferrer" className="hover:bg-gradient-to-r hover:from-blue-600 hover:to-sky-500 hover:bg-clip-text hover:text-transparent transition-all duration-300">Privacy Policy</a>
              <span className="hidden md:inline text-slate-300">|</span>
              <a href="tel:+917034395811" className="hover:bg-gradient-to-r hover:from-blue-600 hover:to-sky-500 hover:bg-clip-text hover:text-transparent transition-all duration-300">For any queries: +91 70343 95811</a>
            </div>
            <div className="text-sm mt-6 pt-4 border-t border-slate-50 w-full max-w-xs md:max-w-md">
              © {new Date().getFullYear()} Brototype. All rights reserved.
            </div>
          </div>

          {/* Right: Socials */}
          <div className="flex-1 flex justify-center md:justify-end gap-8 text-slate-400">
            <a href="https://www.instagram.com/brototype.malayalam/" target="_blank" rel="noopener noreferrer" className="hover:text-[#E4405F] hover:scale-110 transition-all">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M7.75 2h8.5A5.75 5.75 0 0122 7.75v8.5A5.75 5.75 0 0116.25 22h-8.5A5.75 5.75 0 012 16.25v-8.5A5.75 5.75 0 017.75 2zm0 1.5A4.25 4.25 0 003.5 7.75v8.5a4.25 4.25 0 004.25 4.25h8.5a4.25 4.25 0 004.25-4.25v-8.5a4.25 4.25 0 00-4.25-4.25h-8.5zM12 7a5 5 0 110 10 5 5 0 010-10zm0 1.5a3.5 3.5 0 100 7 3.5 3.5 0 000-7zM18 7a1 1 0 110-2 1 1 0 010 2z" />
              </svg>
            </a>
            <a href="https://www.youtube.com/@BrototypeMalayalam" target="_blank" rel="noopener noreferrer" className="hover:text-[#FF0000] hover:scale-110 transition-all">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
            </a>
            <a href="https://www.linkedin.com/company/brototype/mycompany/" target="_blank" rel="noopener noreferrer" className="hover:text-[#0A66C2] hover:scale-110 transition-all">
              <svg className="w-7 h-7" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
              </svg>
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
