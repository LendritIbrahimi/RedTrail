const properties = {
  canvas: {
    height: 1920,
    width: 1080,
    backgroundColor: "#141414",
  },
  font: {
    family: "OpenSans",
  },
  txtContent: {
    originY: "center",
    left: 35,
    fontSize: 38,
    lineHeight: 1.1,
    fontFamily: "OpenSans",
  },
  txtUsername: {
    fill: "#8e8e8e",
    originY: "center",
    fontSize: 34,
    fontFamily: "Arial",
    fontWeight: 600,
  },
  crcAvatarBackground: {
    fill: "#232323",
    radius: 44,
    originY: "center",
  },
  crcDivider: {
    fill: "#8e8e8e",
    radius: 4,
    originY: "center",
  },
  txtPostTime: {
    fill: "#8e8e8e",
    originY: "center",
    fontSize: 32,
    fontFamily: "Arial",
  },
  txtUpVotes: {
    fill: "#8e8e8e",
    originX: "center",
    fontSize: 32,
    fontFamily: "Arial",
    fontWeight: 600,
  },
  polArrowCoords: [
    { x: 8, y: 0 },
    { x: 8, y: 14 },
    { x: 0, y: 14 },
    { x: 14, y: 30 },
    { x: 28, y: 14 },
    { x: 20, y: 14 },
    { x: 20, y: 0 },
  ],
  polArrow: {
    strokeWidth: 2.5,
    stroke: "#8e8e8e",
    fill: "transparent",
    strokeLineJoin: "round",
    scaleX: 1.25,
  },
  // Comment Segment part
  segment: {
    txtContent: {
      fill: "white",
      originY: "top",
      left: 35,
      fontSize: 38,
      lineHeight: 1.1,
      fontFamily: "OpenSans",
    },
  },
  // Data URL part
  dataURL: {
    left: 0,
    top: 0,
    format: "png",
  },
};

export { properties };
