'use client';

import Image from 'next/image';
import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect, useRef, useState, useMemo } from 'react';

import { Pagination } from '@/components/pagination/pagination';
import { getSupplements } from '@/server-actions/products-supplements';
import { Filters } from './filters';
import { Supplement } from './supplement';

import type { TInteractionsRisksSymptoms, TSupplement } from '@/types';

type TSupplementsProps = {
  supplementData: TSupplement[];
  filterData: TInteractionsRisksSymptoms;
};

const SUPPLEMENT_COUNT = 8;

const Supplements = ({ filterData, supplementData }: TSupplementsProps) => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const firstRenderRef = useRef(true);

  const [supplements, setSupplements] = useState<TSupplement[]>(supplementData);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [currentPage, setCurrentPage] = useState<number>(1);

  const interactions = useMemo(() => searchParams.getAll('interaction'), [searchParams]);
  const risks = useMemo(() => searchParams.getAll('risk'), [searchParams]);
  const symptoms = useMemo(() => searchParams.getAll('symptom'), [searchParams]);

  const updateCurrentPage = (page: number) => {
    setCurrentPage(page);
    window.scrollTo(0, 0);
  };

  const updateInteractions = (interactions: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    // Remove existing interactions
    params.delete('interaction');
    // Add new interactions
    interactions.forEach((interaction) => {
      params.append('interaction', interaction);
    });
    // Update URL
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const updateRisks = (risks: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    // Remove existing risks
    params.delete('risk');
    // Add new risks
    risks.forEach((risk) => {
      params.append('risk', risk);
    });
    // Update URL
    router.push(`?${params.toString()}`, { scroll: false });
  };

  const updateSymptoms = (symptoms: string[]) => {
    const params = new URLSearchParams(searchParams.toString());
    // Remove existing symptoms
    params.delete('symptom');
    // Add new symptoms
    symptoms.forEach((symptom) => {
      params.append('symptom', symptom);
    });
    // Update URL
    router.push(`?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    if (firstRenderRef.current) {
      firstRenderRef.current = false;
      return;
    }

    const updateSupplements = async () => {
      setIsLoading(true);

      const { data, error } = await getSupplements({
        interaction: interactions,
        risk: risks,
        symptom: symptoms
      });

      if (error) {
        console.error('Error fetching supplements:', error);
        return;
      }

      setSupplements(data || []);
      setIsLoading(false);
    };

    updateSupplements();
  }, [interactions, risks, symptoms]);

  const getPaginatedResults = () => {
    const start = (currentPage - 1) * SUPPLEMENT_COUNT;
    const end = start + SUPPLEMENT_COUNT;

    return supplements.slice(start, end);
  };

  return (
    <div className="grid px-2 lg:px-[36px] py-4 lg:py-10">
      <div>
        <Filters
          data={filterData}
          interactions={interactions}
          onInteractionChange={updateInteractions}
          onRiskChange={updateRisks}
          onSymptomChange={updateSymptoms}
          risks={risks}
          symptoms={symptoms}
        />

        {supplements.length === 0 ? (
          <div className="grid gap-8 justify-items-center px-10 py-8">
            <h2 className="text-center text-2xl pb-8">
              We couldn&apos;t find any supplements that match your criteria. Please try adjusting
              your filters.
            </h2>
            <Image src="/search.svg" alt="Register" width={500} height={500} />
          </div>
        ) : (
          <div className="grid gap-4">
            <h2 className="text-center text-2xl">
              BROWSE <span className="font-extrabold">{supplements.length}</span>{' '}
              {supplements.length > 1 ? 'SUPPLEMENTS' : 'SUPPLEMENT'}
            </h2>
            <p className="text-center pb-8">
              Carefully curated supplements backed by science and designed to help you achieve
              better sleep.
            </p>
          </div>
        )}
      </div>

      <div className="flex flex-wrap justify-center gap-5">
        {getPaginatedResults().map((s) => {
          return <Supplement key={s.Id} data={s} isLoading={isLoading} />;
        })}
      </div>

      {supplements.length !== 0 && (
        <Pagination
          currentPage={currentPage}
          itemCount={supplements.length}
          itemsPerPage={SUPPLEMENT_COUNT}
          updateCurrentPage={updateCurrentPage}
        />
      )}
    </div>
  );
};

export { Supplements };
