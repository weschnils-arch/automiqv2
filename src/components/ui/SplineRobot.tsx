import { Suspense, lazy } from 'react'

const Spline = lazy(() => import('@splinetool/react-spline'))

const ROBOT_SCENE_URL = 'https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode'

export default function SplineRobot() {
  return (
    <Suspense
      fallback={
        <div className="w-full h-full flex items-center justify-center">
          <div className="w-5 h-5 border-2 border-[#CCC] dark:border-[#444] border-t-[#1A1A1A] dark:border-t-white rounded-full animate-spin" />
        </div>
      }
    >
      <Spline scene={ROBOT_SCENE_URL} className="w-full h-full" />
    </Suspense>
  )
}
