// Next Imports
import { redirect } from 'next/navigation'

// Component Imports
import PrintPage from '@views/apps/invoice/print'

const getData = async () => {
  // Vars
  const res = await fetch(`${process.env.API_URL}/apps/invoice`)

  if (!res.ok) {
    throw new Error('Failed to fetch invoice data')
  }

  return res.json()
}

const InvoicePrint = async ({ params }) => {
  // Vars
  const data = await getData()
  const filteredData = data.filter(invoice => invoice.id === params.id)[0]

  if (!filteredData) {
    redirect('/not-found')
  }

  return filteredData ? <PrintPage invoiceData={filteredData} id={params.id} /> : null
}

export default InvoicePrint
