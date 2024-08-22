import { serverQueryContent } from '#content/server';

export default eventHandler(async (event) => {
  return serverQueryContent(event)
    .where({ _type: 'markdown', navigation: { $ne: false }, _partial: false })
    .find();
});
