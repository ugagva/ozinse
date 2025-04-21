import BaseButton from "./BaseButton.tsx";
import {getIcons} from "./icons.tsx";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {Chip} from "@mui/material";
import Selector from "./Selector.tsx";

const top100Films = [
    {title: 'The Shawshank Redemption', year: 1994},
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




const BodyHeader = () => {
    return (
        <div className="">
            <div className="flex justify-between">

                <h1 className="text-2xl  tracking-tighter font-bold font-[Roboto]-bold pl-[48px] pt-[40px]">Проекты</h1>
                <BaseButton
                    className="bg-[#7E2DFC] w-[140px] h-[40px] opasity-2 rounded-[16px] mt-[40px] mr-[20px] text-center text-white font-bold text-sm tracking-tight "
                    title={"Добавить"}
                    nameIcon={getIcons().plus}
                >
                </BaseButton>


            </div>
            <div className="flex justify-between gap-2 mb-[10px]">

                <Stack sx={{flexGrow: 1, marginLeft:4,  }} useFlexGap display="flex" alignItems="flex-start"
                       direction={{sm: 'row'}} spacing={{sm:1}}>

                    <Autocomplete sx={{justifyContent: "center", alignItems: "center", minWidth:238, maxHeight:40,}}
                                  multiple
                                  id="tags-filled"
                                  options={top100Films.map((option) => option.title)}

                                  renderValue={(value: readonly string[], getItemProps) =>
                                      value.map((option: string, index: number) => {
                                          const {key, ...itemProps} = getItemProps({index});
                                          return (
                                              <Chip variant="filled" label={option} key={key} {...itemProps} />
                                          );
                                      })
                                  }
                                  renderInput={(params) => (
                                      <TextField
                                          {...params}
                                          variant="filled"
                                          label="Сортировать"
                                          placeholder="Популярные"
                                          size="small"
                                          fullWidth

                                      />
                                  )}
                    />
                    <Autocomplete
                        sx={{justifyContent: "center", alignItems: "center", minWidth:238, maxHeight: 40,}}
                        multiple
                        id="tags-filled"
                        options={top100Films.map((option) => option.title)}
                        renderValue={(value: readonly string[], getItemProps) =>
                            value.map((option: string, index: number) => {
                                const {key, ...itemProps} = getItemProps({index});
                                return (
                                    <Chip variant="outlined" label={option} key={key} {...itemProps} />
                                );
                            })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="filled"
                                label="Категория"
                                placeholder="Все категории"
                                size="small"
                                fullWidth

                            />
                        )}
                    />
                    <Autocomplete
                        sx={{justifyContent: "center", alignItems: "center", minWidth:200, maxHeight:0,}}
                        multiple
                        id="tags-filled"
                        options={top100Films.map((option) => option.title)}

                        renderValue={(value: readonly string[], getItemProps) =>
                            value.map((option: string, index: number) => {
                                const {key, ...itemProps} = getItemProps({index});
                                return (
                                    <Chip variant="outlined" label={option} key={key} {...itemProps} />
                                );
                            })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}

                                variant="filled"
                                label="Тип"
                                placeholder="Фильмы и сериалы"
                                size="small"
                                fullWidth
                            />
                        )}
                    />

                </Stack>


                <Selector/>
                <img src="src/assets/images/math-plus.png" alt="plus"/>
            </div>

        </div>
    );
}
export default BodyHeader;