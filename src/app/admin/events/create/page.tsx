"use client";

import { useState } from "react";
import { ArrowLeft, Save, Calendar as CalendarIcon, FileImage, Trophy, ListChecks, Info, Plus, Trash2 } from "lucide-react";
import Link from "next/link";
import { Button } from "@/components/ui/Button";

export default function CreateEventPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [rules, setRules] = useState([""]);

  const handleAddRule = () => setRules([...rules, ""]);
  const handleRemoveRule = (index: number) => setRules(rules.filter((_, i) => i !== index));
  const handleRuleChange = (index: number, value: string) => {
    const newRules = [...rules];
    newRules[index] = value;
    setRules(newRules);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock save logic
    setTimeout(() => {
      window.location.href = "/admin/events";
    }, 1500);
  };

  return (
    <div className="py-6 space-y-6 max-w-5xl mx-auto">
      
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-6 rounded-2xl border border-slate-200/60 shadow-sm">
        <div>
          <Link href="/admin/events" className="inline-flex items-center text-sm font-medium text-slate-500 hover:text-slate-800 transition-colors mb-2">
            <ArrowLeft className="h-4 w-4 mr-1" /> Back to Dashboard
          </Link>
          <h1 className="text-2xl font-bold text-slate-800 tracking-tight">Create New Event</h1>
          <p className="text-sm text-slate-500 mt-1">Configure details, dates, and settings for your upcoming hackathon or event.</p>
        </div>
        <div className="flex items-center gap-3">
           <Button variant="outline" className="border-slate-200 bg-white">
             Save as Draft
           </Button>
           <Button onClick={handleSubmit} disabled={isSubmitting} className="bg-fuchsia-600 hover:bg-fuchsia-700 text-white shadow-md shadow-fuchsia-600/20">
             {isSubmitting ? "Publishing..." : <><Save className="h-4 w-4 mr-2" /> Publish Event</>}
           </Button>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        
        {/* Basic Information */}
        <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-8">
          <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
             <Info className="h-5 w-5 text-fuchsia-600" /> Basic Information
          </h2>
          
          <div className="space-y-5">
            <div className="space-y-1.5">
               <label className="text-sm font-bold text-slate-700">Event Title <span className="text-rose-500">*</span></label>
               <input required type="text" placeholder="e.g. NextGen AI Hackathon" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all text-slate-800 font-medium" />
            </div>

            <div className="space-y-1.5">
               <label className="text-sm font-bold text-slate-700">Short Description <span className="text-rose-500">*</span></label>
               <input required type="text" placeholder="A brief one-liner summarizing the event theme." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all text-slate-800" />
            </div>

            <div className="space-y-1.5">
               <label className="text-sm font-bold text-slate-700">Detailed Overview <span className="text-rose-500">*</span></label>
               <textarea required rows={5} placeholder="Provide the full background, objective, and description of the hackathon..." className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all text-slate-800 custom-scrollbar"></textarea>
            </div>
            
            <div className="space-y-1.5 pt-2">
               <label className="text-sm font-bold text-slate-700 block">Event Cover Image URL</label>
               <div className="flex border border-slate-200 rounded-xl overflow-hidden bg-slate-50 group focus-within:ring-2 focus-within:ring-fuchsia-500/20 focus-within:border-fuchsia-500 transition-all">
                  <div className="pl-4 pr-3 py-3 flex items-center justify-center border-r border-slate-200 bg-slate-100/50">
                     <FileImage className="h-5 w-5 text-slate-400" />
                  </div>
                  <input type="url" placeholder="https://unsplash.com/your-image.jpg" className="w-full px-4 py-3 bg-transparent text-sm focus:outline-none text-slate-800" />
               </div>
            </div>
          </div>
        </div>

        {/* Date & Settings */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-8">
             <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                <CalendarIcon className="h-5 w-5 text-fuchsia-600" /> Timelines
             </h2>
             <div className="space-y-5">
                <div className="space-y-1.5">
                   <label className="text-sm font-bold text-slate-700">Start Date & Time</label>
                   <input required type="datetime-local" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all text-slate-800" />
                </div>
                <div className="space-y-1.5">
                   <label className="text-sm font-bold text-slate-700">End Date & Time</label>
                   <input required type="datetime-local" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all text-slate-800" />
                </div>
                <div className="space-y-1.5 pt-4 border-t border-slate-100">
                   <label className="text-sm font-bold text-slate-700 text-rose-600">Registration Deadline</label>
                   <input required type="datetime-local" className="w-full px-4 py-3 bg-rose-50 border border-rose-200 text-rose-800 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-rose-500/20 focus:border-rose-500 transition-all" />
                </div>
             </div>
          </div>
          
          <div className="bg-white rounded-2xl border border-slate-200/60 shadow-sm p-6 sm:p-8 flex flex-col justify-between">
             <div>
               <h2 className="text-lg font-bold text-slate-800 flex items-center gap-2 mb-6 pb-4 border-b border-slate-100">
                  <Trophy className="h-5 w-5 text-amber-500" /> Registration & Rewards
               </h2>
               <div className="space-y-5">
                  <div className="grid grid-cols-2 gap-4">
                     <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Fee Type</label>
                        <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all text-slate-800 appearance-none">
                           <option value="Free">Free / Invite Only</option>
                           <option value="Paid">Paid Ticket</option>
                        </select>
                     </div>
                     <div className="space-y-1.5">
                        <label className="text-sm font-bold text-slate-700">Amount (if paid)</label>
                        <input type="number" placeholder="₹0" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all text-slate-800" />
                     </div>
                  </div>
                  <div className="space-y-1.5">
                     <label className="text-sm font-bold text-slate-700">Prize Pool / Rewards</label>
                     <input type="text" placeholder="e.g. ₹50,000 cash pool + hardware swags" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-amber-500/20 focus:border-amber-500 transition-all text-slate-800" />
                  </div>
               </div>
             </div>

             <div className="mt-8 bg-white border border-slate-200 rounded-xl p-5 shadow-sm">
                 <div className="flex items-center justify-between mb-4">
                     <h3 className="text-sm font-bold text-slate-700 flex items-center gap-2"><ListChecks className="h-4 w-4 text-fuchsia-600" /> Event Rules</h3>
                     <Button type="button" variant="outline" size="sm" onClick={handleAddRule} className="h-8 text-xs border-fuchsia-200 text-fuchsia-700 hover:bg-fuchsia-50">
                         <Plus className="h-3 w-3 mr-1" /> Add Rule
                     </Button>
                 </div>
                 
                 <div className="space-y-3 max-h-[300px] overflow-y-auto custom-scrollbar pr-2">
                    {rules.length === 0 && (
                       <p className="text-xs text-slate-500 text-center py-6 bg-slate-50 rounded-lg border border-dashed border-slate-200">No rules added yet. Click 'Add Rule' to create one.</p>
                    )}
                    {rules.map((rule, index) => (
                       <div key={index} className="flex items-start gap-2">
                          <div className="flex-1">
                             <input 
                               type="text" 
                               value={rule} 
                               onChange={(e) => handleRuleChange(index, e.target.value)} 
                               placeholder={`Rule ${index + 1}`} 
                               className="w-full px-3 py-2 bg-slate-50 border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all text-slate-800" 
                             />
                          </div>
                          <button type="button" onClick={() => handleRemoveRule(index)} className="p-2 text-slate-400 hover:text-rose-500 hover:bg-rose-50 rounded-lg transition-colors mt-0.5">
                             <Trash2 className="h-4 w-4" />
                          </button>
                       </div>
                    ))}
                 </div>
             </div>
          </div>
        </div>

      </form>
    </div>
  );
}
