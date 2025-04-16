import path from 'path'

export const hateos = {
  default: (param_id: string, router_name: string) => [
    {
      rel: 'self',
      href: new URL(
        path.posix.join(`/api/${router_name}`, param_id),
        process.env.BASE_URL,
      ).href,
      method: 'GET',
    },
    {
      rel: 'update',
      href: new URL(
        path.posix.join(`/api/${router_name}`, param_id),
        process.env.BASE_URL,
      ).href,
      method: 'PUT',
    },
    {
      rel: 'delete',
      href: new URL(
        path.posix.join(`/api/${router_name}`, param_id),
        process.env.BASE_URL,
      ).href,
      method: 'DELETE',
    },
  ],
}
