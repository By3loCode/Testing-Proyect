"use client";

import React, { useState, useEffect, useMemo } from 'react';
import { 
  Home, BarChart2, Users, Settings, Bell, Search, 
  ChevronRight, Activity, Server, Shield, Zap, LogOut,
  AlertTriangle, Filter, Sun, Moon, Building2, Briefcase, Factory,
  ChevronDown, ChevronUp, Download, Info, Clock, TrendingUp, UsersRound
} from 'lucide-react';

// ==========================================
// TIPOS Y INTERFACES
// ==========================================

interface OrgCategory {
  category: string;
  icon: React.ElementType;
  items: string[];
  expanded?: boolean;
}

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  active: boolean;
  collapsed: boolean;
  darkMode: boolean;
  onClick?: () => void;
}

interface DeptCardProps {
  group: OrgCategory;
  darkMode: boolean;
  onToggle?: () => void;
}

interface AuditAlert {
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
}

// ==========================================
// DATA: ESTRUCTURA ORGANIZATIVA
// ==========================================

const ORG_STRUCTURE: OrgCategory[] = [
  {
    category: "I. Alta Dirección y Control",
    icon: Shield,
    items: ["Gerencia General", "Auditoría Interna", "Consultoría Jurídica", "Planificación y Presupuesto", "Todas las Gerencias"]
  },
  {
    category: "II. Gestión Transversal",
    icon: Briefcase,
    items: ["Administración", "Gestión Humana", "Administrativas y Logística", "TIC"]
  },
  {
    category: "III. Ingeniería y Operaciones",
    icon: Zap,
    items: ["Proyectos", "Producción", "Adecuaciones", "Energía Alternativa", "ASHO", "Comercialización"]
  },
  {
    category: "IV. Gestión Social",
    icon: Users,
    items: ["Atención al Ciudadano", "Gestión Comunal"]
  },
  {
    category: "V. Unidades Operativas",
    icon: Factory,
    items: ["Planta Luis Zambrano", "Planta Metrocontadores", "Planta Tanques", "Centro Textil", "UNERVEN", "VIETVEN"]
  }
];

const PLANT_METRICS = [
  { name: "Planta Luis Zambrano", availability: 95, trend: "+2%", status: "optimal" },
  { name: "Planta Metrocontadores", availability: 88, trend: "-1%", status: "warning" },
  { name: "Planta Tanques", availability: 92, trend: "+5%", status: "optimal" },
  { name: "Centro Textil", availability: 85, trend: "-3%", status: "warning" },
  { name: "UNERVEN", availability: 90, trend: "+1%", status: "optimal" },
  { name: "VIETVEN", availability: 87, trend: "+4%", status: "optimal" }
];

const AUDIT_ALERTS: AuditAlert[] = [
  {
    title: "Revisión Jurídica Pendiente",
    description: "Gerencia General requiere firma de documentos legales",
    priority: "high",
    date: "Hoy"
  },
  {
    title: "Mantenimiento Preventivo",
    description: "Planta Tanques entra en ciclo de revisión programada",
    priority: "medium",
    date: "Mañana"
  },
  {
    title: "Actualización de Protocolos",
    description: "Departamento TIC necesita aprobación de nuevos estándares",
    priority: "low",
    date: "En 3 días"
  }
];

// ==========================================
// COMPONENTES REUTILIZABLES (CORPORATE STYLE)
// ==========================================

const ThemeToggle: React.FC<{ darkMode: boolean; onToggle: () => void }> = ({ darkMode, onToggle }) => (
  <button 
    onClick={onToggle}
    aria-label={darkMode ? "Switch to light mode" : "Switch to dark mode"}
    className={`
      p-2 rounded-md transition-colors border
      ${darkMode 
        ? 'bg-slate-800 border-slate-700 text-slate-300 hover:text-white hover:bg-slate-700' 
        : 'bg-white border-slate-200 text-slate-600 hover:text-slate-900 hover:bg-slate-50'
      }
    `}
  >
    {darkMode ? <Sun size={16} /> : <Moon size={16} />}
  </button>
);

const SidebarItem: React.FC<SidebarItemProps> = ({ icon: Icon, label, active, collapsed, darkMode, onClick }) => (
  <div 
    onClick={onClick}
    role="button"
    tabIndex={0}
    aria-label={label}
    className={`
      group flex items-center gap-3 px-3 py-2.5 rounded-md cursor-pointer transition-all duration-200
      ${active 
        ? (darkMode ? 'bg-red-800 text-white shadow-sm' : 'bg-red-700 text-white shadow-sm') 
        : (darkMode 
          ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' 
          : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900')
      }
    `}
  >
    <Icon size={18} className={`${active ? 'text-white' : ''}`} />
    {!collapsed && (
      <span className="font-medium text-sm tracking-tight">{label}</span>
    )}
  </div>
);

const DeptCard: React.FC<DeptCardProps> = ({ group, darkMode, onToggle }) => {
  const [expanded, setExpanded] = useState(true);

  const toggleExpand = () => {
    setExpanded(!expanded);
    onToggle?.();
  };

  return (
    <div className={`
      rounded-lg border transition-all duration-200
      ${darkMode 
        ? 'bg-slate-900 border-slate-800 hover:border-slate-700' 
        : 'bg-white border-slate-200 hover:border-slate-300'
      }
    `}>
      <div 
        onClick={toggleExpand}
        className={`
          p-3 border-b cursor-pointer flex items-center justify-between transition-colors
          ${darkMode ? 'border-slate-800 hover:bg-slate-800/50' : 'border-slate-100 hover:bg-slate-50'}
        `}
      >
        <div className="flex items-center gap-2">
          <group.icon size={16} className={darkMode ? 'text-slate-400' : 'text-slate-500'} />
          <h3 className={`font-semibold text-xs uppercase tracking-wide ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
            {group.category}
          </h3>
        </div>
        {expanded 
           ? <ChevronUp size={14} className="text-slate-500" />
           : <ChevronDown size={14} className="text-slate-500" />
        }
      </div>
      
      {expanded && (
        <div className="p-2 space-y-1">
          {group.items.map((item, idx) => (
            <div 
              key={idx} 
              className={`
                flex items-center gap-2 px-2 py-1.5 rounded transition-colors text-xs
                ${darkMode 
                  ? 'text-slate-400 hover:bg-slate-800 hover:text-slate-200' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }
              `}
            >
              <div className={`w-1 h-1 rounded-full ${darkMode ? 'bg-red-800' : 'bg-red-600'}`} />
              {item}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

const StatCard: React.FC<{
  title: string;
  value: string;
  subtext: string;
  icon: React.ElementType;
  darkMode: boolean;
  trend?: string;
  trendPositive?: boolean;
}> = ({ title, value, subtext, icon: Icon, darkMode, trend, trendPositive }) => (
  <div className={`
    p-5 rounded-lg border flex flex-col justify-between h-full
    ${darkMode 
      ? 'bg-slate-900 border-slate-800 hover:border-slate-700' 
      : 'bg-white border-slate-200 hover:border-slate-300'
    }
  `}>
    <div className="flex justify-between items-start mb-2">
       <span className={`text-xs font-semibold uppercase tracking-wider ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
         {title}
       </span>
       <Icon size={18} className={darkMode ? 'text-slate-600' : 'text-slate-400'} />
    </div>
    
    <div className="flex items-baseline gap-2 mb-1">
       <span className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>{value}</span>
       {trend && (
         <span className={`text-xs font-bold px-1.5 py-0.5 rounded ${
           trendPositive 
             ? (darkMode ? 'bg-emerald-900/30 text-emerald-400' : 'bg-emerald-50 text-emerald-700') 
             : (darkMode ? 'bg-red-900/30 text-red-400' : 'bg-red-50 text-red-700')
         }`}>
           {trend}
         </span>
       )}
    </div>
    
    <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
      {subtext}
    </p>
  </div>
);

const AlertCard: React.FC<{
  title: string;
  description: string;
  priority: 'high' | 'medium' | 'low';
  date: string;
  darkMode: boolean;
}> = ({ title, description, priority, date, darkMode }) => {
  const getStyles = () => {
    switch(priority) {
      case 'high':
        return { borderL: 'border-l-red-600', text: 'text-red-600', bg: '' };
      case 'medium':
        return { borderL: 'border-l-amber-500', text: 'text-amber-600', bg: '' };
      default:
        return { borderL: 'border-l-blue-500', text: 'text-blue-600', bg: '' };
    }
  };
  const s = getStyles();

  return (
    <div className={`
       pl-3 py-2 border-l-4 rounded-r-md transition-colors
       ${s.borderL} 
       ${darkMode ? 'bg-slate-800/30 hover:bg-slate-800/50' : 'bg-slate-50 hover:bg-slate-100'}
    `}>
      <div className="flex justify-between items-start">
         <div>
            <span className={`text-xs font-bold uppercase ${s.text} block mb-0.5`}>{title}</span>
            <p className={`text-sm leading-tight ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>{description}</p>
         </div>
         <span className={`text-[10px] font-mono px-1.5 py-0.5 rounded ${darkMode ? 'bg-slate-800 text-slate-500' : 'bg-white text-slate-500 border border-slate-200'}`}>
           {date}
         </span>
      </div>
    </div>
  );
};

// ==========================================
// DASHBOARD PRINCIPAL (CORREGIDO)
// ==========================================

export default function Dashboard() {
  const [darkMode, setDarkMode] = useState(true);
  const [collapsed, setCollapsed] = useState(false);
  const [mounted, setMounted] = useState(false);
  const [activeSection, setActiveSection] = useState('dashboard');
  const [expandedCategories, setExpandedCategories] = useState<number[]>([0, 1, 2, 3, 4]);

  // ✅ FIX: MOVED ABOVE MOUNTED CHECK TO PREVENT HOOK ORDER CHANGES
  const theme = useMemo(() => ({
    bg: darkMode ? 'bg-[#0a0c10]' : 'bg-slate-50',
    header: darkMode ? 'bg-[#0a0c10]/90 border-slate-800' : 'bg-white/90 border-slate-200',
    sidebar: darkMode ? 'bg-[#0d1117] border-slate-800' : 'bg-white border-slate-200',
    text: darkMode ? 'text-slate-200' : 'text-slate-900',
    subtext: darkMode ? 'text-slate-500' : 'text-slate-400',
    cardBg: darkMode ? 'bg-slate-900/50' : 'bg-white'
  }), [darkMode]);

  useEffect(() => { 
    setMounted(true); 
  }, []);

  useEffect(() => {
    if (mounted) {
      document.documentElement.classList.toggle('dark', darkMode);
    }
  }, [darkMode, mounted]);

  const stats = useMemo(() => [
    { title: "Total Departamentos", value: "23", subtext: "Estructura completa", icon: Building2, trend: "+2", trendPositive: true },
    { title: "Unidades Operativas", value: "6", subtext: "Plantas activas", icon: Factory, trend: "0", trendPositive: true },
    { title: "Alertas Activas", value: "3", subtext: "Requieren atención", icon: AlertTriangle, trend: "-1", trendPositive: true },
    { title: "Disponibilidad", value: "91%", subtext: "Promedio general", icon: TrendingUp, trend: "+2%", trendPositive: true }
  ], []);

  if (!mounted) return null;

  const toggleCategory = (index: number) => {
    setExpandedCategories(prev => 
      prev.includes(index) 
        ? prev.filter(i => i !== index) 
        : [...prev, index]
    );
  };

  return (
    <div className={`min-h-screen ${theme.bg} ${theme.text} font-sans transition-colors duration-300`}>
      
      {/* SIDEBAR */}
      <aside className={`
        fixed top-0 left-0 bottom-0 z-50 ${theme.sidebar} border-r transition-all duration-300
        ${collapsed ? 'w-16' : 'w-64'}
      `}>
        <div className="flex flex-col h-full">
          {/* HEADER SIDEBAR */}
          <div className={`h-16 flex items-center ${collapsed ? 'justify-center' : 'px-6'} border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 flex items-center justify-center shrink-0">
                <img src="/logo-rojo.png" alt="Corpoelec" className="w-full h-full object-contain" />
              </div>
              {!collapsed && (
                <div className="flex flex-col leading-none">
                  <span className={`font-bold text-sm tracking-tight ${darkMode ? 'text-white' : 'text-slate-900'}`}>CORPOELEC</span>
                  <span className={`text-[10px] font-medium tracking-wider mt-0.5 ${darkMode ? 'text-red-200' : 'text-red-700'}`}>INDUSTRIAL</span>
                </div>
              )}
            </div>
          </div>

          {/* NAVIGATION */}
          <nav className="flex-1 p-3 space-y-1">
            <SidebarItem 
              icon={Home} 
              label="Dashboard General" 
              active={activeSection === 'dashboard'} 
              collapsed={collapsed} 
              darkMode={darkMode}
              onClick={() => setActiveSection('dashboard')} 
            />
            <SidebarItem 
              icon={Building2} 
              label="Estructura Organizativa" 
              active={activeSection === 'estructura'} 
              collapsed={collapsed} 
              darkMode={darkMode}
              onClick={() => setActiveSection('estructura')} 
            />
            <SidebarItem 
              icon={Activity} 
              label="Monitoreo Operativo" 
              active={activeSection === 'monitoreo'} 
              collapsed={collapsed} 
              darkMode={darkMode}
              onClick={() => setActiveSection('monitoreo')} 
            />
            <SidebarItem 
              icon={Server} 
              label="Infraestructura TI" 
              active={activeSection === 'sistemas'} 
              collapsed={collapsed} 
              darkMode={darkMode}
              onClick={() => setActiveSection('sistemas')} 
            />
            <SidebarItem 
              icon={UsersRound} 
              label="Gestión de Personal" 
              active={activeSection === 'personal'} 
              collapsed={collapsed} 
              darkMode={darkMode}
              onClick={() => setActiveSection('personal')} 
            />
          </nav>

          {/* FOOTER SIDEBAR */}
          <div className={`p-3 border-t ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
            <button 
              onClick={() => setCollapsed(!collapsed)}
              className={`
                w-full flex items-center justify-center h-9 rounded-md transition-colors
                ${darkMode 
                  ? 'text-slate-400 hover:bg-slate-800 hover:text-white' 
                  : 'text-slate-600 hover:bg-slate-100 hover:text-slate-900'
                }
              `}
            >
              <ChevronRight size={18} className={`transition-transform duration-300 ${!collapsed && 'rotate-180'}`} />
            </button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT */}
      <main className={`transition-all duration-300 ${collapsed ? 'ml-16' : 'ml-64'}`}>
        
        {/* TOP HEADER */}
        <header className={`
          sticky top-0 z-40 h-16 px-6 flex items-center justify-between ${theme.header} border-b
        `}>
          <div className="flex items-center gap-4">
             <h2 className={`font-semibold text-sm ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
               Sistema de Gestión Institucional <span className="mx-2 text-slate-500">|</span> <span className="text-slate-500 font-normal">Alfa 2026 V-1.0</span>
             </h2>
          </div>

          <div className="flex items-center gap-4">
            <div className={`flex items-center bg-transparent border rounded-md px-3 py-1.5 ${darkMode ? 'border-slate-700' : 'border-slate-300'}`}>
               <Search size={14} className="text-slate-500 mr-2" />
               <input 
                  type="text" 
                  placeholder="Buscar recurso..." 
                  className={`bg-transparent border-none outline-none text-xs w-48 ${darkMode ? 'text-white' : 'text-slate-900'}`}
               />
            </div>

            <ThemeToggle darkMode={darkMode} onToggle={() => setDarkMode(!darkMode)} />
            
            <div className={`h-6 w-px ${darkMode ? 'bg-slate-800' : 'bg-slate-300'}`} />
            
            <div className="flex items-center gap-3">
              <div className="text-right hidden sm:block leading-tight">
                <p className={`text-sm font-semibold ${darkMode ? 'text-slate-200' : 'text-slate-900'}`}>
                  Admin. General
                </p>
                <p className={`text-xs ${darkMode ? 'text-slate-500' : 'text-slate-500'}`}>
                  Gerencia TI
                </p>
              </div>
              <div className="w-9 h-9 rounded-full bg-red-800 flex items-center justify-center text-white text-xs font-bold ring-2 ring-offset-2 ring-offset-transparent ring-slate-200/20">
                AG
              </div>
            </div>
          </div>
        </header>

        {/* WORKSPACE */}
        <div className="p-8 max-w-7xl mx-auto space-y-8">
          
          {/* BREADCRUMB / TITLE */}
          <div className="flex justify-between items-center pb-6 border-b border-slate-200/10">
            <div>
              <h1 className={`text-2xl font-bold ${darkMode ? 'text-white' : 'text-slate-900'}`}>
                Panel de Control Integrado
              </h1>
              <p className={`mt-1 text-sm ${darkMode ? 'text-slate-400' : 'text-slate-500'}`}>
                Resumen de operaciones y alertas estratégicas.
              </p>
            </div>
            <div className="flex gap-3">
               <button className={`
                 px-4 py-2 rounded-md text-sm font-medium border transition-colors
                 ${darkMode 
                   ? 'border-slate-700 text-slate-300 hover:bg-slate-800' 
                   : 'border-slate-300 text-slate-700 hover:bg-slate-50'
                 }
               `}>
                 <Download size={16} className="inline mr-2" />
                 Reporte SGI
               </button>
               <button className="px-4 py-2 rounded-md text-sm font-medium bg-red-700 text-white hover:bg-red-800 transition-colors shadow-sm">
                 <Filter size={16} className="inline mr-2" />
                 Filtrar Vista
               </button>
            </div>
          </div>

          {/* KPI METRICS */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {stats.map((stat, index) => (
              <StatCard key={index} {...stat} darkMode={darkMode} />
            ))}
          </div>

          {/* MAIN GRID */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            
            {/* ORGANIZATIONAL STRUCTURE */}
            <div className={`lg:col-span-2 rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
              <div className={`px-6 py-4 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'} flex justify-between items-center`}>
                <h3 className={`font-bold text-sm ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                  ESTRUCTURA ORGANIZATIVA
                </h3>
                <span className={`text-xs px-2 py-0.5 rounded ${darkMode ? 'bg-slate-800 text-slate-400' : 'bg-slate-100 text-slate-600'}`}>
                  5 Gerencias Principales
                </span>
              </div>
              <div className="p-6 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                 {ORG_STRUCTURE.map((group, index) => (
                    <DeptCard 
                      key={index} 
                      group={group} 
                      darkMode={darkMode} 
                      onToggle={() => toggleCategory(index)} 
                    />
                 ))}
              </div>
            </div>

            {/* SIDE COLUMN */}
            <div className="space-y-6">
              
              {/* ALERTS */}
              <div className={`rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className={`px-6 py-4 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                  <h3 className={`font-bold text-sm ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    NOTIFICACIONES CRÍTICAS
                  </h3>
                </div>
                <div className="p-4 space-y-3">
                  {AUDIT_ALERTS.map((alert, index) => (
                    <AlertCard key={index} {...alert} darkMode={darkMode} />
                  ))}
                </div>
              </div>

               {/* PLANT STATUS */}
              <div className={`rounded-lg border ${darkMode ? 'bg-slate-900 border-slate-800' : 'bg-white border-slate-200'}`}>
                <div className={`px-6 py-4 border-b ${darkMode ? 'border-slate-800' : 'border-slate-200'}`}>
                  <h3 className={`font-bold text-sm ${darkMode ? 'text-slate-200' : 'text-slate-800'}`}>
                    DISPONIBILIDAD OPERATIVA
                  </h3>
                </div>
                <div className="p-4 space-y-4">
                  {PLANT_METRICS.slice(0, 4).map((planta, i) => (
                    <div key={i} className="flex items-center justify-between">
                      <div className="flex flex-col">
                        <span className={`text-sm font-medium ${darkMode ? 'text-slate-300' : 'text-slate-700'}`}>
                          {planta.name}
                        </span>
                        <div className="flex items-center gap-2">
                           <div className={`w-16 h-1.5 rounded-full overflow-hidden ${darkMode ? 'bg-slate-800' : 'bg-slate-100'}`}>
                             <div className={`h-full ${planta.status === 'optimal' ? 'bg-green-600' : 'bg-amber-500'}`} style={{ width: `${planta.availability}%` }} />
                           </div>
                           <span className="text-xs text-slate-500">{planta.availability}%</span>
                        </div>
                      </div>
                      <span className={`text-xs font-bold px-2 py-1 rounded ${planta.status === 'optimal' ? 'bg-green-500/10 text-green-500' : 'bg-amber-500/10 text-amber-500'}`}>
                        {planta.status === 'optimal' ? 'OK' : 'REV'}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

            </div>
          </div>
        </div>
      </main>
    </div>
  );
}