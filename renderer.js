
document.getElementById("browse-path").addEventListener("change", onChangeChoose);
//Cutting
document.getElementById("generate").addEventListener("click", onClickGenerate);
document.getElementById("pages").addEventListener("keyup", onPagesKeyUp);
document.getElementById("next-range-1").addEventListener("click", onNextRange);
document.getElementById("clear").addEventListener("click", onClickClear);
//Convertion
document.getElementById("generate").addEventListener("click", onClickConvert);

global.extract = require('pdf-text-extract');
global.hummus = require('hummus');
global.PdfReader = require("pdfreader").PdfReader;
global.path = require('path');
global.fs = require('fs');

const INPUTELCLASS = 'form-control';
const TEMPLATE_PAGE_FIELDS =
    '<th scope="row">xxx</th>'
  + '<td> <div class="input-group mb-2">'
    + '<input type="text" class="title form-control" placeholder="Page Title" aria-label="Page Title" aria-describedby="basic-addon1">'
  + '</div> </td>'
  + '<td> <div class="input-group mb-3">'
    + '<input type="number" class="from form-control" placeholder="From" aria-label="From" aria-describedby="basic-addon1">'
  + '</div> </td>'
  + '<td> <div class="input-group mb-3">'
    + '<input type="number" class="to form-control" placeholder="To" aria-label="To" aria-describedby="basic-addon1">'
  + '</div> </td>'
  + '<td> <div class="btn-group" role="group" aria-label="Next Range">'
    + '  <button id="next-range-" type="button" class="btn btn-secondary">Next Range</button>'
  + '</div> </td>';

global.PAGES_COUNT = 1;
global.sourcePDF = 0;
global.outputFolder = 0;
global.content_from = [];
global.content_to = [];
global.authors = [];

function split_pdf () {
  fs.readdirSync(outputFolder).filter((file) => {
    fs.unlinkSync(path.join(outputFolder, file));
  });
  for (let j = 0; j < authors.length; j++) {
    console.log('-> Generating ' + j + ' - th file.',
      'Into output/' + authors[j] + '.pdf file. From page',
      (content_from[j]) - 1, 'to page', (content_to[j] - 1) , '.');

    var pdfWriter = hummus.createWriter(path.join(outputFolder,
                   `${fileTitle + "_" + authors[j]}.pdf`));
    pdfWriter.appendPDFPagesFromPDF( sourcePDF, {
          type: hummus.eRangeTypeSpecific,
          specificRanges: [ [ content_from[j] - 1, content_to[j] - 1 ] ]
    });
    pdfWriter.end();
    if (j == authors.length - 1) {
      alert('Generated new PDF files in "' + outputFolder + '" folder.');
    }
  }
};


function onChangeChoose (e) {
  console.log("change");
  global.sourcePDF = this.files[0].path;
  global.fileTitle = this.files[0].name.split(".pdf")[0];
  global.outputFolder = path.join(sourcePDF.split(".")[0] + "_generated");
  if (! fs.existsSync(outputFolder)) {
    fs.mkdirSync(outputFolder);
  }
  console.log("Choosed", sourcePDF);
  if (! fs.existsSync(sourcePDF)) {
    alert("Please choose another valid PDF file");
  }
};

function onPagesKeyUp (e) {
  if (e.keyCode == 13 && e.srcElement.className == INPUTELCLASS) {
    createNewPageField();
  }
};

function onClickGenerate (e) {
  let choose = document.getElementById("browse-path");
  if (choose.files.length && sourcePDF && outputFolder) {
    p = document.getElementById("pages");
    p = p.getElementsByClassName("page");
    authors = [];
    content_from = [];
    content_to = [];
    for (let i = 0; i < p.length; i++) {
      let ti = p[i].getElementsByClassName("title")[0].value;
      let fr = p[i].getElementsByClassName("from")[0].value;
      let to = p[i].getElementsByClassName("to")[0].value;
      if ("" == ti) {
        alert('Please fill all empty "Title" fields.' +
              '\nOnly "To" is optional.');
        return;
      } else {
        ti = ti.replace(/\./g, '');
        ti = ti.replace(/,/g, '');
        ti = ti.replace(/ /g, '_');
        authors.push(ti);
      }
      if ("" == fr) {
        alert('Please fill all empty "From" fields.' +
              '\nOnly "To" is optional.');
        return;
      } else {
        content_from.push(parseInt(fr));
      }
      if ("" == to) {
        if (i + 1 == p.length) {
          content_to.push(parseInt(fr));
        } else {
          let f = p[i + 1].getElementsByClassName("from")[0].value;
          if ("" != f) {
            content_to.push(parseInt(f) - 1);
          } else {
            content_to.push(parseInt(fr));
          }
        }
      } else {
        content_to.push(parseInt(to));
      }
      console.log("PUSHED", authors[authors.length - 1], content_from[content_from.length - 1], content_to[content_to.length - 1]);
    }
    split_pdf(authors, content_from);
  } else {
    alert("Please choose PDF file.");
  }
};

function onClickConvert (e) {
  let choose = document.getElementById("browse-path");
  if (choose.files.length && sourcePDF && outputFolder) {
    split_pdf(authors, content_from);
  } else {
    alert("Please choose PDF file.");
  }
};


function onClickClear (e) {
  let p = document.getElementById("pages");
  let els = p.getElementsByClassName("page");
  for (let i = els.length - 1; i >= 0; i--) {
    els[i].remove();
  }
  PAGES_COUNT = 0;
  createNewPageField();
};

function createNewPageField () {
    let el = document.createElement("tr");
    el.id = "page-" + ++PAGES_COUNT;
    el.className = "page";
    el.innerHTML = TEMPLATE_PAGE_FIELDS.replace("xxx", PAGES_COUNT)
                   .replace("next-range-", "next-range-" + PAGES_COUNT);
    $('#pages > tbody:last-child').append(el);
    el.getElementsByClassName(INPUTELCLASS)[0].focus();
};

function onNextRange () {
    //TODO focus next row, add if condition to not add if it already has below row
    createNewPageField();
    document.getElementById("next-range-" + PAGES_COUNT).addEventListener("click", onNextRange);
};
