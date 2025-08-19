

interface HeaderProps {
    label: string;
};

export const AuthHeader = ({
    label,
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col items-center gap-2 text-center">
            <h1 className="!text-4xl">
                Welcome Resumind
            </h1>
            <h2>
                {label}
            </h2>
        </div>
    );
};