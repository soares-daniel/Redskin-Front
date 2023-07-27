// EventTypesContext.tsx

import { createContext, useContext } from 'react';

type EventType = {
  id: number;
  name: string;
  description: string;
};

const EventTypesContext = createContext<EventType[]>([]);

export const useEventTypes = () => useContext(EventTypesContext);

export default EventTypesContext;
