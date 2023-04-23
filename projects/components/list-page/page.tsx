import type {
    MutableRefObject,
    ReactNode,
} from 'react';
import React, { forwardRef, useEffect, useImperativeHandle } from 'react';
import { useHistory } from 'react-router';
import type { QueryFilterAreaProps } from '@sfe/wand';
import { QueryFilterArea } from '@sfe/wand';
import { usePersistFn } from 'ahooks';
import type { Result } from 'ahooks/lib/useAntdTable';
import type { FormInstance } from 'antd';
import {
    Card, PageHeader, Space, Table,
} from 'antd';
import type { ColumnType } from 'antd/lib/table';
import { omit } from 'lodash';
import type { QueryParamConfigMap } from 'use-query-params';

import type { PageQueryProps } from '@/hooks';
import { usePageQuery } from '@/hooks';

import { PageProvider } from './context';
import type { UseTableProps } from './hooks';
import { useTable } from './hooks';

export interface ListPageProps<Item> extends Omit<UseTableProps<Item>, 'form' | 'columns'> {
    pageTitle?: string
    onBack?: () => Promise<void> | void
    queryParamsConfigMap?: QueryParamConfigMap
    searchFormProps: QueryFilterAreaProps
    renderTableTitle?: ReactNode
    columns: ColumnType<Item>[]
}

export interface ListPageInstance<Item> {
    form: FormInstance,
    search: Result<Item>['search']
    query: PageQueryProps['query']
}

export type ListPageInstanceRef<Item> = MutableRefObject<ListPageInstance<Item> | undefined>

type ListPageType = <Item>(props: ListPageProps<Item> & React.RefAttributes<ListPageInstance<Item> | undefined>, ref: any) => React.ReactElement | null

export const ListPage: ListPageType = forwardRef((props, ref) => {
    const {
        pageTitle,
        queryParamsConfigMap = {},
        searchFormProps,
        onBack: onPageBack,
        service,
        columns,
        rowKey,
        antdTableProps,
        renderTableTitle,
    } = props;

    const history = useHistory();
    const [form] = QueryFilterArea.useForm();

    const pageQueryProps = usePageQuery(queryParamsConfigMap);

    const { query, resetQuery } = pageQueryProps;

    const onBack = usePersistFn(async () => {
        if (onPageBack) {
            await onPageBack();
        }
        history.goBack();
    });

    const { tableProps, search } = useTable(
        {
            form,
            service,
            rowKey,
            columns,
            antdTableProps,
        },
        pageQueryProps,
    );

    const { submit, reset } = search;

    useEffect(() => {
        const formInitValues = omit(query, ['current', 'pageSize', '_t']);

        form.setFieldsValue(formInitValues);
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    // 因为重置antd-table没有接口调用，所以不会清除query，在这里拦截手动清除
    const onReset = usePersistFn(() => {
        reset();
        resetQuery();
    });

    useImperativeHandle(ref, () => ({
        form,
        query,
        search: {
            ...search,
            reset: onReset,
        },
    }));

    return (
        <PageProvider value={pageQueryProps}>
            <PageHeader onBack={onBack} title={pageTitle} />
            <Space direction="vertical" className="tw-w-full" size="middle">
                <Card bodyStyle={{ paddingBottom: 0 }}>
                    <QueryFilterArea queryForm={form} {...searchFormProps} onSubmit={submit} onReset={onReset} />
                </Card>
                <Card>
                    <Space direction="vertical" className="tw-w-full" size="middle">
                        <Space direction="horizontal" className="tw-w-full tw-justify-end">
                            {renderTableTitle}
                        </Space>
                        <Table
                            {...tableProps}
                        />
                    </Space>
                </Card>
            </Space>
        </PageProvider>
    );
});
