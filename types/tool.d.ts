export interface Tool {
    id: number;
    icon: string;
    title: string;
    category: string;
    description: string;
}

export interface ToolFormData {
    name: string;
    type: string;
    description: string;
    serverUrl: string;
    timeout: number;
    authType: string;
}

export interface CreateToolModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSave: (data: ToolFormData) => void;
}

export interface DeleteModalProps {
    isOpen: boolean;
    onClose: () => void;
    onConfirm: () => void;
    title?: string;
    description?: string;
    isDeleting?: boolean; // Optional: to show loading state
}

export interface ToolFormProps {
    formId: string; // ID টি প্যারেন্ট থেকে আসবে
    onSuccess: (data: ToolFormValues) => void; // ডেটা প্যারেন্টে পাঠানোর জন্য
}