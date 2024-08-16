import React from 'react';
import { BASE_URL } from '@/config';
import { END_POINTS } from '@/routesConstants/endpoints';

const IframeComponent = ({
  ctaId,
  buttonUrl,
  styles,
  buttonContent,
  buttonImageUrl,
  altText,
  imgWidth,
  imgHeight,
}: any) => {
  const endPoint = `${BASE_URL}${END_POINTS?.CTA_ADD_VIEW_CLICK_COUNT}`;
  const ctaHtml = `<button id="ctaButton" class="ctaButton">
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
    </button>
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
          .ctaButton ${styles}
        </style>
    </head>
    <body>
      ${ctaHtml}

      <script>
        const ctaBtn = document.getElementById('ctaButton');
        const reqUrl = '${endPoint}/${ctaId}';
        
        const requestUpdateClickCount = (actionType) => {
          const payload = {
            actionType: actionType,
          };

          fetch(reqUrl, {
            method: 'PATCH',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify(payload),
          })
          .then(response => {
            if (response.ok) {
                console.log('Resource updated successfully!');
            } else {
                console.error('Error updating resource:', response.status);
            }
          })
          .catch(error => {
              console.error('Fetch error:', error);
          });
        }

        ctaBtn.addEventListener('click', (e) => {
          e.preventDefault();
          requestUpdateClickCount('clickCount');
          window.open('${buttonUrl}', '_blank');
        });

        // Add view count on page load
        requestUpdateClickCount('viewCount');
        
      </script>
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
