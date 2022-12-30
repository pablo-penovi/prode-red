import create from 'zustand'

interface StoreState {
  isShowSpinner: boolean
  setShowSpinner: (to: boolean) => void
}

const useStore = create<StoreState>()((set) => ({
  isShowSpinner: false,
  setShowSpinner: (to) => set((state) => ({ ...state, isShowSpinner: to })),
}))

export default useStore