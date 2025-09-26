import { PlayersProps } from "@/types";

export function getMoviesPlayers(id: string | number) {
  const players: Array<PlayersProps> = [
    {
      title: "VidLink",
      source: `https://vidlink.pro/movie/${id}?player=jw&primaryColor=0084f3&secondaryColor=a2a2a2&iconColor=eefdec`,
      recommended: true,
      fast: true,
      ads: true,
    },
    {
      title: "VidZee",
      source: `https://player.vidzee.wtf/embed/movie/${id}`,
      recommended: true,
      fast: true,
      ads: true,
    },
    {
      title: "VidSrc",
      source: `https://vidsrc.in/embed/movie/${id}`,
      recommended: true,
      fast: true,
      ads: true,
    },
    {
      title: "AutoEmbed",
      source: `https://autoembed.co/movie/tmdb/${id}`,
      fast: true,
      ads: true,
    },
    {
      title: "SuperEmbed",
      source: `https://multiembed.mov/directstream.php?video_id=${id}&tmdb=1`,
      ads: true,
    },
    {
      title: "<Embed>",
      source: `https://embed.su/embed/movie/${id}`,
      ads: true,
    },
    {
      title: "NontonGo",
      source: `https://www.nontongo.win/embed/movie/${id}`,
      ads: true,
    },
    {
      title: "2Embed",
      source: `https://www.2embed.cc/embed/${id}`,
      ads: true,
    },
    {
      title: "MoviesAPI",
      source: `https://moviesapi.club/movie/${id}`,
      ads: true,
    },
  ];

  return players;
}

export function getSeriesPlayers(id: string | number, season?: number, episode?: number) {
  const players: Array<PlayersProps> = [
    {
      title: "VidLink",
      source: `https://vidlink.pro/tv/${id}/${season}/${episode}?player=jw&primaryColor=0084f3&secondaryColor=a2a2a2&iconColor=eefdec&autoplay=false`,
      recommended: true,
      fast: true,
      ads: true,
    },
    {
      title: "Vidzee",
      source: `https://player.vidzee.wtf/embed/tv/${id}/${season}/${episode}`,
      recommended: true,
      fast: true,
      ads: true,
    },

    {
      title: "VidSrc",
      source: `https://vidsrc.in/embed/tv?tmdb=${id}&season=${season}&episode=${episode}`,
      recommended: true,
      fast: true,
      ads: true,
    },
    {
      title: "<Embed>",
      source: `https://embed.su/embed/tv/${id}/${season}/${episode}`,
      ads: true,
    },
    {
      title: "NontonGo",
      source: `https://www.NontonGo.win/embed/tv/${id}/${season}/${episode}`,
      ads: true,
    },
    {
      title: "AutoEmbed",
      source: `https://player.autoembed.cc/embed/tv/${id}/${season}/${episode}`,
      fast: true,
      ads: true,
    },
    {
      title: "2Embed",
      source: `https://www.2embed.cc/embedtv/${id}&s=${season}&e=${episode}`,
      ads: true,
    },

    {
      title: "MoviesAPI",
      source: `https://moviesapi.club/tv/${id}-${season}-${episode}`,
      ads: true,
    },
  ];

  return players;
}
