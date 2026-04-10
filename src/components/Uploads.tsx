import React from 'react';
import { motion } from 'motion/react';
import { 
  UploadCloud, 
  FileCode, 
  CheckCircle2, 
  XCircle, 
  RefreshCw,
  Paperclip,
  MoreVertical
} from 'lucide-react';

export default function Uploads() {
  const recentActivity = [
    { name: 'ORDER_ENTRY.fmb', size: '1.2 MB', time: '2 mins ago', status: 'Success' },
    { name: 'CUSTOM_WIDGET_PROD.fmb', size: '4.8 MB', time: '1 hour ago', status: 'Failed' },
    { name: 'HR_MASTER_DTL.fmb', size: '850 KB', time: 'Yesterday', status: 'Success' },
    { name: 'FINANCE_LEDGER_2024.fmb', size: '3.1 MB', time: 'Processing', status: 'Processing', progress: 65 },
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-extrabold text-on-surface font-headline tracking-tight">Uploads</h2>
        <p className="text-on-surface-variant font-body">Manage and track your Oracle Forms modules.</p>
      </header>

      {/* Drag & Drop Area */}
      <section>
        <div className="bg-surface-container-lowest p-12 rounded-3xl border-2 border-dashed border-outline-variant flex flex-col items-center justify-center text-center transition-all hover:border-primary group bg-surface-container-low/20">
          <motion.div 
            whileHover={{ scale: 1.1 }}
            className="w-20 h-20 bg-primary-container rounded-3xl flex items-center justify-center mb-6 text-primary shadow-sm"
          >
            <UploadCloud size={40} />
          </motion.div>
          <h3 className="text-2xl font-bold font-headline text-on-surface mb-2">Drop FMB files here</h3>
          <p className="text-on-surface-variant text-center max-w-sm mb-8 font-body">
            Securely process your Oracle binary files for conversion readiness and business logic extraction.
          </p>
          <div className="flex flex-col items-center gap-4">
            <button className="bg-gradient-to-b from-primary to-primary-dim text-white px-10 py-4 rounded-2xl font-bold text-base shadow-lg shadow-primary/20 hover:opacity-90 transition-all flex items-center gap-2 active:scale-95">
              <Paperclip size={20} />
              Select Local Files
            </button>
            <div className="flex items-center gap-3">
              <span className="text-[10px] font-bold uppercase tracking-widest text-outline bg-surface-container-high px-3 py-1.5 rounded-lg">Max 50MB</span>
              <span className="text-[10px] font-bold uppercase tracking-widest text-outline bg-surface-container-high px-3 py-1.5 rounded-lg">.FMB ONLY</span>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Activity */}
      <section className="space-y-4">
        <div className="flex justify-between items-end px-2">
          <h3 className="font-headline font-bold text-xl text-on-surface">Recent Activity</h3>
          <button className="text-sm font-bold text-primary hover:underline">View All</button>
        </div>

        <div className="grid gap-3">
          {recentActivity.map((item, idx) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="bg-surface-container-lowest rounded-2xl p-5 flex items-center gap-5 border border-surface-container-high hover:shadow-md transition-all group"
            >
              <div className={`w-12 h-12 rounded-xl flex items-center justify-center shrink-0 ${
                item.status === 'Success' ? 'bg-emerald-50 text-emerald-600' :
                item.status === 'Failed' ? 'bg-error-container/10 text-error' :
                'bg-primary-container/50 text-primary'
              }`}>
                {item.status === 'Success' ? <CheckCircle2 size={24} /> :
                 item.status === 'Failed' ? <XCircle size={24} /> :
                 <RefreshCw size={24} className="animate-spin" />}
              </div>
              
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                  <h4 className="font-bold text-base text-on-surface truncate group-hover:text-primary transition-colors">{item.name}</h4>
                  <span className={`text-[10px] font-black uppercase tracking-tighter px-2 py-1 rounded-md ${
                    item.status === 'Success' ? 'bg-emerald-100 text-emerald-700' :
                    item.status === 'Failed' ? 'bg-error-container/20 text-error' :
                    'bg-primary-container text-primary'
                  }`}>
                    {item.status}
                  </span>
                </div>
                
                {item.status === 'Processing' ? (
                  <div className="mt-2">
                    <div className="flex justify-between text-[10px] font-bold text-primary mb-1">
                      <span>Analyzing Logic...</span>
                      <span>{item.progress}%</span>
                    </div>
                    <div className="w-full bg-surface-container-high h-1.5 rounded-full overflow-hidden">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${item.progress}%` }}
                        className="bg-primary h-full"
                      />
                    </div>
                  </div>
                ) : (
                  <div className="flex items-center gap-3 text-xs text-on-surface-variant font-medium">
                    <span className="flex items-center gap-1"><FileCode size={12} /> {item.size}</span>
                    <span className="w-1 h-1 rounded-full bg-outline-variant" />
                    <span>{item.time}</span>
                  </div>
                )}
              </div>

              <button className="p-2 text-outline hover:text-on-surface hover:bg-surface-container rounded-lg transition-all opacity-0 group-hover:opacity-100">
                <MoreVertical size={20} />
              </button>
            </motion.div>
          ))}
        </div>
      </section>
    </div>
  );
}
