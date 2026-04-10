import React from 'react';
import { motion } from 'motion/react';
import { 
  Search, 
  Filter, 
  Calendar, 
  SortAsc, 
  FileText, 
  Download, 
  Clock,
  BarChart3,
  Network
} from 'lucide-react';

export default function Reports() {
  const reports = [
    { 
      title: 'Financial Architecture Q3 Review', 
      date: 'Oct 24, 2024', 
      size: '4.2 MB', 
      status: 'Ready',
      icon: FileText,
      color: 'bg-primary-container text-on-primary-container'
    },
    { 
      title: 'Cloud Infrastructure Audit v2', 
      date: 'Oct 25, 2024', 
      size: 'Calculating...', 
      status: 'Processing',
      progress: 65,
      icon: Clock,
      color: 'bg-surface-container text-on-surface-variant'
    },
    { 
      title: 'Legacy System Risk Assessment', 
      date: 'Oct 20, 2024', 
      size: '12.8 MB', 
      status: 'Ready',
      icon: BarChart3,
      color: 'bg-indigo-100 text-indigo-700'
    },
    { 
      title: 'Supply Chain Connectivity Ledger', 
      date: 'Oct 18, 2024', 
      size: '8.1 MB', 
      status: 'Ready',
      icon: Network,
      color: 'bg-cyan-100 text-cyan-700'
    },
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-extrabold text-on-surface font-headline tracking-tight">Reports</h2>
        <p className="text-on-surface-variant font-body">Manage and download your generated architectural assessments.</p>
      </header>

      {/* Search & Filters */}
      <section className="flex flex-col gap-4">
        <div className="relative group">
          <Search size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-outline group-focus-within:text-primary transition-colors" />
          <input 
            type="text" 
            placeholder="Search reports by name or date..." 
            className="w-full pl-12 pr-4 py-4 bg-surface-container-highest border-b-2 border-outline-variant rounded-t-2xl focus:border-primary focus:ring-0 transition-all outline-none font-body text-base"
          />
        </div>
        <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-hide">
          <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high rounded-full text-sm font-bold whitespace-nowrap hover:bg-primary hover:text-white transition-all">
            <Filter size={16} />
            All Status
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high rounded-full text-sm font-bold whitespace-nowrap hover:bg-primary hover:text-white transition-all">
            <Calendar size={16} />
            This Month
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 bg-surface-container-high rounded-full text-sm font-bold whitespace-nowrap hover:bg-primary hover:text-white transition-all">
            <SortAsc size={16} />
            Latest First
          </button>
        </div>
      </section>

      {/* Report Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {reports.map((report, idx) => (
          <motion.article 
            key={report.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-surface-container-lowest p-8 rounded-2xl border-l-4 shadow-sm transition-all hover:shadow-md ${
              report.status === 'Ready' ? 'border-primary' : 'border-outline-variant opacity-90'
            }`}
          >
            <div className="flex justify-between items-start mb-6">
              <div className={`p-3 rounded-xl ${report.color}`}>
                <report.icon size={24} className={report.status === 'Processing' ? 'animate-spin' : ''} />
              </div>
              <span className={`px-3 py-1 text-[10px] font-black uppercase tracking-widest rounded-full ${
                report.status === 'Ready' ? 'bg-emerald-100 text-emerald-800' : 'bg-surface-container-high text-on-surface-variant'
              }`}>
                {report.status}
              </span>
            </div>

            <h3 className="font-headline font-bold text-xl leading-tight mb-2 text-on-surface">{report.title}</h3>
            <p className="text-xs text-on-surface-variant font-medium mb-8">
              Generated: {report.date} • {report.size}
            </p>

            {report.status === 'Processing' ? (
              <div className="space-y-4">
                <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                  <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: `${report.progress}%` }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className="bg-primary h-full opacity-80"
                  />
                </div>
                <button className="w-full flex items-center justify-center gap-2 py-4 bg-surface-container-high text-outline rounded-2xl font-bold text-sm cursor-not-allowed" disabled>
                  Processing Data...
                </button>
              </div>
            ) : (
              <button className="w-full flex items-center justify-center gap-2 py-4 bg-gradient-to-b from-primary to-primary-dim text-white rounded-2xl font-bold text-sm shadow-lg shadow-primary/10 hover:opacity-90 transition-all active:scale-[0.98]">
                <Download size={18} />
                Download Report
              </button>
            )}
          </motion.article>
        ))}
      </div>

      <div className="py-12 text-center">
        <button className="text-primary font-bold text-sm font-headline hover:underline flex items-center gap-2 mx-auto">
          View Archived Reports
          <Clock size={16} />
        </button>
      </div>
    </div>
  );
}
