import { useMemo } from 'react';
import type { Service } from '@ahooksjs/use-request/lib/types';
import type { QueryFormInstance } from '@sfe/wand/es/area-component/query-filter-area/hooks/useForm';
import { useAntdTable } from 'ahooks';
import type {
    BaseOptions, PaginatedFormatReturn, PaginatedParams,
} from 'ahooks/lib/useAntdTable';
import type { ColumnType } from 'antd/lib/table';

import type { PageQueryProps } from '@/hooks';
import useLoginInfo from '@/hooks/use-login-info';

import styles from '../index.module.less';

export interface UseTableProps<Item> {
    form: QueryFormInstance,
    service: Service<PaginatedFormatReturn<Item>, PaginatedParams>,
    columns: ColumnType<Item>[]
    rowKey?: string
    antdTableProps?: BaseOptions<Item>
}

export const useTable = <Item>(props: UseTableProps<Item>, pageQueryProps: PageQueryProps) => {
    const {
        form, service, columns, rowKey = 'id', antdTableProps = {},
    } = props;
    const { onSuccess, ...restAntdTableProps } = antdTableProps;
    const { setQuery } = pageQueryProps;
    const { tenantId } = useLoginInfo();
    // 这里需要将pagination中的onChange剔除，否则分页会额外触发一次请求
    const { tableProps, pagination: { onChange, ...pagination }, ...rest } = useAntdTable((pagination, params) => {
        setQuery?.({
            ...pagination,
            ...params,
        });
        return service(pagination, params);
    }, {
        form,
        ready: !!tenantId,
        onSuccess(data, [, params]) {
            form.setFieldsValue(params);
        },
        throwOnError: true,
        ...restAntdTableProps,
    });

    return {
        ...rest,
        tableProps: useMemo(() => ({
            ...tableProps,
            rowKey,
            scroll: { x: true },
            columns,
            pagination,
            rowClassName: styles['table-row'],
        }), [columns, pagination, rowKey, tableProps]),
    };
};
