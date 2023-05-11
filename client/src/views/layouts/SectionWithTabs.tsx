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
            <section className='flex w-full flex-col'>
                <div className='mb-5 flex flex-row items-center gap-3  pb-3'>
                    <Tabs
                        value={value}
                        onChange={handleChange}
                        aria-label='tabs'
                    >
                        {tabNames.map((name, i) => (
                            <Tab
                                label={name}
                                {...a11yProps(i)}
                                className='w-fit rounded text-lg font-bold capitalize text-inherit'
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
