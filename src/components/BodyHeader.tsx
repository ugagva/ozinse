
import BaseButton from "./BaseButton.tsx";
import {getIcons} from "./icons.tsx";
import Autocomplete from '@mui/material/Autocomplete';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import {Chip} from "@mui/material";

const top100Films = [
    { title: 'The Shawshank Redemption', year: 1994 },
    { title: 'The Godfather', year: 1972 },

    {
        title: 'The Lord of the Rings: The Return of the King',
        year: 2003,
    },
    { title: 'The Good, the Bad and the Ugly', year: 1966 },
    { title: 'Fight Club', year: 1999 },
    {
        title: 'The Lord of the Rings: The Fellowship of the Ring',
        year: 2001,
    },
    {
        title: 'Star Wars: Episode V - The Empire Strikes Back',
        year: 1980,
    },
    { title: 'Forrest Gump', year: 1994 },
    { title: 'Inception', year: 2010 },
    {
        title: 'The Lord of the Rings: The Two Towers',
        year: 2002,
    },
    { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
    { title: 'Goodfellas', year: 1990 },
    { title: 'The Matrix', year: 1999 },
    { title: 'Seven Samurai', year: 1954 },
    {
        title: 'Star Wars: Episode IV - A New Hope',
        year: 1977,
    },
    { title: 'City of God', year: 2002 },
    { title: 'Se7en', year: 1995 },
    { title: 'The Silence of the Lambs', year: 1991 },
    { title: "It's a Wonderful Life", year: 1946 },

    {
        title: 'Dr. Strangelove or: How I Learned to Stop Worrying and Love the Bomb',
        year: 1964,
    },
    { title: 'The Great Dictator', year: 1940 },
    { title: 'Cinema Paradiso', year: 1988 },
    { title: 'The Lives of Others', year: 2006 },
    { title: 'Grave of the Fireflies', year: 1988 },
    { title: 'Paths of Glory', year: 1957 },
    { title: 'Django Unchained', year: 2012 },
    { title: 'The Shining', year: 1980 },
    { title: 'WALL·E', year: 2008 },
    { title: 'American Beauty', year: 1999 },

    {
        title: 'Star Wars: Episode VI - Return of the Jedi',
        year: 1983,
    },
    { title: 'Reservoir Dogs', year: 1992 },
    { title: 'Braveheart', year: 1995 },
    { title: 'M', year: 1931 },
    { title: 'Requiem for a Dream', year: 2000 },
    { title: 'Amélie', year: 2001 },
    { title: 'A Clockwork Orange', year: 1971 },
    { title: 'Like Stars on Earth', year: 2007 },
    { title: 'Taxi Driver', year: 1976 },
    { title: 'Lawrence of Arabia', year: 1962 },
    { title: 'Double Indemnity', year: 1944 },
    {
        title: 'Eternal Sunshine of the Spotless Mind',
        year: 2004,
    },
    { title: 'Amadeus', year: 1984 },
    { title: 'To Kill a Mockingbird', year: 1962 },
    { title: 'Toy Story 3', year: 2010 },
    { title: 'Logan', year: 2017 },
    { title: 'Full Metal Jacket', year: 1987 },
    { title: 'Dangal', year: 2016 },
    { title: 'The Sting', year: 1973 },
    { title: '2001: A Space Odyssey', year: 1968 },

];

const BodyHeader =()=> {
    return (
        <div className="" >
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

                <Stack  sx={{ flexGrow: 1,   }}  useFlexGap display="flex" justifyContent="center" alignItems="center" direction="row" spacing={10}  >
                    <Autocomplete sx={{justifyContent: "center", alignItems: "center", }}
                        multiple
                        id="tags-filled"
                        options={top100Films.map((option) => option.title)}
                        freeSolo
                        renderValue={(value: readonly string[], getItemProps) =>
                            value.map((option: string, index: number) => {
                                const { key, ...itemProps } = getItemProps({ index });
                                return (
                                    <Chip variant="outlined" label={option} key={key} {...itemProps} />
                                );
                            })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Сортировать"
                                placeholder="Популярные"
                            />
                        )}
                    />
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={top100Films.map((option) => option.title)}
                        freeSolo
                        renderValue={(value: readonly string[], getItemProps) =>
                            value.map((option: string, index: number) => {
                                const { key, ...itemProps } = getItemProps({ index });
                                return (
                                    <Chip variant="outlined" label={option} key={key} {...itemProps} />
                                );
                            })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Категория"
                                placeholder="Все категории"
                            />
                        )}
                    />
                    <Autocomplete
                        multiple
                        id="tags-filled"
                        options={top100Films.map((option) => option.title)}
                        freeSolo
                        renderValue={(value: readonly string[], getItemProps) =>
                            value.map((option: string, index: number) => {
                                const { key, ...itemProps } = getItemProps({ index });
                                return (
                                    <Chip variant="outlined" label={option} key={key} {...itemProps} />
                                );
                            })
                        }
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                variant="standard"
                                label="Тип"
                                placeholder="Фильмы и сериалы"
                            />
                        )}
                    />

                </Stack>







                <img src="src/assets/images/math-plus.png" alt="plus"/>
            </div>

        </div>
    );
}
export default BodyHeader;