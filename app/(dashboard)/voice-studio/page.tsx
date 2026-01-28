import VoiceCard from "@/components/voice-studio/voice-card";
import VoiceFilter from "@/components/voice-studio/voice-filter";

const voices = Array.from({length: 50}).map((_, i) => ({
    id: i,
    name: "MANV-Husky",
    tags: ["Etiquetas", "Etiquetas"]
}))

export default function Page() {
    return (
        <div className="flex flex-col gap-5 transition-colors duration-300">

            {/* --- HEADER SECTION --- */}
            <div className="space-y-1">
                <h1 className="text-4xl md:text-5xl font-bold text-zinc-900 dark:text-zinc-50 flex items-center gap-2">
                    Hola, Carlos <span className="animate-bounce">👋</span>
                </h1>
                <p className="text-zinc-500 dark:text-zinc-400 text-lg max-w-2xl leading-tight">
                    Explore our curated gallery of low-latency AI voices or clone your own to give your agents a
                    distinct personality.
                </p>
            </div>

            <VoiceFilter/>


            <div className="grid grid-cols-1 sm:grid-cols-2  lg:grid-cols-3 xl:grid-cols-5 gap-3">
                {voices.map((voice) => (
                    <VoiceCard key={voice.id} voice={voice}/>
                ))}
            </div>


        </div>
    )
}