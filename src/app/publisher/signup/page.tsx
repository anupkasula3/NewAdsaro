import { PublisherSignup } from "@/components/publisher/signup";


export default function Page() {
  return (
    <div className="flex items-center justify-center w-full p-6 min-h-svh md:p-10">
      <div className="w-full max-w-2xl">
        <PublisherSignup />
      </div>
    </div>
  )
}
