import './index.scss';
import { registerBlockType } from '@wordpress/blocks';
import { RichText, BlockControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton, Icon } from '@wordpress/components';

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
    isHighlightButtonActive: {
      type: 'boolean',
    },
  },

  edit({ attributes, setAttributes }) {
    const { title, list, isHighlightButtonActive } = attributes;

    function setTitle(newTitle) {
      setAttributes({ title: newTitle });
    }

    function setListContent(newList) {
      setAttributes({ list: newList });
    }

    function setHighlightButtonState() {
      setAttributes({ isHighlightButtonActive: !isHighlightButtonActive });
    }

    return (
      <div class="table-of-contents-block">
        <BlockControls>
          <Toolbar>
            <ToolbarButton
              label="Zaznaczenie"
              className="highlight-button"
              onClick={setHighlightButtonState}
              isActive={isHighlightButtonActive}
            >
              <Icon icon="admin-customizer" />
            </ToolbarButton>
          </Toolbar>
        </BlockControls>
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
