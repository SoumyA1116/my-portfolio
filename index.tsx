import React, { useState, useEffect } from 'react';
import { createRoot } from 'react-dom/client';
import { 
  Github, 
  Linkedin, 
  Twitter, 
  Mail, 
  MessageCircle, 
  ExternalLink, 
  ChevronRight, 
  Code, 
  Palette, 
  Database,
  ArrowUpRight,
  MapPin,
  Home,
  User,
  Briefcase,
  Loader2
} from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

// --- Types for the data structure ---
interface PortfolioData {
  profile: {
    name: string;
    role: string;
    tagline: string;
    about: string;
    location: string;
    email: string;
    whatsapp: string;
    socials: {
      github: string;
      linkedin: string;
      twitter: string;
    };
  };
  skills: Array<{
    category: string;
    items: string[];
  }>;
  experience: Array<{
    title: string;
    company: string;
    period: string;
    description: string;
  }>;
  projects: Array<{
    title: string;
    description: string;
    tech: string[];
    image: string;
    url: string;
  }>;
}

// --- Comprehensive Fallback Data ---
const FALLBACK_DATA: PortfolioData = {
  "profile": {
    "name": "Soumya Ranjan Das",
    "role": "Senior Full-Stack Developer",
    "tagline": "Crafting high-performance digital experiences with an eye for aesthetic precision.",
    "about": "Based in Puri, Odisha. I specialize in building scalable web applications that merge world-class engineering with premium design aesthetics. My philosophy is simple: if it doesn't look stunning and perform flawlessly, it's not finished.",
    "location": "Badagan, Nimapada, Puri, Odisha, India 752121",
    "email": "soumya.rdas@example.com",
    "whatsapp": "919876543210",
    "socials": {
      "github": "https://github.com/soumyardas",
      "linkedin": "https://linkedin.com/in/soumyardas",
      "twitter": "https://twitter.com/soumyardas"
    }
  },
  "skills": [
    { "category": "Frontend", "items": ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Next.js"] },
    { "category": "Backend", "items": ["Node.js", "PostgreSQL", "GraphQL", "Python", "Redis"] },
    { "category": "Design", "items": ["Figma", "Apple HIG", "UI/UX Research", "3D WebGL"] }
  ],
  "experience": [
    {
      "title": "Senior Software Engineer",
      "company": "TechNova Solutions",
      "period": "2022 - Present",
      "description": "Architecting premium SaaS platforms for international luxury brands, focusing on performance and glass-morphic UI implementations."
    },
    {
      "title": "Full-Stack Developer",
      "company": "Creative Pulse India",
      "period": "2020 - 2022",
      "description": "Led the transition to React-based micro-frontends, increasing load performance by 45% across the ecosystem."
    }
  ],
  "projects": [
    {
      "title": "Ethereal Commerce",
      "description": "A high-end e-commerce engine for fashion houses with AR virtual try-on features.",
      "tech": ["Next.js", "Three.js", "Stripe"],
      "image": "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&q=80&w=800",
      "url": "https://github.com/soumyardas/ethereal-commerce"
    },
    {
      "title": "Zenith Analytics",
      "description": "Minimalist dashboard providing deep-learning insights for Indian fintech startups.",
      "tech": ["React", "D3.js", "Python"],
      "image": "https://images.unsplash.com/photo-1551288049-bbbda536ad0a?auto=format&fit=crop&q=80&w=800",
      "url": "https://github.com/soumyardas/zenith-analytics"
    },
    {
      "title": "Lumina Studio",
      "description": "A portfolio builder for Indian photographers with smart-gallery optimization.",
      "tech": ["TypeScript", "AWS S3", "Sharp"],
      "image": "https://images.unsplash.com/photo-1493723843671-1d655e7d987a?auto=format&fit=crop&q=80&w=800",
      "url": "https://github.com/soumyardas/lumina-studio"
    }
  ]
};

// --- Glass Components ---
const GlassCard = ({ children, className = "" }: { children?: React.ReactNode, className?: string }) => (
  <div className={`relative bg-white/[0.04] backdrop-blur-lg border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] rounded-3xl overflow-hidden group/card ${className}`}>
    <div className="absolute inset-0 pointer-events-none border border-white/[0.05] rounded-3xl shadow-[inset_0_1px_1px_rgba(255,255,255,0.05)]" />
    {children}
  </div>
);

const NoiseOverlay = () => (
  <div className="fixed inset-0 pointer-events-none z-[99] opacity-[0.02] mix-blend-overlay bg-[url('https://grainy-gradients.vercel.app/noise.svg')] scale-[2] hidden md:block" />
);

// --- Mobile Bottom Nav ---
const MobileBottomNav = ({ data }: { data: PortfolioData }) => {
  const [activeTab, setActiveTab] = useState('home');
  
  const tabs = [
    { id: 'home', icon: <Home className="w-5 h-5" />, label: 'Home', href: '#home' },
    { id: 'about', icon: <User className="w-5 h-5" />, label: 'About', href: '#about' },
    { id: 'work', icon: <Briefcase className="w-5 h-5" />, label: 'Work', href: '#work' },
    { id: 'contact', icon: <Mail className="w-5 h-5" />, label: 'Contact', href: '#contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      const scrollPos = window.scrollY + 150;
      tabs.forEach((tab) => {
        const element = document.querySelector(tab.href) as HTMLElement;
        if (element && scrollPos >= element.offsetTop && scrollPos < element.offsetTop + element.offsetHeight) {
          setActiveTab(tab.id);
        }
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="md:hidden fixed bottom-6 left-1/2 -translate-x-1/2 w-[92%] z-[60]">
      <div className="bg-slate-950/80 backdrop-blur-xl border border-white/10 rounded-full px-4 py-2 flex justify-around items-center shadow-[0_15px_35px_rgba(0,0,0,0.8)]">
        {tabs.map((tab) => (
          <a
            key={tab.id}
            href={tab.href}
            onClick={() => setActiveTab(tab.id)}
            className={`flex flex-col items-center flex-1 transition-all duration-300 ${activeTab === tab.id ? 'text-white' : 'text-white/40'}`}
          >
            <div className={`p-2 rounded-full transition-all flex items-center justify-center ${activeTab === tab.id ? 'bg-white/10 scale-110' : ''}`}>
              {tab.icon}
            </div>
            <span className="text-[7px] font-bold mt-0.5 uppercase tracking-[0.15em]">{tab.label}</span>
          </a>
        ))}
      </div>
    </div>
  );
};

const Navbar = ({ data }: { data: PortfolioData }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 w-full z-50 transition-all duration-500 ${scrolled ? 'py-3 bg-slate-950/40 backdrop-blur-md' : 'py-6 md:py-8'}`}>
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto flex items-center justify-between gap-4">
          <motion.div 
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-lg md:text-xl font-serif font-bold tracking-tight text-white"
          >
            {data.profile.name}
          </motion.div>

          <div className="hidden md:flex items-center gap-6">
            <GlassCard className="px-8 py-2.5 flex items-center gap-10 rounded-full bg-white/[0.01]">
              {['About', 'Skills', 'Work', 'Contact'].map((link) => (
                <a 
                  key={link}
                  href={`#${link.toLowerCase()}`}
                  className="text-[11px] uppercase tracking-[0.2em] font-bold text-white/50 hover:text-white transition-all whitespace-nowrap"
                >
                  {link}
                </a>
              ))}
            </GlassCard>
            <a 
              href={`https://wa.me/${data.profile.whatsapp}`}
              target="_blank" 
              rel="noopener noreferrer"
              className="px-7 py-3 bg-white text-black text-[11px] uppercase tracking-widest font-black rounded-full hover:bg-slate-200 transition-all shadow-lg active:scale-95 flex-shrink-0"
            >
              Collaborate
            </a>
          </div>

          <div className="md:hidden">
             <a 
              href={`https://wa.me/${data.profile.whatsapp}`}
              className="p-2.5 bg-white/5 backdrop-blur-lg border border-white/10 rounded-full text-white active:scale-90 transition-transform flex items-center justify-center shadow-lg"
             >
               <MessageCircle className="w-5 h-5" />
             </a>
          </div>
        </div>
      </div>
    </nav>
  );
};

const Hero = ({ data }: { data: PortfolioData }) => (
  <section id="home" className="relative min-h-screen flex items-center pt-24 pb-20 overflow-hidden bg-[#020617]">
    <div className="absolute top-0 left-0 w-full h-full bg-[radial-gradient(circle_at_50%_40%,rgba(30,58,138,0.1),transparent_70%)] pointer-events-none" />
    <div className="absolute top-1/4 -left-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-purple-600/[0.05] md:bg-purple-600/10 blur-[100px] md:blur-[180px] rounded-full hidden sm:block md:animate-pulse" />
    <div className="absolute bottom-1/4 -right-20 w-[300px] md:w-[600px] h-[300px] md:h-[600px] bg-blue-600/[0.05] md:bg-blue-600/10 blur-[100px] md:blur-[180px] rounded-full hidden sm:block md:animate-pulse" style={{ animationDelay: '3s' }} />

    <div className="container mx-auto px-6 relative z-10">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center lg:items-start text-center lg:text-left"
        >
          <div className="mb-8 md:mb-10 flex items-center gap-4">
            <div className="hidden lg:block h-[1px] w-12 bg-white/40 flex-shrink-0" />
            <span className="text-[10px] md:text-[11px] font-bold uppercase tracking-[0.4em] text-white/60">
              {data.profile.role}
            </span>
          </div>
          
          <h1 className="text-[3.2rem] sm:text-[5rem] md:text-[8rem] lg:text-[9.5rem] font-serif leading-[0.9] mb-10 text-white tracking-tighter drop-shadow-2xl">
            Architecting <br className="hidden sm:block"/>
            <span className="text-white/30 italic font-light">Digital Supremacy.</span>
          </h1>
          
          <p className="text-base md:text-2xl text-white/70 mb-12 max-w-2xl font-light leading-relaxed tracking-wide">
            {data.profile.tagline}
          </p>

          <div className="flex flex-col sm:flex-row gap-5 items-center lg:items-start">
            <a 
              href="#work" 
              className="group px-8 md:px-10 py-4 md:py-5 bg-white text-black font-black text-[11px] md:text-[12px] uppercase tracking-[0.2em] rounded-xl md:rounded-2xl flex items-center justify-center gap-3 hover:translate-y-[-2px] transition-all shadow-xl active:scale-95"
            >
              View Projects <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </a>
            <div className="flex gap-4">
              {[
                { icon: <Github />, url: data.profile.socials.github },
                { icon: <Linkedin />, url: data.profile.socials.linkedin }
              ].map((social, i) => (
                <a key={i} href={social.url} target="_blank" className="w-12 md:w-14 h-12 md:h-14 bg-white/5 border border-white/[0.08] rounded-xl md:rounded-2xl hover:bg-white/10 transition-all flex justify-center items-center active:scale-95 shadow-lg">
                  {React.cloneElement(social.icon as React.ReactElement<any>, { className: "w-5 h-5 md:w-6 md:h-6 text-white/70" })}
                </a>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const About = ({ data }: { data: PortfolioData }) => (
  <section id="about" className="py-24 md:py-32 bg-[#010409] scroll-mt-20 overflow-hidden relative border-y border-white/[0.02]">
    <div className="container mx-auto px-6">
      <div className="grid lg:grid-cols-12 gap-16 md:gap-24 items-center max-w-7xl mx-auto">
        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: -20 }}
          viewport={{ once: true, amount: 0.1 }}
          className="lg:col-span-5 flex justify-center lg:justify-start"
        >
          <div className="relative group max-w-sm lg:max-w-none w-full">
            <div className="absolute -inset-4 bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-[3rem] blur-3xl opacity-0 md:group-hover:opacity-100 transition-opacity duration-1000" />
            <GlassCard className="aspect-[4/5] relative overflow-hidden rounded-[2.5rem] border border-white/[0.08]">
               {/* Updated to use profile.jpg from the root */}
               <img 
                 src="/profile.jpg" 
                 alt={data.profile.name} 
                 loading="lazy"
                 className="w-full h-full object-cover grayscale brightness-75 transition-all duration-700 md:group-hover:scale-110 md:group-hover:grayscale-0 md:group-hover:brightness-100"
                 onError={(e) => {
                   (e.target as HTMLImageElement).src = 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=800';
                 }}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-[#020617] via-transparent to-transparent opacity-60" />
            </GlassCard>
            <GlassCard className="absolute -bottom-6 md:-bottom-8 -right-4 md:-right-10 p-4 md:p-7 shadow-2xl rounded-[1.5rem] md:rounded-[2rem] w-[95%] sm:w-auto sm:max-w-md bg-white/[0.06]">
              <div className="flex items-center gap-4 md:gap-6">
                <div className="w-10 h-10 md:w-16 md:h-16 bg-white/5 rounded-full flex items-center justify-center border border-white/10 flex-shrink-0">
                  <MapPin className="text-white w-5 h-5 md:w-6 md:h-6" />
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-[9px] text-white/40 uppercase tracking-[0.3em] font-black mb-0.5">HQ Location</div>
                  <div className="text-white font-serif text-sm md:text-xl tracking-wide leading-tight break-words">{data.profile.location}</div>
                </div>
              </div>
            </GlassCard>
          </div>
        </motion.div>

        <motion.div
          whileInView={{ opacity: 1, x: 0 }}
          initial={{ opacity: 0, x: 20 }}
          viewport={{ once: true, amount: 0.1 }}
          className="lg:col-span-7 text-center lg:text-left"
        >
          <h2 className="text-3xl md:text-6xl font-serif mb-8 text-white leading-none tracking-tight">Precision in <br/> <span className="italic text-white/20">Execution.</span></h2>
          <p className="text-base md:text-xl text-white/60 leading-relaxed mb-10 font-light max-w-2xl tracking-wide mx-auto lg:mx-0">
            {data.profile.about}
          </p>
          
          <div className="grid gap-6 md:gap-8 text-left">
            {data.experience.map((exp, idx) => (
              <div key={idx} className="group flex gap-5 md:gap-8 pb-6 md:pb-8 border-b border-white/[0.05] last:border-0 items-start">
                <div className="text-white/10 font-serif text-2xl md:text-4xl mt-1 flex-shrink-0 w-10 md:w-16 text-center">
                  {String(idx + 1).padStart(2, '0')}
                </div>
                <div className="flex-1 overflow-hidden">
                  <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-1">
                    <h4 className="text-white font-bold text-base md:text-xl tracking-tight truncate w-full">{exp.title}</h4>
                    <span className="text-[8px] md:text-[10px] text-white/50 font-bold uppercase tracking-widest bg-white/5 px-2 md:px-3 py-1 rounded-full border border-white/5">{exp.period}</span>
                  </div>
                  <p className="text-blue-400 text-[9px] md:text-[11px] font-black uppercase tracking-[0.2em] mb-3">{exp.company}</p>
                  <p className="text-white/50 text-xs md:text-sm leading-relaxed max-w-xl group-hover:text-white/70 transition-colors">{exp.description}</p>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </div>
  </section>
);

const Skills = ({ data }: { data: PortfolioData }) => {
  const getIcon = (category: string) => {
    if (category.toLowerCase().includes('frontend')) return <Palette className="w-6 h-6" />;
    if (category.toLowerCase().includes('backend')) return <Database className="w-6 h-6" />;
    return <Code className="w-6 h-6" />;
  };

  return (
    <section id="skills" className="py-24 md:py-32 relative overflow-hidden bg-[#020617] scroll-mt-20">
      <div className="container mx-auto px-6">
        <div className="max-w-7xl mx-auto">
          <div className="mb-16 text-center lg:text-left">
            <h2 className="text-4xl md:text-7xl font-serif text-white mb-4 tracking-tighter">Technical <br className="lg:hidden"/> <span className="italic text-white/20">Core.</span></h2>
            <div className="h-0.5 w-24 bg-gradient-to-r from-blue-600/40 to-transparent rounded-full mx-auto lg:mx-0" />
          </div>
          
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {data.skills.map((skillGroup, idx) => (
              <motion.div
                key={idx}
                whileInView={{ opacity: 1, y: 0 }}
                initial={{ opacity: 0, y: 15 }}
                viewport={{ once: true, amount: 0.1 }}
                transition={{ delay: idx * 0.05 }}
              >
                <GlassCard className="p-8 h-full flex flex-col items-center sm:items-start transition-all duration-500">
                  <div className="w-14 h-14 rounded-2xl bg-white/[0.03] flex items-center justify-center mb-8 border border-white/[0.08] shadow-lg flex-shrink-0">
                    {React.cloneElement(getIcon(skillGroup.category) as React.ReactElement<any>, { className: "text-white/50" })}
                  </div>
                  <h3 className="text-xl md:text-2xl font-serif text-white mb-6 tracking-wide italic">{skillGroup.category}</h3>
                  <div className="flex flex-wrap gap-2 mt-auto justify-center sm:justify-start w-full">
                    {skillGroup.items.map((item) => (
                      <span key={item} className="px-3 py-1.5 bg-white/[0.03] rounded-xl text-[9px] md:text-[10px] font-black uppercase tracking-widest text-white/50 border border-white/[0.05] hover:border-white/20 transition-all">
                        {item}
                      </span>
                    ))}
                  </div>
                </GlassCard>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

const Work = ({ data }: { data: PortfolioData }) => (
  <section id="work" className="py-24 md:py-32 bg-[#010409] scroll-mt-20 border-t border-white/[0.02]">
    <div className="container mx-auto px-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between mb-20 gap-8 text-center lg:text-left">
          <div>
            <h2 className="text-4xl sm:text-7xl lg:text-[8.5rem] font-serif text-white leading-none tracking-tighter">Eminent <br/><span className="text-white/10 italic font-light">Creations.</span></h2>
          </div>
          <p className="text-white/40 max-w-sm text-sm lg:text-right font-light leading-relaxed tracking-wider mx-auto lg:mx-0">
            A selection of projects designed to redefine interactions into high-performance experiences.
          </p>
        </div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-14">
          {data.projects.map((project, idx) => (
            <motion.div
              key={`${project.title}-${idx}`}
              whileInView={{ opacity: 1, y: 0 }}
              initial={{ opacity: 0, y: 20 }}
              viewport={{ once: true, amount: 0.1 }}
            >
              <a href={project.url} target="_blank" rel="noopener noreferrer" className="block outline-none">
                <div className="relative rounded-[2rem] md:rounded-[3rem] overflow-hidden mb-6 aspect-[3/4] bg-white/[0.02] border border-white/[0.08] shadow-2xl group/img">
                  <img 
                    src={project.image.includes('unsplash') ? `${project.image}&w=600&q=70` : project.image} 
                    alt={project.title}
                    loading="lazy"
                    className="w-full h-full object-cover transition-transform duration-700 md:group-hover:scale-105 brightness-[0.6]"
                  />
                  <div className="absolute inset-0 bg-slate-950/60 opacity-0 md:group-hover/img:opacity-100 transition-opacity duration-500 flex flex-col items-center justify-center backdrop-blur-md px-6 text-center">
                     <div className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-xl mb-4">
                       <ArrowUpRight className="text-black w-6 h-6" />
                     </div>
                     <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white">View Project</span>
                  </div>
                  <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-1.5 md:group-hover/img:opacity-0 transition-opacity">
                    {project.tech.map(t => (
                      <span key={t} className="px-2 py-1 bg-black/60 backdrop-blur-md border border-white/[0.08] rounded-full text-[8px] uppercase tracking-wider font-bold text-white/80">{t}</span>
                    ))}
                  </div>
                </div>
                <h3 className="text-xl md:text-2xl font-serif text-white mb-2 md:group-hover:translate-x-1 transition-transform tracking-tight">{project.title}</h3>
                <p className="text-white/40 text-sm mb-4 leading-relaxed font-light line-clamp-2">{project.description}</p>
              </a>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  </section>
);

const Contact = ({ data }: { data: PortfolioData }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    objectives: ''
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleInitiateProject = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.objectives) {
      alert("Please provide your name and project objectives.");
      return;
    }

    const message = `Hello ${data.profile.name}, I'm ${formData.name}. 
I'm interested in collaborating on a project. 
My email: ${formData.email || 'Not provided'}. 
Brief Objectives: ${formData.objectives}`;

    const encodedMessage = encodeURIComponent(message);
    const whatsappUrl = `https://wa.me/${data.profile.whatsapp}?text=${encodedMessage}`;
    
    window.open(whatsappUrl, '_blank');
  };

  return (
    <section id="contact" className="py-24 md:py-32 relative scroll-mt-20 bg-[#020617]">
      <div className="container mx-auto px-6 pb-20 md:pb-0">
        <GlassCard className="max-w-6xl mx-auto p-8 md:p-16 lg:p-24 overflow-hidden relative border-white/[0.05] rounded-[2.5rem] md:rounded-[4rem] bg-white/[0.02]">
          <div className="absolute -top-40 -right-40 w-[600px] h-[600px] bg-blue-600/[0.05] blur-[150px] rounded-full pointer-events-none" />
          
          <div className="relative z-10 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
            <div className="text-center lg:text-left">
              <h2 className="text-4xl sm:text-7xl lg:text-9xl font-serif text-white mb-8 leading-[0.85] tracking-tighter">Define the <br/><span className="italic text-white/10">Future.</span></h2>
              <div className="space-y-6 md:space-y-10">
                <a href={`mailto:${data.profile.email}`} className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 group">
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-white/[0.03] border border-white/10 flex items-center justify-center transition-all flex-shrink-0">
                    <Mail className="w-5 h-5 md:w-7 md:h-7" />
                  </div>
                  <div className="overflow-hidden w-full sm:w-auto">
                    <div className="text-[9px] text-white/30 uppercase tracking-[0.4em] font-black mb-0.5">Official Inquiry</div>
                    <div className="text-white font-serif text-base md:text-2xl tracking-wide transition-colors truncate">{data.profile.email}</div>
                  </div>
                </a>

                <a 
                  href={`https://wa.me/${data.profile.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex flex-col sm:flex-row items-center gap-4 sm:gap-6 group"
                >
                  <div className="w-12 h-12 md:w-16 md:h-16 rounded-2xl bg-green-500/[0.03] border border-green-500/20 flex items-center justify-center transition-all flex-shrink-0">
                    <MessageCircle className="w-5 h-5 md:w-7 md:h-7 text-green-400" />
                  </div>
                  <div>
                    <div className="text-[9px] text-white/30 uppercase tracking-[0.3em] font-black mb-0.5">Direct Access</div>
                    <div className="text-white font-serif text-base md:text-2xl tracking-wide">+{data.profile.whatsapp}</div>
                  </div>
                </a>
              </div>
            </div>

            <form className="space-y-4 md:space-y-6" onSubmit={handleInitiateProject}>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                <input 
                  type="text" 
                  name="name"
                  required
                  value={formData.name}
                  onChange={handleInputChange}
                  placeholder="Identity" 
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl md:rounded-2xl px-5 py-4 md:py-6 text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-all font-light text-sm" 
                />
                <input 
                  type="email" 
                  name="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  placeholder="Email Address" 
                  className="w-full bg-white/[0.02] border border-white/[0.08] rounded-xl md:rounded-2xl px-5 py-4 md:py-6 text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-all font-light text-sm" 
                />
              </div>
              <textarea 
                name="objectives"
                required
                value={formData.objectives}
                onChange={handleInputChange}
                placeholder="Brief Objectives" 
                rows={4} 
                className="w-full bg-white/[0.02] border border-white/[0.08] rounded-2xl md:rounded-[2.5rem] px-5 py-5 text-white placeholder:text-white/20 outline-none focus:border-white/30 transition-all resize-none font-light text-sm"
              ></textarea>
              <button 
                type="submit"
                className="w-full py-5 md:py-7 bg-white text-black font-black text-[11px] md:text-[12px] uppercase tracking-[0.4em] rounded-xl md:rounded-[1.5rem] hover:bg-slate-200 active:scale-[0.98] transition-all flex items-center justify-center gap-3 shadow-xl"
              >
                Initiate Project <ExternalLink className="w-4 h-4" />
              </button>
            </form>
          </div>
        </GlassCard>
      </div>
    </section>
  );
};

const Footer = ({ data }: { data: PortfolioData }) => (
  <footer className="py-16 md:py-24 border-t border-white/[0.02] bg-[#010409]">
    <div className="container mx-auto px-6">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-12 text-center md:text-left">
        <div className="flex flex-col gap-2">
          <div className="text-white font-serif text-2xl md:text-3xl tracking-tight">{data.profile.name}</div>
          <div className="text-white/20 text-[9px] font-bold uppercase tracking-[0.4em]">
            © {new Date().getFullYear()} Aesthetic Precision Engineered.
          </div>
        </div>
        <div className="flex gap-8 md:gap-12 flex-wrap justify-center md:justify-start">
          {['Github', 'LinkedIn', 'Twitter'].map(social => (
            <a 
              key={social} 
              href={data.profile.socials[social.toLowerCase() as keyof typeof data.profile.socials] || '#'} 
              target="_blank"
              className="text-[9px] font-black uppercase tracking-[0.4em] text-white/30 hover:text-white transition-all relative group"
            >
              {social}
              <span className="absolute -bottom-1.5 left-0 w-0 h-[1.5px] bg-white md:group-hover:w-full transition-all duration-500" />
            </a>
          ))}
        </div>
      </div>
    </div>
  </footer>
);

const App = () => {
  const [data, setData] = useState<PortfolioData>(FALLBACK_DATA);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // PERFORMANCE & FIX: Added cache buster to force refresh from server
        const cacheBuster = `?v=${new Date().getTime()}`;
        const response = await fetch('data.json' + cacheBuster);
        if (response.ok) {
          const jsonData = await response.json();
          if (jsonData.projects && jsonData.projects.length > 0) {
            setData(jsonData);
          }
        }
      } catch (err) {
        console.error('Error loading data:', err);
      } finally {
        setTimeout(() => setLoading(false), 800); 
      }
    };
    fetchData();
  }, []);

  return (
    <div className="bg-[#020617] text-white min-h-screen selection:bg-white selection:text-black relative overflow-hidden">
      <NoiseOverlay />
      
      <AnimatePresence mode="wait">
        {loading && (
          <motion.div 
            key="loader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6, ease: "easeInOut" }}
            className="fixed inset-0 z-[100] bg-[#010409] flex items-center justify-center"
          >
            <motion.div 
              initial={{ opacity: 0, scale: 0.98 }} 
              animate={{ opacity: 1, scale: 1 }} 
              className="flex flex-col items-center gap-6"
            >
              <Loader2 className="w-12 h-12 text-white/20 animate-spin" />
              <span className="text-[10px] uppercase tracking-[0.8em] text-white/30 font-black pl-4">Synthesizing</span>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Navbar data={data} />
      <Hero data={data} />
      <About data={data} />
      <Skills data={data} />
      <Work data={data} />
      <Contact data={data} />
      <Footer data={data} />
      
      <MobileBottomNav data={data} />
      
      <motion.a
        href={`https://wa.me/${data.profile.whatsapp}`}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileTap={{ scale: 0.95 }}
        className="fixed bottom-28 md:bottom-12 right-6 md:right-12 z-[60] w-14 md:w-16 h-14 md:h-16 bg-white text-black rounded-2xl md:rounded-[1.5rem] flex items-center justify-center shadow-2xl transition-transform"
      >
        <MessageCircle className="w-6 h-6 md:w-8 md:h-8" />
      </motion.a>
    </div>
  );
};

const root = createRoot(document.getElementById('root')!);
root.render(<App />);
