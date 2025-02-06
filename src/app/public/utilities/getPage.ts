import { AppComponent } from '../interfaces/index';

export function getPage(
  tagName: string,
  parent: string,
  appComponents: AppComponent[],
): void {
  const appFragments: DocumentFragment[] = [];
  const page = document.createElement(tagName);
  const app = document.querySelector(parent);
  for (const appComponent of appComponents)
    appFragments.push(appComponent.onInit());
  page.append(...appFragments);

  app?.appendChild(page);
}
