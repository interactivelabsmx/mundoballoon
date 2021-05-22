import React, { FC, useMemo } from 'react';

export enum MODAL_VIEWS {
  SIGNUP_VIEW,
}

interface State {
  isSidebarOpen: boolean;
  isDropdownOpen: boolean;
  isModalOpen: boolean;
  isToastOpen: boolean;
  modalView: MODAL_VIEWS;
  toastText: string;
}

const initialReducerState = {
  isSidebarOpen: false,
  isDropdownOpen: false,
  isModalOpen: false,
  modalView: MODAL_VIEWS.SIGNUP_VIEW,
  isToastOpen: false,
  toastText: '',
};

type Action =
  | {
      type: 'OPEN_SIDEBAR';
    }
  | {
      type: 'CLOSE_SIDEBAR';
    }
  | {
      type: 'OPEN_TOAST';
    }
  | {
      type: 'CLOSE_TOAST';
    }
  | {
      type: 'SET_TOAST_TEXT';
      text: ToastText;
    }
  | {
      type: 'OPEN_DROPDOWN';
    }
  | {
      type: 'CLOSE_DROPDOWN';
    }
  | {
      type: 'OPEN_MODAL';
    }
  | {
      type: 'CLOSE_MODAL';
    }
  | {
      type: 'SET_MODAL_VIEW';
      view: MODAL_VIEWS;
    };

type ToastText = string;

interface UIContextValue extends State {
  openSidebar: () => void;
  closeSidebar: () => void;
  toggleSidebar: () => void;
  closeSidebarIfPresent: () => void;
  openDropdown: () => void;
  closeDropdown: () => void;
  openModal: () => void;
  closeModal: () => void;
  setModalView: (view: MODAL_VIEWS) => void;
  openToast: () => void;
  closeToast: () => void;
  openSignupModal: () => void;
}

const initiaContextlState = {
  ...initialReducerState,
  openSidebar: () => undefined,
  closeSidebar: () => undefined,
  toggleSidebar: () => undefined,
  closeSidebarIfPresent: () => undefined,
  openDropdown: () => undefined,
  closeDropdown: () => undefined,
  openModal: () => undefined,
  closeModal: () => undefined,
  setModalView: () => undefined,
  openToast: () => undefined,
  closeToast: () => undefined,
  openSignupModal: () => undefined,
};

export const UIContext =
  React.createContext<UIContextValue>(initiaContextlState);

UIContext.displayName = 'UIContext';

function uiReducer(state: State, action: Action) {
  switch (action.type) {
    case 'OPEN_SIDEBAR': {
      return {
        ...state,
        isSidebarOpen: true,
      };
    }
    case 'CLOSE_SIDEBAR': {
      return {
        ...state,
        isSidebarOpen: false,
      };
    }
    case 'OPEN_DROPDOWN': {
      return {
        ...state,
        isDropdownOpen: true,
      };
    }
    case 'CLOSE_DROPDOWN': {
      return {
        ...state,
        isDropdownOpen: false,
      };
    }
    case 'OPEN_MODAL': {
      return {
        ...state,
        isModalOpen: true,
        isSidebarOpen: false,
      };
    }
    case 'CLOSE_MODAL': {
      return {
        ...state,
        isModalOpen: false,
      };
    }
    case 'OPEN_TOAST': {
      return {
        ...state,
        isToastOpen: true,
      };
    }
    case 'CLOSE_TOAST': {
      return {
        ...state,
        isToastOpen: false,
      };
    }
    case 'SET_MODAL_VIEW': {
      return {
        ...state,
        modalView: action.view,
      };
    }
    case 'SET_TOAST_TEXT': {
      return {
        ...state,
        toastText: action.text,
      };
    }
  }
}

export const UIProvider: FC = (props) => {
  const [state, dispatch] = React.useReducer(uiReducer, initialReducerState);

  const openSidebar = () => dispatch({ type: 'OPEN_SIDEBAR' });
  const closeSidebar = () => dispatch({ type: 'CLOSE_SIDEBAR' });
  const toggleSidebar = () =>
    state.isSidebarOpen
      ? dispatch({ type: 'CLOSE_SIDEBAR' })
      : dispatch({ type: 'OPEN_SIDEBAR' });
  const closeSidebarIfPresent = () =>
    state.isSidebarOpen && dispatch({ type: 'CLOSE_SIDEBAR' });

  const openDropdown = () => dispatch({ type: 'OPEN_DROPDOWN' });
  const closeDropdown = () => dispatch({ type: 'CLOSE_DROPDOWN' });

  const openModal = () => dispatch({ type: 'OPEN_MODAL' });
  const closeModal = () => dispatch({ type: 'CLOSE_MODAL' });

  const openToast = () => dispatch({ type: 'OPEN_TOAST' });
  const closeToast = () => dispatch({ type: 'CLOSE_TOAST' });

  const setModalView = (view: MODAL_VIEWS) =>
    dispatch({ type: 'SET_MODAL_VIEW', view });

  const openSignupModal = () => {
    dispatch({ type: 'SET_MODAL_VIEW', view: MODAL_VIEWS.SIGNUP_VIEW });
    dispatch({ type: 'OPEN_MODAL' });
  };

  const value = useMemo(
    () => ({
      ...state,
      openSidebar,
      closeSidebar,
      toggleSidebar,
      closeSidebarIfPresent,
      openDropdown,
      closeDropdown,
      openModal,
      closeModal,
      setModalView,
      openToast,
      closeToast,
      openSignupModal,
    }),
    [state]
  );

  return <UIContext.Provider value={value} {...props} />;
};

export const useUI = (): UIContextValue => {
  const context = React.useContext(UIContext);
  if (context === undefined) {
    throw new Error(`useUI must be used within a UIProvider`);
  }
  return context;
};

export const ManagedUIContext: FC = ({ children }) => (
  <UIProvider>{children}</UIProvider>
);
