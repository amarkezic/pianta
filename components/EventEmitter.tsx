import React from "react";

const EventEmitterContext = React.createContext({} as any);
const EventEmitterProvider = ({ children }: { children: React.ReactNode }) => {
  return (
    <EventEmitterContext.Provider value={{}}>
      {children}
    </EventEmitterContext.Provider>
  );
};

export default EventEmitterProvider;
