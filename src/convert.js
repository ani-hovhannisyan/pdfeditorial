const pdf2html = require('pdf2html');
const path = require('path');
const fs = require('fs');
const { shell } = require('electron');
const progress = require('progress-stream');

module.exports = {
  onClickConvertFrom: function(e){
    //button class sample pdfcon-pdf/docx/html/text-from/to
    let ext = e.currentTarget.textContent;
    convertFrom = ext;
    console.log('Choosed from: ', convertFrom);
    $('#pdfcon-from').text(convertFrom);
    $('#pdfcon-from').css('background', '#339933');
  },
  onClickConvertTo: function(e){
    //button class sample pdfcon-pdf/docx/html/text-from/to
    //TODO: Implement convertion tab functionality
    let ext = e.currentTarget.textContent;
    convertTo = ext;
    console.log('Choosed to: ', convertTo);
    $('#pdfcon-to').text(convertTo);
    $('#pdfcon-to').css('background', '#339933');
  },
  convertPDFtoHTML: function(){
    pdf2html.html(sourcePDF , (err, html) => {
      if (err) {
        console.error('Conversion error: ' + err)
      } else {
        let basename = path.basename(sourcePDF);
        let htmlFilePath = basename.replace(path.extname(basename), '.html');
        //TODO: Fix windows '/' slash bug for dirnames
        htmlFilePath = outputFolder + '/' + htmlFilePath;
        //TODO: Use other convert lib // fs.createWriteStream(htmlFilePath);
        fs.writeFile(htmlFilePath, html, (err) => {
          if (err) {
            throw err;
          } else{
            //TODO: Make progress bar work as it lasts too long
            console.log('The HTML file has been saved!');
            if (shell.openItem(htmlFilePath)) {
              alert('The "' + convertFrom + '" file to "' + convertTo + '" file conversion completed.');
            }
          }
        });
      }
    });
  },
  runConvertionbyType: function(t){
    //TODO: Add Loading as it completes very slowly
    switch (t){
      case 'PDFHTML':
          Convert.convertPDFtoHTML();
        break;
      case 'PDFDOCX':
          Convert.convertPDFtoDOCX();
        break;
      case 'PDFtTEXT':
          Convert.convertPDFTEXT();
        break;
      case 'PDFIMG':
          Convert.convertPDFtoIMG();
        break;
      default:
        break;
    }
  },
  onClickConvertGenerate: function(){
    if (0 == outputFolder) {
      alert('Please choose the source file.');
       return;
    }
    if (! fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }
    var t = convertFrom + convertTo;
    Convert.runConvertionbyType(t);
  }
};
