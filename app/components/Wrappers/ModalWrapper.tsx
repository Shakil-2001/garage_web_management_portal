import { ReactNode } from 'react'

const ModalWrapper = ({title, subtitle, children}: {title: string, subtitle: string, children: ReactNode }) => {

  
  return (
    <div className="fixed w-full h-full bg-black bg-opacity-60 backdrop-blur-sm flex justify-center items-center">
        <div className="w-3/4 mr-60 border-primary-200 border-solid border-2 rounded-md bg-primary-200 pb-2 px-1">
            <div className="flex-1 text-white p-5 bg-primary-200 rounded-t">
                <h1 className="text-xl py-1">{title}</h1>
                <p className="text-md">{subtitle}</p>
            </div>

            <div className="bg-white rounded-t p-5"> 
              {children}
            </div>

            
          
        </div>
    </div>

  )
}

export default ModalWrapper