import { SvgIconProps } from '@mui/material';

export interface MenuItem {
    id: string;
    textKey: string;
    path: string;
    icon?: React.ComponentType<SvgIconProps>;
    order?: number;
    parent?: string;
    children?: MenuItem[];
    disabled?: boolean;
    divider?: boolean;
}