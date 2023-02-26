import React, { ReactNode } from 'react';
import useStore from '../state/store';
import ToastType from '../types/ToastType';

export const DEFAULT_TEST_ID = 'toast';

type ToastProps = {
  testId?: string
}

const Toast = ({
  testId
}: ToastProps) => {
  const toasts = useStore((state) => state.toasts)
  const setToasts = useStore((state) => state.setToasts)

  const getIcon = (toastType: ToastType): ReactNode => {
    switch(toastType) {
      case ToastType.success:
        return (
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-green-500 bg-green-100 rounded-lg">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Check icon</span>
          </div>
        )
      case ToastType.error:
        return (
          <div className="inline-flex items-center justify-center flex-shrink-0 w-8 h-8 text-red-500 bg-red-100 rounded-lg ">
            <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
            <span className="sr-only">Error icon</span>
          </div>
        )
      default:
        throw new Error(`Tipo de toast no soportado: ${toastType}`)
    }
  }

  return (
    <div className="flex flex-col absolute bottom-5 right-5 z-50 w-6" data-testid={`${testId || DEFAULT_TEST_ID}-container`}>
      { toasts?.map((toast, index) => (
        <div key={`toast-${index}`} className="flex items-center w-full max-w-xs p-4 mb-4 text-white bg-gray-900 rounded-lg shadow" data-testid={`${testId || DEFAULT_TEST_ID}-${index}`}>
          <span className="mb-1 text-sm font-semibold text-white">{toast.title}</span>
          {getIcon(toast.type)}
          <div className="ml-3 text-sm font-normal">{toast.text}</div>
          <button type="button" className="ml-auto -mx-1.5 -my-1.5 bg-gray-900 text-white rounded-lg focus:ring-2 focus:ring-gray-300 p-1.5 hover:bg-gray-700 inline-flex h-8 w-8" data-dismiss-target="#toast-success" aria-label="Close">
              <span className="sr-only">Close</span>
              <svg aria-hidden="true" className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
          </button>
        </div>
      )) }
    </div>
  );
};

export default Toast;