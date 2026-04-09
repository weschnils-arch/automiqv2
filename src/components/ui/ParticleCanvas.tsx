import { useEffect, useRef } from 'react'

class Particle {
  x: number
  y: number
  dx: number
  dy: number
  size: number

  constructor(w: number, h: number) {
    this.size = Math.random() * 1.5 + 0.5
    this.x = Math.random() * w
    this.y = Math.random() * h
    this.dx = (Math.random() - 0.5) * 0.3
    this.dy = (Math.random() - 0.5) * 0.3
  }

  update(w: number, h: number) {
    if (this.x > w || this.x < 0) this.dx = -this.dx
    if (this.y > h || this.y < 0) this.dy = -this.dy
    this.x += this.dx
    this.y += this.dy
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.beginPath()
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2)
    ctx.fillStyle = 'rgba(255, 255, 255, 0.5)'
    ctx.fill()
  }
}

export default function ParticleCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    if (prefersReduced) return

    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let frameId: number

    const resize = () => {
      canvas.width = canvas.clientWidth * window.devicePixelRatio
      canvas.height = canvas.clientHeight * window.devicePixelRatio
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio)
      init()
    }

    const init = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      const count = Math.min(Math.floor((w * h) / 12000), 80)
      particles = Array.from({ length: count }, () => new Particle(w, h))
    }

    const connect = () => {
      for (let a = 0; a < particles.length; a++) {
        for (let b = a + 1; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x
          const dy = particles[a].y - particles[b].y
          const dist = dx * dx + dy * dy
          if (dist < 15000) {
            const opacity = 1 - dist / 15000
            ctx.strokeStyle = `rgba(255, 255, 255, ${opacity * 0.12})`
            ctx.lineWidth = 0.5
            ctx.beginPath()
            ctx.moveTo(particles[a].x, particles[a].y)
            ctx.lineTo(particles[b].x, particles[b].y)
            ctx.stroke()
          }
        }
      }
    }

    const animate = () => {
      const w = canvas.clientWidth
      const h = canvas.clientHeight
      ctx.clearRect(0, 0, w, h)
      particles.forEach((p) => {
        p.update(w, h)
        p.draw(ctx)
      })
      connect()
      frameId = requestAnimationFrame(animate)
    }

    resize()
    animate()
    window.addEventListener('resize', resize)

    return () => {
      cancelAnimationFrame(frameId)
      window.removeEventListener('resize', resize)
    }
  }, [])

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  )
}
