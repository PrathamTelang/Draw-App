"use client"
import { initDraw } from "@/draw"
import { useEffect, useRef } from "react"

export default function Canvas() {

    const canvasRef = useRef<HTMLCanvasElement>(null)
    
    useEffect(() => {
        if (canvasRef.current) {
            initDraw(canvasRef.current)
        }
    }, [canvasRef])

return (
  <div style={{ width: "100vw", height: "100vh" }}>
    <canvas
      ref={canvasRef}
      width={window.innerWidth}
      height={window.innerHeight}
      style={{
        display: "block",
        width: "100%",
        height: "100%",
        backgroundColor: "lightgray",
      }}
    />
  </div>
)

}