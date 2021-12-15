import { fabric } from "fabric";
import ImageDataURI from "image-data-uri";
import { properties } from "./ImageProperties.js";

export class ImageGenerator {
  constructor(path) {
    this.path = path;

    fabric.nodeCanvas.registerFont("src/assets/fonts/OpenSans-Regular.ttf", properties.font);
  }

  generateComment(folderName, content, username, postTime, upvotes, profilePicture) {
    var canvas = new fabric.StaticCanvas("canvas", properties.canvas);

    // content
    var txtContent = new fabric.Textbox(content, {
      ...properties.txtContent,
      width: canvas.width - 80,
      top: canvas.height * 0.5,
    });

    var crcAvatarBackground = new fabric.Circle({
      ...properties.crcAvatarBackground,
      left: txtContent.left - 10,
      top: txtContent.top - txtContent.height / 2 - 75,
    });

    // username
    var txtUsername = new fabric.Textbox(username, {
      ...properties.txtUsername,
      top: crcAvatarBackground.top,
      left: crcAvatarBackground.left + crcAvatarBackground.width + 25,
    });

    var crcDevider = new fabric.Circle({
      ...properties.crcDivider,
      left: txtUsername.left + txtUsername.width + 20,
      top: txtUsername.top,
    });

    // postTime
    var txtPostTime = new fabric.Textbox(postTime, {
      ...properties.txtPostTime,
      left: crcDevider.left + crcDevider.width + 15,
      width: canvas.width - 60,
      top: crcDevider.top,
    });

    // upvotes
    var txtUpvotes = new fabric.Textbox(upvotes, {
      ...properties.txtUpVotes,
      top: txtContent.top + txtContent.height / 2 + 50,
      left: txtContent.width - 120,
    });

    // profilePicture
    fabric.Image.fromURL(profilePicture, (img) => {
      img.set({
        originY: "bottom",
        originX: "center",
        top: crcAvatarBackground.top - 2 + crcAvatarBackground.height / 2,
        left: crcAvatarBackground.left + crcAvatarBackground.width / 2,
      });
      img.scaleToHeight(crcAvatarBackground.radius * 2.25);
      img.scaleToWidth(crcAvatarBackground.radius * 2.25);
      canvas.add(img);
    });

    // additional drawings
    var crcDevider = new fabric.Circle({
      ...properties.crcDivider,
      left: txtUsername.left + txtUsername.width + 20,
      top: txtUsername.top,
    });

    var polDownArrow = new fabric.Polygon(properties.polArrowCoords, {
      ...properties.polArrow,
      scaleY: 1.25,
      top: txtUpvotes.top,
      left: txtUpvotes.left + txtUpvotes.width,
    });

    var polUpArrow = new fabric.Polygon(properties.polArrowCoords, {
      ...properties.polArrow,
      originX: "right",
      scaleY: -1.25,
      top: txtUpvotes.top,
      left: txtUpvotes.left - txtUpvotes.width,
    });

    txtContent.set({ originY: "top", top: canvas.height * 0.5 - txtContent.height * 0.5 });

    canvas.add(
      txtContent,
      txtUsername,
      txtPostTime,
      crcDevider,
      polDownArrow,
      polUpArrow,
      txtUpvotes,
      crcAvatarBackground
    );

    content.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g).reduce((acc, element, index) => {
      const newAcc = acc + element;

      txtContent.set("text", newAcc);
      DataURLtoPNG(canvas, `${this.path}/${folderName}/image_` + index);

      return newAcc;
    }, "");
  }

  generateTitle(content, subreddit, username, postTime, upvotes, comments) {
    // create your method here
  }
}

export async function GenerateTitle(content, subreddit, username, postTime, upvotes, comments) {
  //Create canvas
  var canvas = new fabric.StaticCanvas("canvas", properties.canvas);

  //Register font
  fabric.nodeCanvas.registerFont("src/assets/fonts/OpenSans-Regular.ttf", properties.font);

  var txtContent = new fabric.Textbox(content, {
    ...properties.txtContent,
    width: canvas.width - 80,
    top: canvas.height * 0.5,
    fontSize: 60,
  });

  canvas.add(txtContent);
  DataURLtoPNG(canvas, "title");
}

async function DataURLtoPNG(canvas, name) {
  //Return DataURL from canvas
  const dataURL = canvas.toDataURL({
    ...properties.dataURL,
    width: canvas.width,
    height: canvas.height,
  });

  //Output
  ImageDataURI.outputFile(dataURL, name + ".png");
}
