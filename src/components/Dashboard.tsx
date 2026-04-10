import React from 'react';
import { motion } from 'motion/react';
import { 
  Database, 
  Zap, 
  Code, 
  AlertCircle, 
  AlertTriangle, 
  Download,
  CheckCircle2,
  ExternalLink
} from 'lucide-react';

export default function Dashboard() {
  const metrics = [
    { label: 'Objects', value: '1,248', icon: Database, color: 'text-primary', border: 'border-primary-container' },
    { label: 'Triggers', value: '342', icon: Zap, color: 'text-indigo-600', border: 'border-indigo-100' },
    { label: 'Procedures', value: '89', icon: Code, color: 'text-cyan-600', border: 'border-cyan-100' },
    { label: 'Errors', value: '12', icon: AlertCircle, color: 'text-error', border: 'border-error-container' },
    { label: 'Warnings', value: '45', icon: AlertTriangle, color: 'text-secondary', border: 'border-secondary-container' },
  ];

  const findings = [
    { module: 'MAIN_ENTRY_BLK', type: 'Data Block', issue: 'External DLL call referenced in trigger', severity: 'Critical' },
    { module: 'VALIDATE_USER', type: 'Program Unit', issue: "Deprecated built-in 'RUN_PRODUCT' found", severity: 'Critical' },
    { module: 'ON-ERROR', type: 'Trigger', issue: 'Hardcoded error messages (non-translatable)', severity: 'Medium' },
    { module: 'ORDER_CANVAS', type: 'Canvas', issue: 'Missing accessibility tooltips on items', severity: 'Low' },
  ];

  return (
    <div className="space-y-8">
      <header className="space-y-2">
        <h2 className="text-3xl font-extrabold text-on-surface font-headline tracking-tight">Main Assessment Results</h2>
        <p className="text-on-surface-variant font-body">Executive summary of the latest module analysis.</p>
      </header>

      {/* Analysis Pulse */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="bg-primary-container/20 rounded-2xl p-6 border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-6"
      >
        <div className="flex items-center gap-4">
          <div className="relative">
            <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-20" />
            <div className="relative bg-primary h-3 w-3 rounded-full" />
          </div>
          <div>
            <p className="font-headline font-bold text-on-primary-container">Analyzing: ORDER_ENTRY_SYS.fmb</p>
            <p className="text-xs text-on-primary-fixed-variant">Mapping procedures and identifying triggers...</p>
          </div>
        </div>
        <div className="flex items-center gap-6 w-full md:w-auto">
          <div className="text-right">
            <span className="text-2xl font-black font-headline text-primary">82%</span>
          </div>
          <div className="flex-1 md:w-48 bg-surface-container-highest h-2 rounded-full overflow-hidden">
            <motion.div 
              initial={{ width: 0 }}
              animate={{ width: '82%' }}
              transition={{ duration: 2, ease: "easeOut" }}
              className="bg-primary h-full shadow-[0_0_10px_rgba(39,96,157,0.3)]" 
            />
          </div>
        </div>
      </motion.div>

      {/* Metrics Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-5 gap-4">
        {metrics.map((metric, idx) => (
          <motion.div
            key={metric.label}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: idx * 0.1 }}
            className={`bg-surface-container-lowest p-6 rounded-2xl border-b-4 ${metric.border} shadow-sm hover:shadow-md transition-all`}
          >
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-bold uppercase tracking-widest text-outline">{metric.label}</span>
              <metric.icon size={16} className={metric.color} />
            </div>
            <div className="text-2xl font-black font-headline text-on-surface">{metric.value}</div>
          </motion.div>
        ))}
      </div>

      {/* Findings Table */}
      <motion.div 
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.5 }}
        className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm border border-surface-container-high"
      >
        <div className="px-8 py-6 flex justify-between items-center border-b border-surface-container-high">
          <h3 className="text-xl font-bold font-headline">Findings Ledger</h3>
          <button className="bg-gradient-to-b from-primary to-primary-dim text-white px-5 py-2.5 rounded-xl font-bold text-sm shadow-sm hover:opacity-90 transition-all flex items-center gap-2">
            <Download size={16} />
            Download Report
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead>
              <tr className="bg-surface-container-low/50">
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-outline">Module Name</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-outline">Object Type</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-outline">Issues Found</th>
                <th className="px-8 py-4 text-[10px] font-bold uppercase tracking-widest text-outline">Severity</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-surface-container-high">
              {findings.map((item, idx) => (
                <tr key={idx} className="hover:bg-surface-container-low transition-colors group">
                  <td className="px-8 py-5 font-bold text-on-surface text-sm">{item.module}</td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant">{item.type}</td>
                  <td className="px-8 py-5 text-sm text-on-surface-variant">{item.issue}</td>
                  <td className="px-8 py-5">
                    <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-tighter ${
                      item.severity === 'Critical' ? 'bg-error-container/20 text-error' :
                      item.severity === 'Medium' ? 'bg-secondary-container/30 text-on-secondary-container' :
                      'bg-primary-container/30 text-primary'
                    }`}>
                      {item.severity}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="px-8 py-4 bg-surface-container-low/30 text-outline text-[11px] font-medium flex items-center justify-between">
          <span>End of assessment report. Total 1,248 items scanned.</span>
          <div className="flex items-center gap-4">
            <button className="hover:text-primary transition-colors flex items-center gap-1">
              View All <ExternalLink size={12} />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
}
