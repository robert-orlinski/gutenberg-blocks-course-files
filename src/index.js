import './index.scss';

import { registerBlockType } from '@wordpress/blocks';
import { RichText, BlockControls, InspectorControls } from '@wordpress/block-editor';
import { Toolbar, ToolbarButton, Icon, PanelBody } from '@wordpress/components';
import { registerFormatType, toggleFormat } from '@wordpress/rich-text';
import { useSelect } from '@wordpress/data';

const HighlightButton = (props) => {
  const selectedBlock = useSelect((select) => {
    return select('core/block-editor').getSelectedBlock();
  }, []);

  if (selectedBlock && selectedBlock.name !== 'rob/table-of-contents') {
    return null;
  }

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
    list: {
      type: 'string',
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
      <>
        <InspectorControls>
          <PanelBody title="Tytuł pierwszej zakładki">
            <p>Treść pierwszej zakładki</p>
          </PanelBody>
          <PanelBody title="Tytuł drugiej zakładki">
            <p>Treść drugiej zakładki</p>
          </PanelBody>
        </InspectorControls>
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
      </>
    );
  },

  save({ attributes }) {
    const { title, list } = attributes;

    return (
      <div class="table-of-contents-block">
        <h2 dangerouslySetInnerHTML={{ __html: title }}></h2>
        <RichText.Content tagName="ol" value={list} />
      </div>
    );
  },
});
