import React, { useState, useEffect } from 'react';
import { ChevronDown, MessageCircle, LineChart, Brain, Zap, BookOpen, Target, RefreshCcw, Flame, Users, ExternalLink, Sparkles, Smartphone, ArrowRight } from 'lucide-react';

// === MATH HELPER FOR OPACITY & POSITION ===
const map = (val, inMin, inMax, outMin, outMax) => {
  if (inMin === inMax) return outMin;
  if (val < inMin) return outMin;
  if (val > inMax) return outMax;
  return ((val - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin;
};

const getOpacity = (p, startIn, endIn, startOut, endOut) => {
  if (p < startIn || p > endOut) return 0;
  if (p >= startIn && p <= endIn) return map(p, startIn, endIn, 0, 1);
  if (p > endIn && p < startOut) return 1;
  if (p >= startOut && p <= endOut) return map(p, startOut, endOut, 1, 0);
  return 0;
};

// === STICKMAN SVG COMPONENT ===
const StickmanSVG = ({ className }) => (
  <svg viewBox="0 0 24 36" className={`w-full h-full ${className}`} fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="6" r="4" />
    <line x1="12" y1="10" x2="12" y2="22" />
    <line x1="12" y1="14" x2="5" y2="19" />
    <line x1="12" y1="14" x2="19" y2="19" />
    <line x1="12" y1="22" x2="7" y2="35" />
    <line x1="12" y1="22" x2="17" y2="35" />
  </svg>
);

const App = () => {
  const [globalProgress, setGlobalProgress] = useState(0);
  const [isInStory, setIsInStory] = useState(true);

  // === CORE SCROLL ENGINE ===
  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      const winHeight = window.innerHeight;
      const storyHeight = winHeight * 5; // Kita pakai 5x layar untuk animasi
      
      // Progress untuk area animasi stickman
      const p = scrollTop / storyHeight;
      setGlobalProgress(Math.max(0, Math.min(1, p || 0)));
      
      // Cek apakah sudah melewati area animasi
      setIsInStory(scrollTop < storyHeight);
    };

    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleScroll);
    handleScroll(); 
    
    return () => {
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // === GLOBAL STAIRCASE MATH ===
  const STAIR_COUNT = 4;
  const startX = 15; 
  const startY = 85; 
  const endX = 85;   
  const endY = 20;   
  
  const stepW = (endX - startX) / STAIR_COUNT; 
  const stepH = (startY - endY) / STAIR_COUNT; 

  const val = globalProgress * STAIR_COUNT;
  const stepIndex = Math.min(STAIR_COUNT - 1, Math.floor(val));
  const fraction = val - stepIndex;

  let stickX, stickY;
  if (globalProgress >= 1) {
     stickX = startX + STAIR_COUNT * stepW;
     stickY = startY - STAIR_COUNT * stepH;
  } else {
     if (fraction < 0.5) {
       const hProgress = fraction * 2;
       stickX = startX + stepIndex * stepW + hProgress * stepW;
       stickY = startY - stepIndex * stepH;
     } else {
       const vProgress = (fraction - 0.5) * 2;
       stickX = startX + (stepIndex + 1) * stepW;
       stickY = startY - stepIndex * stepH - vProgress * stepH;
     }
  }

  // === TEXT OPACITY TIMING ===
  const t0 = getOpacity(globalProgress, -0.1, 0.0, 0.15, 0.20); // Intro
  const t1 = getOpacity(globalProgress, 0.22, 0.25, 0.38, 0.42); // Step 1
  const t2 = getOpacity(globalProgress, 0.45, 0.48, 0.62, 0.65); // Step 2
  const t3 = getOpacity(globalProgress, 0.68, 0.72, 0.85, 0.88); // Step 3
  const t4 = getOpacity(globalProgress, 0.90, 0.95, 1.10, 1.20); // End / CTA

  const stepsInfo = [
    {
      id: 1,
      title: "Langkah 1: Akali Otak Emosi",
      subtitle: "Mulai Tanpa Beban",
      desc: "Di tangga pertama, bot kami hanya menyuruh Anda: 'Nyalakan laptop' atau 'Foto meja kerjamu'. Terlalu kecil untuk ditolak oleh otak Anda yang sedang lelah.",
      image: "https://images.unsplash.com/photo-1512428559087-560fa5ceab42?auto=format&fit=crop&w=800&q=80",
      icon: <Brain className="w-5 h-5 text-green-400" />
    },
    {
      id: 2,
      title: "Langkah 2: Rasakan Kemenangan",
      subtitle: "Membangun Momentum",
      desc: "Menyelesaikan instruksi kecil membuat otak merasa 'menang' dan Anda mulai ketagihan menjadi produktif. Secara diam-diam, Anda sedang menyusun portofolio pertama Anda.",
      image: "https://images.unsplash.com/photo-1517842645767-c639042777db?auto=format&fit=crop&w=800&q=80",
      icon: <Zap className="w-5 h-5 text-green-400" />
    },
    {
      id: 3,
      title: "Langkah 3: Mengalir Begitu Saja",
      subtitle: "Eksekusi Otomatis",
      desc: "Kebiasaan baru telah terbentuk. Pekerjaan berat kini terasa sangat mudah. Kami mulai memandu Anda membuat akun freelance atau mengirim penawaran pertama tanpa rasa takut.",
      image: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?auto=format&fit=crop&w=800&q=80",
      icon: <BookOpen className="w-5 h-5 text-green-400" />
    },
    {
      id: 4,
      title: "Langkah 4: Panen Aset Digital",
      subtitle: "Puncak Produktivitas",
      desc: "Anda telah mendaki tanpa kelelahan. Portofolio Anda online, komisi mulai masuk, dan rekam jejak Anda siap ditawarkan ke perusahaan top.",
      image: "https://images.unsplash.com/photo-1554774853-719586f82d77?auto=format&fit=crop&w=800&q=80",
      icon: <Target className="w-5 h-5 text-green-400" />
    }
  ];

  return (
    <div className="relative bg-[#050505] text-white font-sans selection:bg-green-500/30 selection:text-green-200">
      
      {/* === BRAND NAVBAR === */}
      <nav className={`fixed top-0 left-0 w-full p-6 z-50 transition-all duration-500 ${!isInStory ? 'bg-[#050505]/90 backdrop-blur-md border-b border-white/5' : ''}`}>
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-3">
            <LineChart className="h-6 w-6 text-green-500 drop-shadow-[0_0_10px_rgba(34,197,94,0.5)]" strokeWidth={2} />
            <span className="text-xl font-serif tracking-wide font-bold text-white">Be-Cuan.</span>
          </div>
          {!isInStory && (
            <div className="hidden md:flex items-center gap-8 text-sm font-medium text-zinc-400">
              <a href="#sains" className="hover:text-green-400 transition-colors">Sains</a>
              <a href="#fitur" className="hover:text-green-400 transition-colors">Fitur</a>
              <a href="#tangga" className="hover:text-green-400 transition-colors">Metode</a>
            </div>
          )}
          <a href="#mulai" className="bg-green-500/10 hover:bg-green-500/20 text-green-400 border border-green-500/30 text-xs font-bold py-2 px-5 rounded-full transition-all flex items-center gap-2">
            <MessageCircle className="w-4 h-4" />
            Mulai
          </a>
        </div>
      </nav>

      {/* === INTERACTIVE STORY SECTION === */}
      <div className="relative h-[600vh]">
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          
          {/* Background Grid & Stairs */}
          <div className="absolute inset-0 pointer-events-none z-0 opacity-10 bg-[linear-gradient(to_right,#4ade80_1px,transparent_1px),linear-gradient(to_bottom,#4ade80_1px,transparent_1px)] bg-[size:40px_40px]"></div>
          
          <div className="absolute inset-0 pointer-events-none z-0">
            {Array.from({ length: STAIR_COUNT }).map((_, i) => (
              <div key={i} className="absolute border-b-[2px] border-r-[2px] border-green-500/20 shadow-[2px_2px_15px_rgba(34,197,94,0.05)]"
                   style={{
                     left: `${startX + i * stepW}vw`,
                     top: `${startY - (i + 1) * stepH}vh`,
                     width: `${stepW}vw`,
                     height: `${stepH}vh`
                   }}
              />
            ))}
            <div className="absolute font-black tracking-tighter transition-all duration-500"
                 style={{
                   left: `${startX + STAIR_COUNT * stepW}vw`,
                   top: `${startY - STAIR_COUNT * stepH}vh`,
                   transform: 'translate(-20%, -100%)',
                   fontSize: globalProgress > 0.95 ? '6vw' : '3vw',
                   color: globalProgress > 0.95 ? '#4ade80' : '#27272a',
                   textShadow: globalProgress > 0.95 ? '0 0 50px rgba(74,222,128,0.8)' : 'none'
                 }}>
              {globalProgress > 0.95 ? 'CUAN!' : 'TARGET'}
            </div>
          </div>

          {/* Narrative Texts */}
          <div className="absolute top-[20vh] left-[8vw] md:left-[12vw] w-[80vw] md:w-[45vw] z-40 pointer-events-none">
            {/* Intro */}
            <div className="absolute top-0 left-0 transition-opacity duration-300" style={{ opacity: t0 }}>
              <h1 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-[1.1] tracking-tight">
                Punya Target,<br />
                <span className="text-green-500 italic">Tapi Selalu Stuck?</span>
              </h1>
              <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
                Tenang, ini bukan cuma salahmu. Otak kita memang didesain untuk panik dan mencari pelarian saat melihat tugas yang terasa membebani. <br/><br/>
                Mari kita retas sistem ini. Tanpa perlu <i>download</i> aplikasi, perjalananmu dimulai hanya dengan mengirim <strong className="text-white">"Hai"</strong> di WhatsApp.
              </p>
            </div>

            {/* Step 1 */}
            <div className="absolute top-0 left-0 transition-opacity duration-300" style={{ opacity: t1 }}>
              <div className="flex items-center gap-3 mb-4 text-green-400">
                <MessageCircle className="w-6 h-6" />
                <span className="font-mono text-sm tracking-widest uppercase font-bold">Langkah 1</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">Instruksi Super Remeh.</h2>
              <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
                Lupakan manajemen tugas yang rumit. AI kami akan mengirimkan 1 instruksi harian berdurasi 2 menit ke WhatsApp Anda. Terlalu sepele untuk ditunda, namun cukup untuk membuat Anda bergerak.
              </p>
            </div>

            {/* Step 2 */}
            <div className="absolute top-0 left-0 transition-opacity duration-300" style={{ opacity: t2 }}>
              <div className="flex items-center gap-3 mb-4 text-green-400">
                <RefreshCcw className="w-6 h-6" />
                <span className="font-mono text-sm tracking-widest uppercase font-bold">Langkah 2</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">AI yang Beradaptasi.</h2>
              <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
                Mentok pada satu tugas? Malu merekam video? Katakan saja. AI kami otomatis mencari jalan pintas dan menyesuaikan misi agar Anda <strong className="text-white">tidak pernah gagal</strong> hari ini.
              </p>
            </div>

            {/* Step 3 */}
            <div className="absolute top-0 left-0 transition-opacity duration-300" style={{ opacity: t3 }}>
              <div className="flex items-center gap-3 mb-4 text-green-400">
                <Zap className="w-6 h-6" />
                <span className="font-mono text-sm tracking-widest uppercase font-bold">Langkah 3</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-serif text-white mb-6 leading-tight">Membangun Momentum.</h2>
              <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed">
                Menyelesaikan tugas sepele memicu hormon Dopamin. Tanpa disadari, Anda mulai ketagihan mengeksekusi ide dan menyusun portofolio digital secara natural.
              </p>
            </div>

            {/* End / CTA Area */}
            <div className="absolute top-0 left-0 transition-opacity duration-300" style={{ opacity: t4, pointerEvents: t4 > 0.5 ? 'auto' : 'none' }}>
              <div className="flex items-center gap-3 mb-4 text-green-400">
                <Target className="w-6 h-6" />
                <span className="font-mono text-sm tracking-widest uppercase font-bold">Puncak Tangga</span>
              </div>
              <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 leading-tight">Panen Aset Digital.</h2>
              <p className="text-zinc-400 text-lg md:text-xl font-light leading-relaxed mb-8">
                Dalam 30 hari, tumpukan obrolan santaimu di WhatsApp akan disulap AI menjadi portofolio nyata, komisi pertama, dan bukti kerja terverifikasi. 
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <a href="https://wa.me/62895393888923?text=halo%20ini%20bot%20apa%20ya" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-400 text-[#050505] text-lg py-4 px-8 rounded-full transition-all font-bold shadow-[0_0_30px_rgba(34,197,94,0.4)] flex items-center gap-3">
                  <MessageCircle className="w-6 h-6" />
                  Chat "Hai" Sekarang
                </a>
              </div>
            </div>
          </div>

          {/* Stickman */}
          <div className="absolute w-16 h-28 md:w-20 md:h-36 z-50 pointer-events-none transition-all duration-75 ease-linear"
               style={{
                 left: `${stickX}vw`,
                 top: `${stickY}vh`,
                 transform: 'translate(-50%, -100%)',
                 opacity: isInStory ? 1 : 0
               }}>
            <StickmanSVG className="text-green-400 drop-shadow-[0_0_20px_rgba(74,222,128,0.8)]" />
          </div>

          {/* Scroll Hint */}
          <div className="absolute bottom-12 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3 animate-bounce z-40 pointer-events-none" 
               style={{ opacity: Math.max(0, 1 - globalProgress * 15) }}>
            <span className="text-xs md:text-sm font-bold tracking-widest text-green-400 px-6 py-3 bg-zinc-900/80 rounded-full border border-green-500/30 uppercase text-center shadow-[0_0_20px_rgba(34,197,94,0.2)] backdrop-blur-md">
              ↓ Scroll Ke Bawah Untuk Mulai ↓
            </span>
            <ChevronDown className="w-6 h-6 text-green-400" />
          </div>
        </div>
      </div>

      {/* SAINS SECTION */}
      <section id="sains" className="py-40 px-6 lg:px-24 border-t border-white/5 bg-[#0a0a0a]">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-20 items-center">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest uppercase rounded-full">
              Sains Perilaku
            </div>
            <h2 className="text-4xl md:text-6xl font-serif text-white leading-tight font-bold">
              Kenapa <span className="text-green-500 italic font-light">Micro-Stepping</span> Berhasil?
            </h2>
            <p className="text-zinc-400 font-light leading-relaxed text-xl">
              Tugas besar memicu alarm stres di <strong>otak emosi</strong>. Kami meredamnya dengan tindakan yang sangat kecil sehingga tidak terdeteksi sebagai ancaman mental.
            </p>
            <a href="https://behaviormodel.org/" target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-2 mt-4 text-green-500 font-medium hover:text-green-300 transition-colors">
              Referensi Riset Stanford University <ExternalLink className="w-4 h-4" />
            </a>
          </div>
          <div className="flex-1 w-full grid grid-cols-1 sm:grid-cols-2 gap-8">
             <div className="bg-zinc-900/50 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-sm">
               <Brain className="w-12 h-12 text-green-500 mb-6" />
               <h4 className="text-2xl font-bold text-white mb-3">Amigdala Bypass</h4>
               <p className="text-zinc-500 font-light">Mencegah respon panik otak dengan misi berdurasi di bawah 2 menit.</p>
             </div>
             <div className="bg-zinc-900/50 p-10 rounded-[2.5rem] border border-white/5 backdrop-blur-sm">
               <Zap className="w-12 h-12 text-green-500 mb-6" />
               <h4 className="text-2xl font-bold text-white mb-3">Dopamine Loop</h4>
               <p className="text-zinc-500 font-light">Menciptakan kecanduan produktif melalui 'kemenangan' harian di WhatsApp.</p>
             </div>
          </div>
        </div>
      </section>

      {/* FITUR SECTION */}
      <section id="fitur" className="py-40 px-6 lg:px-24 bg-zinc-900/20">
        <div className="max-w-7xl mx-auto text-center mb-24">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-6 font-bold">Didesain Untuk Hasil Nyata.</h2>
          <p className="text-zinc-400 font-light text-xl">Partner produktivitas terbaikmu, 24/7 di WhatsApp.</p>
        </div>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { icon: <MessageCircle />, title: "100% WhatsApp", desc: "Tanpa instal app. Semua misi diselesaikan lewat chat santai." },
            { icon: <RefreshCcw />, title: "AI Adaptif", desc: "Bot kami belajar memahamimu dan memberikan misi yang paling pas." },
            { icon: <Users />, title: "Grup Terkurasi", desc: "Akses komunitas rahasia setelah langkah ke-7 Anda selesai." },
            { icon: <Flame />, title: "Daily Streak", desc: "Sistem gamifikasi yang menjaga Anda untuk tidak pernah berhenti." }
          ].map((f, i) => (
            <div key={i} className="bg-zinc-900/50 p-10 rounded-[2.5rem] border border-white/5 hover:border-green-500/20 transition-all group">
              <div className="w-14 h-14 bg-green-500/10 rounded-2xl flex items-center justify-center mb-8 text-green-500 border border-green-500/20 group-hover:scale-110 transition-transform">
                {f.icon}
              </div>
              <h3 className="text-2xl font-bold text-white mb-4">{f.title}</h3>
              <p className="text-zinc-500 font-light leading-relaxed">{f.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* TANGGA SECTION */}
      <section id="tangga" className="py-40 px-6 lg:px-24 border-t border-white/5">
        <div className="max-w-7xl mx-auto mb-24 text-center md:text-left">
          <h2 className="text-4xl md:text-6xl font-serif text-white mb-8 font-bold">Langkah Demi Langkah.</h2>
          <p className="text-zinc-400 max-w-2xl text-xl font-light leading-relaxed">
            Inilah perjalanan 30 harimu. Kami memandu Anda menyusun aset digital tanpa memicu beban mental yang berat.
          </p>
        </div>
        <div className="max-w-7xl mx-auto flex flex-col gap-24 lg:gap-32">
          {stepsInfo.map((step, index) => (
            <div key={step.id} 
              className={`flex flex-col md:flex-row items-center gap-12 lg:gap-20 w-full lg:w-[85%]
                ${index === 1 ? 'lg:ml-[5%]' : ''}
                ${index === 2 ? 'lg:ml-[10%]' : ''}
                ${index === 3 ? 'lg:ml-[15%]' : ''}
              `}
            >
              <div className="w-full md:w-1/2 p-3 bg-zinc-900/50 backdrop-blur-md rounded-[3rem] border border-white/5 shrink-0 shadow-2xl">
                <div className="relative w-full aspect-[4/3] rounded-[2.5rem] overflow-hidden group">
                   <div className="absolute inset-0 bg-green-500/10 group-hover:bg-transparent transition-colors z-10"></div>
                   <img src={step.image} alt={step.title} className="w-full h-full object-cover opacity-60" />
                   <div className="absolute bottom-6 left-6 z-20 bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 text-green-400">
                      {step.icon}
                   </div>
                </div>
              </div>
              <div className="w-full md:w-1/2 flex flex-col justify-center">
                <div className="text-sm font-bold tracking-widest text-green-500 uppercase mb-4">{step.subtitle}</div>
                <h3 className="text-3xl md:text-4xl font-serif text-white mb-6">{step.title}</h3>
                <p className="text-zinc-400 leading-relaxed font-light text-xl">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* B2B SECTION */}
      <section id="b2b" className="py-40 px-6 lg:px-24 bg-green-950/10 border-t border-white/5">
        <div className="max-w-7xl mx-auto flex flex-col lg:flex-row items-center gap-16">
          <div className="flex-1 space-y-8">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-green-500/10 border border-green-500/30 text-green-400 text-xs font-bold tracking-widest uppercase rounded-full">
              Partner Perusahaan
            </div>
            <h2 className="text-4xl md:text-5xl font-serif text-white leading-tight">
              Rekrut Talenta Berdasarkan <br/><span className="text-green-500 italic">Bukti Eksekusi Nyata.</span>
            </h2>
            <p className="text-lg text-zinc-400 font-light leading-relaxed">
              Kami menyingkirkan bias CV tradisional. Perusahaan Anda mendapatkan akses ke talenta yang telah teruji konsistensi, resiliensi, dan kemampuannya mengeksekusi misi teknis selama 30 hari penuh.
            </p>
            <ul className="space-y-4 pt-4">
              {[
                "Laporan perilaku kandidat berbasis data riil.",
                "Bukti kerja (Proof of Work) yang terverifikasi AI.",
                "Penyaringan kandidat yang 80% lebih cepat."
              ].map((item, i) => (
                <li key={i} className="flex items-start gap-4">
                  <div className="mt-1 bg-green-500/20 p-1.5 rounded-full border border-green-500/30 text-green-500">
                    <Sparkles className="w-3 h-3" />
                  </div>
                  <span className="text-zinc-300 font-light text-base">{item}</span>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex-1 w-full">
            <div className="bg-zinc-900/80 backdrop-blur-md rounded-[2.5rem] p-10 border border-white/10 shadow-2xl">
               <div className="flex justify-between items-center mb-8 border-b border-white/10 pb-6">
                 <div>
                   <h4 className="font-serif text-2xl text-white">Talent Insights</h4>
                   <p className="text-sm text-zinc-500 font-light mt-1">Metrik Konsistensi</p>
                 </div>
                 <div className="text-right">
                   <p className="text-4xl font-serif text-green-500">98%</p>
                   <p className="text-[10px] uppercase tracking-widest text-zinc-500 font-bold mt-1">Selesai</p>
                 </div>
               </div>
               <div className="space-y-8">
                  {[
                    { label: "Ketahanan Eksekusi", val: "Tinggi", w: "90%" },
                    { label: "Kecepatan Adaptasi", val: "Sangat Baik", w: "95%" },
                    { label: "Kualitas Output", val: "Terverifikasi", w: "85%" }
                  ].map((stat, i) => (
                    <div key={i}>
                      <div className="flex justify-between text-sm text-zinc-400 mb-3 font-medium">
                        <span>{stat.label}</span>
                        <span className="text-white font-bold">{stat.val}</span>
                      </div>
                      <div className="w-full bg-black rounded-full h-2 border border-white/5 overflow-hidden">
                        <div className="bg-green-500 h-full shadow-[0_0_15px_rgba(34,197,94,0.8)]" style={{ width: stat.w }}></div>
                      </div>
                    </div>
                  ))}
               </div>
            </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION */}
      <section id="mulai" className="py-40 px-6 text-center bg-[#050505] border-t border-white/5 relative overflow-hidden">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-green-500/5 rounded-full blur-[150px] pointer-events-none"></div>
        <div className="max-w-4xl mx-auto space-y-12 relative z-10">
          <div className="w-24 h-24 bg-green-500/10 rounded-[2rem] flex items-center justify-center mx-auto border border-green-500/20 shadow-[0_0_40px_rgba(34,197,94,0.3)]">
             <Smartphone className="w-12 h-12 text-green-500" />
          </div>
          <h2 className="text-5xl md:text-7xl font-serif text-white leading-tight font-bold">
            Dijamin dalam 30 hari,<br />
            <span className="text-green-500 italic font-light">kamu pasti merasakan perbedaannya dan sudah bisa cuan.</span>
          </h2>
          <p className="text-2xl text-zinc-400 font-light leading-relaxed max-w-2xl mx-auto">
            Perjalanan aset digitalmu dimulai dari satu sapaan santai. Biarkan AI kami yang melakukan pekerjaan beratnya.
          </p>
          <div className="flex justify-center pt-10 flex-col items-center gap-8">
            <a href="https://wa.me/62895393888923?text=halo%20ini%20bot%20apa%20ya" target="_blank" rel="noopener noreferrer" className="bg-green-500 hover:bg-green-400 text-black text-2xl py-6 px-16 rounded-full transition-all font-bold shadow-[0_0_60px_rgba(34,197,94,0.6)] flex items-center gap-4 hover:scale-105 active:scale-95 group">
              <MessageCircle className="w-8 h-8 group-hover:rotate-12 transition-transform" />
              Ambil Langkah Pertama Sekarang
            </a>
            <div className="flex flex-wrap justify-center gap-10 text-zinc-500 text-sm font-bold tracking-widest uppercase">
              <span className="flex items-center gap-2"><Smartphone className="w-4 h-4" /> Tanpa Instal App</span>
              <span className="flex items-center gap-2"><Sparkles className="w-4 h-4" /> AI Personal Mentor</span>
              <span className="flex items-center gap-2"><ArrowRight className="w-4 h-4" /> Mulai Dalam 1 Menit</span>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-[#050505] py-24 px-6 text-center text-zinc-600 font-light relative z-10">
        <div className="max-w-7xl mx-auto">
          <div className="flex items-center justify-center gap-3 mb-10">
            <LineChart className="h-8 w-8 text-green-500" />
            <span className="text-3xl font-serif text-white font-bold tracking-tighter">Be-Cuan.</span>
          </div>
          <p className="text-lg mb-10 max-w-lg mx-auto leading-relaxed">Merancang masa depan finansial melalui kekuatan sains perilaku dan AI. <br/>Dibuat untuk DIGDAYA X Bank Indonesia 2026.</p>
          <div className="flex justify-center gap-10 text-sm mb-16 font-medium uppercase tracking-widest">
            <a href="#" className="hover:text-green-500 transition-colors">Privacy</a>
            <a href="#" className="hover:text-green-500 transition-colors">Terms</a>
            <a href="#" className="hover:text-green-500 transition-colors">Contact</a>
          </div>
          <p className="text-xs uppercase tracking-[0.3em] opacity-20">&copy; 2026 Behavioral Tech Solutions. All Rights Reserved.</p>
        </div>
      </footer>

    </div>
  );
};

export default App;
