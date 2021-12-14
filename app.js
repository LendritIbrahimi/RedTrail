import { ArgumentHandler } from "./src/models/ArgumentHandler.js";
import Snoowrap from "snoowrap";
import { Fetcher } from "./src/models/Fetcher.js";
import { ImageGenerator } from "./src/models/image/ImageGenerator.js";
import { SoundGenerator } from "./src/models/sound/SoundGenerator.js";

function main() {
  const options = new ArgumentHandler().options;

  const wrapper = new Snoowrap({
    userAgent: "Reddit/1.0.0",
    clientId: options.clientId,
    clientSecret: options.clientSecret,
    username: options.username,
    password: options.password,
  });

  // A promise that contains fetched posts and comments
  // const fetcher = new Fetcher(options).fetch(wrapper);
  const soundGenerator = new SoundGenerator();

  const fetcher = new Fetcher(options).fetch(wrapper).then((data) => {
    const comments = data.forEach((entity) => {
      entity.comments.forEach((comment, index) => {
        // soundGenerator.generate(comment.text, `test${index}.mp3`);

        ImageGenerator(
          comment.text,
          comment.author,
          comment.ups.toString(),
          "1.5k",
          "https://styles.redditmedia.com/t5_50qpes/styles/profileIcon_snoo78944d19-7998-4dd1-8b34-df9a8b6ba99c-headshot.png"
        );
      });
    });
  });
}

main();
