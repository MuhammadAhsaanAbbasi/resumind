

interface HeaderProps {
    label: string;
};

export const AuthHeader = ({
    label,
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center text-center">
            <h1 className="!text-4xl">
                Welcome Resumind
            </h1>
            <h2>
                {label}
            </h2>
        </div>
    );
};