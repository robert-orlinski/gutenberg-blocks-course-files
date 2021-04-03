import './index.scss';

import { registerBlockType } from '@wordpress/blocks';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton, Icon } from '@wordpress/components';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';

const HighlightButton = (props) => {
  return (
    <BlockControls>
      <Toolbar>
        <ToolbarButton
          label="Zaznaczenie"
          className="highlight-button"
          onClick={() => {
            props.onChange(
              toggleFormat(props.value, { type: 'custom-formats/highlight' })
            );
          }}
          isActive={props.isActive}
        >
          <Icon icon="admin-customizer" />
        </ToolbarButton>
      </Toolbar>
    </BlockControls>
  );
};

registerFormatType('custom-formats/highlight', {
  title: 'Zaznaczenie',
  tagName: 'span',
  className: 'highlight',
  edit: HighlightButton,
});

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
      type: 'string',
      sorce: 'children',
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
          allowedFormats={[
            'core/bold',
            'core/italic',
            'core/link',
            'core/text-color',
            'core/strikethrough',
            'custom-formats/highlight',
          ]}
        />
        <RichText
          tagName="ol"
          placeholder="Spis treści"
          value={list}
          multiline="li"
          onChange={setListContent}
          allowedFormats={[
            'core/bold',
            'core/italic',
            'core/link',
            'core/text-color',
            'core/strikethrough',
            'custom-formats/highlight',
          ]}
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
