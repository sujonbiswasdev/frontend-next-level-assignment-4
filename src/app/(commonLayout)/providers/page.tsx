import { getAlluserProvider } from "@/actions/provider/provider.action"
import Notfounddata from "@/components/Notfounddata"
import TestimonialSection from "@/components/TestimonialSection"
import { IProviderInfo } from "@/types/provider.type"

const ProviderPage = async() => {
  const providerinfo=await getAlluserProvider()
  return (
    <div>
      <h2>retrieve all provider info</h2>
      <div>
       {!providerinfo.data ? <Notfounddata content="provider data not found"/> : 
          <TestimonialSection
            testomonialdata={providerinfo.data as IProviderInfo[]}
          />
        }
      </div>
    </div>
  )
}

export default ProviderPage
