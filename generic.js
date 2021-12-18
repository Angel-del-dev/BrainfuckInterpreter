$(function() {

    // Target all classed with ".lined"
    $("#interpreter").linedtextarea(
      {selectedLine: 1}
    );
  
    // Target a single one
    $("#mytextarea").linedtextarea();
  
  });