import React from 'react';
import Layout from '@/components/templates';
import LayoutEnum from '@/enums/layout.enum';
import TableReview from '@/components/organisms/dashboard/TableReview';
import { UserRolesEnum } from '@/store/user/user.enum';
// import ConfirmAction from '@/components/molecules/ConfirmAction';

const ReviewDocuments = () => {
  return (
    <Layout layout={LayoutEnum.DASHBOARD} authRoles={[UserRolesEnum.ADMIN]}>
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
