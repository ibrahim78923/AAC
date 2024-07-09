import { fieldTypes } from '@/constants/form-builder';

export const generateFormHtml = (fields: []) => {
  const html = `
    <form>
      ${fields
        .map((field: any) => {
          const requiredAttr = field.required ? 'required' : '';
          switch (field.type) {
            case fieldTypes?.text:
              return `
              <div class="field-group">
                <label for="${field.name}">${field.label}</label>
                <input class="field-control" type="text" name="${field.name}" placeholder="${field.placeholder}" ${requiredAttr} />
              </div>
            `;
            case fieldTypes?.file:
              return `
              <div class="field-group">
                <label for="${field.name}">${field.label}</label>
                <input class="field-control" type="file" name="${field.name}" placeholder="${field.placeholder}" ${requiredAttr} />
              </div>
            `;
            case fieldTypes?.textarea:
              return `
              <div class="field-group">
                <label for="${field.name}">${field.label}</label>
                <textarea class="field-control" name="${field.name}" placeholder="${field.placeholder}" ${requiredAttr}></textarea>
              </div>
            `;
            case fieldTypes?.select:
              return `
              <div class="field-group">
                <label for="${field.name}">${field.label}</label>
                <select class="field-control" name="${field.name}" ${requiredAttr}>
                  <option>Option 1</option>
                  <option>Option 2</option>
                </select>
              </div>
            `;
            case fieldTypes?.button:
              return `
              <div class="field-group">
                <button type="${field.buttonType}">Submit</button>
              </div>
            `;
            default:
              return '';
          }
        })
        .join('')}
    </form>
  `;
  const minifiedHtml = html.replace(/\n\s+/g, ' ').trim();
  return minifiedHtml;
};
