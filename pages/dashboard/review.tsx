import React from 'react';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import TableReview from '@/components/organisms/dashboard/TableReview';
// import ConfirmAction from '@/components/molecules/ConfirmAction';

const ReviewDocuments = () => {
  return (
    <Layout layout={LayoutEnum.DASHBOARD}>
      <TableReview />

      {/* <ConfirmAction
        method="delete"
        endpoint="/pending"
        handleClose={() => console.log('clone')}
        handleResponse={(result) => console.log('res', result)}
        title="Confirmar Eliminación"
        subtitle="¿Seguro que desea realiza esta acción?"
      /> */}
    </Layout>
  );
};

export default ReviewDocuments;
