import React from 'react';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import TableReview from '@/components/organisms/dashboard/TableReview';

const ReviewDocuments = () => {
  return (
    <Layout layout={LayoutEnum.DASHBOARD}>
      <TableReview />
    </Layout>
  );
};

export default ReviewDocuments;
