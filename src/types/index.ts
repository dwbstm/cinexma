export interface Params<T> {
  params: Promise<T>;
}

export interface PlayersProps {
  title: string;
  source: string;
  recommended?: boolean;
  fast?: boolean;
  ads?: boolean;
}
