import { FlowerLoader } from "@/components/flower-loader"

export default function Loading() {
  return (
    <div className="flex items-center justify-center min-h-[60vh]">
      <FlowerLoader size="lg" text="Finding properties for you..." />
    </div>
  )
}
