import { formFields } from './constants'

interface IProps {
  register: any
}
export default function Shipping(props: IProps) {
  const { register } = props
  
  return (
    <div className="space-y-6">
      <div className="bg-white shadow px-4 py-5 sm:rounded-lg sm:p-6">
        <div className="md:grid md:grid-cols-3 md:gap-6">
          <div className="md:col-span-1">
            <h3 className="text-base font-medium leading-6 text-gray-900">Shipping Address</h3>
            <p className="mt-1 text-xs text-gray-500">
              Use an address where you can receive mail.
            </p>
          </div>
          <div className="mt-5 md:mt-0 md:col-span-2">
            <form>
              <div className="grid grid-cols-6 gap-6">
                {
                  formFields.map((field) => {
                    return (
                      <div className={field.colSpan} key={field.id}>
                        <label htmlFor={field.id} className="block text-sm font-medium text-gray-700">{field.text}</label>
                        <input 
                          {...register(field.id)}
                          className="mt-1 focus:ring-green-500 focus:border-green-500 block w-full shadow-sm sm:text-sm border-gray-300 rounded-md" 
                        />
                      </div>
                    )
                  })
                }
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}