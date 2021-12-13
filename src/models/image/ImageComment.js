import { fabric } from "fabric";
import ImageDataURI from "image-data-uri";
import { properties } from "./ImageProperties.js";

export async function GenerateComment(content, username, postTime, upvotes, profilePicture) {
  //Create canvas
  var canvas = new fabric.StaticCanvas("canvas", properties.canvas);

  //Register font
  fabric.nodeCanvas.registerFont("src/assets/fonts/OpenSans-Regular.ttf", properties.font);

  //For the content height which we will use to determine the top and bottom sections
  var txtContent = new fabric.Textbox(content, {
    ...properties.txtContent,
    width: canvas.width - 80,
    top: canvas.height * 0.5,
  });

  //#region Top
  var crcAvatarBackground = new fabric.Circle({
    ...properties.crcAvatarBackground,
    left: txtContent.left - 10,
    top: txtContent.top - txtContent.height / 2 - 75,
  });

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

  //Add username
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

  var txtPostTime = new fabric.Textbox(postTime, {
    ...properties.txtPostTime,
    left: crcDevider.left + crcDevider.width + 15,
    width: canvas.width - 60,
    top: crcDevider.top,
  });
  //#endregion

  //#region Bottom
  var txtUpvotes = new fabric.Textbox(upvotes, {
    ...properties.txtUpVotes,
    top: txtContent.top + txtContent.height / 2 + 50,
    left: txtContent.width - 120,
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
  canvas.add(txtUsername, txtPostTime, crcDevider, polDownArrow, polUpArrow, txtUpvotes, crcAvatarBackground);

  //#endregion
  Content.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g).reduce((acc, element, index) => {  
    const newAcc = acc + element;

    txtContent.set('text', newAcc);
    DataURLtoPNG(canvas, "image_" + index);

    return newAcc;
  }, "");
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
