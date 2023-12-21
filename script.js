document.getElementById('generatePdf').addEventListener('click', function () {
    // Crear una instancia de jsPDF
    const { jsPDF } = jspdf;
    const pdf = new jsPDF();
    const image = new Image();
    
   // Agregar logo a la izquierda del título
   image.src = './images/logom.png'; // Reemplaza con la URL de tu imagen de gato izquierdo
   pdf.addImage(image, 'PNG', 10, 10, 40, 30); 

    // Agregar logo en el encabezado (marca de agua)
    var logoUrlRight = './images/logom.png'; // Reemplaza con la URL de tu imagen de gato derecho
    pdf.addImage(logoUrlRight, 'PNG', pdf.internal.pageSize.width - 50, 10, 40, 30);

    // Agregar título centrado
    var title = "MUNICIPALIDAD DISTRITAL MAGDALENA";
    pdf.setFont("helvetica", "bold");
    var titleWidth = pdf.getStringUnitWidth(title) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    var x = (pdf.internal.pageSize.width - titleWidth) / 2;
    pdf.text(title, x, 20);

     // Cambiar a fuente normal antes de imprimir el subtítulo
     pdf.setFont("helvetica", "normal");

    // Agregar subtítulo
    var subtitle = "OFICINA DE TECNOLOGIA DE LA INFORMACION";
    pdf.setFontSize(pdf.internal.getFontSize() * 0.70); // Tamaño de fuente del subtítulo al 70% del tamaño del título
    var subtitleWidth = pdf.getStringUnitWidth(subtitle) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    var subtitleX = (pdf.internal.pageSize.width - subtitleWidth) / 2;
    pdf.text(subtitle, subtitleX, 25); 

    // Cambiar a bold
    pdf.setFont("helvetica", "bold");

    // Agrega Título Ficha
    var tituloFicha = "FICHA DE SERVICIO DE SOPORTE TECNICO";
    var tituloFichaWidth = pdf.getStringUnitWidth(tituloFicha) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
    var tituloFichaX = (pdf.internal.pageSize.width - tituloFichaWidth) / 2;
    pdf.text(tituloFicha, tituloFichaX, 33); 





     const fichaData = {
        numero: '123456',
        producto: 'Pizza',
        cantidad: 5,
        precio: 20,
        fecha: '2023',  
        cliente: 'Angelo',
        total: 100.00,
     }

     // Crear tabla
     const columns = ['Numero', 'Producto', 'Cantidad', 'Precio', 'fecha', 'Total'];
     const datax = [
        [`${fichaData.numero}`, `${fichaData.producto}`, `${fichaData.cantidad}`, `${fichaData.precio}`, `${fichaData.fecha}`, `${fichaData.cliente}`, `${fichaData.total}`]
     ];

     pdf.autoTable({
        startY: 50,
        head: [columns],
        body: datax
     })


      // Definir datos para la tabla (ejemplo)
    var data = [
        ['Nombre', 'Edad', 'Ciudad'],
        ['Juan', 25, 'Ciudad A'],
        ['María', 30, 'Ciudad B'],
        ['Pedro', 22, 'Ciudad C']
    ];

    // Configurar opciones de la tabla
    var options = {
        startY: 80 // Ajusta la posición vertical donde comenzará la tabla
    };

    // Agregar la tabla al PDF
    pdf.autoTable({
        head: [data[0]], // Cabecera de la tabla
        body: data.slice(1), // Cuerpo de la tabla (sin la cabecera)
        startY: options.startY,
        theme: 'striped', // Puedes cambiar el tema (opcional)
        styles: {
            fontSize: 12,
            fontStyle: 'normal'
        },
        columnStyles: {
            0: { cellWidth: 40 }, // Ajusta el ancho de la primera columna
            1: { cellWidth: 30 }  // Ajusta el ancho de la segunda columna
            // Puedes ajustar el ancho de otras columnas según tus necesidades
        }
    });


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