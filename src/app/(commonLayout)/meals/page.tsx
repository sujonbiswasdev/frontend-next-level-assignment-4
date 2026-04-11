import { getAllMeals } from '@/actions/meals.action'
import RetrieveAllmeals from '@/components/modules/meals/RetrieveAllmeals';
import Notfounddata from '@/components/Notfounddata'
import ErrorBoundary from '@/components/shared/ErrorBoundary';
import { TResponseMeals } from '@/types/meals.type';
import { Ipagination } from '@/types/pagination.type';
import React from 'react';


const GetMeals = async ({
  searchParams,
}: {
  searchParams:Promise<{ [key: string]: string | string[] | undefined }>;
}) => {
  const search =await searchParams
  const response = await getAllMeals(search);

  if(!response.success || !response.data){
    return <Notfounddata content='No meals found.' emoji="🍽️"/>
  }
  
  return (
    <div className="">
      {/* Error Boundary for meal data rendering */}
      <React.Suspense fallback={<div>Loading meals...</div>}>
        <ErrorBoundary fallback={<Notfounddata content="Something went wrong while loading meals." emoji="⚠️" />}>
          <RetrieveAllmeals initialMeals={response.data as TResponseMeals[]} pagination={response.pagination as Ipagination} />
        </ErrorBoundary>
      </React.Suspense>
 
    </div>
  )
}

export default GetMeals