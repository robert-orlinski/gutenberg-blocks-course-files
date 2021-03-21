import './index.scss';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType('rob/table-of-contents', {
  title: 'Spis treści',
  description: 'Sekcja z nagłówiem oraz spisem treści, konkretnego artykułu',
  icon: 'editor-table',
  keywords: ['zawartość', 'lista', 'table of contents'],
  category: 'layout',

  edit() {
    return <p>Coś innego, niż "Hello world".</p>;
  },

  save() {},
});
