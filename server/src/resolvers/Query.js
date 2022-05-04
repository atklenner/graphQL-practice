function feed(parent, args, context) {
  return context.prism.link.findMany();
}

module.exports = { feed };
