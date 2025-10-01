exports.up = (pgm) => {
  pgm.addColumns('secret_table', {
    allow_deletions: { type: 'boolean', notNull: true, default: false },
  });
};

exports.down = (pgm) => {
  pgm.dropColumns('secret_table', 'allow_deletions');
};
