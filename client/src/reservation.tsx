import { createContext, useCallback, useContext, useState, type ReactNode } from "react";
import ReservationModal from "@/components/ReservationModal";

export type ReservationType = "table" | "salon";

type ReservationContextValue = {
  openReservation: (type?: ReservationType) => void;
};

const ReservationContext = createContext<ReservationContextValue | null>(null);

export function ReservationProvider({ children }: { children: ReactNode }) {
  const [open, setOpen] = useState(false);
  const [type, setType] = useState<ReservationType>("table");

  const openReservation = useCallback((next: ReservationType = "table") => {
    setType(next);
    setOpen(true);
  }, []);

  return (
    <ReservationContext.Provider value={{ openReservation }}>
      {children}
      {open && <ReservationModal initialType={type} onClose={() => setOpen(false)} />}
    </ReservationContext.Provider>
  );
}

export function useReservation() {
  const ctx = useContext(ReservationContext);
  if (!ctx) throw new Error("useReservation must be used inside <ReservationProvider>");
  return ctx;
}
