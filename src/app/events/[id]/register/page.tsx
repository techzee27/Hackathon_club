"use client";

import { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { ArrowLeft, User, Mail, GraduationCap, Link as LinkIcon, Users } from "lucide-react";
import Link from "next/link";
import { mockEvents } from "@/lib/mockData";
import { Button } from "@/components/ui/Button";

export default function EventRegistrationPage() {
  const params = useParams();
  const router = useRouter();
  const eventId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : null;

  const event = mockEvents.find((e) => e.id === eventId);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);

  if (!event) return null;

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    // Mock registration submission
    setTimeout(() => {
      setIsSubmitting(false);
      setSuccess(true);
      setTimeout(() => {
        router.push(`/dashboard`);
      }, 2000);
    }, 1500);
  };

  if (success) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center container mx-auto px-4">
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl max-w-lg w-full text-center border border-emerald-100">
           <div className="w-20 h-20 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
             <svg className="w-10 h-10" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" d="M5 13l4 4L19 7"></path></svg>
           </div>
           <h2 className="text-3xl font-bold text-slate-800 mb-2">Registration Successful!</h2>
           <p className="text-slate-500 font-medium mb-6">You are officially registered for {event.title}. Let's build something amazing!</p>
           <p className="text-xs text-slate-400">Redirecting to your dashboard...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50/50 py-12 md:py-24">
      <div className="container mx-auto px-4 max-w-3xl">
        <Link href={`/events/${eventId}`} className="inline-flex items-center text-sm font-bold text-primary hover:text-primary/80 transition-colors mb-6">
          <ArrowLeft className="w-4 h-4 mr-1.5" /> Back to Event
        </Link>
        
        <div className="bg-white p-8 md:p-12 rounded-3xl shadow-xl border border-slate-100">
          <div className="mb-8 border-b border-slate-100 pb-8">
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-2">Participant Registration</h1>
            <p className="text-slate-500 font-medium">Complete your details to secure your spot in <strong className="text-slate-700">{event.title}</strong>.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="space-y-4">
               <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><User className="w-5 h-5 text-primary" /> Personal Information</h3>
               
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Full Name *</label>
                    <input required type="text" placeholder="John Doe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800" />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">Email Address *</label>
                    <input required type="email" placeholder="john@example.com" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800" />
                 </div>
                 <div className="space-y-1.5 md:col-span-2">
                    <label className="text-sm font-semibold text-slate-700 flex items-center gap-1.5">College / University *</label>
                    <input required type="text" placeholder="Stanford University" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800" />
                 </div>
               </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100">
               <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><LinkIcon className="w-5 h-5 text-primary" /> Professional Links</h3>
               <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                 <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">GitHub Profile *</label>
                    <input required type="url" placeholder="https://github.com/johndoe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800" />
                 </div>
                 <div className="space-y-1.5">
                    <label className="text-sm font-semibold text-slate-700">LinkedIn Profile *</label>
                    <input required type="url" placeholder="https://linkedin.com/in/johndoe" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800" />
                 </div>
               </div>
            </div>

            <div className="space-y-4 pt-4 border-t border-slate-100 mb-8">
               <h3 className="text-lg font-bold text-slate-800 flex items-center gap-2"><Users className="w-5 h-5 text-primary" /> Team Information (Optional)</h3>
               <div className="space-y-1.5 border border-dashed border-slate-200 bg-slate-50/50 p-6 rounded-2xl text-center">
                  <p className="text-sm text-slate-500 mb-3">If you are joining with a team, provide your team name.</p>
                  <input type="text" placeholder="e.g. The Innovators" className="w-full max-w-sm mx-auto block px-4 py-3 bg-white border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-all text-slate-800" />
               </div>
            </div>
            
            <div className="bg-primary/5 p-6 rounded-2xl border border-primary/10 flex flex-col md:flex-row items-center justify-between gap-4 mt-8">
               <div>
                 <p className="text-sm font-bold text-slate-800">Event Fee</p>
                 <p className="text-2xl font-black text-primary">{event.feeType === "Paid" ? `₹${event.feeAmount}` : "Free"}</p>
                 {event.feeType === "Paid" && <p className="text-xs text-slate-500 font-medium">You will be redirected to payment after submission.</p>}
               </div>
               <Button type="submit" size="lg" disabled={isSubmitting} className="w-full md:w-auto text-lg h-14 md:px-10 shadow-xl shadow-primary/20">
                 {isSubmitting ? "Processing..." : "Complete Registration"}
               </Button>
            </div>
          </form>

        </div>
      </div>
    </div>
  );
}
