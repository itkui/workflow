import type { FormInstance } from 'antd';
import { isNil } from 'lodash';
import type { NamePath } from 'rc-field-form/lib/interface';

export const withSetFieldValue = (form: FormInstance) => (namePath: NamePath, value: any) => {
    form.setFields([
        {
            name: namePath,
            value,
        },
    ]);
};

export const isEmptyValue = (value: any) => isNil(value) || value === '';
