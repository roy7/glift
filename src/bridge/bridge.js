/**
 * The bridge is the only place where display and rules+controller code can
 * mingle.
 */
glift.bridge = {
  /**
   * Set/create the various components in the UI.
   *
   * For a more detailed discussion, see intersections in glift.rules.
   */
  setDisplayState: function(intersectionData, display) {
    var marks = glift.enums.marks;
    display.stones().clearMarks();
    for (var ptHash in intersectionData.points) {
      var intersection = intersectionData.points[ptHash];
      var pt = intersection.point;
      if ('stone' in intersection) {
        var color = intersection.stone;
        display.stones().setColor(pt, color);
      }
      for (var mark in marks) {
        if (mark in intersection) {
          if (mark === marks.LABEL) {
            display.stones().addMark(pt, mark, intersection[mark]);
          } else {
            display.stones().addMark(pt, mark);
          }
        }
      }
    }
  }
};