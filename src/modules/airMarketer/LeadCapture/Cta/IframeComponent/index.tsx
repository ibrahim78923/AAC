import React from 'react';

const IframeComponent = ({
  buttonUrl,
  styles,
  buttonContent,
  buttonImageUrl,
  altText,
  imgWidth,
  imgHeight,
}: any) => {
  const ctaHtml = `<a class="cta-link" target="_blank" href="${buttonUrl}">
    ${
      buttonContent instanceof File
        ? `<img
        src="${buttonImageUrl}"
        alt="${altText}"
        width="${imgWidth}"
        height="${imgHeight}"
      />`
        : buttonContent
    }
    </a>
  `;

  const htmlDocument = `
  <!DOCTYPE html>
  <html lang='en'>
    <head>
        <meta charset='UTF-8'>
        <meta name='viewport' content='width=device-width, initial-scale=1.0'>
        <title>Button</title>
        <style>
          body {
            margin: 0;
            padding: 0;
            background-color: transparent;
          }
          .cta-link ${styles}
        </style>
    </head>
    <body>
      ${ctaHtml}
    </body>
  </html>`;

  const decodeHtmlEntities = (html: string): string => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const encodedHtml = encodeURIComponent(decodeHtmlEntities(htmlDocument));

  const iframeSrc = `data:text/html;charset=utf-8,${encodedHtml}`;

  return (
    <iframe
      style={{ border: 'none', width: '100%', height: '100%' }}
      src={iframeSrc}
    />
  );
};

export default IframeComponent;
