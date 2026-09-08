import * as schema from "./schema";

// In-memory data store for inquiries and local records
const store: {
  inquiries: Array<Record<string, any>>;
  notes: Array<Record<string, any>>;
  subscribers: Array<Record<string, any>>;
} = {
  inquiries: [],
  notes: [],
  subscribers: [],
};

export function getDb(): any {
  return {
    insert: (table: any) => ({
      values: (data: any) => {
        const item = {
          id: data?.id || crypto.randomUUID(),
          createdAt: data?.createdAt || new Date().toISOString(),
          ...data,
        };
        const tableName = (table?._?.name as string) || "inquiries";
        if (!store[tableName as keyof typeof store]) {
          (store as Record<string, any[]>)[tableName] = [];
        }
        (store as Record<string, any[]>)[tableName].push(item);
        console.log(`[db] Successfully recorded entry into ${tableName}:`, item.id);
        return {
          returning: () => Promise.resolve([item]),
          then: (resolve: (v: any) => void) => resolve([item]),
        };
      },
    }),
    select: () => ({
      from: (table: any) => {
        const tableName = (table?._?.name as string) || "inquiries";
        const rows = (store as Record<string, any[]>)[tableName] || [];
        return {
          orderBy: (..._args: any[]) => ({
            limit: (..._args2: any[]) => Promise.resolve(rows),
            then: (resolve: (v: any) => void) => resolve(rows),
          }),
          limit: (..._args: any[]) => Promise.resolve(rows),
          then: (resolve: (v: any) => void) => resolve(rows),
        };
      },
    }),
    query: {
      inquiries: {
        findMany: async () => store.inquiries,
        findFirst: async () => store.inquiries[0] ?? null,
      },
      notes: {
        findMany: async () => store.notes,
        findFirst: async () => store.notes[0] ?? null,
      },
    },
  };
}

export const db = getDb();

