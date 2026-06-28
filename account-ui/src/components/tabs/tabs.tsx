import { TabItem, Tabs as FlowbiteTabs } from 'flowbite-react';
import { CiPill } from 'react-icons/ci';
import { HiClipboardList, HiUserCircle } from 'react-icons/hi';

const customTabTheme = {
  base: 'flex flex-col gap-2',
  tablist: {
    base: 'flex text-center',
    variant: {
      default: 'flex-wrap border-b',
      underline: '-mb-px flex-wrap border-b border-gray-700',
      pills: 'flex-wrap space-x-2 text-sm font-medium text-gray-400',
      fullWidth:
        'grid w-full grid-flow-col divide-x rounded-none text-sm font-medium shadow divide-gray-700 text-gray-400'
    },
    tabitem: {
      base: 'flex items-center justify-center rounded-t-lg p-4 text-sm font-medium first:ml-0 focus:outline-none disabled:cursor-not-allowed disabled:text-gray-500',
      variant: {
        default: {
          base: 'rounded-t-lg',
          active: {
            on: 'text-primary-600 bg-gray-800 text-primary-500 bg-black',
            off: 'text-gray-400 hover:bg-gray-800 hover:text-gray-300'
          }
        },
        underline: {
          base: 'rounded-t-lg',
          active: {
            on: 'rounded-t-lg border-b-2 border-primary-500 text-primary-500',
            off: 'border-b-2 border-transparent hover:border-gray-300 text-gray-400 hover:text-gray-300'
          }
        },
        pills: {
          base: '',
          active: {
            on: 'rounded-lg bg-primary-600 text-white',
            off: 'rounded-lg hover:bg-gray-800 hover:text-white'
          }
        },
        fullWidth: {
          base: 'ml-0 flex w-full rounded-none first:ml-0',
          active: {
            on: 'rounded-none p-4 bg-gray-700 text-white',
            off: 'rounded-none bg-gray-800 hover:bg-gray-700 hover:text-white'
          }
        }
      },
      icon: 'mr-2 h-5 w-5'
    }
  },
  tabitemcontainer: {
    base: '',
    variant: {
      default: '',
      underline: '',
      pills: '',
      fullWidth: ''
    }
  },
  tabpanel: 'py-3'
};

type TTabsProps = {
  activeTab: number;
  updateActiveTab: (tab: number) => void;
};

const Tabs = ({ activeTab, updateActiveTab }: TTabsProps) => {
  return (
    <FlowbiteTabs
      aria-label="Default tabs"
      onActiveTabChange={(tab) => updateActiveTab(tab)}
      theme={customTabTheme}
      variant="default">
      <TabItem active={activeTab === 0} icon={CiPill} title="Our Suggestions">
        Based on your symptoms, interactions, and risks, we suggest the following supplements.
      </TabItem>

      <TabItem active={activeTab === 1} icon={HiClipboardList} title="Your Saves">
        These are items you have saved to your profile.
      </TabItem>

      <TabItem active={activeTab === 1} icon={HiUserCircle} title="Your Profile">
        This is your profile information.
      </TabItem>
    </FlowbiteTabs>
  );
};

export { Tabs };
