document.getElementById('generatePdf').addEventListener('click', function () {
    // Crear una instancia de jsPDF
    const { jsPDF } = jspdf;
    const pdf = new jsPDF();
    const image = new Image();
    
   // Agregar logo a la izquierda del título
   image.src = 'https://hips.hearstapps.com/hmg-prod/images/beautiful-smooth-haired-red-cat-lies-on-the-sofa-royalty-free-image-1678488026.jpg?crop=0.88847xw:1xh;center,top&resize=1200:*'; // Reemplaza con la URL de tu imagen de gato izquierdo
   pdf.addImage(image, 'PNG', 10, 10, 40, 40); // Ajusta las coordenadas y el tamaño según tus necesidades

    // Agregar título centrado
    var title = "MUNICIPALIDAD DISTRITAL MAGDALENA";
    pdf.setFont("helvetica", "bold");
    var titleWidth = pdf.getStringUnitWidth(title) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    var x = (pdf.internal.pageSize.width - titleWidth) / 2;
    pdf.text(title, x, 20);

    // Guardar el PDF
    var pdfContent = pdf.output('datauristring');

    // Crear un objeto embed para visualizar y imprimir el PDF
    var embed = document.createElement('embed');
    embed.type = 'application/pdf';
    embed.width = '100%';
    embed.height = '100%';
    embed.src = pdfContent;

    // Abrir una nueva ventana con el PDF incrustado
    var printWindow = window.open('', '_blank');
    printWindow.document.open();
    printWindow.document.write(embed.outerHTML);
    printWindow.document.close();
});