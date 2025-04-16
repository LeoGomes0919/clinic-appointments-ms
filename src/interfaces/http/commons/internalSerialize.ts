export const internalSerialize = {
  serialize: ({
    createdAt,
    updatedAt,
    deletedAt,
  }: {
    createdAt: Date
    updatedAt: Date
    deletedAt: Date | null
  }) => {
    return {
      created_at: createdAt,
      updated_at: updatedAt,
      deleted_at: deletedAt,
      schema_version: process.env.SCHEMA_VERSION,
    }
  },
}
