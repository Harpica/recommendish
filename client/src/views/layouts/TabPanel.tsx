import { ReactNode, memo } from 'react';

interface TabPanelProps {
    children?: ReactNode;
    index: number;
    value: number;
    className?: string;
}

const TabPanel: React.FC<TabPanelProps> = memo((props) => {
    const { children, value, index, ...other } = props;

    return (
        <div
            role='tabpanel'
            id={`admin-tabpanel-${index}`}
            aria-labelledby={`admin-tab-${index}`}
            className={`${value !== index ? 'invisible' : 'visible'} relative`}
            {...other}
        >
            <div className='absolute top-0 left-0 w-full'>{children}</div>
        </div>
    );
});

export default TabPanel;
