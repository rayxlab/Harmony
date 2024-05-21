"use client";

import { useEffect, useState } from "react";
import { CreateServerModal } from "../modules/createServerModal";
import { InviteModal } from "../modules/inviteModal";
import { ServerSettingsModal } from "../modules/serverSettingsModal";
import { MembersModal } from "../modules/membersModal";
import { CreateChannelModal } from "../modules/createChannelModal";
import { LeaveServerModal } from "../modules/leaveServerModal";
import { DeleteServerModal } from "../modules/deleteServerModal";

export const ModalProvider = () => {

    //prevents server side rendering of modals
    const [isMounted, setIsMounted] = useState(false);

    useEffect(() => {
        setIsMounted(true);
    }, []);

    if (!isMounted) {
        return null;
    }
    

    return (
        <>
            <CreateServerModal />
            <InviteModal />
            <ServerSettingsModal />
            <MembersModal />
            <CreateChannelModal />
            <LeaveServerModal />
            <DeleteServerModal />
        </>
    )
}