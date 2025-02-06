import { IImportComponent } from '../interfaces/default/IImportComponent';

export function importComponent(
    layout: DocumentFragment,
    configs: Array<IImportComponent>,
  ): void {
    if (layout) {
      for (let config of configs) {
        for (const component of config.imports) {
          try {
            const componentFragment = component.onInit();
            const targetElement = layout.querySelector(config.directory);
  
            if (targetElement) {
              targetElement.replaceWith(componentFragment);
            } else {
              console.warn(
                `Target directory '${config.directory}' not found in layout.`,
              );
            }
          } catch (error) {
            console.error(`Error initializing component:`, error);
          }
        }
      }
    }
  }
  