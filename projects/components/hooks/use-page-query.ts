import { usePersistFn } from 'ahooks';
import type { QueryParamConfigMap } from 'use-query-params';
import {
    NumberParam,
    useQueryParams, withDefault,
} from 'use-query-params';

import { DEFAULT_PAGE_SIZE } from '@/constants';

/**
 * 分页场景下的query管理hooks，主要范围三个函数 + query
 *
 * @export
 * @template P
 * @param {P} queryParams
 * @return {*.query} 配置的页面query参数
 * @return {*.setQuery} 设置query参数；注意：这里是直接全量替换，所以局部数据更新的别用这个。比如将分页修改后同步query；要使用请 setQuery({ ...query, ...pagination })
 * @return {*.resetQuery} 重置query参数
 * @return {*.reload} 重置_t时间戳
 */
export function usePageQuery<P extends QueryParamConfigMap>(queryParams: P) {
    const [query, _setQuery] = useQueryParams({
        current: withDefault(NumberParam, 1),
        pageSize: withDefault(NumberParam, DEFAULT_PAGE_SIZE),
        ...queryParams,
        _t: NumberParam,
    });

    const resetQuery = usePersistFn(() => {
        _setQuery({
            current: 1,
            pageSize: query.pageSize || DEFAULT_PAGE_SIZE,
        }, 'push');
    });

    const setQuery = usePersistFn((params: Partial<typeof query>) => {
        _setQuery({
            current: 1,
            ...params,
        }, 'replace');
    });

    const reload = usePersistFn(() => {
        _setQuery({
            _t: Date.now(),
        });
    });

    return {
        query,
        setQuery,
        resetQuery,
        reload,
    };
}

export interface BaseQueryParams {
    current: number
    pageSize: number
    _t: number
}

export type PageQueryProps = ReturnType<typeof usePageQuery>
