import { testWithSynpress } from '@synthetixio/synpress';
import { metaMaskFixtures } from '@synthetixio/synpress-metamask/playwright';
import setup from './connected.setup';

const fixtures = metaMaskFixtures(setup);
export const testWithMetamask = testWithSynpress(fixtures);
