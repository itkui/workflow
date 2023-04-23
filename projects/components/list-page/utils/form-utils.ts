import type { DefaultOptionType } from 'antd/lib/select';

export function getOptionsLabel(options: DefaultOptionType[], value: string | number, config = {} as { defaultViewText?: string ; valueProp?: string }) {
    const { defaultViewText = '', valueProp = 'value' } = config;
    const option = options.find(({ [valueProp]: _value }) => _value === value);

    return option?.label || defaultViewText;
}
