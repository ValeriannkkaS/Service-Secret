exports.up = (pgm) => {
  pgm.alterColumn('secret_table', 'encrypted_value', { notNull: false });
  pgm.alterColumn('secret_table', 'iv', { notNull: false });
};

exports.down = (pgm) => {
  pgm.alterColumn('secret_table', 'encrypted_value', { notNull: true });
  pgm.alterColumn('secret_table', 'iv', { notNull: true });
};
