"use client"
import React, { PropsWithChildren } from 'react'

type IconRouterProps = PropsWithChildren<{
    url?: string,
}>

const IconRouter = (props: IconRouterProps) => {
  return (
    <div onClick={() => window.open(props.url)}>
      {props.children}
    </div>
  )
}

export default IconRouter