import './index.scss';
import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';

registerBlockType('rob/table-of-contents', {
  title: 'Spis treści',
  description: 'Sekcja z nagłówiem oraz spisem treści, konkretnego artykułu',
  icon: 'editor-table',
  keywords: ['zawartość', 'lista', 'table of contents'],
  category: 'content',

  attributes: {
    title: {
      type: 'string',
      source: 'html',
      selector: 'h2',
    },
    list: {
      type: 'array',
      source: 'children',
      selector: 'ol',
    },
  },

  edit({ attributes, setAttributes }) {
    const { title, list } = attributes;

    function setTitle(newTitle) {
      setAttributes({ title: newTitle });
    }

    function setListContent(newList) {
      setAttributes({ list: newList });
    }

    return (
      <div class="table-of-contents-block">
        <RichText
          tagName="h2"
          placeholder="Tytuł spisu treści"
          value={title}
          onChange={setTitle}
        />
        <RichText
          tagName="ol"
          placeholder="Spis treści"
          value={list}
          multiline="li"
          onChange={setListContent}
        />
      </div>
    );
  },

  save({ attributes }) {
    const { title, list } = attributes;

    return (
      <div class="table-of-contents-block">
        <h2>{title}</h2>
        <RichText.Content tagName="ol" value={list} />
      </div>
    );
  },
});
