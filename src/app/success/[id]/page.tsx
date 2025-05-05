
import PaymentSuccessPage from '@/components/payment/paymet-success'

export default async function Success({ params }:{params: {id:string}}) {
  const id = await params.id
  console.log(id)
    return (
      <PaymentSuccessPage p_Id={id}/>
    )
}