import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  LayoutDashboard, 
  UploadCloud, 
  FileText, 
  History, 
  Bell, 
  Search,
  Menu,
  X,
  ChevronRight
} from 'lucide-react';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Layout({ children, activeTab, setActiveTab }: LayoutProps) {
  const [isSidebarOpen, setIsSidebarOpen] = React.useState(false);

  const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'uploads', label: 'Uploads', icon: UploadCloud },
    { id: 'reports', label: 'Reports', icon: FileText },
    { id: 'history', label: 'History', icon: History },
  ];

  return (
    <div className="min-h-screen bg-background flex flex-col md:flex-row">
      {/* Mobile Header */}
      <header className="md:hidden bg-surface-container-lowest border-b border-surface-container-high px-4 py-3 flex items-center justify-between sticky top-0 z-50">
        <div className="flex items-center gap-2">
          <div className="bg-primary p-1.5 rounded-lg text-white">
            <LayoutDashboard size={20} />
          </div>
          <h1 className="font-headline font-bold text-primary text-lg">Oracle FMB</h1>
        </div>
        <button 
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-2 text-on-surface-variant hover:bg-surface-container rounded-lg transition-colors"
        >
          {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </header>

      {/* Sidebar (Desktop) */}
      <aside className="hidden md:flex flex-col w-64 bg-surface-container-low border-r border-surface-container-high sticky top-0 h-screen">
        <div className="p-6 flex items-center gap-3">
          <div className="bg-primary p-2 rounded-xl text-white shadow-lg shadow-primary/20">
            <LayoutDashboard size={24} />
          </div>
          <h1 className="font-headline font-extrabold text-primary text-xl tracking-tight">Oracle FMB</h1>
        </div>

        <nav className="flex-1 px-4 py-6 space-y-2">
          <p className="px-4 text-[10px] font-bold uppercase tracking-widest text-outline mb-4">Assessment Ledger</p>
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 group ${
                activeTab === item.id 
                  ? 'bg-surface-container-lowest text-primary font-bold shadow-sm' 
                  : 'text-on-surface-variant hover:bg-surface-container-high hover:text-on-surface'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'text-primary' : 'text-outline group-hover:text-on-surface'} />
              <span className="font-headline text-sm uppercase tracking-wider">{item.label}</span>
              {activeTab === item.id && (
                <motion.div 
                  layoutId="active-nav"
                  className="ml-auto w-1.5 h-1.5 rounded-full bg-primary"
                />
              )}
            </button>
          ))}
        </nav>

        <div className="p-4 border-t border-surface-container-high">
          <div className="flex items-center gap-3 p-3 bg-surface-container-lowest rounded-2xl shadow-sm border border-surface-container-high">
            <div className="w-10 h-10 rounded-full bg-primary-container flex items-center justify-center text-on-primary-container font-bold text-sm">
              JD
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-on-surface truncate">John Doe</p>
              <p className="text-[10px] text-on-surface-variant truncate">Technical Lead</p>
            </div>
            <button className="text-outline hover:text-primary transition-colors">
              <Bell size={18} />
            </button>
          </div>
        </div>
      </aside>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {isSidebarOpen && (
          <>
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsSidebarOpen(false)}
              className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40 md:hidden"
            />
            <motion.div 
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className="fixed inset-y-0 left-0 w-72 bg-surface-container-lowest z-50 md:hidden shadow-2xl flex flex-col"
            >
              <div className="p-6 flex items-center justify-between border-b border-surface-container-high">
                <div className="flex items-center gap-3">
                  <div className="bg-primary p-2 rounded-xl text-white">
                    <LayoutDashboard size={24} />
                  </div>
                  <h1 className="font-headline font-bold text-primary text-xl">Oracle FMB</h1>
                </div>
                <button onClick={() => setIsSidebarOpen(false)} className="text-on-surface-variant">
                  <X size={24} />
                </button>
              </div>
              <nav className="flex-1 p-4 space-y-2">
                {navItems.map((item) => (
                  <button
                    key={item.id}
                    onClick={() => {
                      setActiveTab(item.id);
                      setIsSidebarOpen(false);
                    }}
                    className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl transition-all ${
                      activeTab === item.id 
                        ? 'bg-primary-container text-primary font-bold' 
                        : 'text-on-surface-variant hover:bg-surface-container-low'
                    }`}
                  >
                    <item.icon size={22} />
                    <span className="font-headline text-base uppercase tracking-wider">{item.label}</span>
                    <ChevronRight size={18} className="ml-auto opacity-50" />
                  </button>
                ))}
              </nav>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col min-h-screen overflow-x-hidden">
        {/* Desktop Header (Breadcrumbs/Search) */}
        <header className="hidden md:flex items-center justify-between px-8 py-4 bg-surface-container-lowest border-b border-surface-container-high sticky top-0 z-30">
          <div className="flex items-center gap-2 text-sm">
            <span className="text-on-surface-variant">Assessment Ledger</span>
            <ChevronRight size={14} className="text-outline" />
            <span className="font-bold text-primary capitalize">{activeTab}</span>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-outline" />
              <input 
                type="text" 
                placeholder="Search assessments..." 
                className="pl-10 pr-4 py-2 bg-surface-container-low border-none rounded-xl text-sm focus:ring-2 focus:ring-primary/20 transition-all w-64"
              />
            </div>
            <button className="relative p-2 text-on-surface-variant hover:bg-surface-container rounded-xl transition-colors">
              <Bell size={20} />
              <span className="absolute top-2 right-2 w-2 h-2 bg-error rounded-full border-2 border-surface-container-lowest" />
            </button>
          </div>
        </header>

        <div className="flex-1 p-4 md:p-8 max-w-7xl mx-auto w-full">
          {children}
        </div>

        {/* Mobile Bottom Nav */}
        <nav className="md:hidden fixed bottom-0 left-0 right-0 bg-surface-container-lowest border-t border-surface-container-high px-4 py-2 flex justify-around items-center z-40">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex flex-col items-center gap-1 p-2 transition-all ${
                activeTab === item.id ? 'text-primary' : 'text-on-surface-variant'
              }`}
            >
              <item.icon size={20} className={activeTab === item.id ? 'fill-primary/10' : ''} />
              <span className="text-[10px] font-bold uppercase tracking-tighter">{item.label}</span>
            </button>
          ))}
        </nav>

        {/* Footer */}
        <footer className="px-8 py-12 border-t border-surface-container-high bg-surface-container-low/50 mt-auto mb-16 md:mb-0">
          <div className="flex flex-col md:flex-row justify-between items-center gap-6">
            <p className="text-xs text-outline font-body">
              © 2024 Oracle FMB Assessment Ledger. Confident Data Architecture.
            </p>
            <div className="flex gap-8">
              <a href="#" className="text-xs text-outline hover:text-primary transition-colors">Documentation</a>
              <a href="#" className="text-xs text-outline hover:text-primary transition-colors">Privacy Policy</a>
              <a href="#" className="text-xs text-outline hover:text-primary transition-colors">Support</a>
            </div>
          </div>
        </footer>
      </main>
    </div>
  );
}
