import React from 'react'
import { useSelector } from 'react-redux'
import { RootState } from '../../redux/store'
import { Step } from '../../redux/slices/SteaperSlice'
import "../common/steaper.css"
// import Button from '../common/Button'

const Stepper = () => {
  const steps = useSelector((state: RootState) => state.steaper) as Step[]

  return (
    <>
   <div className="flex items-center justify-center mt-8 -space-x-3">
      {steps.map((step, index) => (
        <div className="flex items-center" key={step.step}>
          <div className="steps flex items-center justify-center rounded-full font-semibold text-white bg-gray-500">
              {step.step}
          </div>
          {index !== steps.length - 1 && (
            <div className="w-10 h-1 bg-gray-400 "></div>
          )}
        </div>

      ))}
       

    </div>
    <div>
      <Button/>
    </div>
    </>
  )
}

export default Stepper