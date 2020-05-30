export interface IInteractionMessage {
  command: TagCommand;
  media: string;
  tagID: string;
}

export enum TagCommand {
  new = "NewTAG",
  play = "Play",
  idle = "Idle",
  thumbnail = "Thumbnail"
};
