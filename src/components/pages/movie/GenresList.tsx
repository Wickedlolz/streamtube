import { IGenre } from "@/interfaces/movie";

type GenresListProps = {
  genres?: IGenre[];
};

const GenresList = ({ genres }: GenresListProps) => {
  return (
    <ul className="flex flex-row items-center  sm:gap-[14px] xs:gap-3 gap-[6px] flex-wrap">
      {genres?.map((genre) => {
        return (
          <li
            key={genre.id}
            className="shadow-[inset_0_0_0_1px_#fff] md:text-[12.75px] sm:text-[12px] xs:text-[11.75px] text-[10.75px]  sm:py-1 py-[2.75px] sm:px-3 px-[10px] rounded-full dark:text-gray-300"
          >
            <span>{genre.name}</span>
          </li>
        );
      })}
    </ul>
  );
};

export default GenresList;
