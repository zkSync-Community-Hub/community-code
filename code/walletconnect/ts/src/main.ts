import { setupReown } from './reown.ts';

document.querySelector<HTMLDivElement>('#app')!.innerHTML = `
  <div>
    <appkit-button />
  </div>
`;

setupReown();
