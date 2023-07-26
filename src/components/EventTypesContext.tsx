// EventTypesContext.tsx

import { createContext, useContext } from 'react';

const EventTypesContext = createContext([]);

export const useEventTypes = () => useContext(EventTypesContext);

export default EventTypesContext;