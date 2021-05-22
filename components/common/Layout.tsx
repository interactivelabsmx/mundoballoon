import { FC, ReactNode, useRef } from 'react';
import { withAuthUser } from 'next-firebase-auth';
import { Dialog } from '@headlessui/react';
import { SignUpView } from '../auth';
import Navbar from './NavBar';
import Footer from './Footer';
import { MODAL_VIEWS, useUI } from '../ui/context';

interface LayoutProps {
  pageProps?: any;
  children?: ReactNode;
}

const MODAL_VIEWS_CONFIG = {
  [MODAL_VIEWS.SIGNUP_VIEW]: {
    title: 'Join Us!',
    description: 'Signup or Login to Mundo Balloon',
    content: <SignUpView />,
  },
};

const Layout: FC<LayoutProps> = ({ children }) => {
  const modalRef = useRef(null);
  const { isModalOpen, closeModal, modalView } = useUI();
  const modalConfig = MODAL_VIEWS_CONFIG[modalView];
  return (
    <div>
      <Navbar />
      <main>{children}</main>
      <Footer />

      <Dialog
        as="div"
        className="fixed inset-0 z-10 overflow-y-auto"
        open={isModalOpen}
        onClose={closeModal}
        initialFocus={modalRef}
      >
        <Dialog.Overlay className="fixed inset-0 bg-black opacity-30" />
        <div className="inline-block w-full max-w-md p-6 my-8 overflow-hidden text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl">
          <Dialog.Title>{modalConfig.title}</Dialog.Title>
          <Dialog.Description>{modalConfig.description}</Dialog.Description>
          {modalConfig.content}
          <div ref={modalRef}>Hi</div>
        </div>
      </Dialog>
    </div>
  );
};

export default withAuthUser()(Layout);
