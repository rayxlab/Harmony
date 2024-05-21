"use client";    

import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";

import { useModal } from "@/hooks/useModalStore";
import { Button } from "../ui/button";
import { useState } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

export const DeleteServerModal = () => {

    const {isOpen, onClose, type, data } = useModal();
    const router = useRouter();
    
    const isModalOpen = isOpen && type === "deleteServer";

    const { server } = data;

    const [isLoading, setIsLoading] = useState(false);

    const onLeave = async () => {
        try {
            setIsLoading(true);

            await axios.delete(`/api/servers/${server?.id}`);

            onClose();
            router.refresh();
            router.push("/");
            
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    }

    return ( 
        <Dialog open={isModalOpen} onOpenChange={onClose}>
            <DialogContent className="bg-white text-black p-0 overflow-hidden">
                <DialogHeader className="pt-8 px-6">
                    <DialogTitle className="text-center font-bold text-black text-2xl">
                        Delete Server
                    </DialogTitle>
                    <DialogDescription className="text-center text-zinc-500">
                        Are you sure you want to do this? <br />
                        <span className="text-indigo-500 font-semibold">{server?.name}</span> will be deleted permanently!
                    </DialogDescription>
                </DialogHeader>
                
                <DialogFooter className="bg-gray-100 px-6 py-4">
                    <div className="flex items-center justify-between w-full">
                        <Button
                            disabled={isLoading}
                            onClick={onClose}
                            variant="ghost"
                        >
                            Cancel
                        </Button>
                        <Button
                            disabled={isLoading}
                            onClick={onLeave}
                            variant="destructive"
                        >
                            Confirm
                        </Button>
                    </div>
                </DialogFooter>
            </DialogContent>
        </Dialog>
     );
};