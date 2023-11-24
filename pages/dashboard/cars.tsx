import Layout from '@/components/templates'
import LayoutEnum from '@/enums/layout.enum'
import React from 'react'

const Cars = () => {
  return (
    <Layout layout={LayoutEnum.DASHBOARD}>
      Cars
    </Layout>
  )
}

export default Cars
