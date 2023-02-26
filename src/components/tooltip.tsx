import React, { ReactElement, useRef } from "react"

type TooltipProps = {
  text: string,
  position?: string,
  children: ReactElement,
}

type onMouseEnterType = {
  clientX: number
}

const Tooltip = ({
  text,
  children,
}: TooltipProps) => {
  const tooltipRef = useRef<HTMLSpanElement>(null)
  const container = useRef<HTMLDivElement>(null)
  
  const onMouseEnter = ({ clientX }: onMouseEnterType) => {
    if (!tooltipRef.current || !container.current) return
    const { left } = container.current.getBoundingClientRect()
    tooltipRef.current.style.left = (clientX - left - tooltipRef.current.clientWidth / 2) + 'px'
  }

  return (
    <div ref={container} onMouseEnter={onMouseEnter} className={"group relative inline-block"}>
      <span ref={tooltipRef} className="
        invisible absolute rounded text-sm group-hover:visible opacity-0 group-hover:opacity-100 transition duration-200 bg-gray-900 text-white p-1 top-full mt-2 whitespace-nowrap
      ">{text}</span>
      { children }
    </div>
  )
}

export default Tooltip
