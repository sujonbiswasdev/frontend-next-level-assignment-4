'use client'
import { FilterPanel } from '@/components/shared/filter/FilterInput';
import { useFilter } from '@/components/shared/filter/ReuseableFilter';
import { TFilterField } from '@/types/filter.types';
import { TResponseproviderData } from '@/types/provider.type';
import { TUser } from '@/types/user.type';
import React, { useCallback, useState } from 'react'
import ProviderCard from './ProviderCard';
import Notfounddata from '@/components/Notfounddata';

const ProviderContent = ({data}:{data:TResponseproviderData<{user:TUser}>[]}) => {
  const { updateFilters, reset, isPending } = useFilter();
  const [form, setForm] = useState({
    search: "",
    email: "",
    isActive: true,
  });

  const handleChange = useCallback((key: keyof typeof form, value: string | number | boolean) => {
    setForm(prev => ({ ...prev, [key]: value }));
  }, []);

  const handleApply = () => {
    updateFilters(form);
  };

  const handleReset = () => {
    const defaultForm = {
      search: "",
      email: "",
      isActive: true,
    };
    setForm(defaultForm);
    reset();
  };
  const fields:TFilterField[] = [
    { type: "text", name: "search", value: form.search, placeholder: "Search provider by name...", label: "Search", onChange: (val: string) => handleChange("search", val) },
    { type: "text", name: "email", value: form.email, placeholder: "Search by email...", label: "Email", onChange: (val: string) => handleChange("email", val) },
    {
      type: "select",
      name: "isActive",
      label: "Active Status",
      value: String(form.isActive),
      onChange: (val: string) => handleChange("isActive", val),
      options: [
        { label: "Active", value: "true" },
        { label: "Inactive", value: "false" }
      ]
    }
  ];

  const hasProviders = Array.isArray(data) && data.length > 0;

  return (
    <section className="mx-auto w-full max-w-[1480px] px-3 py-8 sm:px-5 sm:py-10 lg:px-8">
      <div className="w-full">
        <div className="mx-auto mb-8 mt-4 max-w-3xl space-y-3 text-center sm:mb-10 sm:mt-8">
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white sm:text-3xl md:text-4xl">
            Provider Management
          </h1>
          <p className="mx-auto max-w-2xl text-sm text-gray-600 dark:text-gray-400 sm:text-base">
            Easily discover, filter, and manage food providers. Use the search tools below to find providers by name, email, or status.
          </p>
        </div>

        <section className="mb-6 w-full sm:mb-8">
        <FilterPanel
          fields={fields}
          onApply={handleApply}
          onReset={handleReset}
          isPending={isPending}
        />
        </section>

        <div className="relative w-full">
        {isPending && (
          <div className="absolute inset-0 z-10 flex flex-col items-center justify-center rounded-2xl bg-white/50 backdrop-blur-sm dark:bg-black/50">
            <div className="mb-2 h-10 w-10 animate-spin rounded-full border-b-2 border-blue-600"></div>
            <p className="text-sm font-medium">Filtering data...</p>
          </div>
        )}
          {!hasProviders ? (
            <Notfounddata content="No provider data found." path='/providers' btntext='providers' emoji="📦"/>
          ) : (
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {data.map((provider) => (
                <ProviderCard key={provider.id} data={provider} />
              ))}
            </div>
          )}
        </div>
      </div>
    </section>
  )
}

export default ProviderContent