export const getHtml = (
    template: string,
    styles: Record<string, string>,
  ): DocumentFragment => {
    const el = document.createDocumentFragment();
  
    const parser = new DOMParser();
    const {
      body: { children },
    } = parser.parseFromString(
        template.replace(/class=\"([^\"]*)\"/g, (_, classList) => {
        const classes = classList.split(' ');
        const moduledClasses = classes.map((cl: string) => styles[cl] || cl);
        return `class="${moduledClasses.join(' ')}"`;
      }),
      'text/html',
    );
  
    el.append(...children);
  
    return el;
  };
  