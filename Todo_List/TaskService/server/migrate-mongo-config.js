const config = {
  mongodb: {
    url: "mongodb+srv://mmarlen2303:vGAa6rZ2ovM4zuZG@cluster0.imwyi2m.mongodb.net/?retryWrites=true&w=majority",
    databaseName: "todo_list",
    options: {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    }
  },
  migrationsDir: "migrations",
  changelogCollectionName: "changelog",
  migrationFileExtension: ".js",
  useFileHash: false,
  moduleSystem: 'commonjs',
};

module.exports = config;