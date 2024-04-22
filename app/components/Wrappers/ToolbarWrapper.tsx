import { ReactNode } from 'react'

const ToolbarWrapper = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-between px-5 py-5 items-center bg-primary-300">
        <div className="flex items-center flex-1">
            {children}
        </div>
    </div>
  )
}

export default ToolbarWrapper