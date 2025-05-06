import Sidebar from "@/components/ui/Sidebar";

export default function HomePage() {
  return (
    <main className="min-h-screen w-full bg-[url('/bg/stars.jpg')] bg-cover bg-center flex items-center justify-center p-10">
      <div className="flex w-full max-w-[1300px] min-h-[600px] rounded-xl bg-[#0b0f26]/30 border border-white/10 backdrop-blur-2xl shadow-2xl overflow-hidden">
        {/* Sidebar */}
        <Sidebar />

        {/* Terminal Panel */}
        <div className="flex-1 p-6 bg-[#0b0f26]/90 border-l border-white/10 text-white font-mono">
          <div className="w-full h-full rounded-lg border border-white/10 p-4 text-cyan-400 text-sm">
            <p className="mb-1">Welcome to Nebula Cipher</p>
            <span className="text-cyan-600">&gt;</span>
          </div>
        </div>
      </div>
    </main>
  );
}
