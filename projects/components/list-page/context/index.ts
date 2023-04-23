import { createContext, useContext } from 'react';

import type { PageQueryProps } from '@/hooks';
import { useLatest } from '@/hooks';

export const context = createContext<PageQueryProps>({
    query: {
        current: 1,
        pageSize: 10,
        _t: null,
    },
    setQuery: () => undefined,
    resetQuery: () => undefined,
    reload: () => undefined,
});

export const PageProvider = context.Provider;

export const usePageContext = () => {
    const pageContext = useContext(context);
    return useLatest(pageContext).current;
};
