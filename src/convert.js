const pdf2html = require('pdf2html');
const fs = require('fs');

module.exports = {
  onClickConvertFrom: function(e){
    //button class sample pdfcon-pdf/docx/html/text-from/to
    let ext = e.currentTarget.textContent;
    convertFrom = ext;
    console.log('Choosed from: ', convertFrom);
  },
  onClickConvertTo: function(e){
    //button class sample pdfcon-pdf/docx/html/text-from/to
    let ext = e.currentTarget.textContent;
    convertTo = ext;
    console.log('Choosed to: ', convertTo);
  },
  //TODO: Implement convertion tab functionality
  onClickConvertGenerate: function() {
    if (0 == outputFolder) {
      alert('Please choose the source file.');
       return;
    }
    if (! fs.existsSync(outputFolder)) {
      fs.mkdirSync(outputFolder);
    }
    pdf2html.html('sumi.pdf', (err, html) => {
      if (err) {
        console.error('Conversion error: ' + err)
      } else {
        fs.writeFile('done.html', html, (err) => {
          if (err) throw err;
          console.log('The HTML file has been saved!');
        });
      }
    });
    alert('The ' + convertFrom + ' file to ' + convertTo + ' file conversion completed.');
  }
};