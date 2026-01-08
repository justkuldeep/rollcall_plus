import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Volume2,
  Clock,
  Lock,
  ArrowRight,
  Waves,
  Smartphone,
  Zap,
  ShieldCheck,
  Cpu,
  Globe,
  CheckCircle2,
  LockKeyhole,
  Github
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { SoundWaveAnimation } from "@/components/SoundWaveAnimation";

export default function Index() {
  const navigate = useNavigate();

  const features = [
    {
      icon: Volume2,
      title: "Ultrasonic Verification",
      description: "Attendance via encrypted ultrasonic waves, invisible yet precise.",
    },
    {
      icon: ShieldCheck,
      title: "Proxy-Proof System",
      description: "Advanced device + time-window based validation for 100% accuracy.",
    },
    {
      icon: Clock,
      title: "10-Minute Secure Session",
      description: "Attendance is only valid during the live classroom window.",
    },
    {
      icon: Zap,
      title: "Real-Time Sync",
      description: "Instant attendance reflection on your dashboard with zero delay.",
    },
  ];

  const steps = [
    { number: "01", title: "Start Session", desc: "Faculty initiates the pulse" },
    { number: "02", title: "Broadcast", desc: "Ultrasonic signal is sent" },
    { number: "03", title: "Detect", desc: "Student devices verify signal" },
    { number: "04", title: "Verified", desc: "Attendance marked securely" },
  ];

  return (
    <div className="min-h-screen bg-[#020817] text-white selection:bg-primary/30 overflow-x-hidden font-sans">
      {/* Background Ambient Elements */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-primary/10 rounded-full blur-[120px] animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[50%] h-[50%] bg-accent/10 rounded-full blur-[120px] animate-pulse" style={{ animationDelay: '2s' }} />
        <div className="absolute inset-0 opacity-[0.03]"
          style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, white 1px, transparent 0)', backgroundSize: '40px 40px' }} />
      </div>

      {/* Navigation */}
      <nav className="relative z-50 flex items-center justify-between px-8 py-6 max-w-7xl mx-auto backdrop-blur-md bg-white/5 border border-white/10 rounded-2xl mt-6 mx-6">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-primary via-accent to-cyan flex items-center justify-center shadow-lg shadow-primary/20">
            <Waves className="w-6 h-6 text-white" />
          </div>
          <span className="text-xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
            SonicAttend
          </span>
        </div>
        <div className="hidden md:flex items-center gap-8 text-[13px] uppercase tracking-widest font-bold">
          <button onClick={() => navigate('/admin/users')} className="text-white/40 hover:text-primary transition-colors">Users</button>
          <button onClick={() => navigate('/admin/academic')} className="text-white/40 hover:text-primary transition-colors">Academic</button>
          <button onClick={() => navigate('/admin/reports')} className="text-white/40 hover:text-primary transition-colors">Analytics</button>
          <div className="h-4 w-px bg-white/10 mx-2" />
          <Button variant="outline" className="h-10 border-white/10 bg-white/5 hover:bg-white/10 rounded-xl" onClick={() => navigate('/login')}>Sign In</Button>
          <Button variant="hero" className="h-10 rounded-xl" onClick={() => navigate('/signup')}>Sign Up</Button>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="relative z-10 pt-20 pb-32 px-6 flex flex-col items-center text-center">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-4xl"
        >
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-primary/10 border border-primary/20 text-primary text-[10px] font-black uppercase tracking-[0.2em] mb-10">
            <Cpu className="w-3.5 h-3.5" /> Encrypted Ultrasonic Attendance
          </div>
          <h1 className="text-6xl md:text-8xl font-black tracking-tighter leading-[0.9] mb-8">
            Smart Attendance. <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary via-accent to-cyan">
              Zero Proxy.
            </span>
          </h1>
          <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto leading-relaxed mb-12 font-medium">
            Proximity-based verification powered by sound.
            No proxies, no manual entry, purely acoustic authentication.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Button
              size="xl"
              className="px-10 h-16 text-sm uppercase tracking-widest font-black rounded-2xl bg-primary hover:bg-primary/90 shadow-[0_0_30px_rgba(59,130,246,0.3)] transition-all hover:scale-105 active:scale-95 group"
              onClick={() => navigate('/login?role=student')}
            >
              Login as Student
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
            <Button
              size="xl"
              variant="outline"
              className="px-10 h-16 text-sm uppercase tracking-widest font-black rounded-2xl border-white/10 bg-white/5 hover:bg-white/10 shadow-[0_0_20px_rgba(255,255,255,0.05)] transition-all hover:scale-105 active:scale-95"
              onClick={() => navigate('/login?role=faculty')}
            >
              Login as Faculty
            </Button>
          </div>
        </motion.div>

        {/* Animated Wave Visualization */}
        <div className="mt-20 w-full max-w-5xl h-64 relative flex items-center justify-center overflow-hidden rounded-[3rem] border border-white/5 bg-white/[0.02] backdrop-blur-3xl">
          <div className="absolute inset-0 bg-gradient-to-b from-primary/5 to-transparent" />
          <SoundWaveAnimation isActive={true} size="lg" className="scale-[2] opacity-50" />
          <div className="absolute bottom-8 flex flex-col items-center">
            <div className="text-[10px] font-mono tracking-[0.5em] text-white/30 uppercase mb-2">Analyzing Spectrum</div>
            <div className="h-1 w-32 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-primary"
                animate={{ x: ["-100%", "100%"] }}
                transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feature Section */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="p-8 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-sm group hover:bg-white/[0.08] hover:border-primary/30 transition-all cursor-default"
              >
                <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-primary/20 to-accent/20 flex items-center justify-center mb-6 group-hover:shadow-[0_0_30px_rgba(59,130,246,0.2)] transition-shadow">
                  <feature.icon className="w-7 h-7 text-primary" />
                </div>
                <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                <p className="text-white/40 text-sm leading-relaxed">{feature.description}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="relative z-10 py-32 px-6 bg-white/[0.01]">
        <div className="max-w-7xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-20 tracking-tight">How It Works</h2>
          <div className="relative flex flex-col lg:flex-row items-center justify-between gap-12 lg:gap-0">
            {/* Connecting line for desktop */}
            <div className="hidden lg:block absolute top-[28px] left-[10%] right-[10%] h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent z-0" />

            {steps.map((step, idx) => (
              <div key={idx} className="relative z-10 flex flex-col items-center max-w-[200px]">
                <div className="w-14 h-14 rounded-full bg-[#020817] border border-white/10 flex items-center justify-center text-primary font-black mb-6 shadow-xl">
                  {step.number}
                </div>
                <h4 className="text-lg font-bold mb-2">{step.title}</h4>
                <p className="text-white/30 text-sm">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Live Status Preview */}
      <section className="relative z-10 py-32 px-6">
        <div className="max-w-3xl mx-auto rounded-[2.5rem] p-[1px] bg-gradient-to-r from-primary/30 via-accent/30 to-cyan/30 overflow-hidden shadow-2xl">
          <div className="bg-[#020817]/90 backdrop-blur-2xl rounded-[2.45rem] p-10 flex flex-col md:flex-row items-center justify-between gap-8">
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-green-500 animate-pulse shadow-[0_0_10px_rgba(34,197,94,0.5)]" />
                <span className="text-xs font-bold uppercase tracking-widest text-white/60">Session Status: ACTIVE</span>
              </div>
              <h3 className="text-3xl font-black tracking-tight">CS101: Data Structures</h3>
              <div className="flex items-center gap-6 text-sm text-white/40">
                <div className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> 08:42 Left
                </div>
                <div className="flex items-center gap-2">
                  <Globe className="w-4 h-4" /> Room 402
                </div>
              </div>
            </div>
            <div className="flex flex-col items-center gap-2 p-6 rounded-3xl bg-white/5 border border-white/5">
              <span className="text-5xl font-black text-primary">42</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-white/40">Students Detected</span>
            </div>
          </div>
        </div>
      </section>

      {/* Security Section */}
      <section className="relative z-10 py-32 px-6 border-t border-white/5">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-16 text-center">
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-white/5 mx-auto flex items-center justify-center">
              <LockKeyhole className="w-8 h-8 text-primary/60" />
            </div>
            <h4 className="text-lg font-bold">Encrypted Audio</h4>
            <p className="text-sm text-white/30 leading-relaxed">Secure data-to-frequency mapping ensures no tampering.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-white/5 mx-auto flex items-center justify-center">
              <Github className="w-8 h-8 text-primary/60" />
            </div>
            <h4 className="text-lg font-bold">Open Architecture</h4>
            <p className="text-sm text-white/30 leading-relaxed">Peer-reviewed protocol for trust and scalability.</p>
          </div>
          <div className="space-y-4">
            <div className="w-16 h-16 rounded-3xl bg-white/5 mx-auto flex items-center justify-center">
              <Shield className="w-8 h-8 text-primary/60" />
            </div>
            <h4 className="text-lg font-bold">Privacy-First</h4>
            <p className="text-sm text-white/30 leading-relaxed">No biometrics or invasive location tracking required.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="relative z-10 py-20 px-8 border-t border-white/5 bg-black/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex flex-col gap-4">
            <div className="flex items-center gap-3">
              <Waves className="w-6 h-6 text-primary" />
              <span className="text-xl font-black tracking-tighter">SonicAttend</span>
            </div>
            <p className="text-sm text-white/30 max-w-xs leading-relaxed">
              Reshaping educational administration through acoustic innovation and secure proximity verification.
            </p>
          </div>
          <div className="flex gap-12 text-sm font-medium text-white/40">
            <button onClick={() => navigate('/privacy')} className="hover:text-primary transition-colors">Privacy Policy</button>
            <button onClick={() => navigate('/architecture')} className="hover:text-primary transition-colors">System Architecture</button>
            <a href="https://github.com/justkuldeep/sonic-attendance-system" className="p-2 rounded-lg bg-white/5 hover:bg-white/10 transition-all border border-white/5 text-white">
              <Github className="w-5 h-5" />
            </a>
          </div>
        </div>
        <div className="mt-16 text-center text-[10px] font-bold uppercase tracking-[0.3em] text-white/10">
          &copy; 2024 Advanced Agentic Coding &bull; Deepmind Team
        </div>
      </footer>
    </div>
  );
}
