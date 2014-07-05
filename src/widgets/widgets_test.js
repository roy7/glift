glift.widgets.widgetsTest = function() {
  module("Widgets Test");
  var testUtil = glift.testUtil;

  test("Successfully create a basic widget (Game Viewer)", function() {
    var manager = glift.widgets.create({
      sgf: testdata.sgfs.complexproblem,
    });
    ok(manager !== undefined);
    ok(manager.sgfCollection !== undefined);
    deepEqual(manager.sgfCollection.length, 1);
    deepEqual(manager.sgfCollection[0], testdata.sgfs.complexproblem);
    deepEqual(manager.sgfColIndex, 0);
    deepEqual(manager.sgfCollectionUrl, null);
    ok(manager.currentWidget !== undefined);
    ok(manager.displayOptions !== undefined);

    var currentWidget = manager.currentWidget;
    var sgfObj = currentWidget.sgfOptions;
    ok(sgfObj !== undefined);
    deepEqual(sgfObj.sgfString, testdata.sgfs.complexproblem);
    deepEqual(sgfObj.initialPosition, '');
    deepEqual(glift.util.typeOf(sgfObj.problemCallback), 'function');
    deepEqual(sgfObj.widgetType, glift.enums.widgetTypes.GAME_VIEWER);
    manager.destroy();
  });

  test("Succesfully create a complex problem series", function() {
    var wtypes = glift.enums.widgetTypes;
    var sgfs = testdata.sgfs;
    var manager = glift.widgets.create({
      sgfCollection: [{
          sgfString: sgfs.complexproblem,
          widgetType: wtypes.STANDARD_PROBLEM
        }, {
          sgfString: sgfs.marktest,
          widgetType: wtypes.EXAMPLE
        }, {
          sgfString: sgfs.twoOptions,
          widgetType: wtypes.CORRECT_VARIATIONS_PROBLEM
        }]
    });
    ok(manager !== undefined);
    ok($('#' + manager.divId).text(), 'must not be empty.');

    // It's rather nice to keep one copy of the widget manager around, to play
    // with after the tests run for manual verification.
    // manager.destroy();
  });
};
