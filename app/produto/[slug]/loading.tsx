export default function Loading() {
  return (
    <div className="max-w-7xl mx-auto px-4 py-20 grid grid-cols-1 md:grid-cols-2 gap-12">
      {/* Esqueleto da Foto */}
      <div className="w-full h-[600px] bg-gray-200 animate-pulse rounded-sm" />
      
      {/* Esqueleto dos Textos */}
      <div className="space-y-4">
        <div className="h-10 w-3/4 bg-gray-200 animate-pulse rounded-sm" />
        <div className="h-6 w-1/4 bg-gray-200 animate-pulse rounded-sm" />
        <div className="h-32 w-full bg-gray-200 animate-pulse rounded-sm mt-8" />
      </div>
    </div>
  )
}