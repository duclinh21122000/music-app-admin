import React from 'react'

interface AppContainerProps {
  isFluid?: boolean
  children: React.ReactNode
}

const AppContainer = ({ isFluid = false, children }: AppContainerProps) => {
  const fluid = isFluid ? 'max-w-full px-8' : 'container mx-auto px-4'
  return <div className={fluid}>{children}</div>
}

export default AppContainer
