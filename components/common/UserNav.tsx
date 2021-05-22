import { FC } from 'react';
import { useUI } from '../ui/context';

interface UserNavProps {
  className?: string;
}

const UserNav: FC<UserNavProps> = () => {
  const { openSignupModal } = useUI();
  return (
    <nav>
      <div>
        <ul>
          <li>
            <button aria-label="Menu" onClick={openSignupModal}>
              Open Modal
            </button>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default UserNav;
