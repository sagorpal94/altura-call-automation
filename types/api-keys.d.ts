export interface ApiKeyData {
    id: string;
    name: string;
    value: string;
    created: string;
    lastUsed: string;
}

export interface CreateKeyModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: CreateKeyFormValues) => void;
    isLoading?: boolean;
}