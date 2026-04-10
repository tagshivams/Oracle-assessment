import React from 'react';
import { motion } from 'motion/react';
import { 
  Check, 
  X, 
  Calendar, 
  Clock, 
  FileText, 
  Download, 
  RefreshCw,
  AlertTriangle
} from 'lucide-react';

export default function History() {
  const history = [
    { 
      id: '#AS-99821-X',
      name: 'financial_q3_audit_v2.fmb', 
      status: 'Completed', 
      startTime: '14:02:11', 
      duration: '3m 44s',
      date: 'October 24, 2023'
    },
    { 
      id: '#AS-99818-K',
      name: 'inventory_master_schema.fmb', 
      status: 'Completed', 
      startTime: '10:15:30', 
      duration: '8m 12s',
      date: 'October 24, 2023'
    },
    { 
      id: '#AS-99801-R',
      name: 'legacy_crm_migration.fmb', 
      status: 'Failed', 
      startTime: '09:45:00', 
      duration: '1m 12s',
      error: 'Interrupted: Unexpected token at row 452',
      date: 'October 23, 2023'
    },
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <span className="uppercase tracking-widest text-[10px] font-black text-primary font-headline">Assessment Ledger</span>
        <h2 className="text-4xl font-extrabold text-on-surface font-headline tracking-tight">History</h2>
        <p className="text-on-surface-variant font-body">Audit log of all past assessment runs.</p>
      </header>

      <div className="p-6 bg-surface-container-low rounded-3xl flex flex-col md:flex-row items-center justify-between gap-6 border border-surface-container-high">
        <div className="flex-1 text-center md:text-left">
          <p className="text-[10px] uppercase font-black text-outline tracking-widest mb-1">Total Runs Analyzed</p>
          <p className="text-4xl font-black font-headline text-primary">128</p>
        </div>
        <div className="hidden md:block h-12 w-px bg-surface-container-high" />
        <div className="flex-1 text-center md:text-right">
          <p className="text-[10px] uppercase font-black text-outline tracking-widest mb-1">Avg. Duration</p>
          <p className="text-4xl font-black font-headline text-on-surface">4m 12s</p>
        </div>
      </div>

      <section className="space-y-12 relative">
        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-surface-container-high hidden md:block" />
        
        <div className="space-y-8">
          <div className="flex items-center gap-3 mb-6">
            <Calendar size={16} className="text-outline" />
            <span className="text-xs font-black uppercase tracking-widest text-on-surface-variant">October 2023</span>
          </div>

          {history.map((run, idx) => (
            <motion.div 
              key={run.id}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="relative md:pl-12"
            >
              {/* Timeline Dot */}
              <div className={`absolute left-0 top-0 w-8 h-8 rounded-full flex items-center justify-center z-10 shadow-sm border-4 border-background hidden md:flex ${
                run.status === 'Completed' ? 'bg-primary text-white' : 'bg-error text-white'
              }`}>
                {run.status === 'Completed' ? <Check size={14} strokeWidth={3} /> : <X size={14} strokeWidth={3} />}
              </div>

              <div className={`bg-surface-container-lowest p-6 rounded-2xl border-b-4 shadow-sm ${
                run.status === 'Completed' ? 'border-primary/10' : 'border-error/10'
              }`}>
                <div className="flex flex-col sm:flex-row justify-between items-start gap-4 mb-6">
                  <div className="max-w-full sm:max-w-[70%]">
                    <h3 className="font-headline font-bold text-lg text-on-surface leading-tight truncate">{run.name}</h3>
                    <p className="text-[10px] text-outline mt-1 font-bold uppercase tracking-wider">ID: {run.id}</p>
                  </div>
                  <span className={`text-[10px] px-3 py-1 rounded-lg font-black uppercase tracking-tighter ${
                    run.status === 'Completed' ? 'bg-primary-container text-primary' : 'bg-error-container/20 text-error'
                  }`}>
                    {run.status}
                  </span>
                </div>

                {run.error && (
                  <div className="p-4 bg-error-container/5 rounded-xl mb-6 border border-error/10">
                    <p className="text-xs text-error font-bold flex items-center gap-2">
                      <AlertTriangle size={14} />
                      {run.error}
                    </p>
                  </div>
                )}

                <div className="grid grid-cols-2 gap-8 py-4 border-y border-surface-container-high/50">
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-outline font-black flex items-center gap-1">
                      <Clock size={10} /> Start Time
                    </p>
                    <p className="text-sm font-bold text-on-surface">{run.startTime}</p>
                  </div>
                  <div className="space-y-1">
                    <p className="text-[9px] uppercase tracking-widest text-outline font-black flex items-center gap-1">
                      <Clock size={10} /> Duration
                    </p>
                    <p className="text-sm font-bold text-on-surface">{run.duration}</p>
                  </div>
                </div>

                <div className="mt-6 flex gap-3">
                  {run.status === 'Completed' ? (
                    <>
                      <button className="flex-1 bg-primary text-white text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-primary-dim transition-all shadow-lg shadow-primary/10 active:scale-95">
                        <FileText size={16} />
                        View Report
                      </button>
                      <button className="w-12 h-10 bg-surface-container-low flex items-center justify-center rounded-xl text-on-surface-variant hover:bg-surface-container-high transition-all active:scale-95">
                        <Download size={18} />
                      </button>
                    </>
                  ) : (
                    <button className="flex-1 bg-surface-container-low text-on-surface-variant text-xs font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 hover:bg-surface-container-high transition-all active:scale-95">
                      <RefreshCw size={16} />
                      Retry Analysis
                    </button>
                  )}
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
