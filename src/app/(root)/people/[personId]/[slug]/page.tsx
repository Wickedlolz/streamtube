import { Metadata } from 'next';
import Image from 'next/image';
import { getPersonById } from '@/lib/actions';
import { getImagePath } from '@/lib/getImagePath';

import PersonDetailsTabs from '@/components/PersonDetailsTabs';

type Params = Promise<{ personId: string; slug: string }>;

export const runtime = 'edge';

export async function generateMetadata({
    params,
}: {
    params: Params;
}): Promise<Metadata> {
    const { personId } = await params;
    const data = await getPersonById(personId);

    return {
        title: `${data.name} | StreamTube`,
    };
}

export default async function PeoplePage({ params }: { params: Params }) {
    const { personId } = await params;
    const data = await getPersonById(personId);

    return (
        <section className="md:p-4 dark:text-white">
            <section className="flex flex-col md:flex-row gap-3">
                <Image
                    src={getImagePath(data!.profile_path)}
                    height={400}
                    width={300}
                    alt={data?.name}
                    className="w-full h-80 md:w-72 md:h-96 object-cover md:rounded-xl"
                />
                <section className="flex flex-col px-3 md:px-0 gap-3 text-sm">
                    <h3 className="font-bold text-2xl">{data?.name}</h3>
                    <p>{data?.biography}</p>
                    <p>
                        Birthday:{' '}
                        <span className="font-bold">{data?.birthday}</span>
                    </p>
                    <p>
                        Place of birth:{' '}
                        <span className="font-bold">
                            {data?.place_of_birth}
                        </span>
                    </p>
                    <div className="flex items-center gap-2">
                        <div className="relative flex items-center justify-center w-12 h-12 hover:scale-105 cursor-pointer">
                            <svg
                                viewBox="0 0 24 24"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                                className="w-full h-full"
                            >
                                <path
                                    d="M12 2L15.09 8.26L22 9.27L17 14.14L18.18 21.02L12 17.77L5.82 21.02L7 14.14L2 9.27L8.91 8.26L12 2Z"
                                    fill="#FFD700"
                                    stroke="#FFA000"
                                    strokeWidth="1"
                                />
                            </svg>
                            <span className="absolute inset-0 flex items-center justify-center text-xs font-bold text-gray-800">
                                {data?.popularity.toFixed(0)}
                            </span>
                        </div>
                        <div className="flex flex-col font-bold">
                            <span>User</span>
                            <span>Score</span>
                        </div>
                    </div>
                    <p>Know for department: {data?.known_for_department}</p>
                    <p>
                        Also known as:{' '}
                        <span className="font-bold">
                            {data?.also_known_as.join(', ')}
                        </span>
                    </p>
                </section>
            </section>

            <PersonDetailsTabs data={data} />
        </section>
    );
}
