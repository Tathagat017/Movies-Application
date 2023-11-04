export interface actorDTO {
  id: number;
  name: string;
  biography: string;
  dateOfBirth: Date;
  picture: string;
}

export interface actorsCreationDTO {
  name: string;
  DateOfBirth?: Date | undefined;
  image?: File;
  imageUrl?: string;
  biography?: string;
}

export interface actorMovieDTO {
  id: number;
  name: string;
  character: string;
  picture: string;
}
