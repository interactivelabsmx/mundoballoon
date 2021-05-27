import { useAuthUser, withAuthUser } from 'next-firebase-auth';
import { FC } from 'react';
import { useUI } from '../ui/context';

interface UserNavProps {
  className?: string;
}

const UserNav: FC<UserNavProps> = () => {
  const AuthUser = useAuthUser();
  const { openSignupModal } = useUI();
  console.log(AuthUser);
  return (
    <nav>
      <div>
        <ul>
          {!AuthUser.id ? (
            <li>
              <button onClick={openSignupModal}>Open Modal</button>
            </li>
          ) : (
            <li>
              <button onClick={AuthUser.signOut}>Sign out</button>
            </li>
          )}
          <li>UserID: {AuthUser.id}</li>
        </ul>
      </div>
    </nav>
  );
};

export default withAuthUser()(UserNav);
