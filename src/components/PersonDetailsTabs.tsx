import Link from 'next/link';
import Image from 'next/image';
import { getImagePath } from '@/lib/getImagePath';
import { IPerson } from '@/interfaces/people';

import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent } from '@/components/ui/card';
import {
    Dialog,
    DialogDescription,
    DialogTitle,
    DialogContent,
    DialogTrigger,
    DialogHeader,
} from '@/components/ui/dialog';

type PersonTabbedSectionsType = {
    data: IPerson | undefined;
};

const PersonDetailsTabs = ({ data }: PersonTabbedSectionsType) => {
    return (
        <Tabs defaultValue="filmography" className="w-full mt-8">
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="filmography">Filmography</TabsTrigger>
                <TabsTrigger value="gallery">Gallery</TabsTrigger>
            </TabsList>
            <TabsContent value="filmography">
                <div className="space-y-4">
                    {data?.movie_credits?.cast.map((movie) => (
                        <Card key={movie.id}>
                            <CardContent className="flex items-center p-4">
                                <Image
                                    src={getImagePath(movie.poster_path)}
                                    alt={movie.title}
                                    width={50}
                                    height={75}
                                    className="object-cover rounded mr-4"
                                    loading="lazy"
                                />
                                <div>
                                    <Link
                                        href={`/movie/${
                                            movie.id
                                        }/${encodeURIComponent(movie.title)}`}
                                        className="font-semibold hover:underline"
                                    >
                                        {movie.title}
                                    </Link>
                                    <p className="text-sm text-gray-500">
                                        {movie.release_date}
                                    </p>
                                    <p className="text-sm">{movie.character}</p>
                                </div>
                            </CardContent>
                        </Card>
                    ))}
                </div>
            </TabsContent>
            <TabsContent value="gallery">
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {data?.images.profiles.map((profile, index) => (
                        <Dialog key={index}>
                            <DialogTrigger>
                                <Image
                                    key={index}
                                    src={`${getImagePath(profile.file_path)}`}
                                    alt={`Gallery image ${data.name} ${index}`}
                                    width={200}
                                    height={200}
                                    className="object-cover rounded-lg"
                                />
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>{data.name}</DialogTitle>
                                    <DialogDescription asChild>
                                        <Image
                                            key={index}
                                            src={getImagePath(
                                                profile.file_path,
                                                true
                                            )}
                                            width={400}
                                            height={500}
                                            alt={`Gallery image ${data.name} ${index}`}
                                            className="w-full h-auto max-w-[90vw] md:max-w-[80vw] lg:max-w-[50vw] max-h-[70vh] object-contain rounded-lg"
                                        />
                                    </DialogDescription>
                                </DialogHeader>
                            </DialogContent>
                        </Dialog>
                    ))}
                </div>
            </TabsContent>
        </Tabs>
    );
};

export default PersonDetailsTabs;
