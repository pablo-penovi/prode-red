import create from 'zustand'
import MenuOption from '../types/MenuOption'
import Role from '../types/Role'
import ToastData from '../types/ToastData'
import { faFutbolBall, faCalendar, faChessKnight, faMoneyBill1  } from '@fortawesome/free-regular-svg-icons'

const BUILDING_MESSAGE = 'Funcionalidad no disponible'

interface StoreState {
  isShowSpinner: boolean
  setShowSpinner: (to: boolean) => void,
  toasts: ToastData[],
  setToasts: (newToasts: ToastData[]) => void,
  pushToast: (newToast: ToastData) => void,
  linksMenu: MenuOption[],
}

  const getLinksMenu = (): MenuOption[] => ([
    {
      name: 'Calendario y resultados',
      href: '/site/match-results',
      forRoles: [Role.user],
      icon: faCalendar,
      enabled: false,
      tooltip: BUILDING_MESSAGE,
    },
    {
      name: 'Ligas',
      href: '/site/admin/leagues',
      forRoles: [Role.admin],
      icon: faFutbolBall,
      enabled: false,
      tooltip: BUILDING_MESSAGE,
    },
    {
      name: 'Temporadas',
      href: '/site/admin/seasons',
      forRoles: [Role.admin],
      icon: faCalendar,
      enabled: false,
      tooltip: BUILDING_MESSAGE,
    },
    {
      name: 'Mis jugadas',
      href: '/site/my-plays',
      forRoles: [Role.user],
      icon: faChessKnight,
      enabled: false,
      tooltip: BUILDING_MESSAGE,
    },
    {
      name: 'Jugadas',
      href: '/site/admin/plays',
      forRoles: [Role.admin],
      icon: faChessKnight,
      enabled: false,
      tooltip: BUILDING_MESSAGE,
    }, 
    {
      name: 'Premios',
      href: '/site/admin/prizes',
      forRoles: [Role.admin],
      icon: faMoneyBill1,
      enabled: false,
      tooltip: BUILDING_MESSAGE,
    },
  ])


const useStore = create<StoreState>()((set) => ({
  isShowSpinner: false,
  setShowSpinner: (to) => set((state) => ({ ...state, isShowSpinner: to })),
  toasts: [],
  setToasts: (newToasts) => set((state) => ({...state, toasts: newToasts })),
  pushToast: (newToast) => set((state) => ({...state, toasts: [...state.toasts, newToast]})),
  linksMenu: getLinksMenu(),
}))

export default useStore
