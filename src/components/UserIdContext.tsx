// UserIdContext.tsx

import { createContext, useContext } from 'react';

const UserIdContext = createContext(null);

export const useUserId = () => useContext(UserIdContext);

export default UserIdContext;