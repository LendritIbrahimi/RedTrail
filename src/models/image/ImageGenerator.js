import { fabric } from "fabric";
import ImageDataURI from "image-data-uri";
import { properties } from "./ImageProperties.js";


export class ImageGenerator {
  constructor(path, soundGenerator) {
    this.path = path;
    this.soundGenerator = soundGenerator;

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

      const imageName = `image_${index}`;
      const soundName = `sound_${index}`;
      const exportPath = `${this.path}/${folderName}/`;

      txtContent.set("text", newAcc);
      DataURLtoPNG(canvas, exportPath.concat(imageName));

      // generate sound only for the part after dot (.)
      this.soundGenerator.generate(exportPath.concat(soundName), element);

      return newAcc;
    }, "");
  }

  generateTitle(content, subreddit, username, postTime, upvotes, comments) {
    //Create canvas
    var canvas = new fabric.StaticCanvas("canvas", properties.canvas);

    var txtContent = new fabric.Textbox(content, {
      ...properties.txtContent,
      originY: "center",
      width: canvas.width - 200,
      left: 175,
      top: canvas.height * 0.5,
      fontSize: 50,
    });

    var crcAvatarBackground = new fabric.Circle({
      ...properties.crcAvatarBackground,
      radius: 30,
      left: txtContent.left - 5,
      top: txtContent.top - txtContent.height / 2 - 75,
    });

    // Subreddit
    var txtSub = new fabric.Textbox(subreddit, {
      ...properties.txtUsername,
      fill: "white",
      top: crcAvatarBackground.top - 5 + crcAvatarBackground.radius * 0.5,
      left: crcAvatarBackground.left + crcAvatarBackground.width + 25,
    });

    var crcDeviderSU = new fabric.Circle({
      ...properties.crcDivider,
      left: txtSub.left + txtSub.width + 20,
      top: txtSub.top,
    });

    // username
    var txtUsername = new fabric.Textbox(username, {
      ...properties.txtUsername,
      top: crcDeviderSU.top,
      left: crcDeviderSU.left + crcDeviderSU.width + 25,
    });

    var crcDeviderUT = new fabric.Circle({
      ...properties.crcDivider,
      left: txtUsername.left + txtUsername.width + 20,
      top: txtUsername.top,
    });

    // postTime
    var txtPostTime = new fabric.Textbox(postTime, {
      ...properties.txtPostTime,
      left: crcDeviderUT.left + crcDeviderUT.width + 15,
      width: canvas.width - 60,
      top: crcDeviderUT.top,
    });

    // upvotes
    var txtUpvotes = new fabric.Textbox(upvotes, {
      ...properties.txtUpVotes,
      top: txtContent.top - 65,
      originY: "center",
      fill: "white",
      left: 90,
      fontSize: 35,
    });


    var polUpArrow = new fabric.Polygon(properties.polArrowCoords, {
      ...properties.polArrow,
      originX: "center",
      originY: "center",
      stroke: "#de5827",
      fill: "#de5827",
      scaleY: -1.5,
      scaleX: 1.5,
      top: txtUpvotes.top - 60,
      left: txtUpvotes.left,
    });

    var polDownArrow = new fabric.Polygon(properties.polArrowCoords, {
      ...properties.polArrow,
      scaleY: 1.50,
      scaleX: 1.5,
      top: txtUpvotes.top + 60,
      originX: "center",
      originY: "center",
      left: txtUpvotes.left,
    });


    // upvotes
    var rectCommentIconBody = new fabric.Rect({
      fill: "#8e8e8e",
      strokeLineJoin: "round",
      strokeWidth: 2,
      stroke: "#8e8e8e",
      width: 35,
      height: 25,
      originY: "center",
      top: txtContent.top + txtContent.height,
      left: txtContent.left,
    });
    var rectCommentIconTail = new fabric.Rect({
      fill: "#8e8e8e",
      strokeLineJoin: "round",
      strokeWidth: 2,
      stroke: "#8e8e8e",
      angle: 45,
      width: 10,
      height: 10,
      originY: "center",
      originX: "center",
      top: rectCommentIconBody.top + rectCommentIconBody.height * 0.5,
      left: rectCommentIconBody.left + rectCommentIconBody.width * 0.5,
    });

    canvas.add(rectCommentIconBody, rectCommentIconTail);
    // upvotes
    var txtComments = new fabric.Textbox(comments + " Comments", {
      ...properties.txtUpVotes,
      top: rectCommentIconBody.top,
      width: 400,
      originY: "center",
      originX: "left",
      left: rectCommentIconBody.left + rectCommentIconBody.width + 15,
      fontSize: 30,
    });




    canvas.add(txtContent, crcAvatarBackground, txtUsername, txtSub, crcDeviderUT, crcDeviderSU, txtPostTime, txtUpvotes, polUpArrow, polDownArrow, txtComments);
    DataURLtoPNG(canvas, "title");
  }
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