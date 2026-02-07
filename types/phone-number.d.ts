export interface ManagePhoneNumberModalProps {
    isOpen: boolean;
    onClose: () => void;
    initialData?: {
        label: string;
        agentId: string;
        phoneNumber: string;
    };
    onSave: (data: PhoneNumberFormValues) => void;
    onRelease: () => void;
    isLoading?: boolean;
}

export interface AddNumberModalProps {
    isOpen: boolean;
    onClose: () => void;
    isLoading?: boolean;
}