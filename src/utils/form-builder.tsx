import { fieldTypes } from '@/constants/form-builder';

export const generateFormHtml = (fields: []) => {
  const html = `
    <form method="get">
      ${fields
        .map((field: any) => {
          const requiredAttr = field.required ? 'required' : '';
          switch (field.type) {
            case fieldTypes?.text:
              return `
              <div class="field-group">
                <div class="field-label"><label for="${field?.name}">${field?.label}</label></div>
                <div class="field-control"><input class="field-input" type="text" name="${field?.name}" placeholder="${field?.placeholder}" ${requiredAttr} /></div>
              </div>
            `;
            case fieldTypes?.file:
              return `
              <div class="field-group">
                <div class="field-label"><label for="${field?.name}">${field?.label}</label></div>
                <div class="field-control"><input class="field-input file" type="file" name="${field?.name}" placeholder="${field?.placeholder}" ${requiredAttr} /></div>
              </div>
            `;
            case fieldTypes?.textarea:
              return `
              <div class="field-group">
                <div class="field-label"><label for="${field?.name}">${field.label}</label></div>
                <div class="field-control"><textarea class="field-control textarea" name="${field?.name}" placeholder="${field?.placeholder}" ${requiredAttr}></textarea></div>
              </div>
            `;
            case fieldTypes?.select:
              return `
              <div class="field-group">
                <div class="field-label"><label for="${field.name}">${
                  field.label
                }</label></div>
                <div class="field-control">
                  <select class="field-select" name="${
                    field.name
                  }" ${requiredAttr}>
                  ${field?.values?.map((option: any) => {
                    const selected = option?.selected ? 'selected' : '';
                    return `<option value="${option?.value}" ${selected}>${option?.label}</option>`;
                  })}
                  </select>
                </div>
              </div>
            `;
            case fieldTypes?.space:
              return `
              <div class="field-space" style="height: ${field?.space}px"></div>
            `;
            case fieldTypes?.divider:
              return `
              <div class="field-divider" style="border-top: ${field?.dividerWidth}px solid ${field?.dividerColor}"></div>
            `;
            case fieldTypes?.button:
              return `
              <div class="field-group">
                <button type="${field?.buttonType}">Submit</button>
              </div>
            `;
            default:
              return '';
          }
        })
        .join('')}
    </form>
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
        </style>
    </head>
    <body>
      ${html}
    </body>
  </html>`;

  const decodeHtmlEntities = (html: string): string => {
    const txt = document.createElement('textarea');
    txt.innerHTML = html;
    return txt.value;
  };

  const encodedHtml = encodeURIComponent(decodeHtmlEntities(htmlDocument));

  const iframeSrc = `data:text/html;charset=utf-8,${encodedHtml}`;

  const iframe = `<iframe
    style={{ border: 'none', width: '100%', height: '100%' }}
    src="${iframeSrc}"
  />`;

  return iframe;
};
