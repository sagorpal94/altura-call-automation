import React from 'react';
import {
    AlertDialog,
    AlertDialogAction,
    AlertDialogCancel,
    AlertDialogContent,
    AlertDialogFooter,
    AlertDialogHeader,
    AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import {Icons} from "@/components/icons";
import {Card, CardContent} from "@/components/ui/card";

interface ConfirmChangesModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    onConfirm: () => void; // কন্টিনিউ করার জন্য ফাংশন
}

const ConfirmChangesModal = ({open, setOpen, onConfirm}: ConfirmChangesModalProps) => {
    return (
        <AlertDialog open={open} onOpenChange={setOpen}>
            <AlertDialogContent
                className="font-[Space_Grotesk] !max-w-[500px] w-[calc(100%-2rem)]  p-6 rounded-xl border-[#DFE1E7] shadow-xl gap-6"
            >
                {/* Header Section */}
                <AlertDialogHeader className="flex flex-row items-center justify-between space-y-0">
                    <AlertDialogTitle className="text-xl md:text-[22px] font-semibold text-neutral-900">
                        Confirm Changes
                    </AlertDialogTitle>
                    {/* ম্যানুয়াল ক্লোজ আইকন */}
                    <button
                        onClick={() => setOpen(false)}
                        className="p-1 cursor-pointer rounded-full transition-colors"
                    >
                        <Icons.modalClose className="h-6 w-6 stroke-[2.5px] text-[#BBAE00]" />
                    </button>
                </AlertDialogHeader>

                {/* Content Section */}
                <Card className="border-[#DFE1E7] bg-zinc-50/50 py-0 shadow-none rounded-lg overflow-hidden">
                    <CardContent className="p-5">
                        <p className="text-base text-zinc-600 leading-relaxed">
                            Are you sure you want to save the changes? This action will update your billing information across the system.
                        </p>
                    </CardContent>
                </Card>

                {/* Footer / Buttons */}
                <AlertDialogFooter className="flex flex-col-reverse sm:flex-row gap-3">
                    <AlertDialogCancel
                        className="w-full sm:w-auto h-11 px-8 border-[#FF453A] text-[#FF453A] font-bold text-base rounded-md hover:bg-red-50 hover:text-red-700 transition-all m-0"
                    >
                        Cancel
                    </AlertDialogCancel>

                    <AlertDialogAction
                        onClick={onConfirm}
                        className="w-full sm:w-auto h-11 px-8 !bg-[#fdf027] hover:bg-[#e6d920] text-zinc-900 font-bold text-base rounded-md shadow-none transition-all"
                    >
                        Save Changes
                    </AlertDialogAction>
                </AlertDialogFooter>

            </AlertDialogContent>
        </AlertDialog>
    );
};

export default ConfirmChangesModal;

// import React from 'react';
// import {Dialog, DialogClose, DialogContent, DialogTitle} from "@/components/ui/dialog";
// import {Icons} from "@/components/icons";
// import {Card, CardContent} from "@/components/ui/card";
// import {Button} from "@/components/ui/button";
//
// interface ConfirmChangesModalProps {
//     open: boolean;
//     setOpen: (open: boolean) => void;
// }
//
// const ConfirmChangesModal = ({open, setOpen}: ConfirmChangesModalProps) => {
//     return (
//         <Dialog open={open} onOpenChange={setOpen}>
//
//             <DialogContent
//                 className="space-y-5 !max-w-[600px] w-[calc(100%-2rem)] h-[calc(100vh-6rem)] px-4 py-[30px] rounded-md border-[#DFE1E7] shadow-lg gap-0 [&>button]:hidden"
//                 onInteractOutside={(e) => e.preventDefault()}
//                 onEscapeKeyDown={(e) => e.preventDefault()}
//             >
//                 <div className="flex items-center justify-between flex-wrap mb-3">
//                     <DialogTitle className="text-[22px] font-semibold text-neutral-900 dark:text-muted-foreground">
//                         Confirm Changes
//                     </DialogTitle>
//
//                     <DialogClose asChild>
//                         <Icons.modalClose className="h-8 w-8 stroke-[2.5px] text-[#BBAE00] cursor-pointer"/>
//                     </DialogClose>
//                 </div>
//
//                 <Card className="border-[#DFE1E7] py-0 shadow-none rounded-md ">
//                     <CardContent className="p-3">
//                         <p>Are you sure you want to save the changes?</p>
//                     </CardContent>
//                 </Card>
//
//                 <div className="flex justify-end gap-4">
//                     <DialogClose asChild>
//                         <Button type="button" variant="outline"
//                                 className="w-full sm:w-auto h-10 px-10 border-[#FF453A] text-[#FF453A] font-bold text-base rounded-md hover:bg-red-50 hover:text-red-600 transition-all"
//                         >
//                             Cancel
//                         </Button>
//                     </DialogClose>
//                     <Button type="submit"
//                             className="h-10 px-8 bg-[#fdf027] hover:bg-[#e6d920] text-zinc-900 font-bold text-base rounded-md shadow-none transition-all w-full sm:w-auto"
//                     >
//                         Save Changes
//                     </Button>
//                 </div>
//
//             </DialogContent>
//
//         </Dialog>
//     );
// };
//
// export default ConfirmChangesModal;