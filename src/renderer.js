const htmlFile = require('./src/htmlFile.js');

function main () {
  let el = $('#cut-tab-content');
  createMainHTML(el);
};
main();

document.getElementById("browse-path").addEventListener("change", onChangeChoose);
//Cutting
document.getElementById("generate").addEventListener("click", onClickGenerate);
document.getElementById("next-range").addEventListener("click", onNextRange);

$('#browse-path').bind('change', onBrowsePathClick)
$(".pdfcut-event").bind("click", onCutPageClick);
document.getElementById("clear").addEventListener("click", onClickClear);
//Convertion
//document.getElementById("convert").addEventListener("click", onClickConvert);

global.hummus = require('hummus');
global.path = require('path');
global.fs = require('fs');

function onBrowsePathClick() {
  var filename = $("#browse-path").val();
  if (/^\s*$/.test(filename)) {
    $(".file-upload").removeClass('active');
    $("#noFile").text("No file chosen...");
  } else {
    $(".file-upload").addClass('active');
    $("#noFile").text(filename.replace("C:\\fakepath\\", ""));
  }
});

function split_pdf() {
  fs.readdirSync(outputFolder).filter((file) => {
    fs.unlinkSync(path.join(outputFolder, file));
  });
  var pdfWriter;
  for (let j = 0; j < authors.length; j++) {
    console.log('-> Generating ' + j + ' - th file.',
      'Into output/' + authors[j] + '.pdf file. From page',
      (content_from[j]) - 1, 'to page', (content_to[j] - 1) , '.');
  pdfWriter = hummus.createWriter(path.join(outputFolder,
    `${fileTitle + "_" + authors[j]}.pdf`));
    if (content_from[j] > pdfWriter.getImagePagesCount(sourcePDF)
       || content_to[j] > pdfWriter.getImagePagesCount(sourcePDF)){
      alert("Please correct the specified ranges."
            + "\nThere is greater than the total pages count range.");
        return;
    }
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

function onChangeChoose () {
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
//TODO: split this function to small ones, to be more efficient to call from one range gen too
function onClickGenerate () {
  //TODO: IMPORTANT: write tab change logic globally
  tabFlag = 'pdfcut-';
  let choose = document.getElementById("browse-path");
  if (choose.files.length && sourcePDF && fs.existsSync(outputFolder)) {
    p = document.getElementById("pages");
    p = p.getElementsByClassName("page");
    authors = [];
    content_from = [];
    content_to = [];
    for (let i = 0; i < p.length; i++) {
      let ti = p[i].getElementsByClassName(tabFlag + 'title')[0].value;
      let fr = p[i].getElementsByClassName(tabFlag + 'from')[0].value;
      let to = p[i].getElementsByClassName(tabFlag + 'to')[0].value;
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

//TODO: Implement convertion tab functionality
function onClickConvert () {
  let choose = document.getElementById("browse-path");
  if (choose.files.length && sourcePDF && outputFolder) {
    //convert_pdf(authors, content_from);
  } else {
    alert("Please choose PDF file.");
  }
};


function onClickClear () {
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
    el.innerHTML = TEMPLATE_PAGE_FIELDS.replace(/xxx/g, PAGES_COUNT);
    $('#pages > tbody:last-child').append(el);
    el.getElementsByClassName(INPUTELCLASS)[0].focus();
    $(".pdfcut-event").bind("click", onCutPageClick);
};

function pdfcut_gen(ti, f, t) {
  fs.readdirSync(outputFolder).filter((file) => {
    fs.unlinkSync(path.join(outputFolder, file));
  });
  console.log('-> Generating ' + ti + ' file.',
    'Into output/' + ti + '.pdf file. From page',
    f - 1, 'to page', t - 1, '.');
  var pdfWriter = hummus.createWriter(
    path.join(outputFolder, `${fileTitle + "_" + ti}.pdf`)
  );
  pdfWriter.appendPDFPagesFromPDF(
    sourcePDF, {type: hummus.eRangeTypeSpecific, specificRanges: [[f - 1, t - 1]]}
  );
  pdfWriter.end();
  alert('Generated new PDF files in "' + outputFolder + '" folder.');
};

function onCutPageGen (i) {
  //TODO: Before coming here check right values then call this function
  //TODO: Add JQuery instead of poor JS
  //TODO: IMPORTANT: write tab change logic globally
  tabFlag = 'pdfcut-';
  let choose = $("#browse-path");
  if (choose && sourcePDF && outputFolder) {
    let ti = $('#page-' + i).find('.' + tabFlag + 'title').val();
    let fr = $('#page-' + i).find('.' + tabFlag + 'from').val();
    let to = $('#page-' + i).find('.' + tabFlag + 'to').val();
    if ("" == ti) {
      alert('Please fill all the empty fields then press "Gen"');
      return;
    } else {
      //TODO:Do some work for later created file's right name for all platforms
      //TEST
      ti = ti.replace(/\./g, '');
      ti = ti.replace(/,/g, '');
      ti = ti.replace(/ /g, '_');
    }
    console.log("PUSHED", ti, fr, to);
    pdfcut_gen(ti, fr, to);
  } else {
    alert("Please choose PDF file.");
  }
};

function onCutPageView (i) {
  //TODO: Implement normally viewer
  const filePath = "/home/ha/Downloads/Sumi-e and Tea Ceremony.pdf";
  const viewerEle = document.getElementById('viewer');
  viewerEle.innerHTML = ''; // destroy the old instance of PDF.js (if it exists)
  // Create an iframe that points to our PDF.js viewer, and tell PDF.js to open the file that was selected from the file picker.
  const iframe = document.createElement('iframe');
  iframe.src = path.resolve(__dirname, `../public/pdfjs/web/viewer.html?file=${filePath}`);
  // Add the iframe to our UI.
  viewerEle.appendChild(iframe);
};

function onCutPageDel (i) {
  $('#page-' + i).find('input').val("");
};

//TODO: make tests for pdf cut process
function onCutPageClick (e) {
  //id still can be only  pdfcut-view-* or pdfcut-gen-*
  //TODO:Implemetn better way of index functionality detector
  let i = e.currentTarget.id.split("-")[2];
  if (e.currentTarget.id.indexOf("pdfcut") != -1) {
    if (e.currentTarget.id.indexOf("gen") != -1) {
      onCutPageGen(i);
    } else if (e.currentTarget.id.indexOf("view") != -1) {
      //TODO: Implement PDF view
      onCutPageView(i);
    } else {
      onCutPageDel(i);
    }
  }
};

function onNextRange () {
  //TODO: make tests for pdf cut process
  createNewPageField();
};

//TODO: Implement progress bar functionality