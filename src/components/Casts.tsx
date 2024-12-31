import Link from 'next/link';
import Image from 'next/image';
import { ICast } from '@/interfaces/movie';
import { getImagePath } from '@/lib/getImagePath';

type CastsProps = {
    casts: ICast[];
};

const Casts = ({ casts }: CastsProps) => {
    const topCasts = casts.slice(0, 5);

    if (topCasts.length === 0) return null;

    return (
        <>
            <h3 className='text-secColor font-bold md:text-[18px] sm:text-[16.75px] xs:text-[15.75px] text-[14.75px]'>
                Top Casts
            </h3>
            <div className='flex flex-wrap md:gap-4 sm:gap-[14px] gap-2  sm:-mt-2 xs:-mt-[6px] -mt-1'>
                {topCasts.map((cast) => {
                    const { id, profile_path: profilePath, name } = cast;
                    return (
                        <Link
                            href={`/people/${id}/${cast.name
                                .toLocaleLowerCase()
                                .split(' ')
                                .join('-')}`}
                            key={id}
                        >
                            <figure className='flex flex-col justify-start gap-2'>
                                <div className='md:h-[96px] md:w-[64px] h-[54px] w-[40px]'>
                                    <Image
                                        src={getImagePath(profilePath)}
                                        alt={name}
                                        width={40}
                                        height={40}
                                        className='w-10 md:w-16 object-cover rounded-md shadow-md'
                                    />
                                </div>

                                <h4 className='text-gray-300 md:text-[12px] sm:text-[10.75px] text-[10px] md:max-w-[64px] text-center font-semibold sm:-mt-0 leading-snug max-w-[40px]'>
                                    {name}
                                </h4>
                            </figure>
                        </Link>
                    );
                })}
            </div>
        </>
    );
};

export default Casts;
