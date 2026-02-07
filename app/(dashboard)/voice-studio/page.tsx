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
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white flex items-center gap-2">
                    Hola, Carlos <span className="text-3xl">👋🏼</span>
                </h1>
                <p className="mt-2 max-w-2xl text-lg text-gray-500 dark:text-gray-400">
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