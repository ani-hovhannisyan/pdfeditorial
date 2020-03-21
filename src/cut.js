const hummus = require('hummus');
const path = require('path');
const fs = require('fs');

module.exports = {
  onBrowseFileClick: function(e){
    var filename = e.target.files[0].name;
    if (/^\s*$/.test(filename)) {
      $(".file-upload").removeClass('active');
      $(".noFile").text("No file chosen...");
    } else {
      $(".file-upload").addClass('active');
      $(".noFile").text(filename);
    }
    global.sourcePDF = this.files[0].path;
    global.fileTitle = this.files[0].name.split(".pdf")[0];
    global.outputFolder = path.join(sourcePDF.split(".")[0] + "_generated");
    console.log("Choosed", sourcePDF);
    if (! fs.existsSync(sourcePDF)) {
      alert("Please choose another valid PDF file");
    }
  },
  split_pdf: function(){
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
  },
  //TODO: split this function to small ones, to be more efficient to call from one range gen too
  onCutGenerateClick: function(){
    if (0 == outputFolder) {
      alert('Please choose the source file.');
       return;
    }
    if (! fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }
    //TODO: IMPORTANT: write tab change logic globally
    //TODO: Enhance finding browsed file parapeters to not mix with convert browsed file
    tabFlag = 'pdfcut-'; let choose = $("#cut").find('.browse-file')[0]; if (choose.files.length && sourcePDF && fs.existsSync(outputFolder)) { p = document.getElementById("pages");
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
      Cut.split_pdf(authors, content_from);
    } else {
      alert("Please choose PDF file.");
    }
  },
  onClickClear: function(){
    let p = document.getElementById("pages");
    let els = p.getElementsByClassName("page");
    for (let i = els.length - 1; i >= 0; i--) {
      els[i].remove();
    }
    PAGES_COUNT = 0;
    Cut.createNewPageField();
  },
  createNewPageField: function(){
      let el = document.createElement("tr");
      el.id = "page-" + ++PAGES_COUNT;
      el.className = "page";
      el.innerHTML = CUTTEMPLATE_PAGE_FIELDS.replace(/xxx/g, PAGES_COUNT);
      $('#pages > tbody:last-child').append(el);
      el.getElementsByClassName(INPUTELCLASS)[0].focus();
      $(".pdfcut-event").bind("click", Cut.onCutPageClick);
  },
  pdfcut_gen: function(ti, f, t){
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
  },
  onCutGen: function(i){
    //TODO: Before coming here check right values then call this function
    //TODO: Add JQuery instead of poor JS
    //TODO: IMPORTANT: write tab change logic globally
    if (0 == outputFolder) {
      alert('Please choose the source file.');
       return;
    }
    if (! fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }
    tabFlag = 'pdfcut-';
    let choose = $(".browse-path");
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
      Cut.pdfcut_gen(ti, fr, to);
    } else {
      alert("Please choose PDF file.");
    }
  },
  onCutPageView: function(i){
    //TODO: Implement normally viewer
    const filePath = "/home/ha/Downloads/Sumi-e and Tea Ceremony.pdf";
    const viewerEle = document.getElementById('viewer');
    viewerEle.innerHTML = ''; // destroy the old instance of PDF.js (if it exists)
    // Create an iframe that points to our PDF.js viewer, and tell PDF.js to open the file that was selected from the file picker.
    const iframe = document.createElement('iframe');
    iframe.src = path.resolve(__dirname, `../public/pdfjs/web/viewer.html?file=${filePath}`);
    // Add the iframe to our UI.
    viewerEle.appendChild(iframe);
  },
  onCutPageDel: function(i){
    $('#page-' + i).find('input').val("");
  },
  //TODO: make tests for pdf cut process
  onCutPageClick: function(e){
    //id still can be only  pdfcut-view-* or pdfcut-gen-*
    //TODO:Implemetn better way of index functionality detector
    let i = e.currentTarget.id.split("-")[2];
    if (e.currentTarget.id.indexOf("pdfcut") != -1) {
      if (e.currentTarget.id.indexOf("gen") != -1) {
        Cut.onCutGen(i);
      } else if (e.currentTarget.id.indexOf("view") != -1) {
        //TODO: Implement PDF view
        Cut.onCutPageView(i);
      } else {
        Cut.onCutPageDel(i);
      }
    }
  },
  onNextRange: function(){
    //TODO: make tests for pdf cut process
    Cut.createNewPageField();
  }
};