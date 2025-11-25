interface BodyHeaderTitleProps {
    value?: string | undefined
}

const BodyHeaderTitle = ({value}: BodyHeaderTitleProps) => {
    return (
        <div>
            <h1 className="text-[22px]  tracking-tighter font-bold font-Roboto pl-[48px] mt-[40px]">{value}</h1>
        </div>
    );
};

export default BodyHeaderTitle;