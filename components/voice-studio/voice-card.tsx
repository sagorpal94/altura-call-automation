import {Card, CardContent} from "@/components/ui/card";
import Image from "next/image";

export default function VoiceCard({voice}: { voice: any }) {
    return (
        <Card
            className="border-zinc-200 dark:border-zinc-800 py-0 bg-white dark:bg-zinc-900 shadow-none rounded-xl overflow-hidden hover:border-zinc-300 dark:hover:border-zinc-700 transition-all group">
            <CardContent className="p-4 flex items-center justify-between gap-3">

                <div className="flex items-center gap-3">
                    {/* Yellow Waveform Icon - Keep Yellow for contrast in dark mode */}
                    <div
                        className="flex h-10 w-10 shrink-0 items-center justify-center rounded-sm bg-[#fdf027]">
                        <Image src="/images/voiceImage.png" width={21} height={21} alt={voice.name}/>
                    </div>

                    {/* Voice Info */}
                    <div className="space-y-2 gap-2">
                        <h3 className="text-[12px] font-medium text-zinc-900 dark:text-zinc-100 leading-none">
                            {voice.name}
                        </h3>
                        <div className="flex gap-2">
                            {voice.tags.map((tag: string, i: number) => (
                                <span
                                    key={i}
                                    className="bg-[#FEFACA] dark:bg-yellow-500/10 text-yellow-700 dark:text-yellow-400 text-[10px] font-bold px-1.5 py-0.5 rounded border border-yellow-100 dark:border-yellow-500/20"
                                >
                                  {tag}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* Play Button */}
                <Image src="/images/play.png" alt={voice.title} width={21} height={21}/>
                {/*<button*/}
                {/*    className="flex h-8 w-8 items-center justify-center rounded-full border border-zinc-200 dark:border-zinc-800 text-zinc-900 dark:text-zinc-100 hover:bg-zinc-50 dark:hover:bg-zinc-800 transition-colors">*/}
                {/*    <Image src="/images/play.png" alt={voice.title} width={21} height={2}/>*/}
                {/*</button>*/}

            </CardContent>
        </Card>
    )
}