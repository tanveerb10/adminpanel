import React from 'react'
import TaxTable from '@/views/taxes/taxrate/TaxTable'
export default function SetTaxOverride({ taxOverrideData, setTaxOverrideFlag, taxOverrideApi }) {
  console.log('tax over ride data', taxOverrideData)

  const tableData = taxOverrideData.map(
    (data, index) =>
      ({
        taxId: data.tax_override_id,
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
      <TaxTable tableData={tableData} setTaxOverrideFlag={setTaxOverrideFlag} taxOverrideApi={taxOverrideApi} />
    </>
  )
}
