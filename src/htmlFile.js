//VIEW: Main HTML file creation functionality

global.PAGES_COUNT = 1;
global.sourcePDF = 0;
global.outputFolder = 0;
global.content_from = [];
global.content_to = [];
global.authors = [];
global.tabFlag = ['pdfcre', 'pdfcon-', 'pdfcut-', 'pdfset-'];

const INPUTELCLASS = 'form-control';
const TEMPLATE_PAGE_FIELDS =
    '<th class="num" scope="row">xxx</th>'
  + '<td><input type="text" class="pdfcut-title form-control" aria-label="Range title" aria-describedby="basic-addon1"></td>'
  + '<td><input type="number" class="pdfcut-from form-control" aria-label="From" aria-describedby="basic-addon1"></td>'
  + '<td><input type="number" class="pdfcut-to form-control" aria-label="To" aria-describedby="basic-addon1"></td>'
  + '<!--td><button type="button" id="pdfcut-view-xxx" class="btn pdfcut-event">View</button></td-->'
  + '<td><button type="button" id="pdfcut-gen-xxx" class="btn pdfcut-event">Gen</button></td>'
  + '<td><button type="button" id="pdfcut-del-xxx" class="btn pdfcut-event">Del</button></td>'
  ;

function createMainHTML (mainEl) {
  //Init HTML page layout
  //Cut browse file content
  let browsefile =
       '<div class="file-upload">'
    +    '<div class="file-select">'
    +      '<div class="file-select-button" id="fileName">Choose File</div>'
    +      '<div class="file-select-name" id="noFile">No file chosen...</div>'
    +      '<input type="file" name="browse-path" id="browse-path">'
    +    '</div>'
    +  '</div>';

  mainEl.append(browsefile);

  let chooserange =
     '<div class="pdfcut-choose-layout input-group">'
    +  '<div id="pdfcut-table-layout" class="card d-flex bd-highlight">'
    +    '<div class="card-header d-flex justify-content-between pdfcut-cyan">'
    +      '<div class="mr-auto p-2 bd-highlight">Cutting ranges'
    +      '</div>'
    +      '<button type="button" id="next-range" class="cutvise mr-2 btn p-2 bd-highlight">Add'
    +      ' </button>'
    +      '<button type="button" id="clear" class="cutvise btn p-2 bd-highlight">Clear All'
    +      '</button>'
    +    '</div>'
    +    '<div class="card-body">'
    +    '</div>'
    +  '</div>'
    +'</div>'
  ;
  mainEl.append(chooserange);
  let rangetable =
      '<!-- Ranges table content -->'
    + '<table id="pages" class="borderless m-2">'
    +   '<thead>'
    +     '<tr>'
    +       '<th scope="col">#</th>'
    +       '<th scope="col">Title</th>'
    +       '<th scope="col">From</th>'
    +       '<th scope="col"> To </th>'
    +       '<th scope="col"></th>'
    +       '<th scope="col"></th>'
    +     '</tr>'
    +   '</thead>'
    +   '<tbody>'
    +     '<tr class="page" id="page-1">'
    +     TEMPLATE_PAGE_FIELDS.replace(/xxx/g, PAGES_COUNT)
    +     '</tr>'
    +   '</tbody>'
    + '</table>'
  ;
  $('.card-body').append(rangetable);
  let cutcontrols =
      '<div id="pdfcut-controls-layout">'
    +   '<!--div class="hided picker">'
    +     '<button id="myButton">Select PDF to view'
    +     '</button>'
    +   '</div-->'
    +   '<div class="viewer" id="viewer">'
    +   '</div>'
    +   '<button type="button" id="generate" class="btn">Generate All</button>'
    +   '<!--div class="hided progress">'
    +     '<div class="progress-bar" role="progressbar" style="width: 25%" aria-valuenow="25" aria-valuemin="0">'
    +     '</div>'
    +   '</div>'
    +   '<a class="hided" href="#" class="stretched-link">Open Folder</a-->'
    + '</div>'
    ;
  mainEl.append(cutcontrols);
};
