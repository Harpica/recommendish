import { ReactElement, memo, useState } from 'react';
import TabPanel from './TabPanel';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';

function a11yProps(index: number) {
    return {
        key: `tab-${index}`,
        id: `tab-${index}`,
        'aria-controls': `tabpanel-${index}`,
    };
}

interface SectionWithTabsProps {
    tabNames: Array<string>;
    tabPanels: Array<ReactElement>;
}

const SectionWithTabs: React.FC<SectionWithTabsProps> = memo(
    ({ tabNames, tabPanels }) => {
        const [value, setValue] = useState(0);

        const handleChange = (
            _event: React.SyntheticEvent,
            newValue: number
        ) => {
            setValue(newValue);
        };

        return (
            <section className='flex flex-col w-full'>
                <div className='flex flex-row gap-3 items-center mb-5  pb-3'>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label='tabs'
                    >
                        {tabNames.map((name, i) => (
                            <Tab
                                label={name}
                                {...a11yProps(i)}
                                className='text-lg font-bold w-fit capitalize text-inherit rounded'
                            />
                        ))}
                    </Tabs>
                </div>
                {tabPanels.map((tabPanel, i) => (
                    <TabPanel key={'tabPanel' + i} value={value} index={i}>
                        {tabPanel}
                    </TabPanel>
                ))}
            </section>
        );
    }
);

export default SectionWithTabs;
