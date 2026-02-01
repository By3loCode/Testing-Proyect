"use client";

import { useState, useEffect, useCallback, useRef } from 'react';
import { Eye, EyeOff, Shield, Zap, Lock, User, CheckCircle, AlertCircle, ChevronRight } from 'lucide-react';

// ====================================================================
// SPLASH SCREEN - CORPOELEC INDUSTRIAL (Nuevo)
// ====================================================================
const SplashScreen = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [status, setStatus] = useState([false, false, false]);
  const [showLoader, setShowLoader] = useState(true);
  const loaderRef = useRef(null);
  const startTimeRef = useRef(null);

  useEffect(() => {
    if (!startTimeRef.current) {
        startTimeRef.current = Date.now();
    }
    const totalDuration = 3000;
    let animationFrameId;

    const animate = () => {
      const elapsed = Date.now() - startTimeRef.current;
      const progressValue = Math.min(elapsed / totalDuration, 1);
      const percent = Math.floor(progressValue * 100);

      setProgress(percent);

      // Actualizar estados
      const newStatus = [...status];
      for (let i = 0; i < 3; i++) {
        const statusStart = 0.1 + (i * 0.2);
        if (progressValue > statusStart) {
          newStatus[i] = true;
        }
      }
      setStatus(newStatus);

      // Completar
      if (progressValue >= 1) {
        setShowLoader(false);
        if (loaderRef.current) {
          loaderRef.current.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
          loaderRef.current.style.opacity = '0';
          loaderRef.current.style.transform = 'scale(0.92)';
          setTimeout(() => {
            if (loaderRef.current) loaderRef.current.style.display = 'none';
          }, 600);
        }
        
        if (onComplete) {
          setTimeout(() => onComplete(), 1000);
        }
      }

      if (progressValue < 1) {
        animationFrameId = requestAnimationFrame(animate);
      }
    };

    animationFrameId = requestAnimationFrame(animate);

    // Activar primer estado
    const timeoutId = setTimeout(() => {
      setStatus(prev => {
         const newS = [...prev];
         newS[0] = true;
         return newS;
      });
    }, 100);

    return () => {
      cancelAnimationFrame(animationFrameId);
      clearTimeout(timeoutId);
    };
  }, [status, onComplete]);

  return (
    <div className="splash-screen">
      <style jsx>{`
        .splash-screen {
          min-height: 100vh;
          background: linear-gradient(145deg, #0d1117 0%, #161b22 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          overflow: hidden;
        }

        .splash-container {
          text-align: center;
          padding: 3rem;
          max-width: 600px;
          width: 90%;
        }

        /* Logo: estilo refinado y sutil */
        .logo-text {
          font-size: 1.8rem;
          font-weight: 700;
          margin-bottom: 1rem;
          color: #e6edf3;
          letter-spacing: 1.5px;
          text-transform: uppercase;
          background: linear-gradient(180deg, #e6edf3 0%, #cfd8dc 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          text-shadow: 0 8px 24px rgba(0, 0, 0, 0.6);
          display: inline-block;
        }

        .logo-text::after {
          content: '';
          display: block;
          width: 64px;
          height: 3px;
          margin: 0.6rem auto 0;
          border-radius: 2px;
          background: linear-gradient(90deg, rgba(0,255,154,0.95), rgba(0,230,118,0.9));
          opacity: 0.9;
        }

        .logo-subtitle {
          font-size: 0.95rem;
          color: rgba(142,150,158,0.65);
          margin-bottom: 1.8rem;
          font-weight: 300;
          letter-spacing: 0.6px;
        }

        /* Loader (ESFERA ORIGINAL) */
        .loader {
          --color-one: #ff4db6;
          --color-two: #3b82f6;
          --color-three: #00ffd5;
          --color-fore: rgba(255,255,255,0.12);
          --color-five: white;
          --time-animation: 0.8s;
          --size: 110px;
          position: relative;
          display: flex;
          justify-content: center;
          align-items: center;
          overflow: visible;
          border-radius: 50%;
          margin: 0 auto 1.5rem;
          color: var(--color-five);
        }

        .loader .sphere {
          display: flex;
          justify-content: center;
          align-items: center;
          position: relative;
          z-index: 2;
          border-radius: 50%;
          width: var(--size);
          height: var(--size);
          background: radial-gradient(
            circle at 80% 20%,
            rgba(255, 255, 255, 1) 0%,
            rgba(255, 255, 255, 0.8) 20%,
            rgba(255, 255, 255, 0.4) 50%,
            rgba(255, 255, 255, 0) 70%
          );
        }

        .loader .sphere::before {
          content: "";
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          width: var(--size);
          height: var(--size);
          border-radius: 50%;
          box-shadow:
            inset calc(var(--size) / -20) calc(var(--size) / -20) calc(var(--size) / 10)
              var(--color-fore),
            inset calc(var(--size) / 10) 0 calc(var(--size) / 5) var(--color-three);
          animation:
            rotation calc(var(--time-animation) * 2) linear infinite,
            colorize calc(var(--time-animation) * 2) ease-in-out infinite;
        }

        .loader .sphere::after {
          content: "";
          position: absolute;
          width: calc(var(--size) * 1.18);
          height: calc(var(--size) * 1.18);
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          border-radius: 50%;
          z-index: 2;
          filter: blur(8px);
          background:
            radial-gradient(circle at 50% 45%, rgba(255,255,255,0.9) 0%, rgba(255,255,255,0.05) 30%, rgba(255,255,255,0) 45%),
            conic-gradient(from 120deg, var(--color-one), var(--color-two), var(--color-three), var(--color-one));
          background-blend-mode: screen;
          pointer-events: none;
        }

        .loader svg {
          position: absolute;
          display: flex;
          justify-content: center;
          align-items: center;
          width: var(--size);
          height: var(--size);
          overflow: visible;
          z-index: 3;
          animation: rotation calc(var(--time-animation) * 3)
            cubic-bezier(0.7, 0.6, 0.3, 0.4) infinite;
        }

        .loader svg #shapes circle {
          fill: var(--color-five);
        }

        .loader svg #blurriness g,
        .loader svg #clipping ellipse,
        .loader svg #shapes g:nth-of-type(2),
        .loader svg #fade ellipse {
          filter: blur(7px);
        }

        .loader svg #waves g path {
          will-change: d;
          stroke-width: 7px;
        }

        .loader svg #waves g path:nth-of-type(1) {
          animation: wave-one var(--time-animation) cubic-bezier(0.7, 0.6, 0.3, 0.4)
            infinite;
        }

        .loader svg #waves g path:nth-of-type(2) {
          animation: wave-two var(--time-animation) cubic-bezier(0.7, 0.6, 0.3, 0.4)
            calc(var(--time-animation) / -2) infinite reverse;
        }

        .loader svg #waves g path:nth-of-type(3) {
          animation: wave-one var(--time-animation) cubic-bezier(0.7, 0.6, 0.3, 0.4)
            calc(var(--time-animation) / -2) infinite;
        }

        .loader svg #waves g path:nth-of-type(4) {
          animation: wave-two var(--time-animation) cubic-bezier(0.7, 0.6, 0.3, 0.4)
            infinite reverse;
        }

        @keyframes wave-one {
          0% { d: path("M5,50 C10,50 15,50 20,50 C25,50 30,50 95,50"); }
          50% { d: path("M5,50 C25,50 30,20 50,20 C70,20 75,50 95,50"); }
          100% { d: path("M5,50 C70,50 75,50 80,50 C85,50 90,50 95,50"); }
        }

        @keyframes wave-two {
          0% { d: path("M5,50 C10,50 15,50 20,50 C25,50 30,50 95,50"); }
          50% { d: path("M5,50 C25,50 30,80 50,80 C70,80 75,50 95,50"); }
          100% { d: path("M5,50 C70,50 75,50 80,50 C85,50 90,50 95,50"); }
        }

        @keyframes rotation {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @keyframes colorize {
          0% { filter: hue-rotate(0deg); }
          20% { filter: hue-rotate(-30deg); }
          40% { filter: hue-rotate(-60deg); }
          60% { filter: hue-rotate(-90deg); }
          80% { filter: hue-rotate(-45deg); }
          100% { filter: hue-rotate(0deg); }
        }

        @media (max-width: 500px) {
          .loader { --size: 60px; margin-bottom: 1rem; }
        }

        .loader::before {
          content: "";
          position: absolute;
          left: 50%;
          top: 50%;
          transform: translate(-50%, -50%);
          width: calc(var(--size) * 1.9);
          height: calc(var(--size) * 1.9);
          border-radius: 50%;
          z-index: 0;
          pointer-events: none;
          filter: blur(20px);
          background:
            radial-gradient(circle at 50% 50%, rgba(255,255,255,0.06) 0%, rgba(255,255,255,0) 30%),
            radial-gradient(circle at 40% 50%, rgba(255,77,182,0.26) 0%, rgba(255,77,182,0) 40%),
            radial-gradient(circle at 60% 50%, rgba(59,130,246,0.26) 0%, rgba(59,130,246,0) 40%),
            radial-gradient(circle at 50% 60%, rgba(0,255,149,0.18) 0%, rgba(0,255,149,0) 50%);
          background-blend-mode: screen;
          opacity: 0.98;
        }

        /* Barra de progreso */
        .progress-container {
          background: linear-gradient(180deg, rgba(0,30,10,0.65), rgba(0,20,8,0.6));
          border-radius: 10px;
          padding: 1.5rem;
          margin-bottom: 1.5rem;
          border: 1px solid rgba(0,255,149,0.12);
          box-shadow: 0 10px 30px rgba(0,255,149,0.03), inset 0 1px 0 rgba(255,255,255,0.02);
        }

        .progress-label {
          display: flex;
          justify-content: space-between;
          color: rgba(180,255,210,0.95);
          font-size: 0.9rem;
          margin-bottom: 0.75rem;
        }

        .progress-bar {
          height: 8px;
          background: rgba(10,10,10,0.25);
          border-radius: 4px;
          overflow: hidden;
          position: relative;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(90deg, #00ff9a, #00e676, #b7ff00);
          border-radius: 4px;
          width: 0%;
          transition: width 0.18s ease, box-shadow 0.15s ease;
          position: relative;
          overflow: visible;
          box-shadow: 0 4px 18px rgba(0,255,149,0.12);
        }

        .progress-fill::after {
          content: '';
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: linear-gradient(
            90deg,
            transparent 0%,
            rgba(255, 255, 255, 0.3) 50%,
            transparent 100%
          );
          animation: shimmer 1.5s infinite;
        }

        /* Estado del sistema */
        .system-status {
          display: flex;
          flex-direction: column;
          gap: 0.5rem;
        }

        .status-item {
          display: flex;
          align-items: center;
          gap: 0.75rem;
          font-size: 0.85rem;
          color: #8b949e;
          opacity: 0;
          transform: translateX(-10px);
          animation: status-slide 0.3s ease forwards;
        }

        .status-item:nth-child(1) { animation-delay: 0.3s; }
        .status-item:nth-child(2) { animation-delay: 0.9s; }
        .status-item:nth-child(3) { animation-delay: 1.5s; }

        .status-dot {
          width: 8px;
          height: 8px;
          border-radius: 50%;
          background: #484f58;
        }

        .status-item.active .status-dot {
          background: #00ff9a;
          box-shadow: 0 0 10px rgba(0, 255, 154, 0.5);
          animation: dot-pulse 2s ease-in-out infinite;
        }

        .status-item.active .status-text {
          color: #e6edf3;
        }

        /* Texto final */
        .loading-complete {
          color: #00ff9a;
          font-size: 0.9rem;
          font-weight: 500;
          opacity: 0;
          margin-top: 1rem;
          animation: fade-in 0.5s ease forwards 2s;
        }

        .loading-complete.visible {
          opacity: 1;
          animation: none;
        }

        /* Animaciones */
        @keyframes shimmer {
          0% { transform: translateX(-100%); }
          100% { transform: translateX(100%); }
        }

        @keyframes status-slide {
          0% { opacity: 0; transform: translateX(-10px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes dot-pulse {
          0%, 100% { box-shadow: 0 0 10px rgba(0, 255, 154, 0.5); }
          50% { box-shadow: 0 0 20px rgba(0, 255, 154, 0.8); }
        }

        @keyframes fade-in {
          0% { opacity: 0; transform: translateY(10px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 500px) {
          .splash-container {
            padding: 2rem 1.5rem;
          }
        }
      `}</style>

      <div className="splash-container">
        {/* Logo */}
        <div className="logo-text">CORPOELEC INDUSTRIAL</div>
        <div className="logo-subtitle">Sistema de Gestión Integral</div>

        {/* Loader */}
        {showLoader && (
          <div className="loader" ref={loaderRef} aria-hidden="true">
            <div className="sphere"></div>
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" aria-hidden="true">
              <defs>
                <mask id="waves" maskUnits="userSpaceOnUse">
                  <g fill="none" stroke="white" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M5,50 C25,50 30,20 50,20 C70,20 75,50 95,50"></path>
                    <path d="M5,50 C25,50 30,20 50,20 C70,20 75,50 95,50"></path>
                    <path d="M5,50 C25,50 30,80 50,80 C70,80 75,50 95,50"></path>
                    <path d="M5,50 C25,50 30,80 50,80 C70,80 75,50 95,50"></path>
                  </g>
                </mask>
                <mask id="blurriness" maskUnits="userSpaceOnUse">
                  <g>
                    <circle cx="50" cy="50" r="50" fill="white"></circle>
                    <ellipse cx="50" cy="50" rx="25" ry="25" fill="black"></ellipse>
                  </g>
                </mask>
                <mask id="clipping" maskUnits="userSpaceOnUse">
                  <ellipse cx="50" cy="50" rx="25" ry="50" fill="white"></ellipse>
                </mask>
                <mask id="fade" maskUnits="userSpaceOnUse">
                  <ellipse cx="50" cy="50" rx="45" ry="50" fill="white"></ellipse>
                </mask>
              </defs>
              <g id="shapes" mask="url(#fade)">
                <g mask="url(#clipping)">
                  <circle cx="50" cy="50" r="50" fill="currentColor" mask="url(#waves)"></circle>
                </g>
                <g mask="url(#blurriness)">
                  <circle cx="50" cy="50" r="50" fill="currentColor" mask="url(#waves)"></circle>
                </g>
              </g>
            </svg>
          </div>
        )}

        {/* Barra de progreso */}
        <div className="progress-container">
          <div className="progress-label">
            <span>Inicializando sistema...</span>
            <span>{progress}%</span>
          </div>
          <div className="progress-bar">
            <div className="progress-fill" style={{ width: `${progress}%` }}></div>
          </div>
        </div>

        {/* Estado del sistema */}
        <div className="system-status">
          <div className={`status-item ${status[0] ? 'active' : ''}`}>
            <span className="status-dot"></span>
            <span className="status-text">Conectando a servidores Corpoelec...</span>
          </div>
          <div className={`status-item ${status[1] ? 'active' : ''}`}>
            <span className="status-dot"></span>
            <span className="status-text">Verificando credenciales corporativas...</span>
          </div>
          <div className={`status-item ${status[2] ? 'active' : ''}`}>
            <span className="status-dot"></span>
            <span className="status-text">Cargando datos industriales...</span>
          </div>
        </div>

        <p className={`loading-complete ${progress === 100 ? 'visible' : ''}`}>
          ✓ Sistema listo. Redirigiendo al login...
        </p>
      </div>
    </div>
  );
};

// ====================================================================
// LOGIN (Exactamente igual, sin modificaciones)
// ====================================================================
const usePasswordToggle = () => {
  const [visible, setVisible] = useState(false);
  const toggle = useCallback(() => setVisible(v => !v), []);
  return { type: visible ? 'text' : 'password', icon: visible ? <EyeOff size={18} /> : <Eye size={18} />, toggle };
};

const PasswordStrength = ({ password }) => {
  const getStrength = () => {
    let score = 0;
    if (password.length >= 6) score++;
    if (password.length >= 10) score++;
    if (/[A-Z]/.test(password)) score++;
    if (/[0-9]/.test(password)) score++;
    if (/[^A-Za-z0-9]/.test(password)) score++;
    return Math.min(score, 4);
  };

  const strength = getStrength();
  const labels = ['Muy débil', 'Débil', 'Regular', 'Fuerte', 'Excelente'];
  const colors = ['bg-red-500', 'bg-orange-500', 'bg-yellow-500', 'bg-lime-500', 'bg-green-500'];

  if (!password) return null;

  return (
    <div className="mt-2 space-y-1">
      <div className="flex gap-1">
        {[1, 2, 3, 4].map(level => (
          <div
            key={level}
            className={`h-1 flex-1 rounded-full ${
              strength >= level ? colors[strength - 1] : 'bg-gray-700'
            }`}
          />
        ))}
      </div>
      <p className={`text-xs ${
        strength >= 3 ? 'text-green-400' : strength >= 2 ? 'text-yellow-400' : 'text-red-400'
      }`}>
        {labels[strength - 1]}
      </p>
    </div>
  );
};

const AnimatedInput = ({
  id, label, value, onChange, type, placeholder, icon: Icon,
  error, showError, autoComplete, required
}) => {
  const [isFocused, setIsFocused] = useState(false);
  const hasValue = value.length > 0;

  return (
    <div className="relative">
      <label
        htmlFor={id}
        className={`absolute left-12 transition-all duration-300 z-10 ${
          isFocused || hasValue
            ? '-top-2 left-8 text-xs px-2 bg-transparent font-semibold uppercase tracking-wider'
            : 'top-4 text-gray-400'
        } ${isFocused ? 'text-green-400' : 'text-gray-400'}`}
      >
        {label}
      </label>
      
      <div className={`relative flex items-center rounded-xl ${
        error ? 'bg-red-500/10' : 'bg-gray-900/50'
      } ${isFocused ? 'ring-2 ring-green-500/40' : ''}`}>
        <div className={`pl-4 pr-2 ${isFocused ? 'text-green-400' : 'text-gray-500'}`}>
          <Icon size={20} />
        </div>
        
        <input
          id={id}
          type={type}
          value={value}
          onChange={onChange}
          placeholder={isFocused ? placeholder : ''}
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          autoComplete={autoComplete}
          required={required}
          className="w-full px-4 py-4 bg-transparent text-white placeholder-gray-500/50 focus:outline-none"
        />
        
        {value && !error && (
          <div className="pr-4 text-green-400">
            <CheckCircle size={18} />
          </div>
        )}
      </div>

      {error && showError && (
        <div className="flex items-center mt-2 text-red-400 text-xs animate-shake">
          <AlertCircle size={14} className="mr-1" />
          <span>{error}</span>
        </div>
      )}
    </div>
  );
};

const LoadingButton = ({ isLoading, children, ...props }) => (
  <button
    {...props}
    disabled={isLoading}
    className={`relative overflow-hidden w-full py-4 rounded-xl font-bold text-lg tracking-wide transition-all duration-300 transform hover:scale-[1.01] active:scale-[0.99] disabled:transform-none ${
      isLoading
        ? 'bg-gray-700 cursor-not-allowed'
        : 'bg-gradient-to-r from-green-600 to-emerald-700 hover:from-green-500 hover:to-emerald-600 shadow-green-500/30 hover:shadow-green-500/50'
    } shadow-lg`}
  >
    {isLoading && (
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="flex gap-1">
          {[0, 1, 2].map(i => (
            <div
              key={i}
              className="w-2 h-2 bg-white rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.1}s` }}
            />
          ))}
        </div>
      </div>
    )}
    <span className={isLoading ? 'invisible' : ''}>{children}</span>
  </button>
);

const Particles = () => {
  const particles = Array.from({ length: 20 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 4 + 2,
    duration: Math.random() * 20 + 15,
    delay: Math.random() * 5,
  }));

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {particles.map(p => (
        <div
          key={p.id}
          className="absolute bg-green-500/20 rounded-full animate-float"
          style={{
            left: `${p.x}%`,
            top: `${p.y}%`,
            width: p.size,
            height: p.size,
            animationDuration: `${p.duration}s`,
            animationDelay: `${p.delay}s`,
          }}
        />
      ))}
    </div>
  );
};

const LoginCorpoelecForm = () => {
  const [formData, setFormData] = useState({ username: '', password: '' });
  const [errors, setErrors] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [loginSuccess, setLoginSuccess] = useState(false);
  const formRef = useRef(null);

  const { type: passwordType, icon: passwordIcon, toggle: togglePassword } = usePasswordToggle();

  useEffect(() => {
    const elements = formRef.current?.children;
    if (elements) {
      Array.from(elements).forEach((el, i) => {
        if (el.style) {
          el.style.opacity = '0';
          el.style.transform = 'translateY(20px)';
          el.style.animation = `fadeInUp 0.6s ease forwards ${i * 0.1}s`;
        }
      });
    }
  }, []);

  const validate = useCallback(() => {
    const newErrors = {};
    const { username, password } = formData;

    if (!username.trim()) newErrors.username = 'Usuario corporativo requerido';
    else if (username.length < 4) newErrors.username = 'Mínimo 4 caracteres';

    if (!password) newErrors.password = 'Contraseña requerida';
    else if (password.length < 6) newErrors.password = 'Mínimo 6 caracteres';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }, [formData]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) {
      const form = formRef.current;
      if (form) {
        form.style.animation = 'none';
        form.offsetHeight;
        form.style.animation = 'shake 0.5s ease';
      }
      return;
    }

    setIsLoading(true);
    await new Promise(resolve => setTimeout(resolve, 2000));
    console.log('✅ Acceso autorizado');
    setLoginSuccess(true);
    setIsLoading(false);
  };

  const handleChange = (field) => (e) => {
    setFormData(prev => ({ ...prev, [field]: e.target.value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: undefined }));
    }
  };

  if (loginSuccess) {
    return (
      <div className="min-h-screen flex items-center justify-center p-4 relative bg-gradient-to-br from-gray-900 via-black to-gray-900">
        <Particles />
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/10" />
        <div className="relative max-w-md w-full text-center animate-scaleIn">
          <div className="bg-gray-900/80 backdrop-blur-xl rounded-3xl border border-green-500/50 p-12 shadow-2xl">
            <div className="w-24 h-24 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
              <CheckCircle size={48} className="text-green-400" />
            </div>
            <h2 className="text-3xl font-bold text-white mb-2">¡Bienvenido!</h2>
            <p className="text-gray-400 mb-6">Redirigiendo al Dashboard...</p>
            <div className="flex justify-center gap-2">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" />
              <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }} />
              <div className="w-3 h-3 bg-green-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div 
      className="min-h-screen flex items-center justify-center p-4 relative overflow-hidden"
      style={{
        backgroundImage: "url('/logo-bg.jpg')",
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      <div className="absolute inset-0 bg-gradient-to-br from-black/80 via-black/90 to-black/95" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(34,197,94,0.1),transparent_50%)]" />
      <Particles />
      <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-green-500/5 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 left-1/4 w-72 h-72 bg-emerald-500/5 rounded-full blur-3xl" />

      <div className="relative w-full max-w-md" ref={formRef}>
        <div className="bg-white/10 backdrop-blur-md rounded-3xl border border-white/20 shadow-[0_8px_32px_0_rgba(0,0,0,0.37)] overflow-hidden">
          <div className="relative px-8 py-10 text-center border-b border-gray-700/30">
            <div className="absolute top-4 right-4 flex items-center gap-1 bg-green-500/20 px-3 py-1 rounded-full">
              <Shield size={14} className="text-green-400" />
              <span className="text-xs text-green-400 font-medium">Alfa 2026 V-1.0</span>
            </div>
            <div className="flex justify-center mb-4">
              <div className="w-16 h-16 bg-gradient-to-br from-green-500 to-emerald-700 rounded-2xl flex items-center justify-center shadow-lg">
                <Zap size={32} className="text-white" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              CORPOELEC <span className="text-green-400">INDUSTRIAL</span>
            </h1>
            <p className="text-gray-400 mt-2 text-sm flex items-center justify-center gap-2">
              <Lock size={14} />
              Sistema de Gestión Empresarial
            </p>
          </div>

          <div className="px-8 pb-8 pt-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              <AnimatedInput
                id="username"
                label="Usuario Corporativo"
                value={formData.username}
                onChange={handleChange('username')}
                placeholder="ej: JPEREZ"
                icon={User}
                error={errors.username}
                showError={!!errors.username}
                autoComplete="username"
                required
              />

              <div>
                <AnimatedInput
                  id="password"
                  label="Contraseña Segura"
                  value={formData.password}
                  onChange={handleChange('password')}
                  placeholder="••••••••"
                  type={passwordType}
                  icon={Lock}
                  error={errors.password}
                  showError={!!errors.password}
                  autoComplete="current-password"
                  required
                />
                <PasswordStrength password={formData.password} />
              </div>

              <div className="flex items-center justify-between">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="w-4 h-4 rounded border-gray-600 bg-gray-700 text-green-500 focus:ring-green-500/50"
                  />
                  <span className="text-sm text-gray-400 group-hover:text-gray-300">
                    Recordarme
                  </span>
                </label>
                <a href="#" className="text-sm text-green-400 hover:text-green-300 flex items-center gap-1">
                  ¿Olvidó su contraseña?
                  <ChevronRight size={14} />
                </a>
              </div>

              <LoadingButton isLoading={isLoading}>
                <span className="flex items-center justify-center gap-2">
                  <Shield size={20} />
                  ACCEDER AL SISTEMA
                </span>
              </LoadingButton>
            </form>
          </div>

          <div className="px-8 py-6 border-t border-gray-700/30 bg-gray-900/30">
            <div className="flex items-center justify-center gap-2 text-gray-500 text-sm">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse" />
              <span>Sistema operativo • Conexión Segura En Desarrollo</span>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes fadeInUp { to { opacity: 1; transform: translateY(0); } }
        @keyframes shake { 0%,100%{transform:translateX(0);} 20%,60%{transform:translateX(-10px);} 40%,80%{transform:translateX(10px);} }
        @keyframes scaleIn { from { opacity:0; transform:scale(0.8); } to { opacity:1; transform:scale(1); } }
        @keyframes float { 0%,100%{transform:translateY(0) scale(1); opacity:0.2;} 50%{transform:translateY(-20px) scale(1.2); opacity:0.4;} }
        .animate-float { animation: float infinite ease-in-out; }
        .animate-shake { animation: shake 0.5s ease; }
        .animate-scaleIn { animation: scaleIn 0.5s ease forwards; }
      `}</style>
    </div>
  );
};

// ====================================================================
// COMPONENTE PRINCIPAL
// ====================================================================
export default function LoginCorpoelec() {
  const [showSplash, setShowSplash] = useState(true);

  const handleSplashComplete = () => {
    setShowSplash(false);
  };

  if (showSplash) {
    return <SplashScreen onComplete={handleSplashComplete} />;
  }

  return <LoginCorpoelecForm />;
}