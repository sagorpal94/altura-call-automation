export type IntegrationItem = {
    id: string;
    name: string;
    description: string;
    icon: string;
    connected?: boolean; // To handle the special "Gemini" style
};

export type IntegrationCategory = {
    title: string;
    items: IntegrationItem[];
};

export interface ProviderData {
    id: string;
    name: string; // e.g., "Cartesia", "OpenAI"
    icon: string; // Emoji or Image URL
    description?: string;
}

export interface ConnectProviderModalProps {
    isOpen: boolean;
    onClose: () => void;
    provider: ProviderData | null; // যেই প্রোভাইডারে ক্লিক করা হয়েছে
    onSave: (data: ConnectFormValues) => void;
    isLoading?: boolean;
}