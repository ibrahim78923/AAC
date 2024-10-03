import { BASE_URL } from '@/config';
import { fieldTypes } from '@/constants/form-builder';
import { LEAD_CAPTURE_FORM } from '@/routesConstants/endpoints';

export function convertObjectToCSS(obj: any) {
  if (obj === null || typeof obj !== 'object') {
    return '';
  }

  return Object.entries(obj)
    .map(([key, value]) => {
      // Convert camelCase to kebab-case
      const kebabKey = key.replace(/([a-z])([A-Z])/g, '$1-$2').toLowerCase();
      return `${kebabKey}: ${value};`;
    })
    .join(' ');
}

export const generateFormHtml = (
  formId: string,
  fields: [],
  styling: any = {},
) => {
  const endPointAddView = `${BASE_URL}${LEAD_CAPTURE_FORM?.ADD_VIEW_FORM}?id=${formId}`;
  const endPointAddEntrance = `${BASE_URL}${LEAD_CAPTURE_FORM?.ADD_FORM_ENTRANCE}?id=${formId}`;

  const html = `
    <form method="POST" action="" enctype="multipart/form-data">
      ${fields
        .map((field: any) => {
          const requiredAttr = field?.required === 'true' ? 'required' : '';
          const asterik =
            field?.required === 'true'
              ? '<span class="label-required">*</span>'
              : '';
          switch (field.type) {
            case fieldTypes?.text:
              return `
              <div class="field-group">
                <div class="field-label">
                  <label for="${field?.name}">${field?.label} ${asterik}</label>
                </div>
                <div class="field-control">
                  <input
                    class="field-input"
                    type="${field?.subtype ? field?.subtype : field?.type}"
                    name="${field?.name}"
                    placeholder="${field?.placeholder ?? ''}"
                    ${requiredAttr}
                  />
                </div>
              </div>
            `;
            case fieldTypes?.file:
              return `
              <div class="field-group">
                <div class="field-label">
                  <label for="${field?.name}">${field?.label} ${asterik}</label>
                </div>
                <div class="field-control"><input class="field-input file" type="file" name="${field?.name}" placeholder="${
                  field?.placeholder ?? ''
                }" ${requiredAttr} /></div>
              </div>
            `;
            case fieldTypes?.textarea:
              return `
              <div class="field-group">
                <div class="field-label">
                  <label for="${field?.name}">${field?.label} ${asterik}</label>
                </div>
                <div class="field-control"><textarea class="field-input textarea" name="${field?.name}" placeholder="${
                  field?.placeholder ?? ''
                }" ${requiredAttr}></textarea></div>
              </div>
            `;
            case fieldTypes?.select:
              return `
              <div class="field-group">
                <div class="field-label">
                  <label for="${field?.name}">${field?.label} ${asterik}</label>
                </div>
                <div class="field-control">
                  <select class="field-input select" name="${
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
                <button class="button-submit" type="${field?.buttonType}">Submit</button>
              </div>
            `;
            default:
              return '';
          }
        })
        .join('')}
    </form>
  `;

  const bodyCssString = convertObjectToCSS(styling?.body);
  const buttonCssString = convertObjectToCSS(styling?.button);

  const htmlDocument = `
  <!DOCTYPE html>
  <html lang='en'>
    <head>
      <meta charset='UTF-8'>
      <meta name='viewport' content='width=device-width, initial-scale=1.0'>
      <title>Button</title>
      <style>
        body {
          font-family: system-ui, -apple-system, Arial, sans-serif;
          margin: 0;
          padding: 8px;
          background-color: transparent;
          box-sizing: border-box;
          ${bodyCssString}
          width: 100%;
        }
        .field-group {
          margin-bottom: 20px;
        }
        .field-label {
          margin-bottom: 0.5rem;
        }
        .label-required {
          color: red;
        }
        .field-input {
          display: block;
          width: 100%;
          padding: 0.375rem 0.75rem;
          font-size: 1rem;
          font-weight: 400;
          line-height: 1.5;
          color: #212529;;
          -webkit-appearance: none;
          -moz-appearance: none;
          appearance: none;
          background-color: #ffffff;
          background-clip: padding-box;
          border: 1px solid #dee2e6;
          border-radius: 0.375rem;
          transition: border-color 0.15s ease-in-out, box-shadow 0.15s ease-in-out;
          box-sizing: border-box;
        }
        .button-submit {
          border: 1px solid ${styling?.button?.backgroundColor};
          border-radius: 4px;
          padding: 6px 20px;
          -webkit-appearance: button;
          outline: 0;
          cursor: pointer;
          ${buttonCssString}
        }
      </style>
    </head>
    <body>
      ${html}

      <script>
        const fetchResource = (endPoint) => {
          fetch(endPoint, {
            method: 'PUT',
            headers: {
              'Content-Type': 'application/json',
            },
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

        const fetchAddViewForm = () => {
          const url = '${endPointAddView}';
          fetchResource(url);
        }

        const fetchAddEntranceForm = () => {
          const url = '${endPointAddEntrance}';
          fetchResource(url);
        }

        fetchAddViewForm();

        function handleInput(event) {
          if (event.target.tagName === "INPUT" || event.target.tagName === "TEXTAREA") {
            fetchAddEntranceForm();
            document.getElementsByTagName("form")[0].removeEventListener("input", handleInput);
          }
        }

        window.onload = function() {
          const form = document.getElementsByTagName("form")[0];
          if (form) { 
            form.addEventListener("input", handleInput);
          }
        };
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

  const iframe = `<iframe
    style="border: none; width: ${
      styling?.body?.width ?? '100%'
    }; height: 500px"
    src="${iframeSrc}"
  />`;

  return iframe;
};
