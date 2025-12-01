import BaseButton from "../elements/BaseButton.tsx";

import Stack from '@mui/material/Stack';
import Selector from "../elements/Selector.tsx";


import DataPicker from "./DataPicker.tsx";
import PlusSvgIcon from "../../Icons/PlusSvgIcon.tsx";
import  {JSXElementConstructor, ReactNode} from "react";
import BodyHeaderTitle from "./BodyHeaderTitle.tsx";


const top100Films = [
    {title: 'The Show Redemption', year: 1994},
    {title: 'The Godfather', year: 1972},

    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    {title: 'The Good, the Bad and the Ugly', year: 1966},
    {title: 'Fight Club', year: 1999},
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    {title: 'Forrest Gump', year: 1994},
    {title: 'Inception', year: 2010},
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },

    {title: 'WALL·E', year: 2008},
    {title: 'American Beauty', year: 1999},

];


type PropsType = {
    value?: string | undefined,
    content?: JSXElementConstructor<ReactNode> | undefined,
    onClick?: (value: string) => void;
}


const BodyHeader = (props: PropsType) => {


    return (

        <div className="h-[150px]">


                 <div className="flex  items-center justify-between ">

                    <BodyHeaderTitle  value={props.value}/>
                    <BaseButton
                        className="flex justify-center items-center bg-[#7E2DFC] w-[120px] h-[40px] opasity-2 rounded-[16px] mt-[40px] mr-[48px]  gap-1 text-center text-white font-bold text-sm  "
                        title="Добавить"
                        icon={<PlusSvgIcon/>}
                        onClick={() => props.onClick?.(props.value ?? '')}
                    >
                    </BaseButton>
                </div>

            { props.value!=='Роли' && props.value !== 'Проекты на главной' && props.value !== 'Категории' && props.value !== 'Возрасты' && props.value !== 'Жанры' && props.value !== 'Пользователи' && (
                <div className="flex justify-between gap-1 mt-[40px]">
                    <Stack
                        sx={{flexGrow: 1, marginLeft: 4, width: 238}} display="flex" alignItems="center"
                        direction="row" spacing={{sm: 1}} gap="1">
                        <Selector
                            options={top100Films.map((option) => option.title)} label="Сортировать:"
                            placeholder="Популярные" size="small"
                            variants=""

                        ></Selector>

                        <Selector options={top100Films.map((option) => option.title)} label="Категория"
                                  placeholder="Все категории" size="small"></Selector>
                        <Selector options={top100Films.map((option) => option.title)} label="Тип"
                                  placeholder="Фильмы и сериалы" size="small">
                        </Selector>

                    </Stack>

                    <DataPicker/>



                </div>
                )}

        </div>
                );

            }
export default BodyHeader;