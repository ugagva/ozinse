


interface BodyHeaderTitleProps {
    value?: string|undefined;
    count?: number;
}

const BodyHeaderTitle = ({value,count }: BodyHeaderTitleProps) => {



    return (
        <div className="flex items-center justify-center gap-4 pl-[48px] mt-[40px]">



            <h1 className="text-[22px]  tracking-tighter font-bold font-Roboto ">
                {value}
            </h1>

            {count !== undefined && count > 0 && (
                <p className=" text-[14px] text-[#171717CC] font-bold ">
                    {count}</p>
            )}

        </div>
    );
};

export default BodyHeaderTitle;