import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useCookies } from 'react-cookie';
import { useGetUsers } from '@/hooks/useGetUsers';

const withAdmin = (WrappedComponent: React.ComponentType<any>) => {
    return (props: any) => {
      const router = useRouter();
      const [cookies] = useCookies(['userId']);
      const userId = cookies.userId;
  
      const { users, loading, error } = useGetUsers();

      useEffect(() => {
        if (!userId) {
          router.push('/login');
        } else if (!loading) {
          if (error) {
            router.push('/dashboard'); 
          }
        }
      }, [userId, loading, error, router]);
  
      return <WrappedComponent {...props} />;
    };
  };
  
  export default withAdmin;
