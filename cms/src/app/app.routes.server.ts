import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: 'documents/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'documents/:id/edit',
    renderMode: RenderMode.Server
  },
  {
    path: 'contacts/:id',
    renderMode: RenderMode.Server
  },
  {
    path: 'contacts/:id/edit',
    renderMode: RenderMode.Server
  },
  {
    path: '**',
    renderMode: RenderMode.Prerender
  }
];
