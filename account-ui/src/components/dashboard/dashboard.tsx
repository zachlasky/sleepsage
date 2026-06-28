'use client';

import { useRouter } from 'next/navigation';
import { useState } from 'react';

import { Filters } from '@/components/filters/filters';
import { ItemTable } from '@/components/item-table/item-table';
import { Auth } from '@/components/auth/auth';
import { Tabs } from '@/components/tabs/tabs';
import { UserTable } from '@/components/user-table/user-table';

const suggestionsData = [
  {
    id: 1,
    image: '/melatonin.webp',
    name: 'Apple MacBook Pro 17',
    description: 'A high-performance laptop with a sleek silver finish, ideal for professionals.',
    price: '$2999',
    rating: '5.0'
  },
  {
    id: 2,
    image: '/melatonin.webp',
    name: 'Microsoft Surface Pro',
    description: 'A versatile white tablet-laptop hybrid designed for productivity on the go.',
    price: '$1999',
    rating: '4.0'
  },
  {
    id: 3,
    image: '/melatonin.webp',
    name: 'Magic Mouse 2',
    description: 'A stylish black wireless mouse with a smooth multi-touch surface.',
    price: '$99',
    rating: '4.3'
  },
  {
    id: 4,
    image: '/melatonin.webp',
    name: 'Apple Watch Series 7',
    description: 'A vibrant red smartwatch with advanced health and fitness tracking features.',
    price: '$399',
    rating: '4.5'
  },
  {
    id: 5,
    image: '/melatonin.webp',
    name: 'Apple AirPods Pro',
    description: 'White noise-canceling earbuds offering immersive sound and a comfortable fit.',
    price: '$249',
    rating: '4.8'
  },
  {
    id: 6,
    image: '/melatonin.webp',
    name: 'Apple iPhone 13',
    description: 'A sleek blue smartphone with cutting-edge camera and performance capabilities.',
    price: '$799',
    rating: '4.7'
  }
];

const savesData = [
  {
    id: 4,
    image: '/melatonin.webp',
    name: 'Apple Watch Series 7',
    description: 'A vibrant red smartwatch with advanced health and fitness tracking features.',
    price: '$399',
    rating: '4.5'
  },
  {
    id: 5,
    image: '/melatonin.webp',
    name: 'Apple AirPods Pro',
    description: 'White noise-canceling earbuds offering immersive sound and a comfortable fit.',
    price: '$249',
    rating: '4.8'
  },
  {
    id: 6,
    image: '/melatonin.webp',
    name: 'Apple iPhone 13',
    description: 'A sleek blue smartphone with cutting-edge camera and performance capabilities.',
    price: '$799',
    rating: '4.7'
  }
];

const userData = {
  interactions: ['foo', 'bar', 'baz'],
  risks: ['foo', 'bar', 'baz'],
  symptoms: ['foo', 'bar', 'baz'],
  email: 'email@email.com'
};

type TItemData = {
  id: number;
  image: string;
  name: string;
  description: string;
  price: string;
  rating: string;
};

type TUserData = {
  interactions: string[];
  risks: string[];
  symptoms: string[];
  email: string;
};

type TDashboardProps = {
  suggestionsData: TItemData[];
  savesData: TItemData[];
};

const Dashboard = () => {
  const router = useRouter();

  const [activeTab, setActiveTab] = useState<number>(0);
  const [searchValue, setSearchValue] = useState<string>('');

  const filterTableData = (data: TItemData[]) => {
    return data.filter((item) => item.name.toLowerCase().includes(searchValue.toLowerCase()));
  };

  const getItemTableData = (): TItemData[] => {
    switch (activeTab) {
      case 0:
        return filterTableData(suggestionsData);
      case 1:
        return filterTableData(savesData);
      default:
        return [];
    }
  };

  const getUserTableData = (): TUserData => {
    switch (activeTab) {
      case 2:
        return userData;
      default:
        return {
          interactions: [],
          risks: [],
          symptoms: [],
          email: ''
        };
    }
  };

  const hasRemove = activeTab === 1;
  const isUserTableActive = activeTab === 2;

  // Check if the user is not logged in and the register modal is open
  // TODO: Update check for session token instead of userId
  if (!sessionStorage.getItem('userId')) {
    return (
      <div className="py-10 px-4 lg:px-10 lg:h-[100vh] bg-gradient-to-r from-default-gray to-black">
        <Auth />
      </div>
    );
  }

  return (
    <div className="py-10 px-4 lg:px-10 lg:h-[100vh] bg-gradient-to-r from-default-gray to-black">
      <Tabs activeTab={activeTab} updateActiveTab={setActiveTab} />

      {!isUserTableActive && (
        <div className="hidden md:block py-4">
          <Filters updateSearchValue={setSearchValue} searchValue={searchValue} />
        </div>
      )}

      {!isUserTableActive ? (
        <ItemTable data={getItemTableData()} hasRemove={hasRemove} />
      ) : (
        <UserTable data={getUserTableData()} />
      )}
    </div>
  );
};

export { Dashboard };
