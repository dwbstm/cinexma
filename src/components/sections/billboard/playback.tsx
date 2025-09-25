interface PlaybackProps {
  src: string;
}

const Playback: React.FC<PlaybackProps> = ({ src }) => {
  return (
    <iframe
      src={`${src}`}
      title="Playback"
      className="h-full w-full scale-150 brightness-110"
    ></iframe>
  );
};

export default Playback;
