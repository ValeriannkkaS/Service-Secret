exports.up = (pgm) => {
  pgm.createTable('secret_table', {
    id: {
      type: 'UUID',
      primaryKey: true,
      unique: true,
      default: pgm.func('gen_random_uuid()'),
    },
    encrypted_value: {
      type: 'text',
      notNull: true,
    },
    iv: { type: 'text', notNull: true },
    link: { type: 'text', notNull: true },
    expires_at: { type: 'timestamptz' },
    remaining_views_count: { type: 'integer', default: 0 },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('secret_table');
};
