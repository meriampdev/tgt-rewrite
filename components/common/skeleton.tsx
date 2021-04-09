import React from 'react'

interface IProps {
  width: string
  height: string 
  style?: any
}
export default function Skeleton(props: IProps) {
  const { width, height, style } = props 
  return (<span className="skeleton-box" style={{ ...style, width: width ?? '100px', height: height ?? '80px' }}></span>)
}