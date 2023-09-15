from fpdf import FPDF

pdf = FPDF()

# imagelist is the list with all image filenames
imagelist = [
  'file_1.jpg',
  'file_2.jpg'
]

for image in imagelist:
    pdf.add_page()
    x = 1
    y = 1
    w = 10
    h = 10
    pdf.image(image,x,y,w,h)

pdf.output("res.pdf", "F")
