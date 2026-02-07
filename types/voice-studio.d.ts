export interface VoiceProps {
    name: string;
    icon: string;
    description: string;
    latency: string;
    onPlay?: () => void; // Optional handler for the play button
}