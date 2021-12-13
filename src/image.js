const ImageDataURI = require('image-data-uri');
const fabric = require("fabric").fabric;





async function GenerateComment(Content, Username, PostTime, Upvotes, ProfilePicture) {

  //Create canvas
  const canvas = new fabric.StaticCanvas('canvas', {
    height: 1920,
    width: 1080,
    backgroundColor: '#141414'
  });

  //Register font
  fabric.nodeCanvas.registerFont(__dirname + '/assets/fonts/OpenSans-Regular.ttf', {
    family: 'OpenSans'
  });


  //For the content height which we will use to determine the top and bottom sections
  let txtContent = new fabric.Textbox(Content, {
    originY: "center",
    top: canvas.height * 0.5,
    left: 35,
    fontSize: 38,
    lineHeight: 1.1,
    width: canvas.getWidth() - 80,
    fontFamily: 'OpenSans'
  });
  const txtContentHeight = txtContent.height;


  //#region Top
  const crcAvatarBackground = new fabric.Circle({
    fill: '#232323',
    radius: 44,
    originY: "center",
    left: txtContent.left - 10,
    top: txtContent.top - (txtContent.height / 2) - 75
  })
  canvas.add(crcAvatarBackground);

  await new Promise((resolve, reject) => {
    fabric.Image.fromURL(ProfilePicture, (img) => {
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
    resolve("Avatar fetched successfully.");
  });

  //Add username
  const txtUsername = new fabric.Textbox(Username, {
    fill: '#8e8e8e',
    originY: "center",
    top: crcAvatarBackground.top,
    left: crcAvatarBackground.left + crcAvatarBackground.width + 25,
    fontSize: 34,
    fontFamily: 'Arial',
    fontWeight: 600
  });

  const crcDevider = new fabric.Circle({
    fill: '#8e8e8e',
    radius: 4,
    originY: "center",
    left: txtUsername.left + txtUsername.width + 20,
    top: txtUsername.top
  });

  const txtPostTime = new fabric.Textbox(PostTime, {
    fill: '#8e8e8e',
    originY: "center",
    top: crcDevider.top,
    left: crcDevider.left + crcDevider.width + 15,
    fontSize: 32,
    width: canvas.getWidth() - 60,
    fontFamily: 'Arial'
  });
  canvas.add(txtUsername, txtPostTime, crcDevider);
  //#endregion

  //#region Bottom
  const txtUpvotes = new fabric.Textbox(Upvotes, {
    fill: '#8e8e8e',
    top: txtContent.top + txtContent.height / 2 + 50,
    left: txtContent.width - 120,
    originX: 'center',
    fontSize: 32,
    fontFamily: 'Arial',
    fontWeight: 600,
  });

  var polDownArrow = new fabric.Polygon([{
    x: 8, y: 0
  }, {
    x: 8, y: 14
  }, {
    x: 0, y: 14
  }, {
    x: 14, y: 30
  }, {
    x: 28, y: 14
  }, {
    x: 20, y: 14
  }, {
    x: 20, y: 0
  }], {
    strokeWidth: 2.5,
    stroke: '#8e8e8e',
    fill: 'transparent',
    left: txtUpvotes.left + txtUpvotes.width,
    top: txtUpvotes.top,
    scaleX: 1.25,
    scaleY: 1.25,
    strokeLineJoin: 'round',
  });


  var polUpArrow = new fabric.Polygon([{
    x: 8, y: 0
  }, {
    x: 8, y: 14
  }, {
    x: 0, y: 14
  }, {
    x: 14, y: 30
  }, {
    x: 28, y: 14
  }, {
    x: 20, y: 14
  }, {
    x: 20, y: 0
  }], {
    top: txtUpvotes.top,
    left: txtUpvotes.left - txtUpvotes.width,
    originX: 'right',
    strokeWidth: 2.5,
    stroke: '#8e8e8e', //#ff4500
    fill: 'transparent',
    scaleX: 1.25,
    scaleY: -1.25,
    strokeLineJoin: 'round',
  });
  canvas.add(polDownArrow, polUpArrow, txtUpvotes);
  //#endregion

  txtContent.set({
    fill: 'white',
    originY: "top",
    top: canvas.height * 0.5 - txtContentHeight * 0.5,
    height: txtContentHeight,
  })
  canvas.add(txtContent);

  const ContentSegments = Content.match(/([^\.!\?]+[\.!\?]+)|([^\.!\?]+$)/g).filter(e => e);
  var ContentSegmentAdded = '';

  ContentSegments.forEach((segment, index) => {
    ContentSegmentAdded += segment;
    txtContent.set('text', ContentSegmentAdded);

    DataURLtoPNG(canvas, "image_" + index);
  });
  console.log(JSON.stringify(canvas));
}

async function GenerateTitle(Content, Username, PostTime, Upvotes, Comments) {

}

async function DataURLtoPNG(canvas, name) {
  //Return DataURL from canvas
  const dataURL = canvas.toDataURL({
    width: canvas.width,
    height: canvas.height,
    left: 0,
    top: 0,
    format: 'png',
  });

  //Output
  ImageDataURI.outputFile(dataURL, name + '.png');
}
GenerateComment("abcde.\nabcde. hello days gim tsa.",
  "hellomyusername", "15m", "1.5k",
  "https://styles.redditmedia.com/t5_50qpes/styles/profileIcon_snoo78944d19-7998-4dd1-8b34-df9a8b6ba99c-headshot.png");


