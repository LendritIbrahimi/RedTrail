import util from "util";
import fs from "fs";
import textToSpeech from "@google-cloud/text-to-speech";

class SoundGenerator {
  constructor() {
    this.client = new textToSpeech.TextToSpeechClient();
    this.voice = { languageCode: "en-US", ssmlGender: "NEUTRAL" };
    this.audioConfig = { audioEncoding: "MP3" };
  }

  async generate(text, path) {
    const request = {
      input: { text },
      voice: this.voice,
      audioConfig: this.audioConfig,
    };

    const [response] = await client.synthesizeSpeech(request);
    const writeFile = util.promisify(fs.writeFile);
    await writeFile(path, response.audioContent, "binary");
  }
}

export { SoundGenerator };
