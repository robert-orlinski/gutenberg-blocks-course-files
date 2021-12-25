import './index.scss';
import { registerBlockType } from '@wordpress/blocks';

registerBlockType('rob/table-of-contents', {
  title: 'Spis treści',
  description: 'Sekcja z nagłówkiem oraz spisem treści konkretnego artykułu',
  icon: 'editor-table',
  keywords: ['zawartość', 'lista', 'table of contents'],
  category: 'content',

  attributes: {
    title: {
      type: 'string',
      source: 'html',
      selector: 'h2',
    },
  },

  edit({ attributes, setAttributes }) {
    const { title } = attributes;

    function setTitle(event) {
      const newTitle = event.target.value;
      setAttributes({ title: newTitle });
    }

    return <input type="text" value={title} onChange={setTitle} />;
  },

  save({ attributes }) {
    const { title } = attributes;

    return <h2>{title}</h2>;
  },
});
