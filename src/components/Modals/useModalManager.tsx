import {useContext} from "react";
import {ModalManagerContext} from "../context/ModalManagerProvider.tsx";

export function useModalManager() {
    const ctx = useContext(ModalManagerContext);
    if (!ctx) throw new Error("useModalManager() must be used inside <ModalManagerProvider>");
    return ctx;
}