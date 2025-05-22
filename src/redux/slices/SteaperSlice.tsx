import { createSlice, current } from "@reduxjs/toolkit"

export type Step = {
  step: number,
  stepName: string,
  nextStep: number | null,
  previousStep: number | null,
}
type steaperState = {
  steps: Step[],
  currentStep: number,
}
const initialState: steaperState= {
  currentStep: 1,
  steps: [
    { step: 1, stepName: "Basic Details", nextStep: 2, previousStep: 0 },
    { step: 2, stepName: "Farming Experience", nextStep: 3, previousStep: 1 },
    { step: 3, stepName: "Livestock Details", nextStep: 4, previousStep: 2 },
    { step: 4, stepName: "Storage Facilities", nextStep: 5, previousStep: 3 },
    { step: 5, stepName: "Equipment Details", nextStep: 6, previousStep: 4 },
  ]
}
export const SteaperSlice = createSlice({
  name: "steaper",
  initialState,
  reducers: {
    goToNextStep: (state) => {
      const current = state.steps.find(step => step.step === state.currentStep);
      if (current?.nextStep) {
        state.currentStep = current.nextStep;
      }
    },
    goToPreviousStep:(state)=>{
       
    },
  },
});

export default SteaperSlice.reducer;