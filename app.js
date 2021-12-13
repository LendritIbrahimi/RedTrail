import { ArgumentHandler } from "./src/models/ArgumentHandler.js";
import Snoowrap from "snoowrap";
import { Fetcher } from "./src/models/Fetcher.js";
import { GenerateComment } from "./src/models/image/ImageComment.js";

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
  const fetcher = new Fetcher(options).fetch(wrapper);

  /* This part tests the comment generation
  const fetcher = new Fetcher(options).fetch(wrapper).then((data) => {
    const comments = data.forEach((entity) => {
      entity.comments.forEach((comment) => {
        GenerateComment(
          comment.text,
          comment.author,
          comment.ups,
          "1.5k",
          "https://styles.redditmedia.com/t5_50qpes/styles/profileIcon_snoo78944d19-7998-4dd1-8b34-df9a8b6ba99c-headshot.png"
        );
      });
    });
  });
  */
}

main();
