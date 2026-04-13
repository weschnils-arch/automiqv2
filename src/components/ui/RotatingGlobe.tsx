import { useEffect, useRef } from 'react'
import * as d3 from 'd3'

interface RotatingGlobeProps {
  isDark?: boolean
}

export default function RotatingGlobe({ isDark = false }: RotatingGlobeProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    const canvas = canvasRef.current
    const context = canvas.getContext('2d')
    if (!context) return

    const container = canvas.parentElement
    if (!container) return

    const containerWidth = container.clientWidth
    const containerHeight = container.clientHeight
    const radius = Math.min(containerWidth, containerHeight) / 2.5

    const dpr = window.devicePixelRatio || 1
    canvas.width = containerWidth * dpr
    canvas.height = containerHeight * dpr
    canvas.style.width = `${containerWidth}px`
    canvas.style.height = `${containerHeight}px`
    context.scale(dpr, dpr)

    const projection = d3
      .geoOrthographic()
      .scale(radius)
      .translate([containerWidth / 2, containerHeight / 2])
      .clipAngle(90)

    const path = d3.geoPath().projection(projection).context(context)

    const pointInPolygon = (point: [number, number], polygon: number[][]): boolean => {
      const [x, y] = point
      let inside = false
      for (let i = 0, j = polygon.length - 1; i < polygon.length; j = i++) {
        const [xi, yi] = polygon[i]
        const [xj, yj] = polygon[j]
        if (yi > y !== yj > y && x < ((xj - xi) * (y - yi)) / (yj - yi) + xi) inside = !inside
      }
      return inside
    }

    const pointInFeature = (point: [number, number], feature: d3.ExtendedFeature): boolean => {
      const geometry = feature.geometry as any
      if (geometry.type === 'Polygon') {
        if (!pointInPolygon(point, geometry.coordinates[0])) return false
        for (let i = 1; i < geometry.coordinates.length; i++) {
          if (pointInPolygon(point, geometry.coordinates[i])) return false
        }
        return true
      } else if (geometry.type === 'MultiPolygon') {
        for (const polygon of geometry.coordinates) {
          if (pointInPolygon(point, polygon[0])) {
            let inHole = false
            for (let i = 1; i < polygon.length; i++) {
              if (pointInPolygon(point, polygon[i])) { inHole = true; break }
            }
            if (!inHole) return true
          }
        }
      }
      return false
    }

    interface DotData { lng: number; lat: number }

    const allDots: DotData[] = []
    let landFeatures: any

    const fgColor = isDark ? '#ffffff' : '#1A1A1A'
    const bgColor = isDark ? '#0A0A0A' : '#FFFFFF'
    const dotColor = isDark ? '#666666' : '#999999'
    const lineAlpha = isDark ? 0.2 : 0.15

    const render = () => {
      context.clearRect(0, 0, containerWidth, containerHeight)
      const currentScale = projection.scale()
      const scaleFactor = currentScale / radius

      context.beginPath()
      context.arc(containerWidth / 2, containerHeight / 2, currentScale, 0, 2 * Math.PI)
      context.fillStyle = isDark ? '#111' : '#F0F0EB'
      context.fill()
      context.strokeStyle = isDark ? '#333' : '#CCC'
      context.lineWidth = 1 * scaleFactor
      context.stroke()

      if (landFeatures) {
        const graticule = d3.geoGraticule()
        context.beginPath()
        path(graticule())
        context.strokeStyle = fgColor
        context.lineWidth = 0.5 * scaleFactor
        context.globalAlpha = lineAlpha
        context.stroke()
        context.globalAlpha = 1

        context.beginPath()
        landFeatures.features.forEach((feature: any) => { path(feature) })
        context.strokeStyle = fgColor
        context.lineWidth = 0.8 * scaleFactor
        context.globalAlpha = 0.3
        context.stroke()
        context.globalAlpha = 1

        allDots.forEach((dot) => {
          const projected = projection([dot.lng, dot.lat])
          if (projected && projected[0] >= 0 && projected[0] <= containerWidth && projected[1] >= 0 && projected[1] <= containerHeight) {
            context.beginPath()
            context.arc(projected[0], projected[1], 1 * scaleFactor, 0, 2 * Math.PI)
            context.fillStyle = dotColor
            context.fill()
          }
        })
      }
    }

    const loadWorldData = async () => {
      try {
        const response = await fetch('https://raw.githubusercontent.com/martynafford/natural-earth-geojson/refs/heads/master/110m/physical/ne_110m_land.json')
        if (!response.ok) return
        landFeatures = await response.json()

        landFeatures.features.forEach((feature: any) => {
          const bounds = d3.geoBounds(feature)
          const [[minLng, minLat], [maxLng, maxLat]] = bounds
          const step = 16 * 0.08
          for (let lng = minLng; lng <= maxLng; lng += step) {
            for (let lat = minLat; lat <= maxLat; lat += step) {
              if (pointInFeature([lng, lat], feature)) allDots.push({ lng, lat })
            }
          }
        })
        render()
      } catch {}
    }

    const rotation: [number, number] = [0, 0]
    let autoRotate = true

    const rotationTimer = d3.timer(() => {
      if (autoRotate) {
        rotation[0] += 0.4
        projection.rotate(rotation)
        render()
      }
    })

    const handleMouseDown = (event: MouseEvent) => {
      autoRotate = false
      const startX = event.clientX
      const startY = event.clientY
      const startRotation: [number, number] = [...rotation]

      const handleMouseMove = (e: MouseEvent) => {
        rotation[0] = startRotation[0] + (e.clientX - startX) * 0.5
        rotation[1] = Math.max(-90, Math.min(90, startRotation[1] - (e.clientY - startY) * 0.5))
        projection.rotate(rotation)
        render()
      }
      const handleMouseUp = () => {
        document.removeEventListener('mousemove', handleMouseMove)
        document.removeEventListener('mouseup', handleMouseUp)
        setTimeout(() => { autoRotate = true }, 10)
      }
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    canvas.addEventListener('mousedown', handleMouseDown)
    loadWorldData()

    return () => {
      rotationTimer.stop()
      canvas.removeEventListener('mousedown', handleMouseDown)
    }
  }, [isDark])

  return (
    <div className="w-full h-full relative">
      <canvas ref={canvasRef} className="w-full h-full" style={{ background: 'transparent' }} />
    </div>
  )
}
