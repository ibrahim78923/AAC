import JsPDF from 'jspdf';

export const pdfViewData = [
  {
    firstCell: 'Sample Data',
    secondCell: [
      {
        list: 'Accelio Present Central 5.4',
      },
      {
        list: 'Accelio Present Output Designer 5.4',
      },
    ],
    thirdCell: 'May 2021',
    dots: false,
  },
  {
    firstCell: 'Prepared by',
    secondCell: [
      {
        list: 'Accelio Present Central 5.4',
      },
      {
        list: 'Accelio Present Output Designer 5.4',
      },
    ],
    thirdCell: 'Accelio Present Applied Technology',
    dots: false,
  },
  {
    firstCell: 'Created and Tested Using',
    thirdCell: '',
    dots: true,
    secondCell: [
      {
        list: 'Accelio Present Central 5.4',
      },
      {
        list: 'Accelio Present Output Designer 5.4',
      },
    ],
  },
  {
    firstCell: 'Features Demostrated',
    thirdCell: '',
    dots: true,
    secondCell: [
      {
        list: 'Primary bookmarks in a PDF file',
      },
      {
        list: 'Secondary bookmarks in a PDF file',
      },
    ],
  },
];

export const generatePDF = (handleSetHide: any) => {
  const report: any = new JsPDF('portrait', 'pt', [850, 600]);
  report.html(document.querySelector('#report')).then(() => {
    report.save('report.pdf');
    handleSetHide();
  });
};
