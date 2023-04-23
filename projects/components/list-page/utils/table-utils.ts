import jsToken from '@sfe/design-token';
import type { DefaultOptionType } from 'antd/lib/select';
import type { ColumnType } from 'antd/lib/table';
import { isObject } from 'lodash';

import { getOptionsLabel } from './form-utils';

export interface ItemRecord {
    [key: string | number]: any
}
/**
 * 没有设置dataIndex
 * @export
 * @template Item
 * @param {string} title
 * @param {Partial<ColumnType<Item>>} otherOptions
 * @return {*}  {ColumnType<Item>}
 */
export function getColumnConfig<Item extends ItemRecord>(
    title: string,
    otherOptions: Partial<ColumnType<Item>>,
): ColumnType<Item>

/**
 * 设置了dataIndex
 * @export
 * @template Item
 * @param {(keyof Item | undefined)} dataIndex
 * @param {string} title
 * @param {Partial<ColumnType<Item>>} otherOptions
 * @return {*}  {ColumnType<Item>}
 */
export function getColumnConfig<Item extends ItemRecord>(
    dataIndex: keyof Item | undefined,
    title: string,
    otherOptions?: Partial<ColumnType<Item>>,
): ColumnType<Item>

export function getColumnConfig(
    dataIndexOrTitle: any,
    titleOrOptions: any,
    options: any = {},
) {
    if (isObject(titleOrOptions)) {
        // 没有设置dataIndex
        return {
            title: dataIndexOrTitle,
            width: jsToken.widthCellXs,
            ...titleOrOptions,
        };
    }

    // 设置了dataIndex
    return {
        dataIndex: dataIndexOrTitle,
        title: titleOrOptions,
        width: jsToken.widthCellXs,
        ...options,
    };
}

export function getOptionColumnConfig<Item extends Record<string | number | symbol, any>>(dataIndex: keyof Item | undefined, title: string, options: DefaultOptionType[]) {
    return getColumnConfig<Item>(dataIndex, title, {
        render: (value) => getOptionsLabel(options, value),
    });
}

export function smColumnConfigConnect<Item extends Record<string | number | symbol, any>>(config: ColumnType<Item>): ColumnType<Item> {
    return {
        ...config,
        width: jsToken.widthCellSm,
    };
}
