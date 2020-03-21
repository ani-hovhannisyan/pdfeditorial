//VIEW: Main HTML file creation functionality

global.PAGES_COUNT = 1;
global.sourcePDF = 0;
global.outputFolder = 0;
global.content_from = [];
global.content_to = [];
global.authors = [];
global.tabFlag = ['pdfcre-', 'pdfcon-', 'pdfcut-', 'pdfset-'];
//COnvertion globals
const convertFormats = {1: 'PDF', 2: 'HTML', 3: 'DOCX', 4: 'TEXT'};
global.convertType = '';
global.convertFrom = 0;
global.convertTo = 0;

const INPUTELCLASS = 'form-control';
const CUTTEMPLATE_PAGE_FIELDS =
    '<th class="num" scope="row">xxx</th>'
  + '<td><input type="text" class="pdfcut-title form-control" aria-label="Range title" aria-describedby="basic-addon1"></td>'
  + '<td><input type="number" class="pdfcut-from form-control" aria-label="From" aria-describedby="basic-addon1"></td>'
  + '<td><input type="number" class="pdfcut-to form-control" aria-label="To" aria-describedby="basic-addon1"></td>'
  + '<td><button type="button" id="pdfcut-gen-xxx" class="btn pdfcut-event">Gen</button></td>'
  + '<td><button type="button" id="pdfcut-del-xxx" class="btn pdfcut-event">Del</button></td>';

function initConvertTabContent(mainEl) {
  //TODO: Merge same pdf or do better design
  let convertTypes =
      '<!-- Ranges table content -->'
    + '<table id="con-types" class="borderless m-2">'
    +   '<thead>'
    +     '<tr>'
    +       '<th scope="col">From</th>'
    +       '<th scope="col">To</th>'
    +     '</tr>'
    +   '</thead>'
    +   '<tbody>'
    +     '<tr class="con-type" id="type-1">'
    +       '<td><button type="button" class="btn pdfcon-event-from">PDF</button></td>'
    +       '<td><button type="button" class="btn pdfcon-event-to">PDF</button></td>'
    +     '</tr>'
    +     '<tr class="con-type" id="type-2">'
    +       '<td><button type="button" class="btn pdfcon-event-from">HTML</button></td>'
    +       '<td><button type="button" class="btn pdfcon-event-to ">HTML</button></td>'
    +     '</tr>'
    +     '<tr class="con-type" id="type-3">'
    +       '<td><button type="button" class="btn pdfcon-event-from">Docx</button></td>'
    +       '<td><button type="button" class="btn pdfcon-event-to ">Docx</button></td>'
    +     '</tr>'
    +     '<tr class="con-type" id="type-4">'
    +       '<td><button type="button" class="btn pdfcon-event-from">Text</button></td>'
    +       '<td><button type="button" class="btn pdfcon-event-to">Text</button></td>'
    +     '</tr>'
    +   '</tbody>'
    + '</table>';
  let chooseConvertLayout =
      '<!-- choose convertion types content -->'
    + '<div id="pdfcon-choose-layout" class="input-group">'
    +   '<div id="pdfcon-table-layout" class="card d-flex bd-highlight">'
    +     '<div class="card-header d-flex justify-content-between pdfcon-beige">'
    +       '<div class="mr-auto p-2 bd-highlight">Convertion types</div>'
    +     '</div>'
    +     '<div class="con-card-body">' + convertTypes + '</div>'
    +   '</div>'
    + '</div>';
  let convertfile =
      '<div class="file-upload">'
    +   '<div class="file-select mb-2">'
    +     '<div class="file-select-button">Choose File</div>'
    +     '<div class="file-select-name noFile">No file chosen...</div>'
    +     '<input type="file" name="browse-file" class="browse-file">'
    +   '</div>'
    + '</div>';
  let convertToolsLayout =
      '<div id="pdfcon-controls-layout" class="ml-2 mr-2">'
    + convertfile
    +   '<div id="pdfcon-draggable-area" class="d-flex justify-content-between">'
    +     '<button type="button" id="pdfcon-from" class="btn disabled">From</button>'
    +     '<button type="button" id="pdfcon-to" class="btn disabled">To</button>'
    +   '</div>'
    +   '<button type="button" id="con-generate" class="btn mt-2">Generate</button>'
    + '</div>';
  mainEl.append(chooseConvertLayout).append(convertToolsLayout);
};

function initCutTabContent(mainEl) {
  let browsefile =
      '<div class="file-upload">'
    +   '<div class="file-select mt-3 mb-2">'
    +     '<div class="file-select-button">Choose File</div>'
    +     '<div class="file-select-name noFile">No file chosen...</div>'
    +     '<input type="file" name="browse-file" class="browse-file">'
    +   '</div>'
    + '</div>';
  mainEl.append(browsefile);
  let chooserange =
     '<div class="pdfcut-choose-layout input-group">'
    +  '<div id="pdfcut-table-layout" class="card d-flex bd-highlight">'
    +    '<div class="card-header d-flex justify-content-between pdfcut-cyan">'
    +      '<div class="mr-auto p-2 bd-highlight">Cutting ranges</div>'
    +      '<button type="button" id="next-range" class="cutvise mr-2 btn p-2 bd-highlight">Add</button>'
    +      '<button type="button" id="clear" class="cutvise btn p-2 bd-highlight">Clear All</button>'
    +    '</div>'
    +    '<div class="cut-card-body"></div>'
    +  '</div>'
    +'</div>';
  mainEl.append(chooserange);
  let rangetable =
      '<!-- Ranges table content -->'
    + '<table id="pages" class="borderless m-2">'
    +   '<thead>'
    +     '<tr>'
    +       '<th scope="col">#</th><th scope="col">Title</th><th scope="col">From</th>'
    +       '<th scope="col"> To </th><th scope="col"></th><th scope="col"></th>'
    +     '</tr>'
    +   '</thead>'
    +   '<tbody><tr class="page" id="page-1">' + CUTTEMPLATE_PAGE_FIELDS.replace(/xxx/g, PAGES_COUNT) + '</tr></tbody>'
    + '</table>';
  $('.cut-card-body').append(rangetable);
  let cutcontrols =
      '<div id="pdfcut-controls-layout">'
    +   '<div class="viewer" id="viewer"></div>'
    +   '<button type="button" id="cut-generate" class="btn mt-2">Generate All</button>'
    + '</div>';
  mainEl.append(cutcontrols);
};

function createMainHTML () {
  //Init HTML page layout
  //Cut browse file content
  initCutTabContent($('#pdfcut-tab'));
  initConvertTabContent($('#pdfcon-tab'));
};