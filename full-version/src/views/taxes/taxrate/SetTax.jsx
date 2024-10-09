import React from 'react'
import TaxTable from '@/views/taxes/taxrate/TaxTable'
export default function SetTax({ taxData, setTaxFlag, taxApi }) {
  const tableData = taxData.map(
    (data, index) =>
      ({
        taxId: data.tax_rate_id,
        taxName: data.tax_name,
        taxType: data.tax_type,
        country: data.country,
        state: data.state,
        rate: data.rate,
        id: data._id,
        srno: index + 1
      }) || {}
  )
  return (
    <>
      <TaxTable tableData={tableData} taxApi={taxApi} />
    </>
  )
}
