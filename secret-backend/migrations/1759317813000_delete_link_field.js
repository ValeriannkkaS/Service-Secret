exports.up = (pgm) => {
  pgm.dropColumns('secret_table', 'link');
};

exports.down = (pgm) => {
  pgm.addColumns('secret_table', {
    link: { type: 'text', notNull: true },
  });
};
