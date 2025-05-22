import "../common/button.css"
import { UseDispatch } from "react-redux"

const Button = () => {
  const dispatch = UseDispatch();
  return (
    <div>
        <button className="next-button heading-2 flex mt-100 items-center justify-center" onClick={()=>dispatch(goToNextStep())}>
           Next <svg xmlns="http://www.w3.org/2000/svg" className="h-6 ml-2 "   fill="white" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
        </button>

        <button className="w-5 h-5 text-green   flex mt-4 rounded-full items-center justify-center " onClick={()=>dispatch(goToPreviousStep())}>
           Back <svg xmlns="http://www.w3.org/2000/svg" className="h-6 ml-2 "   fill="green" viewBox="0 0 320 512"><path d="M278.6 233.4c12.5 12.5 12.5 32.8 0 45.3l-160 160c-12.5 12.5-32.8 12.5-45.3 0s-12.5-32.8 0-45.3L210.7 256 73.4 118.6c-12.5-12.5-12.5-32.8 0-45.3s32.8-12.5 45.3 0l160 160z"/></svg>
        </button>

    </div>
  )
}

export default Button