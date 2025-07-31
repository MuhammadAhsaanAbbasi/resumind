

interface HeaderProps {
    label: string;
};

export const AuthHeader = ({
    label,
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center text-center">
            <h1>Welcome</h1>
            <h2>Log In to Continue Your Job Journey</h2>
        </div>
    );
};