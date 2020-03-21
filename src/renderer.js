const htmlFile = require('./src/htmlFile.js');
const Convert = require('./src/convert.js');
const Cut = require('./src/cut.js');

function addEventListeners() {
  //Cutting
  //TODO: Move this change logic when is creating folder to generate part or settings tab
  $('.browse-file').bind('change', Cut.onBrowseFileClick)
  $("#cut-generate").bind("click", Cut.onCutGenerateClick);//check
  $("#next-range").bind("click", Cut.onNextRange);
  $(".pdfcut-event").bind("click", Cut.onCutPageClick);
  $("#clear").bind("click", Cut.onClickClear);
  //Convertion
  $("#con-generate").bind("click", Convert.onClickConvertGenerate);
  $(".pdfcon-event-from").bind("click", Convert.onClickConvertFrom);
  $(".pdfcon-event-to").bind("click", Convert.onClickConvertTo);
};

function main () {
  createMainHTML();
  addEventListeners();
};
main();

//TODO: Implement progress bar functionality
