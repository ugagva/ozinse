import SearchSvgIcon from "../../Icons/SearchSvgIcon.tsx";
import {useSearch} from "../context/SearchContext.tsx";


const Search = () => {

    const { search, setSearch } = useSearch();

    return (
        <div className=" flex  justify-between items-center w-[459px]  h-[56px]  mt-[22px]  bg-[#8F92A10D] rounded-xl  ">

                <input className="outline-none ml-4 text-[#8F92A1]  text-base font-[Roboto] font-semibold"
                       type="search"
                       placeholder="Поиск"
                       value={search}
                       onChange={(e) => setSearch(e.target.value)}
                />
          <SearchSvgIcon className="w-[24px] w-[24px] m-4" ></SearchSvgIcon>


        </div>
    );
};

export default Search;