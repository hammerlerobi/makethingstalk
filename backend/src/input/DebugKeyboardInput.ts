import { IInputDevice } from "./IInputDevice";
import readline from "readline";
import {
  IInteractionMessage,
  TagCommand,
} from "../transmitters/IInteractionMessage";
import { ITransmitter } from "../transmitters/ITransmitter";
import app from "../app";

class DebugKeyboardInput implements IInputDevice {
  transmitters: ITransmitter[];
  keymap: any[];

  constructor() {
    this.keymap = [
      { name: "1", enabled: false },
      { name: "2", enabled: false },
      { name: "3", enabled: false },
    ];

    readline.emitKeypressEvents(process.stdin);
    process.stdin.setRawMode(true);
    process.stdin.on("keypress", (key, data) => {
      if (key && key.ctrl && key.name === "c") process.exit();
      const element = this.keymap.find((e) => e.name === data.name);
      element.enabled = !element.enabled;
      if (element.enabled) {
        app.db
          .GetTag(element.name)
          .then((result) => {
            if (result.medias) {
              console.log("tag has medias");
              app.db.GetMedia(result.medias[0]).then((media) => {
                this.send({
                  command: TagCommand.play,
                  media: media.name,
                  tagID: result.id,
                });
              });
            } else {
              console.log("new tag");
              this.send({
                command: TagCommand.new,
                media: "",
                tagID: result.id,
              });
            }
          })
          .catch(() => {
            console.log("tag not in db send new Tag ");
            this.send({
              command: TagCommand.new,
              media: "",
              tagID: element.name,
            });
          });
      } else {
        this.send({
          command: TagCommand.idle,
          media: "",
          tagID: "",
        });
      }
    });
  }

  bindTransmitters(transmitters: ITransmitter[]): void {
    this.transmitters = transmitters;
  }
  send(message: IInteractionMessage): void {
    this.transmitters.forEach((transmitter) => {
      transmitter.sendMessage(message);
    });
  }
}
export { DebugKeyboardInput };
