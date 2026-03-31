"use client";

import { useState } from "react";
import { useParams, notFound } from "next/navigation";
import { format } from "date-fns";
import { Calendar, Clock, Trophy, FileText, CheckCircle2, AlertCircle } from "lucide-react";
import { useAuth } from "@/context/AuthContext";
import { mockEvents, mockRegistrations } from "@/lib/mockData";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import Link from "next/link";

export default function EventDetailsPage() {
  const params = useParams();
  const eventId = typeof params.id === 'string' ? params.id : Array.isArray(params.id) ? params.id[0] : null;
  const { user } = useAuth();
  const event = mockEvents.find((e) => e.id === eventId);
  
  const [isRegistering, setIsRegistering] = useState(false);
  const [paymentModalOpen, setPaymentModalOpen] = useState(false);
  
  // Fake state update to demonstrate flow
  const [localReg, setLocalReg] = useState(user ? mockRegistrations.find(r => r.eventId === event?.id && r.userId === user.id) : undefined);

  if (!event) {
    notFound();
  }

  const handleRegister = () => {
    // Navigating to the registration page via Link below instead
  };

  const handlePay = () => {
    // Mock Razorpay integration flow
    setPaymentModalOpen(true);
  };

  const simulatePaymentSuccess = () => {
    if (localReg) {
      setLocalReg({ ...localReg, paymentStatus: "Paid", transactionId: `txn_mock_${Date.now()}` });
    }
    setPaymentModalOpen(false);
  };

  const isRegistrationOpen = new Date() < new Date(event.registrationDeadline) && event.status !== "Completed";

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-96 w-full">
        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/30" />
        <div className="absolute bottom-0 left-0 w-full container mx-auto px-4 pb-12">
          <div className="flex gap-2 mb-4">
            <Badge variant={event.status === "Live" ? "success" : "default"} className="text-sm py-1 px-3">
              {event.status}
            </Badge>
            <Badge variant="secondary" className="text-sm py-1 px-3">
              {event.feeType}
            </Badge>
          </div>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-white mb-4">
            {event.title}
          </h1>
          <p className="text-xl text-white/80 max-w-3xl">
            {event.shortDescription}
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
          
          {/* Left Column - Details */}
          <div className="lg:col-span-2 space-y-12">
            
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <FileText className="text-primary" /> Overview
              </h2>
              <div className="prose max-w-none text-muted-foreground leading-relaxed bg-white/50 backdrop-blur p-8 rounded-3xl border border-border/50">
                <p>{event.description}</p>
              </div>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <AlertCircle className="text-primary" /> Rules & Guidelines
              </h2>
              <ul className="space-y-3 bg-white/50 backdrop-blur p-8 rounded-3xl border border-border/50">
                {event.rules.map((rule, idx) => (
                  <li key={idx} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-emerald-500 mt-0.5 shrink-0" />
                    <span className="text-muted-foreground">{rule}</span>
                  </li>
                ))}
              </ul>
            </section>
            
            <section>
              <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
                <Clock className="text-primary" /> Timeline
              </h2>
              <div className="relative border-l-2 border-primary/20 ml-4 space-y-8 pb-4">
                {event.timeline.map((item, idx) => (
                  <div key={idx} className="relative pl-8">
                    <div className="absolute -left-[9px] top-1.5 h-4 w-4 rounded-full bg-primary ring-4 ring-primary/20" />
                    <h3 className="text-lg font-bold">{item.title}</h3>
                    <p className="text-sm font-medium text-primary mt-1 mb-2">{item.date}</p>
                    <p className="text-muted-foreground">{item.description}</p>
                  </div>
                ))}
              </div>
            </section>
            
          </div>

          {/* Right Column - Stats & Actions */}
          <div className="space-y-8">
            <div className="bg-white/70 backdrop-blur-xl p-8 rounded-3xl border shadow-lg sticky top-24">
              <h3 className="text-xl font-bold mb-6">Event Details</h3>
              
              <div className="space-y-4 mb-8">
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <div className="flex items-center text-muted-foreground gap-2"><Calendar className="h-4 w-4"/> Starts</div>
                  <div className="font-semibold">{format(new Date(event.startDate), 'MMM dd, HH:mm')}</div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <div className="flex items-center text-muted-foreground gap-2"><Calendar className="h-4 w-4"/> Ends</div>
                  <div className="font-semibold">{format(new Date(event.endDate), 'MMM dd, HH:mm')}</div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <div className="flex items-center text-muted-foreground gap-2"><Trophy className="h-4 w-4 text-amber-500"/> Prize Pool</div>
                  <div className="font-semibold text-amber-600">{event.prizePool}</div>
                </div>
                <div className="flex justify-between items-center py-3 border-b border-border/50">
                  <div className="flex items-center text-muted-foreground">Registration Fee</div>
                  <div className="font-bold text-xl">{event.feeType === "Paid" ? `₹${event.feeAmount}` : "Free"}</div>
                </div>
              </div>

              {localReg ? (
                <div className="space-y-4">
                  <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-200 text-center font-medium">
                    You are registered!
                  </div>
                  {event.feeType === "Paid" && localReg.paymentStatus === "Pending" && (
                    <Button onClick={handlePay} size="lg" className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-xl shadow-indigo-500/20">
                      Pay Now (₹{event.feeAmount})
                    </Button>
                  )}
                  {event.feeType === "Paid" && localReg.paymentStatus === "Paid" && (
                    <div className="bg-emerald-50 text-emerald-800 p-4 rounded-xl border border-emerald-200 text-center text-sm">
                      <p className="font-bold">Payment Successful</p>
                      <p className="text-xs mt-1">Txn ID: {localReg.transactionId}</p>
                    </div>
                  )}
                </div>
              ) : isRegistrationOpen ? (
                <Link href={`/events/${event.id}/register`} className="w-full block">
                  <Button size="lg" className="w-full text-lg h-14 shadow-xl shadow-primary/20">
                    Register Now
                  </Button>
                </Link>
              ) : (
                <Button disabled size="lg" className="w-full text-lg h-14 shadow-xl shadow-primary/20">
                  Registration Closed
                </Button>
              )}
            </div>
          </div>
          
        </div>
      </div>

      {/* Mock Payment Modal */}
      {paymentModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm px-4">
          <div className="bg-background w-full max-w-md rounded-3xl p-8 shadow-2xl animate-in fade-in zoom-in-95 duration-200 border">
            <div className="flex items-center justify-center mb-6">
              <div className="h-16 w-16 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center border-4 border-indigo-50">
                <span className="text-xl font-bold">Rz</span>
              </div>
            </div>
            <h2 className="text-2xl font-bold text-center mb-2">Mock Razorpay</h2>
            <p className="text-center text-muted-foreground mb-8">Test environment checkout for ₹{event.feeAmount}</p>
            
            <div className="space-y-4 mb-8">
              <div className="p-4 bg-muted rounded-xl flex justify-between items-center text-sm font-medium">
                <span>Total Amount:</span>
                <span className="text-lg text-foreground">₹{event.feeAmount}</span>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <Button onClick={() => setPaymentModalOpen(false)} variant="outline" className="w-full">
                Cancel
              </Button>
              <Button onClick={simulatePaymentSuccess} className="w-full bg-indigo-600 hover:bg-indigo-700 text-white shadow-lg shadow-indigo-500/25">
                Success
              </Button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
