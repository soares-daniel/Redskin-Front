import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';

const withAuth = (WrappedComponent: React.ComponentType<any>) => {
  return (props: any) => {
    const router = useRouter();
    const [cookies] = useCookies(['userId']);
    const userId = cookies.userId;

    useEffect(() => {
      if (!userId) {
        router.push('/login');
      }
    }, [userId, router]);

    return <WrappedComponent {...props} />;
  };
};

export default withAuth;
