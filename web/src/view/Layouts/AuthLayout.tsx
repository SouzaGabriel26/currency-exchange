import { Outlet } from "react-router-dom"

export function AuthLayout() {
  return (
    <div className="w-full h-full max-w-5xl mx-auto">
      <div className="text-center mt-6">
        <h1 className="text-3xl font-bold">Currency Exchange App</h1>
      </div>

      <div className="w-full mt-[60px] flex justify-center p-6">
        <Outlet/>
      </div>
    </div>
  )
}
