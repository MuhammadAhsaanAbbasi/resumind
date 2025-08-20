import { useEffect} from 'react'
import { CardWrapper } from '~/components/auth/CardWrapper';
import { Button } from '../ui/button';
import { usePuterStore } from '~/lib/puter';
import { LoaderCircle } from 'lucide-react';
import { useLocation, useNavigate } from 'react-router';

export const AuthForm = () => {
    const {isLoading, auth} = usePuterStore();
    const location = useLocation();
    const next = location.search.split('next=')[1];
    const navigate = useNavigate();

    

    useEffect(() => {
        if (auth.isAuthenticated) navigate(next || '/');
    }, [auth.isAuthenticated, navigate]);

    const onSubmit = () => {
        if (auth.isAuthenticated) auth.signOut();
        else auth.signIn();
    }

    return (
        <CardWrapper
            headerlabels='Log In to Continue Your Job Journey'
        >
            <form className="flex flex-col items-center justify-center text-center gap-4"
                onSubmit={onSubmit}
            >
                <Button
                    disabled={isLoading}
                    type="submit" className='form-button mx-auto'>
                    {
                        isLoading ? (
                            <LoaderCircle className="mr-2 h-5 w-5 animate-spin" />
                        ) : auth.isAuthenticated ? (
                            "Logout"
                        ) : (
                            "Login"
                        )
                    }
                </Button>

            </form>
        </CardWrapper>
    );

}