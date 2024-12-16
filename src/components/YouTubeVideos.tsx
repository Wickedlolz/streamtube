'use client';

import YouTube, { YouTubeProps } from 'react-youtube';
import { IVideoProps } from '@/interfaces/movie';

type IVideoPlayerProps = {
    videos: IVideoProps[];
};

const YouTubeVideos = ({ videos }: IVideoPlayerProps) => {
    const onPlayerReady: YouTubeProps['onReady'] = (event) => {
        event.target.pauseVideo();
    };

    const opts = {
        height: '300px',
        width: '100%',
    };

    return (
        <article>
            <h2 className="text-xl font-bold mb-5 dark:text-white">
                Offical videos from Youtube:
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-10">
                {videos
                    ?.filter((v) => v.type === 'Trailer')
                    .slice(0, 5)
                    .map((video) => (
                        <div
                            key={video?.id}
                            className="border border-gray-600 rounded-md w-full overflow-hidden relative"
                        >
                            <p className="text-sm font-medium px-6 py-3 dark:text-white">
                                Type: {video?.type} -{' '}
                                {video?.official ? 'Offical' : 'General'}
                            </p>
                            <YouTube
                                videoId={video?.key}
                                onReady={onPlayerReady}
                                opts={opts}
                            />
                        </div>
                    ))}
            </div>
        </article>
    );
};

export default YouTubeVideos;
