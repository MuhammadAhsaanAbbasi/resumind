

interface HeaderProps {
    label: string;
};

export const AuthHeader = ({
    label,
}: HeaderProps) => {
    return (
        <div className="w-full flex flex-col gap-y-4 items-center justify-center">
            {/* <img
                src="https://myapplication-logos.s3.ap-south-1.amazonaws.com/SkillForge.png"
                alt="logo"
                width={80}
                height={80}
                className="w-14 h-14 object-contain"
            /> */}
            <p className="text-base">
                {label}
            </p>
        </div>
    );
};