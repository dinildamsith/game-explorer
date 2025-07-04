import { Loader2, Store } from "lucide-react"

export default function StoresLoading() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      <header className="border-b bg-white/95 backdrop-blur-md sticky top-0 z-[100] shadow-sm">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center gap-3">
            <div className="bg-gradient-to-r from-green-600 to-emerald-600 p-2 rounded-lg shadow-lg">
              <Store className="w-6 h-6 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Game Stores</h1>
              <p className="text-sm text-gray-600">Discover where to buy games</p>
            </div>
          </div>
        </div>
      </header>

      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-center py-12">
          <div className="text-center">
            <Loader2 className="w-12 h-12 animate-spin text-green-600 mx-auto mb-4" />
            <span className="text-gray-600">Loading stores...</span>
          </div>
        </div>
      </main>
    </div>
  )
}
