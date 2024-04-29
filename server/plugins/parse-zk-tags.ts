import zkSyncConfig from '../../content/_zksync.json';

const tags: { [key: string]: string } = {};

export default defineNitroPlugin((nitroApp) => {
  parseConfig(zkSyncConfig, 'zk');

  nitroApp.hooks.hook('content:file:beforeParse', (file: { _id: string; body: string }) => {
    if (file._id.endsWith('.md')) {
      Object.keys(tags).forEach((key) => {
        file.body = file.body.replace(new RegExp(`%%${key}%%`, 'g'), tags[key]);
      });
    }
  });
});

function parseConfig(config: any, prefix: string) {
  Object.keys(config).forEach((key) => {
    const value = config[key];
    const newPrefix = `${prefix}_${key}`;
    if (typeof value === 'object' && value !== null) {
      parseConfig(value, newPrefix);
    } else {
      tags[newPrefix] = value;
    }
  });

  return tags;
}
