import React from 'react'

const InputField = ({htmlFor, label, placeholder, required, type, value, onChange, disabled}: {htmlFor: string, label: string, placeholder: string, required: boolean, type: string, value: string, onChange: React.ChangeEventHandler<any>, disabled:boolean}) => {

  return (

    
    <div className="pt-2 w-full flex flex-col items-center justify-center">
      <div className="mx-auto w-5/6">
        <label className="block text-sm pb-1" htmlFor={htmlFor}>
              {required && <i className="text-red-800">* </i>}
              {label}
          </label>

          {disabled ? 
            <input className="w-full border-2 border-gray-500 bg-gray-300 text-black px-2 rounded-md" type={type} name={htmlFor} disabled placeholder={placeholder} value={value} onChange={onChange}/>  
            :
            <input className="w-full border-2 border-gray-500 px-2 rounded-md" type={type} name={htmlFor} placeholder={placeholder} value={value} onChange={onChange}/>
        }
          
      </div>
        
    </div>
  )
}

export default InputField