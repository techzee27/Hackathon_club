"use client";

import { useState } from "react";
import { format } from "date-fns";
import { Plus, Settings, Users, IndianRupee, Eye, MoreVertical } from "lucide-react";
import { mockEvents, mockRegistrations } from "@/lib/mockData";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card";
import Link from "next/link";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";

export default function AdminEventsPage() {
  const [selectedEventId, setSelectedEventId] = useState<string | null>(null);

  const eventsWithStats = mockEvents.map(event => {
    const eventRegs = mockRegistrations.filter(r => r.eventId === event.id);
    const paidRegs = eventRegs.filter(r => r.paymentStatus === "Paid").length;
    return { ...event, totalParticipants: eventRegs.length, paidUsers: paidRegs };
  });

  const selectedEvent = eventsWithStats.find(e => e.id === selectedEventId);

  return (
    <div className="relative min-h-full">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold tracking-tight">Manage Events</h1>
        <Link href="/admin/events/create">
          <Button className="shadow-md bg-secondary text-secondary-foreground hover:bg-secondary/80">
            <Plus className="mr-2 h-4 w-4" /> Create New Event
          </Button>
        </Link>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {eventsWithStats.map(event => (
          <Card key={event.id} className="border-none shadow-sm hover:shadow-md transition-shadow relative overflow-hidden bg-white">
            <div className="absolute top-0 w-full h-1 bg-gradient-to-r from-primary to-secondary-500" />
            <div className="p-6">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-lg leading-tight line-clamp-1 mb-1">{event.title}</h3>
                  <Badge variant={event.status === "Live" ? "success" : "default"}>{event.status}</Badge>
                </div>
                <button className="text-muted-foreground hover:bg-muted p-1 rounded-md transition-colors">
                  <MoreVertical className="h-5 w-5" />
                </button>
              </div>

              <div className="grid grid-cols-2 gap-4 mt-6">
                <div className="bg-muted/50 p-3 rounded-xl border border-border/50">
                  <div className="flex items-center text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-1">
                    <Users className="h-3 w-3 mr-1" /> Participants
                  </div>
                  <div className="text-xl font-bold">{event.totalParticipants}</div>
                </div>
                <div className="bg-muted/50 p-3 rounded-xl border border-border/50">
                  <div className="flex items-center text-muted-foreground text-xs font-semibold uppercase tracking-wider mb-1">
                    <IndianRupee className="h-3 w-3 mr-1" /> Paid
                  </div>
                  <div className="text-xl font-bold">{event.paidUsers}</div>
                </div>
              </div>

              <div className="mt-6 flex space-x-3">
                <Button variant="outline" size="sm" className="w-full flex items-center justify-center bg-white" onClick={() => setSelectedEventId(event.id)}>
                  <Eye className="mr-2 h-4 w-4" /> Details
                </Button>
                <Link href={`/admin/events/${event.id}/edit`} className="w-full">
                  <Button variant="secondary" size="sm" className="w-full flex items-center justify-center">
                    <Settings className="mr-2 h-4 w-4" /> Edit
                  </Button>
                </Link>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {/* Side Panel (Drawer UI) */}
      {selectedEvent && (
        <div className="fixed inset-0 z-50 flex justify-end">
          <div className="absolute inset-0 bg-black/20 backdrop-blur-sm" onClick={() => setSelectedEventId(null)} />
          <div className="relative w-full max-w-2xl h-full bg-background shadow-2xl overflow-y-auto animate-in slide-in-from-right duration-300 border-l">
            <div className="p-6 border-b flex justify-between items-center bg-muted/30 sticky top-0 backdrop-blur-md z-10">
              <h2 className="text-2xl font-bold">{selectedEvent.title}</h2>
              <Button variant="ghost" size="sm" onClick={() => setSelectedEventId(null)}>Close</Button>
            </div>
            
            <div className="p-6 space-y-8">
              {/* Fake Tabs Header */}
              <div className="flex space-x-2 border-b pb-4 overflow-x-auto no-scrollbar">
                {["Overview", "Participants", "Payments", "Settings"].map((tab, i) => (
                  <button key={tab} className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap ${i === 0 ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:bg-muted"}`}>
                    {tab}
                  </button>
                ))}
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Description</h3>
                  <p className="text-muted-foreground text-sm leading-relaxed">{selectedEvent.description}</p>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="border rounded-xl p-4 bg-muted/10">
                    <span className="text-xs text-muted-foreground uppercase font-semibold">Start Date</span>
                    <p className="font-medium mt-1">{format(new Date(selectedEvent.startDate), 'PPP')}</p>
                  </div>
                  <div className="border rounded-xl p-4 bg-muted/10">
                    <span className="text-xs text-muted-foreground uppercase font-semibold">End Date</span>
                    <p className="font-medium mt-1">{format(new Date(selectedEvent.endDate), 'PPP')}</p>
                  </div>
                  <div className="border rounded-xl p-4 bg-muted/10">
                    <span className="text-xs text-muted-foreground uppercase font-semibold">Fee Type</span>
                    <p className="font-medium mt-1">{selectedEvent.feeType} {selectedEvent.feeType === "Paid" && `(₹${selectedEvent.feeAmount})`}</p>
                  </div>
                  <div className="border rounded-xl p-4 bg-muted/10">
                    <span className="text-xs text-muted-foreground uppercase font-semibold">Prize Pool</span>
                    <p className="font-medium mt-1">{selectedEvent.prizePool}</p>
                  </div>
                </div>

                <div>
                  <h3 className="font-semibold text-lg mb-4">Registration Link Status</h3>
                  <div className="flex items-center justify-between p-4 border rounded-xl bg-card">
                    <div>
                      <p className="font-medium">Accepting New Registrations</p>
                      <p className="text-sm text-muted-foreground">Toggle to close or open the forms.</p>
                    </div>
                    <div className="w-12 h-6 bg-primary rounded-full relative cursor-pointer shadow-inner">
                      <div className="w-4 h-4 bg-white rounded-full absolute right-1 top-1 shadow-sm" />
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
