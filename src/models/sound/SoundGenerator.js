import * as googleTTS from "google-tts-api";
import fs from "fs";

class SoundGenerator {
  constructor(path) {
    this.path = path;
    this.properties = {
      lang: "en",
      slow: false,
      host: "https://translate.google.com",
      timeout: 10000,
    };
  }

  async generate(folderName, text) {
    googleTTS
      .getAudioBase64(text, this.properties)
      .then((base64) => {
        fs.writeFileSync(
          `${this.path}/${folderName}/sound.mp3`,
          Buffer.from(base64.replace("data:audio/ogg; codecs=opus;base64,", ""), "base64")
        );
      })
      .catch(console.error);
  }
}

export { SoundGenerator };
