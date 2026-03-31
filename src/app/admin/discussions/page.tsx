"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, Send, Paperclip, Search, MoreVertical, Image as ImageIcon, Smile, Settings } from "lucide-react";

const initialMessages = [
  { id: 1, sender: "Orlando Laurentius", role: "Super Admin", avatar: "https://i.pravatar.cc/150?u=orlando", content: "Hey team, how are the preparations for CodeCrafters looking?", time: "10:30 AM", isMe: true },
  { id: 2, sender: "Sarah Jane", role: "Event Coordinator", avatar: "https://i.pravatar.cc/150?u=sarah", content: "Sponsors are locked in! I've uploaded the contracts to the shared drive.", time: "10:35 AM", isMe: false },
  { id: 3, sender: "David Kim", role: "Tech Lead", avatar: "https://i.pravatar.cc/150?u=david", content: "Great! Our server instances for the hackathon are fully provisioned and tested.", time: "10:40 AM", isMe: false },
  { id: 4, sender: "Orlando Laurentius", role: "Super Admin", avatar: "https://i.pravatar.cc/150?u=orlando", content: "Awesome work folks! Let's ensure the participants emails go out by tomorrow morning.", time: "10:45 AM", isMe: true },
];

const admins = [
  { name: "Orlando Laurentius", role: "Super Admin", avatar: "https://i.pravatar.cc/150?u=orlando", online: true },
  { name: "Sarah Jane", role: "Event Coordinator", avatar: "https://i.pravatar.cc/150?u=sarah", online: true },
  { name: "David Kim", role: "Tech Lead", avatar: "https://i.pravatar.cc/150?u=david", online: false },
  { name: "Emily Watson", role: "Marketing", avatar: "https://i.pravatar.cc/150?u=emily", online: true },
];

export default function DiscussionsPage() {
  const [messages, setMessages] = useState(initialMessages);
  const [newMessage, setNewMessage] = useState("");
  const endOfMessagesRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    endOfMessagesRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSend = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newMessage.trim()) return;
    
    const nextMsg = {
      id: Date.now(),
      sender: "Orlando Laurentius",
      role: "Super Admin",
      avatar: "https://i.pravatar.cc/150?u=orlando",
      content: newMessage,
      time: new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }),
      isMe: true
    };
    
    setMessages([...messages, nextMsg]);
    setNewMessage("");
  };

  return (
    <div className="fixed top-[80px] left-64 right-0 bottom-0 flex flex-col bg-white z-[40] border-t border-slate-200">
      
      {/* Container */}
      <div className="flex-1 flex overflow-hidden">
        
        {/* Left Sidebar - Admins List */}
        <div className="w-80 border-r border-slate-200 flex flex-col bg-slate-50/30 hidden md:flex shrink-0">
          <div className="p-5 border-b border-slate-200">
             <h2 className="text-lg font-bold text-slate-800 tracking-tight flex items-center gap-2">
               <MessageCircle className="h-5 w-5 text-fuchsia-600" /> Admin Chat
             </h2>
             <div className="relative mt-4 block">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                <input 
                  type="text" 
                  placeholder="Search admins..." 
                  className="w-full pl-9 pr-4 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all text-slate-700"
                />
             </div>
          </div>
          <div className="p-3 overflow-y-auto flex-1 custom-scrollbar">
             <p className="px-2 pt-2 pb-3 text-xs font-bold uppercase tracking-wider text-slate-400">Team Members</p>
             {admins.map((admin, i) => (
                <div key={i} className="flex items-center gap-3 p-3 rounded-xl hover:bg-white border border-transparent hover:border-slate-200 hover:shadow-sm transition-all cursor-pointer mb-1 group">
                   <div className="relative">
                     <img src={admin.avatar} alt="Avatar" className="w-10 h-10 rounded-full object-cover shadow-sm bg-slate-100" />
                     <div className={`absolute bottom-0 right-0 w-3 h-3 rounded-full border-2 border-white ${admin.online ? 'bg-emerald-500' : 'bg-slate-300'}`}></div>
                   </div>
                   <div className="flex-1 min-w-0">
                      <h4 className="text-sm font-bold text-slate-800 truncate group-hover:text-fuchsia-600 transition-colors">{admin.name}</h4>
                      <p className="text-xs text-slate-500 truncate">{admin.role}</p>
                   </div>
                </div>
             ))}
          </div>
        </div>

        {/* Right Chat Area */}
        <div className="flex-1 flex flex-col bg-white min-w-0 relative">
           
           {/* Chat Header */}
           <div className="h-16 border-b border-slate-200 px-6 flex items-center justify-between bg-white/80 backdrop-blur shrink-0 z-10 relative">
             <div className="flex items-center gap-3">
               <div>
                 <h3 className="font-bold text-slate-800 leading-tight">General Discussion</h3>
                 <p className="text-xs text-slate-500">4 Admins • 3 Online</p>
               </div>
             </div>
             <div className="flex items-center gap-2">
               <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"><Search className="h-5 w-5" /></button>
               <button className="p-2 text-slate-400 hover:text-slate-600 hover:bg-slate-100 rounded-lg transition-colors"><Settings className="h-5 w-5" /></button>
             </div>
           </div>

           {/* Chat Messages */}
           <div className="flex-1 overflow-y-auto p-6 space-y-6 custom-scrollbar bg-slate-50/30">
             {messages.map((msg) => (
               <div key={msg.id} className={`flex ${msg.isMe ? "justify-end" : "justify-start"}`}>
                 <div className={`flex gap-3 max-w-[80%] ${msg.isMe ? "flex-row-reverse" : "flex-row"}`}>
                    <img src={msg.avatar} alt="Avatar" className="w-8 h-8 rounded-full border border-slate-200 object-cover mt-1 shrink-0 bg-slate-100" />
                    <div className={`flex flex-col ${msg.isMe ? "items-end" : "items-start"}`}>
                       <div className="flex items-baseline gap-2 mb-1">
                          <span className="text-xs font-bold text-slate-600">{msg.sender}</span>
                          <span className="text-[10px] text-slate-400">{msg.time}</span>
                       </div>
                       <div className={`p-4 rounded-2xl text-sm leading-relaxed shadow-sm ${msg.isMe ? "bg-fuchsia-600 text-white rounded-tr-sm" : "bg-white border border-slate-200 text-slate-800 rounded-tl-sm"}`}>
                          {msg.content}
                       </div>
                    </div>
                 </div>
               </div>
             ))}
             <div ref={endOfMessagesRef} />
           </div>

           {/* Chat Input */}
           <div className="p-4 border-t border-slate-200 bg-white shrink-0">
              <form onSubmit={handleSend} className="flex gap-2">
                 <button type="button" className="p-3 text-slate-400 hover:text-fuchsia-600 bg-slate-50 hover:bg-fuchsia-50 rounded-xl transition-colors shrink-0">
                    <Paperclip className="h-5 w-5" />
                 </button>
                 <div className="flex-1 relative">
                   <input 
                     type="text" 
                     placeholder="Type your message here..." 
                     value={newMessage}
                     onChange={(e) => setNewMessage(e.target.value)}
                     className="w-full pl-4 pr-12 py-3 bg-slate-50 border border-slate-200 rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-fuchsia-500/20 focus:border-fuchsia-500 transition-all text-slate-700"
                   />
                   <button type="button" className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-amber-500 transition-colors">
                     <Smile className="h-5 w-5" />
                   </button>
                 </div>
                 <button type="submit" disabled={!newMessage.trim()} className="px-6 py-3 bg-fuchsia-600 hover:bg-fuchsia-700 disabled:opacity-50 disabled:hover:bg-fuchsia-600 text-white shadow-md shadow-fuchsia-600/20 font-semibold rounded-xl flex items-center gap-2 transition-all shrink-0">
                    Send <Send className="h-4 w-4" />
                 </button>
              </form>
           </div>
           
        </div>
      </div>
    </div>
  );
}
